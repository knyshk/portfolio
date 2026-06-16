import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Newspaper } from 'lucide-react';
import BlogHome from './pages/BlogHome';
import BlogPost from './pages/BlogPost';
import BlogEditor from './pages/BlogEditor';
import { FloatingShapes } from '../components/Animations';

export type BlogRoute = 
  | { page: 'home' }
  | { page: 'post'; id: number }
  | { page: 'editor'; id?: number };

const API_BASE = 'http://localhost:5000';

export default function BlogApp({ onNavigateHome }: { onNavigateHome: () => void }) {
  const [route, setRoute] = useState<BlogRoute>({ page: 'home' });
  const [adminPassword, setAdminPassword] = useState<string | null>(
    () => sessionStorage.getItem('blogAdminPassword')
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + L or Cmd + Shift + L
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setShowLoginModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLoginSubmit = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/blog/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });
      if (res.ok) {
        handleAdminLogin(loginPassword);
        setShowLoginModal(false);
        setLoginPassword('');
        setLoginError('');
      } else {
        setLoginError('Invalid password');
      }
    } catch {
      setLoginError('Server error');
    }
  };

  const navigate = useCallback((newRoute: BlogRoute) => {
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAdminLogin = useCallback((password: string) => {
    setAdminPassword(password);
    sessionStorage.setItem('blogAdminPassword', password);
  }, []);

  const handleAdminLogout = useCallback(() => {
    setAdminPassword(null);
    sessionStorage.removeItem('blogAdminPassword');
  }, []);

  return (
    <div className="min-h-screen">
      <FloatingShapes />
      
      {/* Blog Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-paper-bg/95 backdrop-blur-sm border-b-[3px] border-paper-ink"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="neo-border neo-brutal-shadow neo-brutal-shadow-hover neo-brutal-shadow-active bg-paper-ink text-paper-bg p-2 flex items-center gap-2 font-serif font-bold text-sm transition-colors hover:bg-neo-pink hover:text-paper-ink"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Portfolio</span>
            </button>
            <div className="flex items-center gap-2">
              <Newspaper size={20} className="text-neo-pink" />
              <h1 className="font-serif font-black text-xl sm:text-2xl uppercase tracking-tighter">
                The <span className="text-neo-pink">Kanishk</span> Chronicle
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {route.page !== 'home' && (
              <button
                onClick={() => navigate({ page: 'home' })}
                className="neo-border bg-paper-bg hover:bg-neo-yellow px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors"
              >
                All Posts
              </button>
            )}
            {adminPassword && (
              <>
                <button
                  onClick={() => navigate({ page: 'editor' })}
                  className="neo-border neo-brutal-shadow bg-neo-green text-paper-bg hover:bg-neo-blue px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors"
                >
                  + New Post
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="neo-border bg-neo-pink/20 hover:bg-neo-pink hover:text-paper-bg px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Blog Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Blog Masthead */}
        {route.page === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="newspaper-divider !my-0 mb-4" />
            <h2 className="font-serif font-black text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85]">
              The <span className="outline-text">Chronicle</span>
            </h2>
            <p className="font-serif italic text-base sm:text-lg mt-3 opacity-70">
              Thoughts, experiments & dispatches from the frontier of AI & technology
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 font-mono text-[10px] uppercase tracking-widest opacity-50">
              <span>Personal Blog</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              <span>•</span>
              <span>By Kanishk Jain</span>
            </div>
            <div className="newspaper-divider !my-0 mt-4" />
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {route.page === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BlogHome
                navigate={navigate}
                adminPassword={adminPassword}
                onAdminLogin={handleAdminLogin}
                apiBase={API_BASE}
              />
            </motion.div>
          )}

          {route.page === 'post' && (
            <motion.div
              key={`post-${route.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BlogPost
                postId={route.id}
                navigate={navigate}
                adminPassword={adminPassword}
                apiBase={API_BASE}
              />
            </motion.div>
          )}

          {route.page === 'editor' && (
            <motion.div
              key={`editor-${route.id || 'new'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BlogEditor
                postId={route.id}
                navigate={navigate}
                adminPassword={adminPassword}
                onAdminLogin={handleAdminLogin}
                apiBase={API_BASE}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Blog Footer */}
      <footer className="border-t-[3px] border-paper-ink mt-16 py-8 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <p className="font-serif italic text-sm opacity-60">
            © {new Date().getFullYear()} Kanishk Jain — The Kanishk Chronicle
          </p>
          <button
            onClick={onNavigateHome}
            className="font-mono text-xs uppercase tracking-widest mt-2 hover:text-neo-pink transition-colors"
          >
            ← Back to Portfolio
          </button>
        </div>
      </footer>

      {/* Admin Login Modal (Hidden Keyboard Trigger) */}
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
              onKeyDown={(e) => e.key === 'Enter' && handleLoginSubmit()}
              placeholder="Password"
              className="w-full neo-border bg-paper-bg p-3 font-serif font-bold focus:bg-neo-yellow outline-none transition-colors text-sm mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleLoginSubmit}
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
