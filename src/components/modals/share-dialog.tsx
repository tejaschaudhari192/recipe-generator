import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Copy } from 'lucide-react'; // Or any icon library you use

interface ShareLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: string;
}

export default function ShareLinkDialog({
  open,
  onOpenChange,
  link,
}: ShareLinkDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Share this link</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex items-center space-x-2 mt-2">
          <Input value={link} readOnly />
          <Button size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        {copied && (
          <p className="text-sm text-green-600 mt-2">Copied to clipboard!</p>
        )}

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
