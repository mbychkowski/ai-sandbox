import { getMessages } from "@/features/chat/actions/actions";
import { ChatClientComponent } from "@/features/chat/components/ChatClientComponent";
import { UIMessage } from "ai";

// This is now a React Server Component (RSC)
export default async function ChatPage({
  params,
}: {
  params: { chatId: string };
}) {
  // 1. Fetch initial data on the server
  const messages = await getMessages(params.chatId);

  // 2. Render the client component, passing server-fetched data as props
  return (
    <ChatClientComponent
      chatId={params.chatId}
      // The 'ai' library expects a specific Message type. We need to map our prisma model.
      initialMessages={messages.map(
        (m) =>
          ({
            id: m.id,
            role: m.role as "user" | "assistant",
            content: m.content,
            parts: [{ type: "text", text: m.content }],
          } as UIMessage)
      )}
    />
  );
}