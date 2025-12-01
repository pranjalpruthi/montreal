 "use client";

import React from "react";
import { List, Search } from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/table-of-contents";
import { PromoContent } from "@/components/promo-content";

import { ToggleGroup, ToggleGroupItem } from '@/components/animate-ui/radix/toggle-group';

interface MobileTableOfContentsProps {
  language?: 'en' | 'fr';
  setLanguage?: (lang: 'en' | 'fr') => void;
}

export function MobileTableOfContents({ language, setLanguage }: MobileTableOfContentsProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="lg:hidden fixed bottom-24 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
        <List size={20} />
      </DrawerTrigger>

      <DrawerContent className="lg:hidden flex flex-col max-h-[85vh] h-auto rounded-t-[26px]">
        <DrawerHeader className="flex items-center justify-between px-4 py-3 border-b border-border/40">
          {language && setLanguage && (
            <ToggleGroup
              type="single"
              value={language}
              onValueChange={(v) => { if (v) setLanguage(v as 'en' | 'fr') }}
              className="bg-muted/30 border border-border/50 rounded-full p-0.5"
            >
              <ToggleGroupItem
                value="en"
                className="px-2.5 py-1.5 text-xs rounded-full text-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-sm hover:bg-muted transition-all duration-300 font-medium"
              >
                EN
              </ToggleGroupItem>
              <ToggleGroupItem
                value="fr"
                className="px-2.5 py-1.5 text-xs rounded-full text-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-sm hover:bg-muted transition-all duration-300 font-medium"
              >
                FR
              </ToggleGroupItem>
            </ToggleGroup>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              setOpen(false);
              (window as any).openCommandMenu?.();
            }}
          >
            <Search className="h-4 w-4" />
          </Button>
        </DrawerHeader>

        <DrawerBody className="flex-1 overflow-y-auto">
          <TableOfContents onLinkClick={() => setOpen(false)} />
        </DrawerBody>

        <DrawerFooter className="p-0 border-t border-border/40">
          <PromoContent variant="mobile" />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
