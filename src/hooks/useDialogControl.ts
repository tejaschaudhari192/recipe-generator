import { useCallback, useState } from 'react';

export function useDialogControl(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);

  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);

  return { open, openDialog, closeDialog, setOpen };
}
