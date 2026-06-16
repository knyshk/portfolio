import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Edit, Trash2, Share2, Clock } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import VoteButtons from '../components/VoteButtons';
import BlogComments from '../components/BlogComments';
import type { BlogRoute } from '../BlogApp';

interface PostData {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  userVote: 'up' | 'down' | null;
}

interface Comment {
  id: number;
  post_id: number;
  author_name: string;
  content: string;
  created_at: string;
}

interface BlogPostProps {
  postId: number;
  navigate: (route: BlogRoute) => void;
  adminPassword: string | null;
  apiBase: string;
}

export default function BlogPost({ postId, navigate, adminPassword, apiBase }: BlogPostProps) {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/blog/posts/${postId}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    if (!adminPassword) return;
    try {
      const res = await fetch(`${apiBase}/api/blog/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPassword },
      });
      if (res.ok) {
        navigate({ page: 'home' });
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post?.title, url });
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const renderContent = (content: string) => {
    // Configure marked for safe rendering
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    
    // Replace image paths with full URLs
    let processedContent = content.replace(
      /!\[([^\]]*)\]\(\/uploads\//g,
      `![$1](${apiBase}/uploads/`
    );
    
    // Parse [pdf](/uploads/...) into iframe
    processedContent = processedContent.replace(
      /\[pdf\]\((.*?\.pdf)\)/gi,
      `<iframe src="$1" width="100%" height="600px" class="neo-border neo-brutal-shadow my-8" title="PDF Document"></iframe>`
    );
    // Replace apiBase if relative
    processedContent = processedContent.replace(
      /src="\/uploads\//g,
      `src="${apiBase}/uploads/`
    );
    
    const rawHtml = marked(processedContent) as string;
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ADD_TAGS: ['img', 'iframe'],
      ADD_ATTR: ['src', 'alt', 'class', 'width', 'height', 'title'],
    });
    return cleanHtml;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const readingTime = (text: string) => {
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  if (loading) {
    return (
      <div className="animate-pulse max-w-3xl mx-auto">
        <div className="h-8 bg-paper-ink/10 w-3/4 mb-4" />
        <div className="h-64 bg-paper-ink/10 mb-6" />
        <div className="space-y-3">
          <div className="h-4 bg-paper-ink/10" />
          <div className="h-4 bg-paper-ink/10 w-5/6" />
          <div className="h-4 bg-paper-ink/10 w-4/6" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <div className="neo-border neo-brutal-shadow bg-paper-bg p-12 max-w-md mx-auto">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-serif font-black text-2xl uppercase mb-2">Post Not Found</h3>
          <p className="font-serif italic opacity-60 mb-6">
            This dispatch seems to have been lost in transit.
          </p>
          <button
            onClick={() => navigate({ page: 'home' })}
            className="neo-border neo-brutal-shadow bg-paper-ink text-paper-bg px-6 py-3 font-serif font-bold uppercase tracking-wider text-sm"
          >
            Back to Chronicle
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back navigation */}
      <button
        onClick={() => navigate({ page: 'home' })}
        className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider opacity-60 hover:opacity-100 hover:text-neo-pink transition-all mb-6"
      >
        <ArrowLeft size={14} /> Back to all posts
      </button>

      {/* Article Header */}
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter leading-tight mb-4"
        >
          {post.title}
        </motion.h1>

        <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] sm:text-xs uppercase tracking-wider opacity-50 mb-4">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {formatDate(post.created_at)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {readingTime(post.content)} min read
          </span>
          <span className="neo-border bg-neo-yellow/30 px-2 py-0.5 font-bold">
            By Kanishk Jain
          </span>
        </div>

        {/* Admin controls */}
        {adminPassword && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => navigate({ page: 'editor', id: post.id })}
              className="neo-border bg-neo-blue/20 hover:bg-neo-blue hover:text-paper-bg px-3 py-1.5 font-mono text-xs font-bold uppercase flex items-center gap-1 transition-colors"
            >
              <Edit size={12} /> Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="neo-border bg-neo-pink/20 hover:bg-neo-pink hover:text-paper-bg px-3 py-1.5 font-mono text-xs font-bold uppercase flex items-center gap-1 transition-colors"
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        )}

        <div className="newspaper-divider !my-0" />
      </header>

      {/* Cover Image */}
      {post.cover_image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 neo-border neo-brutal-shadow overflow-hidden"
        >
          <img
            src={`${apiBase}${post.cover_image}`}
            alt={post.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </motion.div>
      )}

      {/* Article Body */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="blog-content font-serif text-base sm:text-lg leading-relaxed mb-12"
        dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
      />

      <div className="newspaper-divider !my-0 mb-8" />

      {/* Vote & Share Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 p-4 neo-border bg-paper-ink/5">
        <VoteButtons
          postId={post.id}
          upvotes={post.upvotes}
          downvotes={post.downvotes}
          userVote={post.userVote}
          apiBase={apiBase}
        />
        <button
          onClick={handleShare}
          className="neo-border bg-paper-bg hover:bg-neo-blue hover:text-paper-bg px-4 py-2 font-mono text-xs font-bold uppercase flex items-center gap-2 transition-colors"
        >
          <Share2 size={14} /> Share
        </button>
      </div>

      {/* Comments Section */}
      <BlogComments
        postId={post.id}
        comments={post.comments}
        adminPassword={adminPassword}
        apiBase={apiBase}
        onCommentAdded={fetchPost}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-paper-ink/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="neo-border neo-brutal-shadow bg-paper-bg p-8 max-w-sm w-full"
          >
            <h3 className="font-serif font-black text-2xl uppercase mb-3">Delete Post?</h3>
            <p className="font-serif italic text-sm opacity-60 mb-6">
              This action cannot be undone. All comments and votes will also be deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 neo-border neo-brutal-shadow bg-neo-pink text-paper-bg hover:bg-neo-pink/80 py-3 font-serif font-bold uppercase tracking-wider text-sm transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="neo-border bg-paper-bg hover:bg-paper-ink/10 px-6 py-3 font-serif font-bold uppercase tracking-wider text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </article>
  );
}
