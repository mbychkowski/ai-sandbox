
'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

/**
 * A client component that renders a button to start a new chat.
 *
 * When clicked, it navigates the user to the root of the application,
 * effectively clearing the current chat session from the view and
 * allowing a new conversation to begin.
 */
export function NewChatButton() {
  const router = useRouter();

  const handleNewChat = () => {
    // Navigate to the home page to start a new chat.
    router.push('/');
  };

  return (
    <Button onClick={handleNewChat} variant="outline" size="sm">
      New Chat
    </Button>
  );
}
