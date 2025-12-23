import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message } from "@/types/type";

type Props = {
  message: Message;
  isOwn?: boolean;
};

export function MessageItem({ message, isOwn = false }: Props) {
  const date = new Date(message.createdAt).toLocaleString();

  return (
    <div className={`flex gap-3 ${isOwn ? "justify-end" : "justify-start"}`}>
      {!isOwn && (
        <Avatar>
          <AvatarImage
            src={message.author?.avatar || "anime-default-pfp-5.jpg"}
            alt={message.id}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}

      <div className={`max-w-[70%]`}>
        <div
          className={`px-4 py-2 rounded-xl ${
            isOwn ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-neutral-800"
          }`}
        >
          <div className="text-sm">{message.text}</div>
        </div>

        <div className="text-[11px] opacity-60 mt-1">{date}</div>
      </div>

      {isOwn && (
        <Avatar>
          <AvatarImage
            src={message.author?.avatar || "anime-default-pfp-5.jpg"}
            alt={message.id}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
