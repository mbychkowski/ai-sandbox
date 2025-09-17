import { UIMessage } from 'ai';
import { notFound } from 'next/navigation';

import { ChatPanel } from '@/components/ChatPanel';
import { getChat } from '@/features/chat/queries/get-chat';

export default async function ChatPage({
  params,
}: {
  params: { chatId: string };
}) {
  const chat  = await getChat(params.chatId);

  if (!chat) {
    notFound()
  }

  return (
    <ChatPanel
      chatId={params.chatId}
      // The 'ai' library expects a specific Message type. We need to map our prisma model.
      initialMessages={chat.messages.map(
        (m) =>
          ({
            id: m.id,
            role: m.role as 'user' | 'assistant',
            content: m.content,
            parts: [{ type: 'text', text: m.content }],
          } as UIMessage),
      )}
    />
  );
}
