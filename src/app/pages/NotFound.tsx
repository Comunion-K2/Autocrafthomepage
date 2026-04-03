import { useNavigate } from "react-router";
import { Home, SearchX } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <SearchX className="size-24 text-slate-300 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">页面未找到</h2>
        <p className="text-slate-600 mb-8">
          抱歉，你访问的页面不存在
        </p>
        <Button onClick={() => navigate("/")} size="lg">
          <Home className="size-5 mr-2" />
          返回首页
        </Button>
      </div>
    </div>
  );
}
