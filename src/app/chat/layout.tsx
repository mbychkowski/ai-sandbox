import { Sidebar } from '@/components/Sidebar';

type ChatLayoutProps = {
  children: React.ReactNode;
  params: {
    chatId: string;
  };
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
