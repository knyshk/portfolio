import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, ThumbsUp, Search, Lock, Eye } from 'lucide-react';
import { Magnet } from '../../components/Animations';
import type { BlogRoute } from '../BlogApp';

interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
  comment_count: number;
  upvotes: number;
  downvotes: number;
}

interface BlogHomeProps {
  navigate: (route: BlogRoute) => void;
  adminPassword: string | null;
  onAdminLogin: (password: string) => void;
  apiBase: string;
}

export default function BlogHome({ navigate, adminPassword, onAdminLogin, apiBase }: BlogHomeProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '9' });
      if (search) params.append('search', search);
      
      const res = await fetch(`${apiBase}/api/blog/posts?${params}`);
      const data = await res.json();
      setPosts(data.posts);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, search]);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${apiBase}/api/blog/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });
      if (res.ok) {
        onAdminLogin(loginPassword);
        setShowLoginModal(false);
        setLoginPassword('');
        setLoginError('');
        navigate({ page: 'editor' });
      } else {
        setLoginError('Invalid password');
      }
    } catch {
      setLoginError('Server error');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const accentColors = ['bg-neo-yellow', 'bg-neo-blue', 'bg-neo-pink', 'bg-neo-green', 'bg-neo-orange'];

  return (
    <div>
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full neo-border bg-paper-bg pl-10 pr-4 py-3 font-serif font-bold focus:bg-neo-yellow/20 outline-none transition-colors text-sm"
          />
        </div>
        {!adminPassword && (
          <Magnet strength={0.05}>
            <button
              onClick={() => setShowLoginModal(true)}
              className="neo-border neo-brutal-shadow neo-brutal-shadow-hover neo-brutal-shadow-active bg-paper-ink text-paper-bg hover:bg-neo-green hover:text-paper-ink px-6 py-3 font-serif font-bold uppercase tracking-wider text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Lock size={14} /> Admin Login
            </button>
          </Magnet>
        )}
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="neo-border bg-paper-bg p-0 animate-pulse">
              <div className="h-48 bg-paper-ink/10" />
              <div className="p-5">
                <div className="h-6 bg-paper-ink/10 mb-3 w-3/4" />
                <div className="h-4 bg-paper-ink/10 mb-2" />
                <div className="h-4 bg-paper-ink/10 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="neo-border neo-brutal-shadow bg-paper-bg p-12 max-w-md mx-auto">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="font-serif font-black text-2xl uppercase mb-2">No Posts Yet</h3>
            <p className="font-serif italic opacity-60 mb-6">
              {search ? 'No posts match your search.' : 'The chronicle awaits its first dispatch.'}
            </p>
            {adminPassword && (
              <button
                onClick={() => navigate({ page: 'editor' })}
                className="neo-border neo-brutal-shadow neo-brutal-shadow-hover bg-neo-green text-paper-bg px-6 py-3 font-serif font-bold uppercase tracking-wider text-sm transition-colors"
              >
                Write First Post
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <>
          {/* Featured Post (first post, large card) */}
          {page === 1 && posts.length > 0 && !search && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <button
                onClick={() => navigate({ page: 'post', id: posts[0].id })}
                className="w-full text-left"
              >
                <div className="neo-border neo-brutal-shadow neo-brutal-shadow-hover group overflow-hidden bg-paper-bg transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {posts[0].cover_image ? (
                      <div className="h-64 md:h-auto overflow-hidden">
                        <img
                          src={`${apiBase}${posts[0].cover_image}`}
                          alt={posts[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-64 md:h-auto bg-neo-yellow/20 flex items-center justify-center">
                        <span className="text-8xl opacity-20 font-serif font-black">K</span>
                      </div>
                    )}
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="inline-block neo-border bg-neo-pink text-paper-bg px-2 py-0.5 font-mono text-[10px] font-bold uppercase mb-3 w-fit">
                        Latest Dispatch
                      </div>
                      <h3 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter mb-3 group-hover:text-neo-pink transition-colors leading-tight">
                        {posts[0].title}
                      </h3>
                      <p className="font-serif text-sm md:text-base opacity-70 mb-4 line-clamp-3">
                        {posts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-wider opacity-50">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {formatDate(posts[0].created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={12} /> {posts[0].comment_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp size={12} /> {posts[0].upvotes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          )}

          {/* Remaining posts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(page === 1 && !search ? posts.slice(1) : posts).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => navigate({ page: 'post', id: post.id })}
                  className="w-full text-left"
                >
                  <div className="neo-border neo-brutal-shadow neo-brutal-shadow-hover group overflow-hidden bg-paper-bg transition-all h-full flex flex-col">
                    {/* Cover image or placeholder */}
                    <div className="h-48 overflow-hidden relative">
                      {post.cover_image ? (
                        <img
                          src={`${apiBase}${post.cover_image}`}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full ${accentColors[i % accentColors.length]}/20 flex items-center justify-center`}>
                          <span className="text-7xl opacity-10 font-serif font-black">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      {/* Date tag */}
                      <div className="absolute top-3 left-3 neo-border bg-paper-bg px-2 py-1 font-mono text-[10px] font-bold uppercase">
                        {formatDate(post.created_at)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-serif font-black text-lg uppercase tracking-tight mb-2 group-hover:text-neo-blue transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="font-serif text-sm opacity-60 mb-4 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider opacity-40 pt-3 border-t-2 border-paper-ink/10">
                        <span className="flex items-center gap-1">
                          <MessageCircle size={10} /> {post.comment_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp size={10} /> {post.upvotes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={10} /> Read
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="neo-border bg-paper-bg hover:bg-neo-yellow px-4 py-2 font-mono text-xs font-bold uppercase disabled:opacity-30 transition-colors"
              >
                ← Prev
              </button>
              <span className="font-mono text-xs font-bold uppercase">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="neo-border bg-paper-bg hover:bg-neo-yellow px-4 py-2 font-mono text-xs font-bold uppercase disabled:opacity-30 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {/* Admin Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-paper-ink/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="neo-border neo-brutal-shadow bg-paper-bg p-8 max-w-sm w-full relative"
          >
            <div className="absolute -top-4 -right-4 bg-neo-pink text-paper-bg px-3 py-1 neo-border font-mono text-xs font-black rotate-6">
              ADMIN
            </div>
            <h3 className="font-serif font-black text-2xl uppercase mb-4">Admin Login</h3>
            <p className="font-serif italic text-sm opacity-60 mb-4">
              Enter the admin password to create and manage posts.
            </p>
            {loginError && (
              <div className="mb-3 p-2 bg-neo-pink/20 neo-border font-mono text-xs font-bold text-neo-pink">
                {loginError}
              </div>
            )}
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Password"
              className="w-full neo-border bg-paper-bg p-3 font-serif font-bold focus:bg-neo-yellow outline-none transition-colors text-sm mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleLogin}
                className="flex-1 neo-border neo-brutal-shadow bg-paper-ink text-paper-bg hover:bg-neo-green hover:text-paper-ink py-3 font-serif font-bold uppercase tracking-wider text-sm transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => { setShowLoginModal(false); setLoginPassword(''); setLoginError(''); }}
                className="neo-border bg-paper-bg hover:bg-neo-pink/20 px-4 py-3 font-serif font-bold uppercase tracking-wider text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
