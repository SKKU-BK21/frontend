import { SyntheticEvent, useState } from "react";

export function useDisclosure() {
  const [open, setOpen] = useState<boolean>(false);
  const close = (e: SyntheticEvent<HTMLDialogElement, Event>) => {
    setOpen(false);
  };
  return { open, setOpen, close };
}
