import { useState } from 'react';
import { Mail, MapPin, Phone, Newspaper } from 'lucide-react';
import { BentoItem, Magnet, Reveal } from '../components/Animations';

export default function ContactSection() {
  const [formData, setFormData] = useState({ senderName: '', senderEmail: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ senderName: '', senderEmail: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BentoItem id="contact" animationType="slideUp" className="sm:col-span-2 md:col-span-4 lg:col-span-6 bg-paper-ink text-paper-bg p-6 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 vintage-halftone opacity-10 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <Reveal>
            <h2 className="font-serif font-black text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter mb-6">
              Contact <span className="text-neo-yellow underline decoration-4 underline-offset-8 italic">Me</span>
            </h2>
          </Reveal>
          <p className="font-serif italic text-lg md:text-xl opacity-90 mb-8 max-w-md font-bold">
            Open to internship opportunities and research collaborations in AI/ML.
          </p>
          <div className="space-y-4 md:space-y-6 flex flex-col items-start overflow-visible">
            <Magnet strength={0.1}>
              <a href="mailto:kanishk.jain0510@gmail.com" className="flex items-center gap-4 group py-1">
                <div className="w-12 h-12 flex items-center justify-center bg-neo-yellow text-paper-ink group-hover:scale-110 transition-transform shrink-0">
                  <Mail size={24} />
                </div>
                <span className="font-serif font-bold text-base md:text-lg lg:text-xl hover:text-neo-yellow transition-colors break-all leading-tight">kanishk.jain0510@gmail.com</span>
              </a>
            </Magnet>

            <Magnet strength={0.1}>
              <a href="tel:+917877807017" className="flex items-center gap-4 group py-1">
              <div className="flex items-center gap-4 group cursor-pointer py-1">
                <div className="w-12 h-12 flex items-center justify-center bg-neo-blue text-paper-bg group-hover:scale-110 transition-transform shrink-0">
                  <Phone size={24} />
                </div>
                <span className="font-serif font-bold text-base md:text-lg lg:text-xl hover:text-neo-blue transition-colors leading-tight">+91 7877807017</span>
              </div>
              </a>
            </Magnet>

            <Magnet strength={0.1}>
              <a href="https://maps.app.goo.gl/jLHidk2YFnwuBJqU8" className="flex items-center gap-4 group py-1">
              <div className="flex items-center gap-4 group cursor-pointer py-1">
                <div className="w-12 h-12 flex items-center justify-center bg-neo-pink text-paper-bg group-hover:scale-110 transition-transform shrink-0">
                  <MapPin size={24} />
                </div>
                <span className="font-serif font-bold text-base md:text-lg lg:text-xl hover:text-neo-pink transition-colors leading-tight">Jaipur, Rajasthan</span>
              </div>
              </a>
            </Magnet>
            <Magnet strength={0.1}>
              <a href="#blog" className="flex items-center gap-4 group py-1">
              <div className="flex items-center gap-4 group cursor-pointer py-1">
                <div className="w-12 h-12 flex items-center justify-center bg-neo-green text-paper-bg group-hover:scale-110 transition-transform shrink-0">
                  <Newspaper size={24} />
                </div>
                <span className="font-serif font-bold text-base md:text-lg lg:text-xl hover:text-neo-green transition-colors leading-tight">Read My Blog</span>
              </div>
              </a>
            </Magnet>
          </div>
        </div>

        <div className="bg-paper-bg text-paper-ink p-6 md:p-8 neo-border neo-brutal-shadow relative z-10">
          <div className="absolute -top-4 -right-4 bg-neo-orange text-paper-bg px-3 py-1 neo-border font-mono text-xs font-black rotate-12">URGENT</div>
          {submitStatus === 'success' && (
            <div className="mb-4 p-3 bg-neo-green text-paper-bg neo-border font-serif font-bold text-sm">
              Message sent successfully!
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-neo-pink text-paper-bg neo-border font-serif font-bold text-sm">
              ✗ Error sending message. Please try again.
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-mono text-[10px] md:text-xs font-black uppercase mb-1">Sender Name</label>
              <input
                type="text"
                name="senderName"
                value={formData.senderName}
                onChange={handleInputChange}
                required
                className="w-full neo-border bg-paper-bg p-3 font-serif font-bold focus:bg-neo-yellow outline-none transition-colors text-sm md:text-base"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] md:text-xs font-black uppercase mb-1">Return Address (Email)</label>
              <input
                type="email"
                name="senderEmail"
                value={formData.senderEmail}
                onChange={handleInputChange}
                required
                className="w-full neo-border bg-paper-bg p-3 font-serif font-bold focus:bg-neo-blue focus:text-paper-bg outline-none transition-colors text-sm md:text-base"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] md:text-xs font-black uppercase mb-1">Message Body</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full neo-border bg-paper-bg p-3 font-serif font-bold focus:bg-neo-pink outline-none transition-colors h-32 text-sm md:text-base"
                placeholder="I'd love to talk about..."
              />
            </div>
            <Magnet strength={0.05} className="w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full neo-border neo-brutal-shadow neo-brutal-shadow-hover neo-brutal-shadow-active bg-paper-ink text-paper-bg hover:bg-neo-pink hover:text-paper-ink py-4 font-serif font-bold uppercase tracking-widest text-sm md:text-base disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Sending...' : 'Dispatch Message'}
              </button>
            </Magnet>
          </form>
        </div>
      </div>
    </BentoItem>
  );
}
