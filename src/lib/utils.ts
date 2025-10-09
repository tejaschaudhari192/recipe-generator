import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { configurations } from './configuration';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUrl(next?: string) {
  return configurations.frontend_url! + next;
}
