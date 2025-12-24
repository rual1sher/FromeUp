import { useState } from "react";
import { Paperclip, SendHorizontalIcon, Smile, Sticker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageList } from "./message/message-list";

export function ChatComponent() {
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages((el) => [...el]);

    setMessage("");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-300 backdrop-blur-md">
      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto space-y-4">
        <MessageList messages={messages} currentUserId={1} />
      </div>

      <div className="border-t border-white/20 dark:border-white/10 bg-white dark:bg-black/30 backdrop-blur-md px-4 py-3">
        <div className="flex items-center gap-1 md:gap-3">
          <Button variant="outline" className="p-0 rounded-md">
            <label className="w-12 h-full flex items-center justify-center cursor-pointer">
              <Paperclip size={20} />
              <input type="file" className="hidden" />
            </label>
          </Button>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-1.5 rounded-md bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-gray-200 focus:outline-none text-gray-900 dark:text-white"
            placeholder="Написать сообщение..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            variant="outline"
            className="rounded-md"
            onClick={() => handleSend()}
          >
            <SendHorizontalIcon size={20} />
          </Button>

          <span className="hidden md:inline-block space-x-3">
            <Button variant="outline" className="rounded-md">
              <Smile size={20} />
            </Button>

            <Button variant="outline" className="rounded-md">
              <Sticker size={20} />
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
