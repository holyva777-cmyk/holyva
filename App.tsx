/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import BakeryScene from './components/BakeryScene'; // THIS SHOULD GO BACK TO './components/BakeryScene'
import ProductCard, { ProductCardData, SectionTitle, ContactForm, BlogCard, TestimonialCard } from './Diagrams'; // THIS IS CORRECT
import QuantumScene from './QuantumScene'; // THIS IS CORRECT
import { Menu, X, MapPin, Instagram, Facebook, Phone, Heart, Leaf, Award, ShieldCheck, ChevronRight, Search, Clock, ArrowRight, Play, ChevronLeft } from 'lucide-react';
import { Page, MenuItem, BlogPost } from './types';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- DATA ---
// Updated with varied, high-quality images
const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Red Velvet Supreme', description: 'Classic red velvet dough with cream cheese glaze and white chocolate shavings.', price: 180, category: 'donut', ingredients: 'Cocoa, Buttermilk, Cream Cheese', image: 'https://images.unsplash.com/photo-1551024601-564d6e67e859?q=80&w=1200', popular: true },
  { id: '2', name: 'Pistachio Dream', description: 'Filled with pure pistachio cream, topped with roasted pistachio crumble.', price: 220, category: 'donut', ingredients: 'Pistachios, White Chocolate, Brioche', image: 'https://images.unsplash.com/photo-1514517220017-8ce97a34a7b6?q=80&w=1200' },
  { id: '3', name: 'Classic Tiramisu', description: 'Imported mascarpone, espresso-soaked savoiardi, dusted with Dutch cocoa.', price: 350, category: 'tiramisu', ingredients: 'Mascarpone, Espresso, Cocoa', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1200', popular: true },
  { id: '4', name: 'Korean Garlic Bun', description: 'Sweet and savory garlic butter custard in a six-sided brioche bun.', price: 200, category: 'bun', ingredients: 'Garlic, Butter, Cream Cheese', image: 'https://images.unsplash.com/photo-1621255532724-c483a31c5b7f?q=80&w=1200' },
  { id: '5', name: 'Mini Wagyu Sliders', description: 'Three mini brioche burgers with caramelized onions and secret sauce.', price: 450, category: 'burger', ingredients: 'Wagyu Beef, Brioche, Cheese', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200', popular: true },
  { id: '6', name: 'Dark Choco Glaze', description: '70% dark Belgian chocolate glaze on our signature fluffy yeast donut.', price: 160, category: 'donut', ingredients: 'Dark Chocolate, Flour, Milk', image: 'https://images.unsplash.com/photo-1626094309830-2b9ed492e761?q=80&w=1200', popular: true },
  { id: '7', name: 'Matcha Tiramisu', description: 'A Japanese twist on the classic Italian dessert with premium matcha.', price: 380, category: 'tiramisu', ingredients: 'Matcha, Mascarpone, Ladyfingers', image: 'https://images.unsplash.com/photo-1631452292723-d34931a2389e?q=80&w=1200' },
  { id: '8', name: 'Berry Cream Crown', description: 'Filled with fresh strawberry jam and light vanilla custard.', price: 190, category: 'bun', ingredients: 'Strawberries, Vanilla, Sugar', image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=1200', popular: true }
];

const BLOG_POSTS: BlogPost[] = [
  { id: '1', title: 'Why We Use Imported Butter', category: 'Ingredients', date: 'Oct 12, 2024', excerpt: 'The secret to our flakey croissants lies in the fat content of European butter.', image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=800' },
  { id: '2', title: 'Cricket & Calories: A Founder’s Tale', category: 'Cricket & Nutrition', date: 'Nov 05, 2024', excerpt: 'How Stalen and Adarsh balance professional cricket training with baking passion.', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800' },
  { id: '3', title: 'The Art of the Perfect Tiramisu', category: 'Behind the Kitchen', date: 'Dec 01, 2024', excerpt: 'Layer by layer, how we construct the perfect pick-me-up dessert.', image: 'https://images.unsplash.com/photo-1542326237-94b1c5a53814?q=80&w=800' },
];

const REVIEWS = [
    { id: 1, name: 'Rahul D.', role: 'Food Blogger', text: 'Finally a bakery that understands sugar balance! The donuts are fluffy, not greasy.', rating: 5 },
    { id: 2, name: 'Priya S.', role: 'Regular Customer', text: 'The Korean Buns are addictive. Best in Bangalore hands down.', rating: 5 },
    { id: 3, name: 'Arjun K.', role: 'Athlete', text: 'Love that they use quality oils. I can eat this after training without guilt.', rating: 4 },
];

// --- ANIMATION COMPONENTS ---

const FogEffect = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden select-none">
       {/* Left Fog - Warm Steam */}
       <motion.div
         initial={{ x: '-60%', opacity: 0 }}
         animate={{ x: ['-60%', '-20%', '-60%'], opacity: [0, 0.3, 0] }}
         transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
         className="absolute top-0 bottom-0 left-0 w-[80vw] bg-gradient-to-r from-white via-white/50 to-transparent blur-[80px] opacity-20 mix-blend-screen"
       />
       
       {/* Right Fog - Cool Mist */}
        <motion.div
         initial={{ x: '60%', opacity: 0 }}
         animate={{ x: ['60%', '20%', '60%'], opacity: [0, 0.25, 0] }}
         transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
         className="absolute top-0 bottom-0 right-0 w-[80vw] bg-gradient-to-l from-white via-white/50 to-transparent blur-[80px] opacity-20 mix-blend-screen"
       />
       
       {/* Ambient Bottom Mist */}
        <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: [0.1, 0.2, 0.1] }}
         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
         className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-white/40 via-white/10 to-transparent blur-[50px]"
       />
    </div>
  )
};

