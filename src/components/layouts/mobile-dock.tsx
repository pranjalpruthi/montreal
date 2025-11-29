'use client';

import { useEffect, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import { AnimatePresence, motion, MotionConfig, type Transition } from 'motion/react';
import { cn } from '@/lib/utils';
import useClickOutside from '@/hooks/useClickOutside';
import { 
  Home, 
  Calendar, 
  Heart, 
  MoreHorizontal, 
  Info, 
  ShoppingBag, 
  MapPin 
} from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';

const transition: Transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.25,
};

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
    label: 'Calendar',
    href: '/calendar',
    title: <Calendar className='h-5 w-5' />,
  },
  {
    id: 3,
    label: 'Donate',
    href: '/donate',
    title: <Heart className='h-5 w-5 text-pink-500 fill-pink-500' />,
  },
  {
    id: 4,
    label: 'More',
    title: <MoreHorizontal className='h-5 w-5' />,
    menuItems: [
      { label: 'About', href: '/about', icon: Info, colorClass: 'text-blue-500', bgClass: 'bg-blue-500/10 group-hover:bg-blue-500/20' },
      { label: 'Shop', href: '/shop', icon: ShoppingBag, colorClass: 'text-orange-500', bgClass: 'bg-orange-500/10 group-hover:bg-orange-500/20' },
      { label: 'Centers', href: '/centers', icon: MapPin, colorClass: 'text-green-500', bgClass: 'bg-green-500/10 group-hover:bg-green-500/20' },
    ]
  },
];

export function MobileDock() {
  const [active, setActive] = useState<number | null>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);
  const location = useLocation();

  useClickOutside(ref, () => {
    setIsOpen(false);
    setActive(null);
  });

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;

    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  return (
    <MotionConfig transition={transition}>
      <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden' ref={ref}>
        <div className='h-full w-full rounded-2xl border border-border/40 bg-background/80 backdrop-blur-xl shadow-lg'>
          <div className='overflow-hidden'>
            <AnimatePresence initial={false} mode='sync'>
              {isOpen ? (
                <motion.div
                  key='content'
                  initial={{ height: 0 }}
                  animate={{ height: heightContent || 0 }}
                  exit={{ height: 0 }}
                  style={{
                    width: maxWidth,
                  }}
                >
                  <div ref={contentRef} className='p-2'>
                    {ITEMS.map((item) => {
                      const isSelected = active === item.id;
                      if (!item.menuItems) return null;

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <div
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
                                  className='flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group'
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
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div className='flex space-x-2 p-2' ref={menuRef}>
            {ITEMS.map((item) => {
              const isActiveRoute = item.href === '/' 
                ? location.pathname === '/' 
                : item.href && location.pathname.startsWith(item.href);
              
              const isMoreActive = active === item.id;

              const baseClasses = cn(
                'relative flex flex-col shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 active:scale-[0.98]',
                'min-w-[50px] h-auto py-2 gap-1', // Adjusted for text layout
                (isActiveRoute || isMoreActive) ? 'bg-primary/10 text-primary' : ''
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
                    }}
                  >
                    {item.title}
                    <span className="text-[10px] font-medium leading-none hidden sm:block">{item.label}</span>
                    {isActiveRoute && (
                        <motion.div
                            layoutId="active-dot"
                            className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                        />
                    )}
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
                  {item.title}
                  <span className="text-[10px] font-medium leading-none hidden sm:block">{item.label}</span>
                  {isMoreActive && (
                        <motion.div
                            layoutId="active-dot"
                            className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                        />
                    )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
