import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Drumstick, 
  Flame, 
  Truck, 
  CircleDollarSign, 
  Menu, 
  X, 
  Star, 
  Facebook, 
  Instagram, 
  MapPin, 
  Clock, 
  ChevronRight,
  Phone
} from 'lucide-react';

// --- Components ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl font-display"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto text-lg text-gray-400"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const MenuCard = ({ 
  name, 
  description, 
  price, 
  tag, 
  gradient 
}: { 
  name: string; 
  description: string; 
  price: string; 
  tag?: string;
  gradient: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="relative overflow-hidden transition-all bg-zinc-900 border border-zinc-800 rounded-3xl group"
  >
    <div className={`aspect-[4/3] w-full ${gradient} relative flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-500`}>
      <Drumstick className="w-16 h-16 text-white/20 group-hover:text-white/40 transition-colors" />
      {tag && (
        <span className="absolute px-3 py-1 text-xs font-bold text-black uppercase rounded-full top-4 left-4 bg-brand-gold">
          {tag}
        </span>
      )}
    </div>
    <div className="p-6">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-bold text-white font-display">{name}</h3>
        <span className="font-bold text-brand-gold">{price}</span>
      </div>
      <p className="mb-6 text-sm text-gray-400">{description}</p>
      <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-bold transition-all rounded-xl bg-zinc-800 text-white hover:bg-brand-red">
        Order Now
        <ChevronRight size={16} />
      </button>
    </div>
  </motion.div>
);

