import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-900">404</h1>
          <div className="mt-2 h-1 w-24 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl text-gray-900 mb-3">Страница не найдена</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Страница, которую ты ищешь, не найдена. Возможно, она была
            перемещена или никогда не существовала.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-md"
          >
            <Home size={20} />
            Вернуться на главную
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-900 border-2 border-gray-200 transition-all"
          >
            <ArrowLeft size={20} />
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
