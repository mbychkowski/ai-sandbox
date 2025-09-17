"use client";

import { useChat } from "@ai-sdk/react";
import { UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// The ChatPanel is now a "dumb" component that receives all state and handlers as props
export function ChatPanel({
  chatId,
  initialMessages,
}: {
  chatId: string;
  initialMessages: UIMessage[];
}) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");

  const { messages, sendMessage } = useChat({
    messages: initialMessages
  });

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              {message.role !== "user" && (
                <Avatar>
                  <AvatarImage src="/gemini-logo.png" alt="AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-[75%] ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                }`}
              >
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return <div key={`${message.id}-${i}`}>{part.text}</div>;
                    case 'tool-weather':
                    case 'tool-convertFahrenheitToCelsius':
                      return (
                        <pre key={`${message.id}-${i}`}>
                          {JSON.stringify(part, null, 2)}
                        </pre>
                      );
                    }
                  })
                }
              </div>
              {message.role === "user" && (
                <Avatar>
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Input
            name="message"
            placeholder="Type your message..."
            className="flex-1"
            onChange={handleInputChange}
            value={input}
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}
