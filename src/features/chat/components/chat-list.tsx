import { ChatItem } from '@/features/chat/components/chat-item';
import { getChats } from '@/features/chat/queries/get-chats';


export async function ChatList() {
  const chats = await getChats();

  if (chats.length === 0) {
    return (
      <p className="p-4 text-sm text-muted-foreground">No chats yet.</p>
    );
  }

  return (
    <div className="flex flex-col gap-y-1 p-2">
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          // TODO: Work on setting this
          isActive={false}
        />
      ))}
    </div>
  );
}
