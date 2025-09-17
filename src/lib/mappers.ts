
import { type Message as dataMessage } from '@prisma/client';
import { type UIMessage as aiMessage } from 'ai';

/**
 * Maps a single Prisma Message (from the database schema) to a UIMessage
 * (the format used by the Vercel AI SDK for the UI).
 *
 * @param {dataMessage} message - The message object from the Prisma schema.
 * @returns {UIMessage} The message object formatted for the UI.
 */
export function schemaToUIMessage(message: dataMessage): aiMessage {
  return {
    id: message.id,
    role: message.role as 'user' | 'assistant' | 'function',
    content: message.content,
    createdAt: message.createdAt,
  };
}

/**
 * Maps an array of Prisma Messages to an array of UIMessages.
 *
 * @param {dataMessage[]} messages - An array of messages from the Prisma schema.
 * @returns {aiMessage[]} An array of messages formatted for the UI.
 */
export function schemaToUIMessages(messages: dataMessage[]): aiMessage[] {
  return messages.map(schemaToUIMessage);
}

/**
 * Maps a single UIMessage to the format required by the Prisma schema.
 * This is useful when you need to save a UI message to the database.
 * Note: This mapper is less common in server actions, where you typically
 * construct the schema object directly from raw data.
 *
 * @param {aiMessage} message - The message object from the UI.
 * @returns {Omit<SchemaMessage, 'chatId' | 'createdAt'>} A partial message
 *   object ready for database insertion (excluding fields like chatId that
 *   are added during the transaction).
 */
export function uiToSchemaMessage(
  message: aiMessage,
): Omit<dataMessage, 'chatId' | 'createdAt'> {
  return {
    id: message.id,
    role: message.role,
    content: message.content,
  };
}
