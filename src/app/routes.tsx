import { createBrowserRouter, Navigate } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ProfessionSelect from "./pages/ProfessionSelect";
import HomeAuthenticated from "./pages/HomeAuthenticated";
import MySkills from "./pages/MySkills";
import SkillDetail from "./pages/SkillDetail";
import SkillRunner from "./pages/SkillRunner";
import NotFound from "./pages/NotFound";

// 受保护路由组件
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin size-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// 登录页路由组件
function LoginRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin size-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginRoute>
        <LandingPage />
      </LoginRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <LoginRoute>
        <Login />
      </LoginRoute>
    ),
  },
  {
    path: "/select-profession",
    element: (
      <ProtectedRoute>
        <ProfessionSelect />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomeAuthenticated />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-skills",
    element: (
      <ProtectedRoute>
        <MySkills />
      </ProtectedRoute>
    ),
  },
  {
    path: "/skill/:skillId",
    element: (
      <ProtectedRoute>
        <SkillDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/run/:id",
    element: (
      <ProtectedRoute>
        <SkillRunner />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);