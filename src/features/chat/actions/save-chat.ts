'use server';

import { type UIMessage } from 'ai';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';

/**
 * Saves a chat session to the database.
 *
 * This server action takes an array of messages, validates them,
 * and persists them as a new chat session. It creates a title
 * from the first user message and uses a Prisma transaction
 * to ensure that the chat and all its associated messages are
 * created atomically.
 *
 * @param messages - An array of message objects to be saved.
 * @returns The ID of the newly created chat.
 * @throws If the chat is empty or a database error occurs.
 */
export async function saveChat(messages: UIMessage[]) {
  if (messages.length === 0) {
    // Prevent saving empty chats.
    return;
  }

  // Generate a title for the chat from the first 20 characters
  // of the first message, appending "..." if it's longer.
  const firstMessage = messages[0].content;
  const title =
    firstMessage.length > 20
      ? `${firstMessage.substring(0, 20)}...`
      : firstMessage;

  let newChat;
  try {
    // Use a transaction to ensure atomicity. The chat and its messages
    // are either all created successfully, or none are.
    newChat = await prisma.$transaction(async (tx) => {
      const chat = await tx.chat.create({
        data: {
          title,
        },
      });

      // Create all message records linked to the new chat.
      await tx.message.createMany({
        data: messages.map((message) => ({
          chatId: chat.id,
          role: message.role,
          content: message.content
        })),
      });

      return chat;
    });
  } catch (error) {
    // In case of a database error, log it for debugging
    // and re-throw to be handled by the caller.
    console.error('Failed to save chat:', error);
    throw new Error('An unexpected error occurred while saving the chat.');
  }

  // After a successful save, revalidate the cache for the home page.
  // This ensures that the sidebar's chat list is updated immediately.
  revalidatePath('/');

  // Return the ID of the new chat.
  return {
    id: newChat.id,
  };
}