'use client';

import { deleteChat } from '@/features/chat/actions/actions';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';

export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-red-100"
      disabled={isPending}
      onClick={(e) => {
        e.preventDefault();
        startTransition(async () => {
          await deleteChat(id);
        });
      }}
    >
      <Trash2 className="h-4 w-4 text-red-500" />
    </Button>
  );
}
