'use client';

import { useEffect, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import { cn } from '@/lib/utils';
import useClickOutside from '@/hooks/useClickOutside';
import { 
  Home, 
  Calendar, 
  Heart, 
  MoreHorizontal, 
  Info, 
  ShoppingBag, 
  MapPin,
  BookOpen,
  Users,
  Library

} from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

type DockItem = {
  id: number;
  label: string;
  title: React.ReactNode;
  href?: string;
  menuItems?: {
    label: string;
    href: string;
    icon: React.ElementType;
    colorClass: string;
    bgClass: string;
  }[];
};

const ITEMS: DockItem[] = [
  {
    id: 1,
    label: 'Home',
    href: '/',
    title: <Home className='h-5 w-5' />,
  },
  {
    id: 2,
    label: 'Blog',
    href: '/blog',
    title: <BookOpen className='h-5 w-5' />,
  },
  {
    id: 3,
    label: 'Donate',
    href: '/donate',
    title: <Heart className='h-5 w-5 fill-current' />,
  },
  {
    id: 4,
    label: 'More',
    title: <MoreHorizontal className='h-5 w-5' />,
    menuItems: [
      { label: 'About', href: '/about', icon: Info, colorClass: 'text-blue-500', bgClass: 'bg-blue-500/10 group-hover:bg-blue-500/20' },
      { label: 'Shop', href: '/shop', icon: ShoppingBag, colorClass: 'text-orange-500', bgClass: 'bg-orange-500/10 group-hover:bg-orange-500/20' },
      { label: 'Centers', href: '/centers', icon: MapPin, colorClass: 'text-green-500', bgClass: 'bg-green-500/10 group-hover:bg-green-500/20' },
      { label: 'Community', href: '/community', icon: Users, colorClass: 'text-purple-500', bgClass: 'bg-purple-500/10 group-hover:bg-purple-500/20' },
      { label: 'Resources', href: '/resources', icon: Library, colorClass: 'text-indigo-500', bgClass: 'bg-indigo-500/10 group-hover:bg-indigo-500/20' },
      { label: 'Calendar', href: '/calendar', icon: Calendar, colorClass: 'text-red-500', bgClass: 'bg-red-500/10 group-hover:bg-red-500/20' },
    ]
  },
];

export function MobileDock() {
  const [active, setActive] = useState<number | null>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);
  const location = useLocation();

  useClickOutside(containerRef, () => {
    setIsOpen(false);
    setActive(null);
  });

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;
    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(contentWrapperRef.current, {
        height: heightContent || 'auto',
        duration: 0.4,
        ease: 'power3.out'
      });
      gsap.fromTo('.menu-item', 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      gsap.to(contentWrapperRef.current, {
        height: 0,
        duration: 0.3,
        ease: 'power3.inOut'
      });
    }
  }, { scope: containerRef, dependencies: [isOpen, heightContent] });

  // Animate active pill
  useGSAP(() => {
    gsap.fromTo('.active-pill',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'elastic.out(1, 0.7)' }
    );
  }, { scope: containerRef, dependencies: [active, location.pathname] });

  return (
    <div className='fixed bottom-0 left-0 z-50 w-full md:hidden' ref={containerRef}>
      <div className='h-full w-full border-t border-gray-200 dark:border-border/20 bg-white/90 dark:bg-background/40 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-2 pt-2 rounded-t-3xl'>
        <div className='overflow-hidden h-0' ref={contentWrapperRef}>
          <div ref={contentRef} className='p-2'>
            {ITEMS.map((item) => {
              const isSelected = active === item.id;
              if (!item.menuItems) return null;

              return (
                <div
                  key={item.id}
                  className={cn(
                    'px-2 pt-2 text-sm',
                    isSelected ? 'block' : 'hidden'
                  )}
                >
                  <div className='flex flex-col space-y-2 min-w-[200px]'>
                    <div className='text-xs font-medium text-muted-foreground px-2 mb-1 uppercase tracking-wider'>Menu</div>
                    {item.menuItems.map((subItem) => (
                      <Link 
                        key={subItem.href}
                        to={subItem.href} 
                        className='menu-item flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group'
                        onClick={() => { setIsOpen(false); setActive(null); }}
                      >
                        <div className={cn('p-1.5 rounded-md transition-colors', subItem.bgClass, subItem.colorClass)}>
                          <subItem.icon className='h-4 w-4' />
                        </div>
                        <span className='text-sm font-medium'>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex items-end justify-around w-full px-2' ref={menuRef}>
          {ITEMS.map((item) => {
            const isActiveRoute = item.href === '/' 
              ? location.pathname === '/' 
              : item.href && location.pathname.startsWith(item.href);
            
            const isMoreActive = active === item.id;
            const isActive = isActiveRoute || isMoreActive;

            const baseClasses = cn(
              'relative flex flex-col shrink-0 scale-100 select-none appearance-none items-center justify-center text-muted-foreground transition-all duration-200 focus-visible:ring-2 active:scale-[0.98]',
              'flex-1 gap-1.5 min-w-0', // Flex-1 to distribute space
            );

            const isDonate = item.label === 'Donate';
            const iconContainerClasses = cn(
              'flex items-center justify-center rounded-full transition-all duration-300',
              'h-8 w-16', // Pill shape
              isActive 
                ? 'bg-[#FFD700] text-black shadow-md active-pill' 
                : isDonate 
                  ? 'bg-transparent text-pink-500' 
                  : 'bg-transparent text-muted-foreground'
            );

            const labelClasses = cn(
              'text-[11px] font-medium leading-none transition-colors duration-200',
              isActive ? 'text-foreground' : 'text-muted-foreground'
            );

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  aria-label={item.label}
                  className={baseClasses}
                  onClick={() => {
                      setIsOpen(false);
                      setActive(null);
                      if (item.href === '/') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                  }}
                >
                  <div className={iconContainerClasses}>
                      {item.title}
                  </div>
                  <span className={labelClasses}>{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                aria-label={item.label}
                className={baseClasses}
                type='button'
                onClick={() => {
                  if (!isOpen) setIsOpen(true);
                  if (active === item.id) {
                    setIsOpen(false);
                    setActive(null);
                    return;
                  }

                  setActive(item.id);
                }}
              >
                <div className={cn(iconContainerClasses, isMoreActive && "bg-[#FFD700] text-black active-pill")}>
                  {item.title}
                </div>
                <span className={labelClasses}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
