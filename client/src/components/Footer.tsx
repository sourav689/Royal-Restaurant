import { Crown, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-b from-[#0f1729] to-[#08070a] border-t border-[#d4af37]/30 py-12 shadow-inner shadow-[#d4af37]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-full flex items-center justify-center shadow-lg shadow-[#d4af37]/50">
                <Crown className="w-5 h-5 text-[#0f1729]" />
              </div>
              <span className="font-serif text-[#d4af37]">Royal Savoria</span>
            </div>
            <p className="text-[#d4af37]/60">Your Food, Our Happiness</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-[#d4af37]">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {['Home', 'Menu', 'Booking', 'About'].map((link) => (
                <button
                  key={link}
                  onClick={() => onNavigate(link)}
                  className="text-[#d4af37]/60 hover:text-[#d4af37] transition-colors text-left"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-[#d4af37]">Contact Us</h3>
            <div className="flex flex-col gap-2 text-[#d4af37]/60">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@royalsavoria.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Royal Street, Luxury District</span>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <a 
                href="#" 
                className="w-8 h-8 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full flex items-center justify-center hover:bg-[#1877f2] hover:border-[#1877f2] transition-all duration-300 group"
              >
                <Facebook className="w-4 h-4 text-[#d4af37] group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] hover:border-transparent transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 text-[#d4af37] group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full flex items-center justify-center hover:bg-[#1da1f2] hover:border-[#1da1f2] transition-all duration-300 group"
              >
                <Twitter className="w-4 h-4 text-[#d4af37] group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#d4af37]/20 text-center text-[#d4af37]/40">
          <p>© 2025 Royal Savoria Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
