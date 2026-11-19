'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaTimes } from 'react-icons/fa';

export default function EmailCapture() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Skip if the visitor already subscribed or dismissed the card
    const hasProvidedEmail = localStorage.getItem('userEmail');
    const hasDismissed = localStorage.getItem('emailPopupDismissed');
    if (hasProvidedEmail || hasDismissed) return;

    // Show a non-blocking card once the visitor is engaged:
    // 30s on the page AND scrolled past the first screen.
    let timeUp = false;
    let scrolledEnough = false;
    const maybeShow = () => timeUp && scrolledEnough && setIsVisible(true);

    const timer = setTimeout(() => {
      timeUp = true;
      maybeShow();
    }, 30000);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight) {
        scrolledEnough = true;
        maybeShow();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleDismiss();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/capture-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you! I\'ll keep you updated.');
        localStorage.setItem('userEmail', email);

        setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  function handleDismiss() {
    setIsVisible(false);
    localStorage.setItem('emailPopupDismissed', 'true');
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          role="dialog"
          aria-labelledby="email-capture-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed bottom-4 left-4 right-4 z-50 sm:left-6 sm:right-auto sm:bottom-6 sm:w-96"
        >
          <div className="relative rounded-2xl border border-gold-500/30 bg-ink-900/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-md">
            <button
              onClick={handleDismiss}
              aria-label="Dismiss"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-800 hover:text-white cursor-pointer"
            >
              <FaTimes size={14} />
            </button>

            <div className="mb-4 flex items-start gap-3 pr-8">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950">
                <FaEnvelope />
              </span>
              <div>
                <h3 id="email-capture-title" className="font-sans text-base font-semibold text-white">
                  Enjoying the work?
                </h3>
                <p className="mt-0.5 text-sm text-ink-400">
                  Get a short note when I ship something new.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <label htmlFor="capture-email" className="sr-only">Email address</label>
              <input
                id="capture-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={status === 'loading' || status === 'success'}
                className="min-w-0 flex-1 rounded-lg border border-ink-600 bg-ink-950/70 px-3 py-2.5 text-sm text-white placeholder-ink-500 focus:border-gold-400 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="rounded-lg bg-gradient-to-r from-gold-300 to-gold-500 px-4 py-2.5 text-sm font-semibold text-ink-950 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {status === 'loading' ? '…' : status === 'success' ? '✓' : 'Subscribe'}
              </button>
            </form>

            {message && (
              <p
                role="status"
                className={`mt-3 text-sm ${status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}
              >
                {message}
              </p>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
