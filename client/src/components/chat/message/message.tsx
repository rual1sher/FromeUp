import type { Message, User } from "@/types/type";

type Props = {
  message: Message;
  author?: User | null;
  isOwn?: boolean; // если сообщение автора — для стилизации
};

export function MessageItem({ message, isOwn = false }: Props) {
  const date = new Date(message.createdAt);
  const time = date.toLocaleString();

  return (
    <div
      className={`flex gap-3 items-start ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar */}
      {!isOwn && (
        <img
          src={message.author?.avatar || "/anime-default-pfp-5.jpg"}
          alt={message.author?.name || "user"}
          className="w-9 h-9 rounded-full object-cover"
        />
      )}

      {/* Bubble */}
      <div className={`max-w-[70%] ${isOwn ? "text-right" : "text-left"}`}>
        <div
          className={`${
            isOwn
              ? "bg-blue-800 text-white"
              : "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
          } px-4 py-2 rounded-xl shadow-sm`}
        >
          {/* name + text */}
          <div className="text-xs mb-1 text-gray-400">
            {message.author?.name ?? "Неизвестный"}
          </div>

          <div className="whitespace-pre-wrap wrap-break-word">
            {message.text}
          </div>
        </div>

        {/* meta: time */}
        <div className="text-[11px] text-muted-foreground mt-1">{time}</div>
      </div>

      {/* Avatar on right if own */}
      {isOwn && (
        <img
          src={message.author?.avatar || "anime-default-pfp-5.jpg"}
          alt={message.author?.name || "user"}
          className="w-9 h-9 rounded-full object-cover"
        />
      )}
    </div>
  );
}