const TestimonialCard = ({ name, review, rating }: { name: string; review: string; rating: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="p-8 border bg-zinc-900/50 border-zinc-800 rounded-3xl"
  >
    <div className="flex mb-4 text-brand-gold">
      {[...Array(rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="mb-6 italic text-gray-300">"{review}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center font-bold text-white">
        {name.charAt(0)}
      </div>
      <div className="text-sm">
        <span className="block font-bold text-white">{name}</span>
        <span className="text-xs text-gray-500">Verified Craver</span>
      </div>
    </div>
  </motion.div>
);

// --- Sections ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why Zander\'s', href: '#why' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <div className="min-h-screen font-sans bg-brand-dark text-white selection:bg-brand-red selection:text-white">
      
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-brand-dark/90 backdrop-blur-md py-4 shadow-2xl border-b border-white/10' : 'bg-transparent py-6'
        }`}
      >
        <div className="container px-6 mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Drumstick className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase font-display italic">
              Zander's<span className="text-brand-gold">Fried</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold uppercase tracking-wider hover:text-brand-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="px-6 py-2 text-sm font-black uppercase transition-all rounded-full bg-brand-red hover:bg-brand-gold hover:text-black hover:scale-105 active:scale-95 shadow-lg shadow-brand-red/20">
              Order Online
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-brand-dark flex flex-col items-center justify-center gap-8 md:hidden px-6"
          >
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black uppercase italic font-display"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full py-4 text-xl font-black uppercase rounded-2xl bg-brand-red mt-4 shadow-xl">
              Order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-red/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10 px-6 mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 mb-6 text-sm font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 border border-brand-gold/20 rounded-full">
              📍 Davao's Pride
            </span>
            <h1 className="mb-6 text-6xl md:text-8xl font-black uppercase italic leading-[0.9] font-display">
              Cravings. <br />
              <span className="text-brand-red">Answered.</span>
            </h1>
            <p className="mb-10 text-xl text-gray-400 max-w-lg leading-relaxed">
              Davao's most satisfying fried chicken. Crispy as a secret, juicy as a rumor. Order now or regret later.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 text-lg font-black uppercase transition-all rounded-2xl bg-brand-red text-white hover:bg-brand-gold hover:text-black flex items-center justify-center gap-3 shadow-2xl shadow-brand-red/30">
                Order on GrabFood
                <Drumstick size={20} />
              </button>
              <button className="px-8 py-4 text-lg font-black uppercase transition-all rounded-2xl border-2 border-white/20 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center">
                See Our Menu
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            {/* Visual Placeholder for Chicken */}
            <div className="relative aspect-square w-full max-w-lg mx-auto rounded-full bg-gradient-to-tr from-brand-red to-brand-gold p-1 shadow-[0_0_100px_rgba(139,0,0,0.4)] group overflow-hidden">
               <div className="absolute inset-0 bg-brand-dark rounded-full overflow-hidden flex items-center justify-center">
                 <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red/40 via-brand-red/10 to-transparent flex items-center justify-center">
                    <Drumstick className="w-48 h-48 text-brand-gold opacity-80 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
                 </div>
               </div>
               
               {/* Floating elements */}
               <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 p-4 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl"
               >
                 <div className="flex gap-1 text-brand-gold mb-1">
                   {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                 </div>
                 <span className="text-xs font-bold uppercase text-white">5-Star Crunch!</span>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Zander's */}
      <section id="why" className="py-24 bg-zinc-950">
        <div className="container px-6 mx-auto">
          <SectionTitle subtitle="Why everyone in Davao is obsessed with Zander's. No shortcuts, just pure satisfying crunch.">
            The Magic Behind The Crunch
          </SectionTitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Drumstick, title: "Crispier than your ex's attitude", desc: "Our double-breaded technique ensures maximum satisfying crunch in every single bite." },
              { icon: Flame, title: "Flavor-loaded every time", desc: "Marinated for 24 hours in a secret blend of local spices. Deeply tasty to the bone." },
              { icon: Truck, title: "Fast delivery, no drama", desc: "We coordinate with Grab and Foodpanda to get your fried cravings home while they're hot." },
              { icon: CircleDollarSign, title: "Sulit na, masarap pa", desc: "Honest portions for honest prices. Because great chicken shouldn't cost a fortune." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-brand-red/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red mb-6">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section id="menu" className="py-24">
        <div className="container px-6 mx-auto">
          <SectionTitle subtitle="Our greatest hits. Made fresh, served hot, loved by all.">
            What We're Famous For
          </SectionTitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MenuCard 
              name="Signature Fried Chicken" 
              description="The OG. Crispy outside, juicy inside. Available in whole, half, or quarter."
              price="₱89–₱349"
              tag="Best Seller"
              gradient="bg-gradient-to-br from-orange-600 to-red-800"
            />
            <MenuCard 
              name="Spicy Overload Chicken" 
              description="For those who like it dangerous. Coated in our signature chili hot-oil blend."
              price="₱95"
              tag="Spicy"
              gradient="bg-gradient-to-br from-red-700 to-black"
            />
            <MenuCard 
              name="Chicken Rice Meal" 
              description="Everyday comfort, every peso worth it. Served with unlimited gravy."
              price="₱99"
              gradient="bg-gradient-to-br from-brand-gold to-orange-800"
            />
            <MenuCard 
              name="Crispy Chicken Sandwich" 
              description="Stackin' flavor between every bite. Brioche bun, spicy mayo, and the crunchiest fillet."
              price="₱145"
              gradient="bg-gradient-to-br from-amber-600 to-orange-700"
            />
            <MenuCard 
              name="Family Feast Bundle" 
              description="Feed the whole squad. 8pcs chicken, 4 bowls of rice, 4 drinks, and large fries."
              price="₱649"
              tag="Sulit Deal"
              gradient="bg-gradient-to-br from-brand-red to-brand-dark"
            />
            <MenuCard 
              name="Fries + Drinks Add-ons" 
              description="Complete the craving with our seasoned fries and ice-cold lemon tea."
              price="₱45–₱85"
              gradient="bg-gradient-to-br from-brand-gold to-yellow-600"
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="reviews" className="py-24 bg-zinc-950 overflow-hidden">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-brand-gold font-bold uppercase tracking-wider mb-2 block">Voice of Davao</span>
              <h2 className="text-5xl font-black text-white font-display uppercase italic">The People Have Spoken</h2>
            </div>
            <div className="flex items-center gap-2 p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
              <span className="text-4xl font-black text-brand-gold">4.9</span>
              <div>
                <div className="flex text-brand-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Based on 500+ reviews</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Mark T." 
              rating={5} 
              review="Grabe yung crunch! Di na ko mag-oorder sa ibang place. Best fried chicken in Davao city hands down. 🔥" 
            />
            <TestimonialCard 
              name="Sarah J." 
              rating={5} 
              review="Yung spicy chicken nila is actually spicy, hindi bitin! Perfect combo with their gravy. Super sulit ng rice meals." 
            />
            <TestimonialCard 
              name="Paulo C." 
              rating={5} 
              review="Dito talaga ako umuuwi after shift. Fast delivery even during rush hour. 10/10 would craving again." 
            />
          </div>
        </div>
      </section>

      {/* Order Banner */}
      <section className="py-20">
        <div className="container px-6 mx-auto">
          <div className="relative overflow-hidden bg-brand-red p-12 md:p-20 rounded-[40px] text-center">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic mb-6 font-display">Gutom Ka Na?</h2>
              <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto">
                Order in 2 minutes. We deliver. You eat. Simple. Satisfy that craving before it captures your soul.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-12 py-5 bg-white text-brand-red text-xl font-black uppercase rounded-2xl hover:bg-zinc-100 transition-all flex items-center justify-center gap-3 shadow-2xl">
                  GrabFood
                </button>
                <button className="px-12 py-5 bg-[#D70F64] text-white text-xl font-black uppercase rounded-2xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 shadow-2xl">
                  Foodpanda
                </button>
              </div>
              <p className="mt-8 text-white/60 text-sm font-bold uppercase tracking-widest">
                Also available for pick-up at our Davao location
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-zinc-950">
        <div className="container px-6 mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-brand-gold font-bold uppercase mb-4 block">Our Story</span>
            <h2 className="text-5xl font-black text-white font-display uppercase italic mb-8">Zander's was born out of one obsession: the perfect crunch.</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We started as a small stall with a big dream (and an even bigger appetite). We're not a global chain. We're Davao's own, and we cook like it. Every piece of chicken is handled with respect, marinated with love, and fried to absolute perfection.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-brand-gold text-4xl font-black mb-2 block">100%</span>
                <span className="text-white font-bold uppercase text-xs tracking-wider">Fresh Davao Produce</span>
              </div>
              <div>
                <span className="text-brand-gold text-4xl font-black mb-2 block">24H</span>
                <span className="text-white font-bold uppercase text-xs tracking-wider">Secret Marination</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 to-transparent" />
              <div className="flex items-center justify-center h-full">
                <Drumstick size={80} className="text-brand-red opacity-20 group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-zinc-900/80 backdrop-blur-md rounded-xl border border-white/10">
                <span className="text-xs font-bold text-white uppercase italic">Est. 2021 — Growing strong in Davao City</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us */}
      <section id="location" className="py-24">
        <div className="container px-6 mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-black text-white uppercase italic font-display mb-8">Find Your Flavor</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-brand-gold shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Our Location</h4>
                    <p className="text-gray-400 text-sm">Davao City, Philippines<br />Near People's Park</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-brand-gold shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Crave Hours</h4>
                    <p className="text-gray-400 text-sm">Open Daily<br />10:00 AM – 10:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-brand-gold shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Contact Us</h4>
                    <p className="text-gray-400 text-sm">Follow our social channels<br />for daily sulit updates!</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-brand-red transition-colors"><Facebook size={20} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-brand-red transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-brand-red transition-colors italic font-bold">TikTok</a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="w-full h-[400px] bg-zinc-900 rounded-[40px] border border-zinc-800 overflow-hidden relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                  <div className="text-center">
                    <MapPin size={48} className="text-brand-red mx-auto mb-4" />
                    <span className="font-bold uppercase tracking-widest text-white">Interactive Map Mockup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-zinc-950">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center">
                <Drumstick className="text-white" size={16} />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase font-display italic">
                Zander's<span className="text-brand-gold">Fried</span>
              </span>
            </a>
            <div className="flex gap-8">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">{link.name}</a>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-zinc-600 uppercase tracking-widest">
            <p>© 2025 Zander's Fried Cravings. All rights reserved.</p>
            <p>Made with 🔥 in Davao City</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
