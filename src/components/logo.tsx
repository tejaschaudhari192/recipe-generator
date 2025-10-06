import { cn } from '@/lib/utils';
import React from 'react';

const Logo = ({className}:{className?:string}) => {
  return (
    <h1 className={cn("text-3xl md:text-4xl font-bold text-green-600 tracking-tight",className)}>
      <span className="text-orange-500">🍴</span> RecipeApp
    </h1>
  );
};

export default Logo;
