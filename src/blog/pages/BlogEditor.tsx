import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Image, Eye, EyeOff, Upload, Save, ArrowLeft } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import type { BlogRoute } from '../BlogApp';

interface BlogEditorProps {
  postId?: number;
  navigate: (route: BlogRoute) => void;
  adminPassword: string | null;
  onAdminLogin: (password: string) => void;
  apiBase: string;
}

export default function BlogEditor({ postId, navigate, adminPassword, onAdminLogin, apiBase }: BlogEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [existingCover, setExistingCover] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [needsAuth, setNeedsAuth] = useState(!adminPassword);
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inlineFileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch existing post if editing
  useEffect(() => {
    if (postId && adminPassword) {
      fetch(`${apiBase}/api/blog/posts/${postId}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setContent(data.content);
          setExcerpt(data.excerpt || '');
          if (data.cover_image) {
            setExistingCover(data.cover_image);
            setCoverPreview(`${apiBase}${data.cover_image}`);
          }
        })
        .catch(err => console.error('Failed to fetch post:', err));
    }
  }, [postId, adminPassword]);

  const handleAuth = async () => {
    try {
      const res = await fetch(`${apiBase}/api/blog/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: authPassword }),
      });
      if (res.ok) {
        onAdminLogin(authPassword);
        setNeedsAuth(false);
        setAuthError('');
      } else {
        setAuthError('Invalid password');
      }
    } catch {
      setAuthError('Server error');
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCoverPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInlineFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !adminPassword) return;

    const formData = new FormData();
    formData.append('image', file); // keeping field name 'image' because multer uses upload.single('image')

    try {
      const res = await fetch(`${apiBase}/api/blog/upload`, {
        method: 'POST',
        headers: { 'x-admin-password': adminPassword },
        body: formData,
      });
      const data = await res.json();
      
      const isPdf = file.name.toLowerCase().endsWith('.pdf');
      const markdownToInsert = isPdf 
        ? `\n[pdf](${data.url})\n` 
        : `\n![${file.name}](${data.url})\n`;

      // Insert at cursor position
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = content.substring(0, start) + markdownToInsert + content.substring(end);
        setContent(newContent);
      } else {
        setContent(prev => prev + markdownToInsert);
      }
    } catch (err) {
      console.error('Failed to upload file:', err);
      setError('Failed to upload file');
    }
    
    // Reset file input
    if (inlineFileRef.current) {
      inlineFileRef.current.value = '';
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    if (!adminPassword) {
      setNeedsAuth(true);
      return;
    }

    setSaving(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('excerpt', excerpt || content.replace(/[#*_\[\]()!`]/g, '').substring(0, 200));
      if (coverImage) {
        formData.append('cover_image', coverImage);
      }

      const url = postId
        ? `${apiBase}/api/blog/posts/${postId}`
        : `${apiBase}/api/blog/posts`;

      const res = await fetch(url, {
        method: postId ? 'PUT' : 'POST',
        headers: { 'x-admin-password': adminPassword },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        navigate({ page: 'post', id: data.id });
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to save post');
      }
    } catch (err) {
      console.error('Failed to save post:', err);
      setError('Failed to save post. Is the server running?');
    } finally {
      setSaving(false);
    }
  };

  const renderPreview = () => {
    marked.setOptions({ breaks: true, gfm: true });
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
    return DOMPurify.sanitize(rawHtml, {
      ADD_TAGS: ['img', 'iframe'],
      ADD_ATTR: ['src', 'alt', 'class', 'width', 'height', 'title'],
    });
  };

  // Auth gate
  if (needsAuth) {
    return (
      <div className="max-w-md mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-border neo-brutal-shadow bg-paper-bg p-8 relative"
        >
          <div className="absolute -top-4 -right-4 bg-neo-orange text-paper-bg px-3 py-1 neo-border font-mono text-xs font-black rotate-6">
            AUTH
          </div>
          <h2 className="font-serif font-black text-3xl uppercase mb-2">Admin Access</h2>
          <p className="font-serif italic text-sm opacity-60 mb-6">
            Enter the admin password to {postId ? 'edit this' : 'create a new'} post.
          </p>
          {authError && (
            <div className="mb-3 p-2 bg-neo-pink/20 neo-border font-mono text-xs font-bold text-neo-pink">
              {authError}
            </div>
          )}
          <input
            type="password"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
            placeholder="Admin password"
            className="w-full neo-border bg-paper-bg p-3 font-serif font-bold focus:bg-neo-yellow outline-none transition-colors text-sm mb-4"
            autoFocus
          />
          <div className="flex gap-3">
            <button
              onClick={handleAuth}
              className="flex-1 neo-border neo-brutal-shadow bg-paper-ink text-paper-bg hover:bg-neo-green hover:text-paper-ink py-3 font-serif font-bold uppercase tracking-wider text-sm transition-colors"
            >
              Authenticate
            </button>
            <button
              onClick={() => navigate({ page: 'home' })}
              className="neo-border bg-paper-bg hover:bg-neo-pink/20 px-4 py-3 font-serif font-bold uppercase text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate({ page: 'home' })}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider opacity-60 hover:opacity-100 hover:text-neo-pink transition-all"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <h2 className="font-serif font-black text-xl sm:text-2xl uppercase">
          {postId ? 'Edit Post' : 'New Dispatch'}
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-neo-pink/20 neo-border font-mono text-xs font-bold text-neo-pink">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-mono text-[10px] md:text-xs font-black uppercase mb-1">
            Headline
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your post title..."
            className="w-full neo-border bg-paper-bg p-4 font-serif font-black text-2xl focus:bg-neo-yellow/20 outline-none transition-colors"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block font-mono text-[10px] md:text-xs font-black uppercase mb-1">
            Brief (optional — auto-generated if empty)
          </label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A brief summary of your post..."
            className="w-full neo-border bg-paper-bg p-3 font-serif font-bold text-sm focus:bg-neo-blue/10 outline-none transition-colors"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block font-mono text-[10px] md:text-xs font-black uppercase mb-1">
            Cover Image
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="neo-border bg-paper-bg hover:bg-neo-yellow/20 px-4 py-3 font-mono text-xs font-bold uppercase flex items-center gap-2 transition-colors"
            >
              <Upload size={14} /> {coverPreview ? 'Change Image' : 'Upload Cover'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />
            {coverPreview && (
              <div className="neo-border overflow-hidden w-32 h-20 flex-shrink-0">
                <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block font-mono text-[10px] md:text-xs font-black uppercase">
              Content (Markdown supported)
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => inlineFileRef.current?.click()}
                className="neo-border bg-paper-bg hover:bg-neo-green/20 px-2 py-1 font-mono text-[10px] font-bold uppercase flex items-center gap-1 transition-colors"
                title="Insert Media"
              >
                <Upload size={12} /> Media
              </button>
              <input
                ref={inlineFileRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleInlineFile}
                className="hidden"
              />
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`neo-border px-2 py-1 font-mono text-[10px] font-bold uppercase flex items-center gap-1 transition-colors ${
                  showPreview ? 'bg-neo-blue text-paper-bg' : 'bg-paper-bg hover:bg-neo-blue/20'
                }`}
              >
                {showPreview ? <EyeOff size={12} /> : <Eye size={12} />}
                {showPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>

          {showPreview ? (
            <div className="neo-border bg-paper-bg p-6 min-h-[400px] blog-content font-serif text-base leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: renderPreview() }} />
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts in markdown...&#10;&#10;# Heading&#10;## Subheading&#10;**bold** *italic*&#10;- list item&#10;![image](url)"
              className="w-full neo-border bg-paper-bg p-4 font-mono text-sm focus:bg-paper-bg outline-none transition-colors min-h-[400px] resize-y leading-relaxed"
              style={{ tabSize: 2 }}
            />
          )}
        </div>

        {/* Formatting Help */}
        <details className="neo-border bg-paper-ink/5 p-4">
          <summary className="font-mono text-[10px] font-black uppercase cursor-pointer hover:text-neo-blue transition-colors">
            Markdown Formatting Guide
          </summary>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
            <div><code className="bg-paper-ink/10 px-1"># Heading 1</code></div>
            <div><code className="bg-paper-ink/10 px-1">## Heading 2</code></div>
            <div><code className="bg-paper-ink/10 px-1">**bold text**</code></div>
            <div><code className="bg-paper-ink/10 px-1">*italic text*</code></div>
            <div><code className="bg-paper-ink/10 px-1">- list item</code></div>
            <div><code className="bg-paper-ink/10 px-1">1. numbered item</code></div>
            <div><code className="bg-paper-ink/10 px-1">[link text](url)</code></div>
            <div><code className="bg-paper-ink/10 px-1">![alt](image-url)</code></div>
            <div><code className="bg-paper-ink/10 px-1">{`\`code\``}</code></div>
            <div><code className="bg-paper-ink/10 px-1">&gt; blockquote</code></div>
          </div>
        </details>

        {/* Save Button */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSave}
            disabled={saving || !title.trim() || !content.trim()}
            className="flex-1 neo-border neo-brutal-shadow neo-brutal-shadow-hover neo-brutal-shadow-active bg-paper-ink text-paper-bg hover:bg-neo-green hover:text-paper-ink py-4 font-serif font-bold uppercase tracking-widest text-sm disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
          >
            <Save size={16} />
            {saving ? 'Publishing...' : postId ? 'Update Post' : 'Publish Dispatch'}
          </button>
          <button
            onClick={() => navigate({ page: 'home' })}
            className="neo-border bg-paper-bg hover:bg-neo-pink/20 px-6 py-4 font-serif font-bold uppercase text-sm transition-colors"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}
