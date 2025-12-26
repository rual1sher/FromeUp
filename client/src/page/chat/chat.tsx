import { ChatComponent } from "@/components/chat/chat";
import { GroupCardComponent } from "@/components/group/group";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useGroupStore } from "@/store/group.store";

export default function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { groups, loadGroups } = useGroupStore();

  function handleChat(nickname: string) {
    searchParams.set("chat", nickname);
    setSearchParams(searchParams);
  }

  useEffect(() => {
    loadGroups();
  }, []);

  const chatName = searchParams.get("chat");

  if (!groups.length) {
    return (
      <p className="text-gray-500 text-sm text-center w-full mt-10 ">
        Группы не найдены!
      </p>
    );
  }

  return (
    <div className="grid lg:grid-cols-6 w-full h-screen">
      <div
        className={cn(
          "hidden w-full h-fit gap-2 py-3 overflow-auto px-2 lg:grid relative",
          chatName
            ? "col-span-1"
            : "col-span-6 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
        )}
      >
        {groups?.map((el, i) => (
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
