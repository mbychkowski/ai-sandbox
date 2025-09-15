'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Retrieves a single chat session by its ID.
 * @param id The ID of the chat to fetch.
 * @returns The chat object or null if not found.
 */
export async function getChat(id: string) {
  return prisma.chat.findUnique({
    where: {
      id,
    },
  });
}

/**
 * Fetches all chat sessions, ordered by creation date.
 * @returns A promise that resolves to an array of chats.
 */
export async function getChats() {
  return prisma.chat.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * Deletes a chat session and all its associated messages.
 * After deletion, it revalidates the cache for the root path '/'
 * to ensure the UI updates, and then redirects to the root.
 * @param id The ID of the chat to delete.
 */
export async function deleteChat(id: string) {
  await prisma.chat.delete({
    where: {
      id,
    },
  });

  revalidatePath('/');
  redirect('/');
}

/**
 * Fetches all messages for a given chat session.
 * @param chatId The ID of the chat to get messages for.
 * @returns A promise that resolves to an array of messages.
 */
export async function getMessages(chatId: string) {
  return prisma.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
}
