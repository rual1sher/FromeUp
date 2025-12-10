import { useState } from "react";
import { Paperclip, SendHorizontalIcon, Smile, Sticker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageList } from "./message/message-list";
import { messageData, userData } from "@/data/index";

export function ChatComponent() {
  const [messages, setMessages] = useState(messageData);

  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages((el) => [
      ...el,
      {
        id: `m${Math.random() * 20}`,
        authorId: 1,
        text: message,
        createdAt: new Date().toISOString(),
        author: userData[0],
      },
    ]);

    setMessage("");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-300 backdrop-blur-md">
      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {!messages.length && (
          <p className="text-gray-500 text-sm text-center mt-10">
            Чат пока пуст. Напишите что-нибудь!
          </p>
        )}
        <MessageList messages={messages} currentUserId={1} />
      </div>

      <div className="border-t border-white/20 dark:border-white/10 bg-white dark:bg-black/30 backdrop-blur-md px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="outline" className="p-0">
            <label className="w-12 h-8 flex items-center justify-center cursor-pointer">
              <Paperclip size={20} />
              <input type="file" className="hidden" />
            </label>
          </Button>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-gray-200 focus:outline-none text-gray-900 dark:text-white"
            placeholder="Написать сообщение..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button variant="outline" onClick={() => handleSend()}>
            <SendHorizontalIcon size={20} />
          </Button>

          <Button variant="outline">
            <Smile size={20} />
          </Button>

          <Button variant="outline">
            <Sticker size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
