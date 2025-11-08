import { motion } from 'motion/react';
import { Crown } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItems = ['Home', 'Menu', 'Booking', 'About' , 'Gallery' , 'Admin'];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-[#0f1729]/95 backdrop-blur-md border-b border-[#d4af37]/30 shadow-lg shadow-[#d4af37]/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('Home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-full flex items-center justify-center shadow-lg shadow-[#d4af37]/50">
            <Crown className="w-5 h-5 text-[#0f1729]" />
          </div>
          <span className="font-serif text-[#d4af37]">Royal Savoria</span>
        </motion.div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => onNavigate(item)}
              className={`relative px-4 py-2 transition-colors ${
                currentPage === item
                  ? 'text-[#d4af37]'
                  : 'text-[#d4af37]/70 hover:text-[#d4af37]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
              {currentPage === item && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
                  layoutId="underline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
