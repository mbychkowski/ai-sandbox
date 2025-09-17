'use client';

import { useChat } from '@ai-sdk/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { saveChat } from '@/features/chat/actions/save-chat';

/**
 * A client component that renders a button to save the current chat session.
 *
 * It uses the `useChat` hook to access the current list of messages and
 * calls a server action (`saveChat`) to persist them. It provides user
 * feedback by disabling the button and showing a loading state during the
 * save operation. After a successful save, it navigates to the new chat's
 * unique URL.
 */
export function ChatSaveButton() {
  const { messages } = useChat();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    // Prevent saving if there are no messages or if a save is already in progress.
    if (messages.length === 0 || isSaving) {
      return;
    }

    setIsSaving(true);
    try {
      // Call the server action to save the chat.
      const newChat = await saveChat(messages);
      if (newChat?.id) {
        // On success, show a confirmation toast and navigate to the new chat page.
        toast.success('Chat saved successfully!');
        router.push(`/chat/${newChat.id}`);
      }
    } catch (error) {
      // On failure, show an error toast.
      toast.error('Failed to save chat. Please try again.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      onClick={handleSave}
      disabled={isSaving || messages.length === 0}
      variant="outline"
      size="sm"
    >
      {isSaving ? 'Saving...' : 'Save Chat'}
    </Button>
  );
}
