import { motion } from 'framer-motion'; // Keep as 'framer-motion'
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChefHat, Sparkles, UtensilsCrossed, Music } from 'lucide-react';
import backgroundvideo from '../video/background.mp4';

// REMOVE the TypeScript interface block
// interface HomePageProps {
//   onNavigate: (page: string) => void;
// }

// The component function is now defined without the TS type annotation
// You can use JSDoc for minimal type checking in pure JS files if needed, 
// but removing the interface is the primary fix for the syntax error.
export default function HomePage({ onNavigate }) { // Removed ': HomePageProps'

  const specializations = [
    {
      title: 'Delicious Cuisine',
      description: 'Expertly crafted dishes using the finest ingredients, bringing authentic flavors to your plate with every bite.',
      image: 'https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYxODg1MDY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: UtensilsCrossed,
      alignment: 'left'
    },
    {
      title: 'Cozy Ambience',
      description: 'Immerse yourself in a warm and inviting atmosphere designed for memorable dining experiences with loved ones.',
      image: 'https://images.unsplash.com/photo-1759301495161-31027c795358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwcmVzdGF1cmFudCUyMGFtYmlhbmNlfGVufDF8fHx8MTc2MTkyNjc0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: Sparkles,
      alignment: 'right'
    },
    {
      title: "Chef's Special",
      description: 'Discover our signature creations, prepared with passion and creativity by our award-winning culinary team.',
      image: 'https://images.unsplash.com/photo-1670819916552-67698b1c86ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMGtpdGNoZW58ZW58MXx8fHwxNzYxOTUwODAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: ChefHat,
      alignment: 'left'
    },
    {
      title: 'Personalized Experience',
      description: 'Choose your favorite music, movie, or book while dining. Enjoy a customized ambiance that makes every meal uniquely yours.',
      image: 'https://images.unsplash.com/photo-1738669469338-801b4e9dbccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtdXNpYyUyMGRpbmluZyUyMGFtYmlhbmNlfGVufDF8fHx8MTc2MjAwNTYwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: Music,
      alignment: 'right'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1510] via-[#221c14] to-[#1a1510]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background - Replace 'src' with your video URL */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1759419038843-29749ac4cd2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc2MTkyNjA3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          >
            <source src={backgroundvideo} type="video/mp4"></source>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759419038843-29749ac4cd2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc2MTkyNjA3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Restaurant Interior"
              className="w-full h-full object-cover"
            />
          </video>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510]/80 via-[#1a1510]/50 to-[#1a1510]/80" />
        </div>

        {/* Glassmorphism Container with golden tones */}
        <motion.div
          className="relative z-10 bg-[#1a1510]/40 backdrop-blur-xl border-2 border-[#d4af37]/40 rounded-3xl p-12 md:p-16 max-w-3xl mx-6 text-center shadow-2xl shadow-[#d4af37]/20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1
            className="font-serif text-[#d4af37] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Royal Savoria Restaurant
          </motion.h1>
          <motion.p
            className="text-[#f0c674] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Your Food, Our Happiness
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Button
              onClick={() => onNavigate('Booking')}
              className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#f0c674] hover:to-[#d4af37] text-[#1a1510] px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#d4af37]/50"
            >
              Reserve Your Table
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Specialization Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#1a1510] via-[#221c14] to-[#1a1510]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-serif text-[#d4af37] text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What Makes Us Special
          </motion.h2>

          <div className="space-y-24">
            {specializations.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={index}
                  className={`flex flex-col ${
                    spec.alignment === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
                  } gap-8 items-center`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Image */}
                  <div className="w-full md:w-1/2 relative group">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#d4af37]/20 border-2 border-[#d4af37]/30">
                      <ImageWithFallback
                        src={spec.image}
                        alt={spec.title}
                        className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Dark overlay on hover for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1510]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Content with warm golden tones */}
                  <div className="w-full md:w-1/2">
                    <div className="bg-gradient-to-br from-[#1a1510]/80 to-[#0f1729]/80 backdrop-blur-sm border-2 border-[#d4af37]/40 rounded-3xl p-8 shadow-2xl shadow-[#d4af37]/20">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[#d4af37]/50">
                        <Icon className="w-7 h-7 text-[#1a1510]" />
                      </div>
                      <h3 className="font-serif text-[#d4af37] mb-4">{spec.title}</h3>
                      <p className="text-[#d4af37]/70 leading-relaxed">
                        {spec.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}