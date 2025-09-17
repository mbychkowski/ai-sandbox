import { Suspense } from 'react';

import { Spinner } from '@/components/Spinner';
import ThemeSwitcher from '@/components/theme/theme-switcher';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatList } from '@/features/chat/components/chat-list';
import { ChatSaveButton } from '@/features/chat/components/chat-save-button';
import { NewChatButton } from '@/features/chat/components/new-chat-button';

export function Sidebar() {
  return (
    <aside className="w-64 p-4 flex flex-col h-screen">
      <ScrollArea className="flex-1 -mx-4">
        <nav className="space-y-2 px-4">
          <ThemeSwitcher />
          <Suspense fallback={<Spinner />}>
            <ChatList />
          </Suspense>
        </nav>
      </ScrollArea>
      <div className="mt-auto flex space-x-2">
        <NewChatButton />
        <ChatSaveButton />
      </div>
    </aside>
  );
}
