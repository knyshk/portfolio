import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD = process.env.BLOG_ADMIN_PASSWORD || 'admin123';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(helmet({
  crossOriginResourcePolicy: false,
}));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts. Please try again after 15 minutes' },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: 'Too many contact requests. Please try again later.' },
});

const commentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many comments. Please try again later.' },
});

app.use(globalLimiter);

// Serve uploaded files
const uploadsDir = path.join(__dirname, 'data', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// ─────────────────────────────────────────────
// SQLite Database Setup
// ─────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'data', 'blog.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    vote_type TEXT NOT NULL CHECK(vote_type IN ('up', 'down')),
    voter_ip TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE(post_id, voter_ip)
  );
`);

console.log('SQLite blog database initialized');

// ─────────────────────────────────────────────
// Multer for image uploads
// ─────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomBytes(8).toString('hex');
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg|pdf/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype.split('/')[1]);
    if (ext || mime) {
      cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed'));
    }
  }
});

// ─────────────────────────────────────────────
// Auth Middleware
// ─────────────────────────────────────────────
function requireAdmin(req, res, next) {
  const authHeader = req.headers['x-admin-password'];
  if (!authHeader || authHeader !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ─────────────────────────────────────────────
// Gmail Configuration (existing)
// ─────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('Gmail configuration error:', error);
  } else {
    console.log('Gmail transporter configured successfully');
  }
});

// Contact form endpoint (existing)
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { senderName, senderEmail, message } = req.body;

  if (!senderName || !senderEmail || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: process.env.GMAIL_EMAIL,
      replyTo: senderEmail,
      subject: `New Portfolio Contact from ${senderName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
            <p><strong>From:</strong> ${senderName}</p>
            <p><strong>Email:</strong> ${senderEmail}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #555;">${message}</p>
            <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      `
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

// ─────────────────────────────────────────────
// Blog API Routes
// ─────────────────────────────────────────────

// Auth check
app.post('/api/blog/auth', authLimiter, (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Get all posts (paginated)
app.get('/api/blog/posts', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const search = req.query.search || '';

  try {
    let posts;
    let total;

    if (search) {
      const searchQuery = `%${search}%`;
      posts = db.prepare(`
        SELECT p.*, 
          (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count,
          (SELECT COUNT(*) FROM votes WHERE post_id = p.id AND vote_type = 'up') as upvotes,
          (SELECT COUNT(*) FROM votes WHERE post_id = p.id AND vote_type = 'down') as downvotes
        FROM posts p 
        WHERE p.title LIKE ? OR p.content LIKE ?
        ORDER BY p.created_at DESC 
        LIMIT ? OFFSET ?
      `).all(searchQuery, searchQuery, limit, offset);

      total = db.prepare(`
        SELECT COUNT(*) as count FROM posts 
        WHERE title LIKE ? OR content LIKE ?
      `).get(searchQuery, searchQuery).count;
    } else {
      posts = db.prepare(`
        SELECT p.*, 
          (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count,
          (SELECT COUNT(*) FROM votes WHERE post_id = p.id AND vote_type = 'up') as upvotes,
          (SELECT COUNT(*) FROM votes WHERE post_id = p.id AND vote_type = 'down') as downvotes
        FROM posts p 
        ORDER BY p.created_at DESC 
        LIMIT ? OFFSET ?
      `).all(limit, offset);

      total = db.prepare('SELECT COUNT(*) as count FROM posts').get().count;
    }

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post
app.get('/api/blog/posts/:id', (req, res) => {
  try {
    const post = db.prepare(`
      SELECT p.*, 
        (SELECT COUNT(*) FROM votes WHERE post_id = p.id AND vote_type = 'up') as upvotes,
        (SELECT COUNT(*) FROM votes WHERE post_id = p.id AND vote_type = 'down') as downvotes
      FROM posts p 
      WHERE p.id = ?
    `).get(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comments = db.prepare(`
      SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC
    `).all(req.params.id);

    // Check if current user has voted
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const userVote = db.prepare(`
      SELECT vote_type FROM votes WHERE post_id = ? AND voter_ip = ?
    `).get(req.params.id, clientIp);

    res.json({ ...post, comments, userVote: userVote?.vote_type || null });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create post (admin only)
app.post('/api/blog/posts', requireAdmin, upload.single('cover_image'), (req, res) => {
  const { title, content, excerpt } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;
    const result = db.prepare(`
      INSERT INTO posts (title, content, excerpt, cover_image) VALUES (?, ?, ?, ?)
    `).run(title, content, excerpt || content.substring(0, 200), coverImage);

    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Upload image (for inline images in posts)
app.post('/api/blog/upload', requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Update post (admin only)
app.put('/api/blog/posts/:id', requireAdmin, upload.single('cover_image'), (req, res) => {
  const { title, content, excerpt } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const existing = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const coverImage = req.file ? `/uploads/${req.file.filename}` : existing.cover_image;

    db.prepare(`
      UPDATE posts SET title = ?, content = ?, excerpt = ?, cover_image = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(title, content, excerpt || content.substring(0, 200), coverImage, req.params.id);

    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete post (admin only)
app.delete('/api/blog/posts/:id', requireAdmin, (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete cover image file if exists
    if (existing.cover_image) {
      const imgPath = path.join(__dirname, existing.cover_image);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Vote on post
app.post('/api/blog/posts/:id/vote', (req, res) => {
  const { voteType } = req.body;
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (!['up', 'down'].includes(voteType)) {
    return res.status(400).json({ error: 'Invalid vote type' });
  }

  try {
    const existing = db.prepare('SELECT * FROM votes WHERE post_id = ? AND voter_ip = ?')
      .get(req.params.id, clientIp);

    if (existing) {
      if (existing.vote_type === voteType) {
        // Remove vote if same type (toggle)
        db.prepare('DELETE FROM votes WHERE id = ?').run(existing.id);
      } else {
        // Change vote
        db.prepare('UPDATE votes SET vote_type = ? WHERE id = ?').run(voteType, existing.id);
      }
    } else {
      // New vote
      db.prepare('INSERT INTO votes (post_id, vote_type, voter_ip) VALUES (?, ?, ?)')
        .run(req.params.id, voteType, clientIp);
    }

    // Return updated counts
    const upvotes = db.prepare("SELECT COUNT(*) as count FROM votes WHERE post_id = ? AND vote_type = 'up'")
      .get(req.params.id).count;
    const downvotes = db.prepare("SELECT COUNT(*) as count FROM votes WHERE post_id = ? AND vote_type = 'down'")
      .get(req.params.id).count;

    const userVote = db.prepare('SELECT vote_type FROM votes WHERE post_id = ? AND voter_ip = ?')
      .get(req.params.id, clientIp);

    res.json({ upvotes, downvotes, userVote: userVote?.vote_type || null });
  } catch (error) {
    console.error('Error voting:', error);
    res.status(500).json({ error: 'Failed to vote' });
  }
});

// Get comments for a post
app.get('/api/blog/posts/:id/comments', (req, res) => {
  try {
    const comments = db.prepare('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC')
      .all(req.params.id);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Add comment
app.post('/api/blog/posts/:id/comments', commentLimiter, (req, res) => {
  const { authorName, content } = req.body;

  if (!authorName || !content) {
    return res.status(400).json({ error: 'Name and comment are required' });
  }

  if (authorName.length > 100) {
    return res.status(400).json({ error: 'Name too long' });
  }

  if (content.length > 2000) {
    return res.status(400).json({ error: 'Comment too long (max 2000 characters)' });
  }

  try {
    const postExists = db.prepare('SELECT id FROM posts WHERE id = ?').get(req.params.id);
    if (!postExists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const result = db.prepare('INSERT INTO comments (post_id, author_name, content) VALUES (?, ?, ?)')
      .run(req.params.id, authorName, content);

    const comment = db.prepare('SELECT * FROM comments WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Delete comment (admin only)
app.delete('/api/blog/posts/:id/comments/:commentId', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM comments WHERE id = ? AND post_id = ?')
      .run(req.params.commentId, req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Blog admin password is set: ${ADMIN_PASSWORD ? 'Yes' : 'No'}`);
});
