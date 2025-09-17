'use client';

import { Chat } from '@prisma/client';
import { LucideTrash } from "lucide-react";
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ChatDeleteButton } from '@/features/chat/components/chat-delete-button';
import { cn } from '@/lib/utils';

type ChatItemProps = {
  chat: Chat;
  isActive: boolean;
}

export function ChatItem({ chat, isActive }: ChatItemProps) {

  const deleteButton = (
    <ChatDeleteButton
      chat={chat}
      trigger={
        <Button variant="outline" size="icon">
          <LucideTrash className="h-4 w-4" />
        </Button>
      }
    />
  );

  return (
    <Link
      href={`/chat/${chat.id}`}
      className={cn(
        'flex w-full items-center justify-between rounded-md p-2 text-sm',
        isActive ? 'bg-accent' : 'hover:bg-accent',
      )}
    >
      <span className="truncate">{chat.title}</span>
      <div>
        {deleteButton}
      </div>
    </Link>
  );
}
