import { cn } from '@/lib/utils';
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
    return (
        <h1 className={cn("font-bold text-green-600 tracking-tight", className)}>
            RecipeApp
        </h1>
    );
};

export default Logo;
