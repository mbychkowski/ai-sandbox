import { ChatPanel } from '@/components/ChatPanel';

export default function Page() {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col flex-grow h-full">
      <ChatPanel />
    </div>
  );
}