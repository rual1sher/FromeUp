import { ChatComponent } from "@/components/chat/chat";
import { GroupCardComponent } from "@/components/chat/group/group";
import { GroupData } from "@/data";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router";

export function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChat(nickname: string) {
    searchParams.set("chat", nickname);
    setSearchParams(searchParams);
  }

  const chatName = searchParams.get("chat");
  return (
    <div className="grid lg:grid-cols-6 w-full h-screen">
      <div
        className={cn(
          "hidden w-full h-fit gap-2 py-3 overflow-auto px-2 lg:grid",
          chatName
            ? "col-span-1"
            : "col-span-6 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
        )}
      >
        {GroupData?.map((el, i) => (
          <span key={i} onClick={() => handleChat(el.nickname)}>
            <GroupCardComponent group={el} />
          </span>
        ))}
      </div>

      {chatName && (
        <span className={cn("lg:col-span-5")}>
          <ChatComponent />
        </span>
      )}
    </div>
  );
}
