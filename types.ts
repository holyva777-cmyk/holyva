/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type Page = 'home' | 'about' | 'menu' | 'blog' | 'contact' | 'gallery' | 'cart';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  category: 'donut' | 'tiramisu' | 'bun' | 'burger' | 'dessert';
  image: string;
  popular?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}