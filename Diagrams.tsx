/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Heart, Leaf, Award, ShieldCheck, Clock } from 'lucide-react';
import { MenuItem, Testimonial } from '../types';

export const ProductCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-holyva-primary rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col h-full border border-holyva-accent/20"
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-stone-800 animate-pulse" /> {/* Placeholder */}
        <img src={item.image} alt={item.name} className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        {item.popular && (
            <div className="absolute top-4 right-4 bg-white text-holyva-primary text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20 tracking-wider border border-holyva-accent">
                SIGNATURE
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-6">
             <p className="text-white text-sm font-medium">{item.ingredients}</p>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow relative z-20">
        <div className="flex justify-between items-baseline mb-3">
            <h3 className="font-serif text-2xl font-bold text-white">{item.name}</h3>
            <span className="font-sans font-bold text-lg text-holyva-accent">₹{item.price}</span>
        </div>
        <p className="text-sm text-white/70 leading-relaxed line-clamp-2">{item.description}</p>
      </div>
    </motion.div>
  );
};

export const PromiseCard: React.FC<{ icon: any, title: string, text: string }> = ({ icon: Icon, title, text }) => (
    <div className="flex flex-col items-center text-center p-8 bg-holyva-primary rounded-2xl border border-holyva-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
        <div className="w-16 h-16 rounded-full bg-holyva-accent/10 group-hover:bg-holyva-accent/20 border border-holyva-accent/30 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center text-holyva-accent mb-6 shadow-md">
            <Icon size={32} strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-sm text-white/70 leading-relaxed">{text}</p>
    </div>
);

export const SectionTitle: React.FC<{ title: string, subtitle?: string, center?: boolean, light?: boolean }> = ({ title, subtitle, center, light }) => (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
        {subtitle && (
            <div className={`flex items-center gap-3 font-bold tracking-[0.2em] text-xs uppercase mb-4 ${center ? 'justify-center' : ''} ${light ? 'text-white/80' : 'text-holyva-primary'}`}>
                <span className={`w-8 h-[1px] ${light ? 'bg-white/80' : 'bg-holyva-accent'}`}></span>
                {subtitle}
                <span className={`w-8 h-[1px] ${light ? 'bg-white/80' : 'bg-holyva-accent'}`}></span>
            </div>
        )}
        <h2 className={`font-serif text-5xl md:text-6xl ${light ? 'text-white' : 'text-holyva-primary'} drop-shadow-sm`}>{title}</h2>
    </div>
);

export const ContactForm: React.FC = () => (
    <form className="bg-holyva-primary p-10 rounded-2xl shadow-xl border border-holyva-accent/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
             <Heart size={100} className="text-white" />
        </div>
        <h3 className="font-serif text-3xl mb-8 relative z-10 text-white">Get in Touch</h3>
        <div className="space-y-6 relative z-10">
            <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:bg-white/10 focus:border-holyva-accent outline-none transition-all text-white placeholder-white/30" placeholder="Your name" />
            </div>
            <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:bg-white/10 focus:border-holyva-accent outline-none transition-all text-white placeholder-white/30" placeholder="your@email.com" />
            </div>
            <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:bg-white/10 focus:border-holyva-accent outline-none transition-all text-white placeholder-white/30" placeholder="How can we make your day sweeter?"></textarea>
            </div>
            <button className="w-full py-4 bg-holyva-accent text-holyva-primary font-bold rounded-xl hover:bg-white transition-colors shadow-lg mt-4">
                Send Message
            </button>
        </div>
    </form>
);

export const BlogCard: React.FC<{ title: string, category: string, date: string, image: string }> = ({ title, category, date, image }) => (
    <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-stone-200">
        <div className="relative overflow-hidden aspect-[16/10]">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-holyva-primary uppercase tracking-wider shadow-sm border border-holyva-accent/20">
                {category}
            </div>
        </div>
        <div className="p-6">
            <div className="text-xs text-holyva-muted mb-3 flex items-center gap-2">
                <span>{date}</span>
                <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                <span>5 min read</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-holyva-primary mb-4 line-clamp-2 leading-tight group-hover:text-holyva-secondary transition-colors">{title}</h3>
            <div className="flex items-center text-sm font-bold text-holyva-accent uppercase tracking-wide group/link">
                Read Story <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
            </div>
        </div>
    </div>
);

export const TestimonialCard: React.FC<{ data: Testimonial }> = ({ data }) => (
    <div className="bg-holyva-primary p-8 rounded-2xl shadow-lg border border-holyva-accent/20 relative hover:-translate-y-1 transition-transform duration-300">
        <div className="text-holyva-accent mb-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={`inline-block ${i < data.rating ? 'fill-current' : 'text-holyva-accent/30'}`} />
            ))}
        </div>
        <p className="text-white/80 italic mb-6 text-lg leading-relaxed font-serif">"{data.text}"</p>
        <div className="flex items-center gap-4 border-t border-white/10 pt-6">
            <div className="w-12 h-12 rounded-full bg-holyva-accent text-holyva-primary flex items-center justify-center font-bold font-serif text-xl">
                {data.name.charAt(0)}
            </div>
            <div>
                <div className="font-bold text-base text-white">{data.name}</div>
                <div className="text-xs text-white/50 uppercase tracking-wide">{data.role}</div>
            </div>
        </div>
    </div>
);