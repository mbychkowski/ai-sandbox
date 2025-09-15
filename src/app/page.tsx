import { Sidebar } from '@/features/chat/components/Sidebar';
import { ChatPanel } from '@/features/chat/components/ChatPanel';
import { ChatClientComponent } from '@/features/chat/components/ChatClientComponent';

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <ChatClientComponent
          chatId=''
          initialMessages={[]}
        />
      </main>
    </div>
  );
}