const SingleDrip = ({ x, scale, delay, duration }: { x: number, scale: number, delay: number, duration: number }) => {
  return (
    <div className="absolute top-0" style={{ left: x, transform: `scale(${scale})`, transformOrigin: 'top center' }}>
        {/* Connection to ceiling (Base) - Much smaller now */}
        <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-4 h-3 bg-[#2C1810] rounded-b-[6px]" />
        
        {/* The Viscous Stem - Thinner */}
        <motion.div
            animate={{
                height: [2, 18, 2, 2], // Shorter stretch
                width: [2, 0.8, 2, 2] // Thinner neck
            }}
            transition={{
                duration: duration,
                times: [0, 0.3, 0.35, 1],
                ease: "easeIn",
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: delay
            }}
            className="w-[1.5px] bg-[#2C1810] absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full"
        />

        {/* The Droplet - Smaller */}
        <motion.div
            animate={{
                y: [2, 18, '110vh'],
                scale: [0, 1.1, 0.9],
                opacity: [1, 1, 1]
            }}
            transition={{
                duration: duration,
                times: [0, 0.3, 1],
                ease: ["easeIn", "circIn", "linear"],
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: delay
            }}
            className="w-2.5 h-3 bg-[#2C1810] rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-sm z-10"
        >
             {/* Tiny Highlight */}
             <div className="absolute top-0.5 left-0.5 w-1 h-1.5 bg-white/30 rounded-full -rotate-12 blur-[0.3px]"></div>
        </motion.div>
    </div>
  );
};

const ChocolateDrips = () => {
  // More compacted, garnish-style layout
  const drips = Array.from({ length: 7 }).map((_, i) => ({
      x: i * 24, // Tighter 24px spacing
      scale: 0.6 + (Math.random() * 0.2), // Much smaller scale (0.6 - 0.8)
      delay: Math.random() * 8, // Longer delay spread for less "busy" look
      duration: 4 + Math.random() * 2 // Slower, lazier drips
  }));

  return (
    <div className="fixed top-0 right-[8%] z-[60] pointer-events-none w-[200px] h-16 filter drop-shadow-md" aria-hidden="true">
        {/* Very thin source line */}
        <div className="absolute top-[-5px] left-0 right-0 h-2 bg-[#2C1810] rounded-b-md"></div>
        
        {drips.map((drip, i) => (
             <SingleDrip key={i} {...drip} />
        ))}
    </div>
  );
};

// --- APP COMPONENT ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Ref for Signature Delights scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page: Page) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentPage(page);
      setIsMenuOpen(false);
  };

  const scroll = (direction: 'left' | 'right') => {
      if(scrollRef.current) {
          const { current } = scrollRef;
          const scrollAmount = direction === 'left' ? -350 : 350;
          current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
  };

  const heroVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );

  // --- PAGES ---

  const HomePage = () => (
    <div className="animate-fade-in text-holyva-primary">
        {/* Hero */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
            <BakeryScene />
            
            {/* Fog Effect */}
            <FogEffect />
            
            {/* Minimal gradient at bottom for transition - Cream gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-holyva-cream to-transparent z-10 pointer-events-none"></div>
            
            <div className="relative z-20 text-center container px-6 mt-12 pointer-events-auto">
                <motion.div 
                    variants={heroVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto"
                >
                    <motion.h2 variants={itemVariants} className="text-holyva-accent font-bold tracking-[0.5em] uppercase mb-4 text-sm md:text-base">
                        Premium Bakery & Desserts
                    </motion.h2>
                    <motion.h1 variants={itemVariants} className="font-serif text-6xl md:text-8xl lg:text-9xl text-holyva-primary mb-6 leading-[1]">
                        Taste That Loves <br/> <span className="text-holyva-accent italic opacity-90">Your Body Back</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="max-w-xl mx-auto text-holyva-text text-lg md:text-xl mb-12 leading-relaxed font-medium">
                        Athlete-quality desserts made with imported ingredients, limited sugar, and zero compromise on hygiene.
                    </motion.p>
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-5 justify-center">
                        <button onClick={() => navigate('menu')} className="px-10 py-4 bg-holyva-primary text-white rounded-full font-bold shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2 text-lg hover:bg-holyva-secondary border border-holyva-accent">
                            Explore Menu <ArrowRight size={20} />
                        </button>
                        <button onClick={() => navigate('about')} className="px-10 py-4 bg-transparent text-holyva-primary border-2 border-holyva-primary rounded-full font-bold hover:bg-holyva-accent/10 transition-colors text-lg shadow-xl">
                            Our Story
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>

        {/* Signature Delights - Cream Background */}
        <section className="py-24 animated-bg relative z-10">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                     <SectionTitle title="Signature Delights" subtitle="Curated For You" />
                     <div className="flex gap-4 mb-16 hidden md:flex">
                         <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-stone-300 text-holyva-primary flex items-center justify-center hover:bg-holyva-primary hover:text-white transition-all"><ChevronLeft /></button>
                         <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-stone-300 text-holyva-primary flex items-center justify-center hover:bg-holyva-primary hover:text-white transition-all"><ChevronRight /></button>
                     </div>
                </div>
                
                <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-8 pb-12 hide-scrollbar snap-x"
                >
                    {MENU_ITEMS.filter(i => i.popular).map((item) => (
                        <div key={item.id} className="min-w-[300px] md:min-w-[350px] snap-center">
                             <ProductCard item={item} />
                        </div>
                    ))}
                    {/* Add one more 'View All' card */}
                    <div className="min-w-[300px] md:min-w-[350px] snap-center flex items-center justify-center">
                        <button onClick={() => navigate('menu')} className="group flex flex-col items-center gap-4 text-holyva-primary opacity-80 hover:opacity-100 transition-opacity">
                            <div className="w-20 h-20 rounded-full border-2 border-holyva-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowRight size={32} />
                            </div>
                            <span className="font-serif text-2xl">View All</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* New Feature Section: The Tiramisu Experience - Dark Espresso Background */}
        <section className="py-24 animated-bg-dark text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=2000')] bg-cover bg-fixed bg-center"></div>
            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                 <div>
                     <span className="text-holyva-accent font-bold tracking-widest uppercase mb-2 block">Our Masterpiece</span>
                     <h2 className="font-serif text-5xl md:text-7xl mb-6 text-white">The Tiramisu <br/> Experience</h2>
                     <p className="text-white/80 text-lg leading-relaxed mb-8">
                         Layers of imported Italian mascarpone, espresso-soaked savoiardi biscuits, and a dusting of rich Dutch cocoa. It's not just a dessert; it's a moment of pure bliss.
                     </p>
                     <button onClick={() => navigate('menu')} className="px-8 py-3 bg-holyva-accent text-holyva-primary rounded-full hover:bg-white transition-all font-bold shadow-lg">
                         Taste Perfection
                     </button>
                 </div>
                 <div className="relative">
                     <motion.img 
                        src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000" 
                        alt="Tiramisu" 
                        className="rounded-xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 border-4 border-holyva-accent/20"
                        whileHover={{ scale: 1.05 }}
                     />
                 </div>
            </div>
        </section>

        {/* Divider with Donuts Animation (Above Video Container) */}
        <div className="h-32 animated-bg flex items-center justify-center overflow-hidden relative">
            <div className="absolute w-full flex justify-between px-10">
                {[...Array(20)].map((_, i) => (
                    <motion.div 
                        key={i}
                        className="opacity-80 text-holyva-primary"
                        style={{ color: ['#2C1810', '#C5A059', '#3E2723', '#D84315'][i % 4] }}
                        animate={{ 
                            y: [0, -20, 0], 
                            rotate: [0, 180, 360],
                            scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ 
                            duration: 3 + Math.random(), 
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }}
                    >
                        {/* Donut SVG Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
                             <circle cx="12" cy="12" r="8" />
                        </svg>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Craftsmanship Section - Warm Cream */}
        <section className="py-24 animated-bg">
             <div className="container mx-auto px-6">
                 <div className="flex flex-col md:flex-row gap-12 items-center">
                     <div className="w-full md:w-1/2 h-[500px] relative rounded-2xl overflow-hidden group border-4 border-holyva-accent/30">
                         <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1200" alt="Chef Baking" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                             <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center text-holyva-primary cursor-pointer hover:scale-110 transition-transform shadow-lg backdrop-blur-sm">
                                 <Play fill="currentColor" size={32} />
                             </div>
                         </div>
                     </div>
                     <div className="w-full md:w-1/2 text-holyva-primary">
                         <SectionTitle title="Craftsmanship" subtitle="Behind the Scenes" />
                         <p className="text-holyva-text text-lg mb-6 leading-relaxed">
                             Every morning at 4 AM, our kitchen comes alive. We don't use premixes. We don't cut corners. From fermenting our donut dough to crafting our own fruit compotes, every step is a labor of love.
                         </p>
                         <div className="grid grid-cols-2 gap-6">
                             <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                                 <h4 className="font-serif text-2xl text-holyva-primary mb-2">100%</h4>
                                 <p className="text-sm font-bold text-holyva-accent">Scratch Made</p>
                             </div>
                             <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                                 <h4 className="font-serif text-2xl text-holyva-primary mb-2">0%</h4>
                                 <p className="text-sm font-bold text-holyva-accent">Preservatives</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        </section>

        {/* Healthy Promise - White/Gold Background */}
        <section className="py-24 animated-bg-gold">
             <div className="container mx-auto px-6">
                <SectionTitle title="The Holyva Standard" subtitle="Why We Are Different" center />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <PromiseCard icon={Award} title="Premium Ingredients" text="We source only the finest imported chocolates, butter, and flour." />
                    <PromiseCard icon={Heart} title="Limited Sugar" text="Calculated sweetness that satisfies cravings without the crash." />
                    <PromiseCard icon={Leaf} title="Quality Oils" text="No cheap palm oil. We bake with heart-healthy fats." />
                    <PromiseCard icon={ShieldCheck} title="Top Hygiene" text="Hospital-grade cleanliness in our kitchen at all times." />
                </div>
            </div>
        </section>

        {/* Reviews */}
        <section className="py-24 animated-bg">
            <div className="container mx-auto px-6">
                <SectionTitle title="Customer Love" subtitle="Don't Take Our Word For It" center />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map(r => <TestimonialCard key={r.id} data={r} />)}
                </div>
            </div>
        </section>
    </div>
  );

  const AboutPage = () => (
    <div className="animate-fade-in pt-32 text-holyva-primary">
        <div className="container mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                <div className="relative">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-holyva-accent/30">
                        <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1200" alt="Baking" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-holyva-primary rounded-full flex items-center justify-center text-white p-6 text-center font-serif text-xl leading-tight shadow-xl hidden md:flex ring-8 ring-holyva-cream border border-holyva-accent">
                        Founded by Athletes
                    </div>
                </div>
                <div>
                    <SectionTitle title="Passion, Discipline, Friendship" subtitle="Our Story" />
                    <div className="prose prose-lg text-holyva-text leading-relaxed space-y-6">
                        <p>
                            <strong className="text-holyva-primary">Stalen and Adarsh</strong> — two cricket-loving friends from Bangalore playing Karnataka state division cricket — started Holyva from a place of pure passion. As athletes, they lived by a simple rule: <span className="italic text-holyva-accent">taste should never harm the body.</span>
                        </p>
                        <p>
                            During tournaments, they noticed a disturbing trend. Most desserts in the market were laden with low-quality oils, excessive sugar, and cheap fillers. They wanted a treat that felt like a reward, not a regret.
                        </p>
                        <p>
                            They created Holyva to bridge the gap between indulgence and wellness. Every product is meticulously crafted with imported ingredients, calculated sugar levels, and absolute hygiene.
                        </p>
                        <div className="p-8 bg-white shadow-lg rounded-2xl border-l-4 border-holyva-accent italic text-holyva-primary text-xl font-serif">
                            "From cricket ground to bakery kitchen — this brand stands for passion, discipline, friendship and food done the right way."
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Timeline/Mission */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-24">
                 <div className="p-10 bg-holyva-primary rounded-3xl border border-holyva-accent/20 shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="text-5xl font-serif text-holyva-accent mb-6 opacity-30 group-hover:opacity-100 transition-opacity">2023</div>
                    <h3 className="font-bold mb-3 text-xl text-white">The Idea</h3>
                    <p className="text-white/80">The concept was born in a locker room after a match.</p>
                 </div>
                 <div className="p-10 bg-holyva-primary rounded-3xl border border-holyva-accent/20 shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="text-5xl font-serif text-holyva-accent mb-6 opacity-30 group-hover:opacity-100 transition-opacity">2024</div>
                    <h3 className="font-bold mb-3 text-xl text-white">The Launch</h3>
                    <p className="text-white/80">Holyva opens its first kitchen in Bangalore.</p>
                 </div>
                 <div className="p-10 bg-holyva-primary rounded-3xl border border-holyva-accent/20 shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="text-5xl font-serif text-holyva-accent mb-6 opacity-30 group-hover:opacity-100 transition-opacity">Future</div>
                    <h3 className="font-bold mb-3 text-xl text-white">The Vision</h3>
                    <p className="text-white/80">Redefining dessert culture across India.</p>
                 </div>
            </div>
        </div>

        {/* Added Sections: Menu & Testimonials */}
        
        {/* Menu Section */}
        <section className="py-24 animated-bg relative z-10 border-t border-stone-200">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                     <SectionTitle title="Our Classics" subtitle="Taste the Magic" />
                     <div className="flex gap-4 mb-16 hidden md:flex">
                         <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-stone-300 text-holyva-primary flex items-center justify-center hover:bg-holyva-primary hover:text-white transition-all"><ChevronLeft /></button>
                         <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-stone-300 text-holyva-primary flex items-center justify-center hover:bg-holyva-primary hover:text-white transition-all"><ChevronRight /></button>
                     </div>
                </div>
                
                <div 
                    ref={scrollRef} // Reusing the same ref (only one view mounted at a time)
                    className="flex overflow-x-auto gap-8 pb-12 hide-scrollbar snap-x"
                >
                    {MENU_ITEMS.filter(i => i.popular).map((item) => (
                        <div key={item.id} className="min-w-[300px] md:min-w-[350px] snap-center">
                             <ProductCard item={item} />
                        </div>
                    ))}
                    <div className="min-w-[300px] md:min-w-[350px] snap-center flex items-center justify-center">
                        <button onClick={() => navigate('menu')} className="group flex flex-col items-center gap-4 text-holyva-primary opacity-80 hover:opacity-100 transition-opacity">
                            <div className="w-20 h-20 rounded-full border-2 border-holyva-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowRight size={32} />
                            </div>
                            <span className="font-serif text-2xl">View All</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 animated-bg-gold">
            <div className="container mx-auto px-6">
                <SectionTitle title="Community" subtitle="What They Say" center />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map(r => <TestimonialCard key={r.id} data={r} />)}
                </div>
            </div>
        </section>
    </div>
  );

  const MenuPage = () => {
      const [category, setCategory] = useState<string>('all');
      const filteredItems = category === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === category);
      
      const categories = ['all', 'donut', 'tiramisu', 'bun', 'burger'];

      return (
        <div className="animate-fade-in pt-32 pb-24 container mx-auto px-6 min-h-screen">
            <div className="text-center mb-16">
                <SectionTitle title="Our Menu" subtitle="Handcrafted Daily" center />
                <p className="text-holyva-text max-w-xl mx-auto -mt-10">Experience the perfect balance of premium ingredients and incredible taste.</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${category === cat ? 'bg-holyva-primary text-white shadow-xl scale-105 border border-holyva-primary' : 'bg-transparent text-holyva-primary border border-holyva-primary hover:bg-holyva-accent/10'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredItems.map(item => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </div>
      );
  };

  const BlogPage = () => (
    <div className="animate-fade-in pt-32 pb-24">
        <div className="container mx-auto px-6">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                    <SectionTitle title="The Holyva Journal" subtitle="Stories from the Oven" />
                    <p className="text-holyva-text max-w-lg">Recipes, nutrition tips, and behind-the-scenes stories from our kitchen to your screen.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <input type="text" placeholder="Search articles..." className="w-full pl-12 pr-6 py-4 rounded-full bg-white border border-stone-200 text-holyva-primary placeholder-stone-400 focus:bg-white focus:border-holyva-accent outline-none transition-all shadow-sm" />
                    <Search className="absolute left-5 top-4.5 text-stone-400" size={20} />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 {BLOG_POSTS.map(post => (
                     <BlogCard key={post.id} {...post} />
                 ))}
             </div>
        </div>
    </div>
  );

  const GalleryPage = () => (
    <div className="animate-fade-in pt-32 pb-24">
        <div className="container mx-auto px-6">
            <SectionTitle title="Sweet Moments" subtitle="Follow Us @Holyva" center />
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mt-12">
                 {[
                    'https://images.unsplash.com/photo-1551024601-564d6e67e859?q=80&w=800',
                    'https://images.unsplash.com/photo-1626803775151-61d756612fcd?q=80&w=800',
                    'https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?q=80&w=800',
                    'https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=800',
                    'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800',
                    'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=800',
                    'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=800',
                    'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=800',
                 ].map((src, i) => (
                     <div key={i} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-lg border border-stone-200">
                         <img src={src} alt="Gallery" className="w-full h-auto transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <Instagram className="text-white" size={32} />
                         </div>
                     </div>
                 ))}
            </div>
        </div>
    </div>
  );

  const ContactPage = () => (
      <div className="animate-fade-in pt-32 pb-24">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                  <SectionTitle title="Find Us" subtitle="Get in Touch" />
                  <p className="text-holyva-text mb-10 text-lg">Whether you need a custom cake, a bulk order for your team, or just want to say hi.</p>
                  
                  <div className="space-y-8">
                      <div className="flex items-center gap-6 group cursor-pointer p-4 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-stone-200">
                          <div className="w-16 h-16 bg-holyva-primary shadow-lg group-hover:scale-110 transition-transform rounded-full flex items-center justify-center text-white shrink-0 border border-holyva-accent"><MapPin size={24} /></div>
                          <div>
                              <h4 className="font-bold text-holyva-primary text-lg">Bakery HQ</h4>
                              <p className="text-holyva-muted">123, 4th Cross, Indiranagar, Bangalore</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-6 group cursor-pointer p-4 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-stone-200">
                          <div className="w-16 h-16 bg-holyva-primary shadow-lg group-hover:scale-110 transition-transform rounded-full flex items-center justify-center text-white shrink-0 border border-holyva-accent"><Phone size={24} /></div>
                          <div>
                              <h4 className="font-bold text-holyva-primary text-lg">Call Us</h4>
                              <p className="text-holyva-muted">+91 98765 43210</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-6 group cursor-pointer p-4 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-stone-200">
                          <div className="w-16 h-16 bg-holyva-primary shadow-lg group-hover:scale-110 transition-transform rounded-full flex items-center justify-center text-white shrink-0 border border-holyva-accent"><Clock size={24} /></div>
                          <div>
                              <h4 className="font-bold text-holyva-primary text-lg">Open Hours</h4>
                              <p className="text-holyva-muted">Mon-Sun: 10:00 AM - 10:00 PM</p>
                          </div>
                      </div>
                  </div>

                  <div className="mt-12 flex gap-6">
                      <a href="#" className="w-12 h-12 rounded-full bg-holyva-primary text-white flex items-center justify-center hover:bg-holyva-secondary transition-colors shadow-lg hover:scale-110 border border-holyva-accent"><Instagram size={20} /></a>
                      <a href="#" className="w-12 h-12 rounded-full bg-holyva-primary text-white flex items-center justify-center hover:bg-holyva-secondary transition-colors shadow-lg hover:scale-110 border border-holyva-accent"><Facebook size={20} /></a>
                  </div>
              </div>
              <div className="relative">
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl pointer-events-none"></div>
                  <ContactForm />
              </div>
          </div>
      </div>
  );

  // --- RENDER ---

  return (
    <div className="font-sans text-holyva-primary selection:bg-holyva-accent selection:text-white animated-bg min-h-screen">
      
      {/* Visual Flair: Chocolate Drip Overlay */}
      <ChocolateDrips />

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-holyva-cream/90 backdrop-blur-md shadow-lg py-4 border-b border-stone-200' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('home')}>
            <span className="font-serif font-bold text-2xl tracking-tight text-holyva-primary group-hover:scale-105 transition-transform inline-block">
              HOLYVA<span className="text-holyva-accent">.</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide text-holyva-primary">
            {['home', 'menu', 'about', 'gallery', 'blog', 'contact'].map((p) => (
                <button 
                    key={p} 
                    onClick={() => navigate(p as Page)} 
                    className={`hover:text-holyva-accent transition-colors uppercase ${currentPage === p ? 'text-holyva-primary border-b-2 border-holyva-accent' : 'text-holyva-muted'}`}
                >
                    {p}
                </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
              <button className="md:hidden text-holyva-primary p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                className="fixed inset-0 z-40 bg-holyva-cream flex flex-col items-center justify-center gap-8 text-2xl font-serif text-holyva-primary"
            >
                {['home', 'menu', 'about', 'gallery', 'blog', 'contact'].map((p) => (
                    <button 
                        key={p} 
                        onClick={() => navigate(p as Page)} 
                        className={`hover:text-holyva-accent transition-colors uppercase ${currentPage === p ? 'text-holyva-primary underline underline-offset-8 decoration-holyva-accent' : 'text-holyva-muted'}`}
                    >
                        {p}
                    </button>
                ))}
            </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'menu' && <MenuPage />}
          {currentPage === 'blog' && <BlogPage />}
          {currentPage === 'gallery' && <GalleryPage />}
          {currentPage === 'contact' && <ContactPage />}
      </main>

      <footer className="bg-white border-t border-stone-200 text-holyva-primary py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <div className="font-serif font-bold text-3xl mb-6 text-holyva-primary">HOLYVA.</div>
                <p className="text-holyva-text text-sm leading-relaxed mb-6">
                    Redefining indulgence with health, hygiene, and imported quality. Founded by athletes, for everyone.
                </p>
                <div className="flex gap-4">
                    <Instagram className="text-stone-400 hover:text-holyva-primary cursor-pointer transition-colors" size={20} />
                    <Facebook className="text-stone-400 hover:text-holyva-primary cursor-pointer transition-colors" size={20} />
                </div>
            </div>
            <div>
                <h4 className="font-bold mb-8 text-lg">Explore</h4>
                <ul className="space-y-4 text-sm text-holyva-muted">
                    <li><button onClick={() => navigate('menu')} className="hover:text-holyva-primary hover:translate-x-1 transition-all">Our Menu</button></li>
                    <li><button onClick={() => navigate('about')} className="hover:text-holyva-primary hover:translate-x-1 transition-all">Our Story</button></li>
                    <li><button onClick={() => navigate('blog')} className="hover:text-holyva-primary hover:translate-x-1 transition-all">Blog</button></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-8 text-lg">Contact</h4>
                <ul className="space-y-4 text-sm text-holyva-muted">
                    <li className="flex items-center gap-2"><MapPin size={16}/> Bangalore, India</li>
                    <li className="flex items-center gap-2"><Leaf size={16}/> hello@holyva.com</li>
                    <li className="flex items-center gap-2"><Phone size={16}/> +91 98765 43210</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-8 text-lg">Newsletter</h4>
                <div className="flex">
                    <input type="email" placeholder="Your email" className="bg-stone-50 border-none outline-none px-4 py-3 rounded-l-lg text-sm w-full focus:bg-stone-100 transition-colors text-holyva-primary placeholder-stone-400" />
                    <button className="bg-holyva-primary text-white px-6 py-3 rounded-r-lg font-bold text-sm hover:bg-holyva-secondary transition-colors">GO</button>
                </div>
            </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-stone-200 text-center text-xs text-stone-400">
            © 2024 Holyva Bakery. All rights reserved.
        </div>
      </footer>

      {/* WhatsApp Floating Button - Updated to Green/Gold */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center hover:bg-[#128C7E] border-2 border-white"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
};

export default App;
