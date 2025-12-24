export function GroupCardComponent({ group }: { group: any }) {
  return (
    <div className="flex lg:flex-col items-center gap-4 p-4 cursor-pointer border border-gray-100 shadow-sm rounded-md">
      <img
        src={group.image}
        alt={group.name}
        loading="lazy"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h2 className="font-semibold text-[12px] xl:text-[14px]">
          {group.name}
        </h2>
        <p className="text-xs text-gray-500">@{group.nickname}</p>
      </div>
    </div>
  );
}
