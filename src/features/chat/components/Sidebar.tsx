import { getChats } from '@/features/chat/actions/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DeleteButton } from './DeleteButton';

export async function Sidebar() {
  const chats = await getChats();

  return (
    <aside className="w-64 bg-gray-100 p-4 flex flex-col h-screen">
      <Link href="/" className="mb-4">
        <Button className="w-full">+ New Chat</Button>
      </Link>
      <ScrollArea className="flex-1">
        <nav className="space-y-2">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              href={`/chat/${chat.id}`}
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-200"
            >
              <span className="truncate">{chat.id}</span>
              <DeleteButton id={chat.id} />
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
