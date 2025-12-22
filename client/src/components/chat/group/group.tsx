import { Card, CardContent } from "@/components/ui/card";

export function GroupCardComponent({ group }: { group: any }) {
  return (
    <Card className="flex items-center gap-4 p-4 cursor-pointer">
      <img
        src={group.image}
        alt={group.name}
        loading="lazy"
        className="w-12 h-12 rounded-full object-cover"
      />
      <CardContent className="p-0">
        <h2 className="font-semibold text-[12px] xl:text-[14px]">
          {group.name}
        </h2>
        <p className="text-xs text-gray-500">@{group.nickname}</p>
      </CardContent>
    </Card>
  );
}
