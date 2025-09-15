import { UIMessage } from "ai";
import { ChatPanel } from "./ChatPanel";

export function ChatClientComponent({
  chatId,
  initialMessages
}: {
  chatId: string;
  initialMessages: UIMessage[];
}) {

  return (
    <ChatPanel
      chatId={chatId}
      initialMessages={initialMessages}
    />
  );
}