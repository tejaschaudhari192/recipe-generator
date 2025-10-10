import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Ellipsis, Share, Trash2 } from 'lucide-react';
import { useDialogControl } from '@hooks/useDialogControl';
import DeleteAlertDialog from './modals/delete-dialog';
import ShareLinkDialog from './modals/share-dialog';
import { Chat } from '@/types';
import { getUrl } from '@lib/utils';
import { deletChatWithId } from '@lib/api';

interface ChatOptionsProps {
  chat: Chat;
}
export const ChatOptions = ({ chat }: ChatOptionsProps) => {
  const dialog = useDialogControl();
  const shareDialog = useDialogControl();

  const linkToShare = getUrl(chat.id);
  async function handleConfirm() {
    await deletChatWithId(chat.id);
    dialog.closeDialog();
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={shareDialog.openDialog}>
            <Share /> Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={dialog.openDialog} variant="destructive">
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertDialog
        open={dialog.open}
        onOpenChange={dialog.setOpen}
        title="Are you absolutely sure?"
        description="This will delete your recipe."
        onConfirm={handleConfirm}
        onCancel={dialog.closeDialog}
        confirmLabel="Yes, delete it"
        cancelLabel="No, keep it"
      />
      <ShareLinkDialog
        open={shareDialog.open}
        onOpenChange={shareDialog.setOpen}
        link={linkToShare}
      />
    </div>
  );
};
