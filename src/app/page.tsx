import { ChatPanel } from '@/components/ChatPanel';
import { Sidebar } from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <ChatPanel
          chatId={''}
          initialMessages={[]}
        />
      </main>
    </div>
  );
}
