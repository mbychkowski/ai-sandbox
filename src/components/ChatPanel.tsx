'use client';

import { useChat } from '@ai-sdk/react';
import { UIMessage } from 'ai';
import { SendHorizonal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function ChatPanel({
  chatId,
  initialMessages,
}: {
  chatId?: string;
  initialMessages?: UIMessage[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState('');

  const { messages, sendMessage } = useChat({
    messages: initialMessages
  });

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
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
    setInput('');
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Gemini</CardTitle>
        <CardDescription>
          This is a demo of the Gemini Pro model with the Vercel AI SDK.
        </CardDescription>
      </CardHeader>
      <CardContent ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role !== 'user' && (
                <Avatar>
                  <AvatarImage src="/gemini-avatar.png" />
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800'
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
              {message.role === 'user' && (
                <Avatar>
                  <AvatarImage src="/user-avatar.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center space-x-2"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Mr Anderson..."
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <SendHorizonal className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
