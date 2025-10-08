'use client';

import { useState } from 'react';
import { Utensils } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';

export default function IconHoverToggle({ open }: { open: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  if (open)
    return (
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <Utensils />
      </div>
    );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
    >
      {isHovered ? <SidebarTrigger /> : <Utensils />}
    </div>
  );
}
