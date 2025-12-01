'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'remixicon/fonts/remixicon.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!leftRef.current || !formRef.current || !sectionRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(leftRef.current,
          { x: -50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'transform,opacity'
          }
        );

        const cards = document.querySelectorAll('.contact-card');
        if (cards.length > 0) {
          gsap.fromTo(cards,
            { y: 30, opacity: 0 },
            {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              },
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
              delay: 0.3,
              clearProps: 'transform,opacity'
            }
          );
        }

        gsap.fromTo(formRef.current,
          { x: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2,
            clearProps: 'transform,opacity'
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Setup EmailJS
      // Uncomment and configure when EmailJS is ready
      /*
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY'
      );
      */
      
      // Temporary simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="min-h-screen flex items-center justify-center px-6 md:px-12 py-24 border-t border-white/10">
      <div className="max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Contact Info */}
          <div ref={leftRef} className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-12">
              Mari Berkolaborasi
            </h2>
            
            <p className="text-lg text-gray-400 leading-relaxed mb-12">
              Saya siap membantu mewujudkan ide digital Anda menjadi kenyataan.
              <br />
              Mari kita ciptakan sesuatu yang luar biasa bersama-sama!
            </p>

            <div className="space-y-4">
              {/* Email Card */}
              <a 
                href="mailto:hi.gregoriusjoel@gmail.com"
                className="contact-card flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">Email</h4>
                  <p className="text-gray-400">hi.gregoriusjoel@gmail.com</p>
                </div>
                <i className="ri-arrow-right-line text-xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </a>

              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/6282282262157"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-whatsapp-line text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">WhatsApp</h4>
                  <p className="text-gray-400">+62 822-8226-2157</p>
                </div>
                <i className="ri-arrow-right-line text-xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </a>

              {/* LinkedIn Card */}
              <a 
                href="https://linkedin.com/in/gregorius-joel"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-linkedin-box-line text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">LinkedIn</h4>
                  <p className="text-gray-400">linkedin.com/in/gregorius-joel</p>
                </div>
                <i className="ri-arrow-right-line text-xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </a>

              {/* GitHub Card */}
              <a 
                href="https://github.com/gregoriusjoel"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-github-line text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">GitHub</h4>
                  <p className="text-gray-400">github.com/gregoriusjoel</p>
                </div>
                <i className="ri-arrow-right-line text-xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <i className="ri-mail-send-line text-2xl"></i>
              <h3 className="text-2xl font-bold">Kirim Pesan</h3>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Masukkan nama Anda"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="nama@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-2">Subjek</label>
                <div className="relative">
                  <i className="ri-chat-3-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Apa yang ingin Anda diskusikan?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Pesan</label>
                <div className="relative">
                  <i className="ri-message-3-line absolute left-4 top-4 text-gray-400"></i>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Ceritakan lebih detail tentang project atau ide Anda..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-500 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line"></i>
                    Kirim Pesan
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-xl flex items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i>
                  Pesan berhasil dikirim! Saya akan segera menghubungi Anda.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2">
                  <i className="ri-error-warning-line"></i>
                  Terjadi kesalahan. Silakan coba lagi atau hubungi via WhatsApp.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
