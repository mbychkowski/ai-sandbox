import { Chat } from '@prisma/client';

import { deleteChat } from '@/features/chat/actions/delete-chat';

type ChatDeleteButtonProps = {
  chat: Chat;
  trigger: React.ReactElement;
};

export function ChatDeleteButton({ chat, trigger }: ChatDeleteButtonProps) {

  return (
    <form action={deleteChat.bind(null, chat.id)}>
      {trigger}
    </form>
  )
}
