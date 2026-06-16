import { useState } from 'react';
import { MessageCircle, Trash2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: number;
  post_id: number;
  author_name: string;
  content: string;
  created_at: string;
}

interface BlogCommentsProps {
  postId: number;
  comments: Comment[];
  adminPassword: string | null;
  apiBase: string;
  onCommentAdded: () => void;
}

export default function BlogComments({ postId, comments, adminPassword, apiBase, onCommentAdded }: BlogCommentsProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setError('Name and comment are required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${apiBase}/api/blog/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorName: name, content }),
      });

      if (res.ok) {
        setName('');
        setContent('');
        onCommentAdded();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to add comment');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!adminPassword) return;
    if (!confirm('Delete this comment?')) return;

    try {
      const res = await fetch(`${apiBase}/api/blog/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPassword },
      });

      if (res.ok) {
        onCommentAdded();
      }
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-8 border-b-[3px] border-paper-ink pb-4">
        <MessageCircle size={24} />
        <h3 className="font-serif font-black text-2xl uppercase tracking-tight">
          Public Discourse ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <div className="neo-border neo-brutal-shadow bg-paper-bg p-6 mb-10 relative">
        <div className="absolute -top-3 -right-3 bg-neo-yellow text-paper-ink px-2 py-1 neo-border font-mono text-[10px] font-black rotate-3">
          LEAVE A REPLY
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-neo-pink/20 neo-border font-mono text-xs font-bold text-neo-pink">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] md:text-xs font-black uppercase mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              maxLength={50}
              className="w-full sm:w-1/2 neo-border bg-paper-bg p-3 font-serif font-bold focus:bg-neo-blue/10 outline-none transition-colors text-sm"
              required
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] md:text-xs font-black uppercase mb-1">Comment</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Your thoughts..."
              maxLength={2000}
              className="w-full neo-border bg-paper-bg p-3 font-serif focus:bg-neo-yellow/10 outline-none transition-colors text-sm min-h-[100px] resize-y"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !content.trim()}
            className="neo-border neo-brutal-shadow neo-brutal-shadow-hover neo-brutal-shadow-active bg-paper-ink text-paper-bg hover:bg-neo-green hover:text-paper-ink px-6 py-3 font-serif font-bold uppercase tracking-wider text-sm disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Post Comment'}
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="neo-border bg-paper-bg p-5"
            >
              <div className="flex justify-between items-start mb-3 border-b-2 border-paper-ink/10 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neo-yellow/30 flex items-center justify-center neo-border overflow-hidden">
                    <User size={16} className="opacity-50" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm leading-tight">{comment.author_name}</h4>
                    <span className="font-mono text-[10px] opacity-50 uppercase tracking-wider">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                </div>
                {adminPassword && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-neo-pink hover:bg-neo-pink/20 p-1 neo-border transition-colors"
                    title="Delete Comment"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
              <p className="font-serif text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
            </motion.div>
          ))}
          {comments.length === 0 && (
            <p className="font-serif italic opacity-50 text-center py-8">
              No comments yet. Be the first to share your thoughts.
            </p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
