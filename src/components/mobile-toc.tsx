"use client";

import React from "react";
import { List, Search } from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/table-of-contents";
import { PromoContent } from "@/components/promo-content";

export function MobileTableOfContents() {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="lg:hidden fixed bottom-24 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
        <List size={20} />
      </DrawerTrigger>

      <DrawerContent className="lg:hidden">
        <DrawerHeader className="flex items-center justify-between">
          <h3 className="font-semibold">Table of Contents</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setOpen(false);
              (window as any).openCommandMenu?.();
            }}
          >
            <Search className="h-5 w-5" />
          </Button>
        </DrawerHeader>

        <DrawerBody>
          <TableOfContents onLinkClick={() => setOpen(false)} />
        </DrawerBody>

        <DrawerFooter>
          <PromoContent variant="mobile" />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
