import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-(--surface) backdrop-blur-md text-center px-6">
      <h1 className="text-7xl font-bold tracking-tight text-foreground animate-pulse">
        404
      </h1>

      <p className="mt-4 text-lg text-(--foreground-muted) max-w-md">
        Страница, которую ты ищешь, не найдена. Возможно, она была перемещена
        или никогда не существовала.
      </p>

      <Link
        to="/"
        className="mt-8 px-6 py-3 rounded-xl font-medium bg-accent text-accent-foreground hover:opacity-90 transition-all duration-300 shadow-[0_0_15px_var(--accent)]"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
