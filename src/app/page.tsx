import { Sidebar } from '@/features/chat/components/Sidebar';
import { ChatPanel } from '@/features/chat/components/ChatPanel';

export default function Home() {
  return (
    <main className="flex h-screen">
      <div className="w-1/4 p-4">
        <Sidebar />
      </div>
      <div className="w-3/4 p-4">
        <ChatPanel />
      </div>
    </main>
  );
}