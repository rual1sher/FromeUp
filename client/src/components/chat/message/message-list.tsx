import type { Message } from "@/types/type";
import { MessageItem } from "./message";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LucidePanelBottomClose } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slide } from "react-awesome-reveal";
import { useSearchParams } from "react-router";

type Props = {
  messages: Message[];
  currentUserId?: number;
};

export function MessageList({ messages, currentUserId }: Props) {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [isDown, setIsDown] = useState(true);
  const [searchParams] = useSearchParams();

  const handleScroll = () => {
    const el = chatRef.current;
    if (!el) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      setIsDown(true);
    } else {
      setIsDown(false);
    }
  };

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, [searchParams.get("chat")]);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    if (isDown) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative h-full">
      <Button
        variant="ghost"
        className={cn(
          "fixed bottom-20 left-[50%] bg-white text-gray-900 z-10",
          isDown ? "hidden" : "inline-block"
        )}
        onClick={() => {
          const el = chatRef.current;
          if (!el) return;
          el.scrollTop = el.scrollHeight;
          setIsDown(true);
        }}
      >
        <LucidePanelBottomClose size={20} />
      </Button>

      <div
        ref={chatRef}
        className="space-y-4 p-4 overflow-auto scrolled h-full overflow-x-hidden"
      >
        {!messages.length && (
          <p className="text-gray-500 text-sm text-center mt-10">
            Чат пока пуст. Напишите что-нибудь!
          </p>
        )}
        {messages.map((m) => {
          const isOwn = currentUserId === m.authorId;
          return (
            <Slide
              key={m.id}
              direction={isOwn ? "right" : "left"}
              duration={300}
              damping={0.2}
              triggerOnce
            >
              <MessageItem message={m} isOwn={isOwn} />
            </Slide>
          );
        })}
      </div>
    </div>
  );
}
