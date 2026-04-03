import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Search, Sparkles, User, LogOut, AlertCircle, Download } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import { mockSkills } from "../data/skills";
import { useAuth } from "../contexts/AuthContext";
import * as Icons from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();

  // 临时修复函数：把gstack添加到已安装列表
  const fixGstackInstallation = () => {
    if (user?.userType === "openclaw" && user.openclawInstalledSkills) {
      if (!user.openclawInstalledSkills.includes("gstack")) {
        updateUser({
          openclawInstalledSkills: ["gstack", ...user.openclawInstalledSkills]
        });
        window.location.reload(); // 刷新页面
      }
    }
  };

  const filteredSkills = mockSkills.filter(skill =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 获取已安装的skills
  const installedSkills = useMemo(() => {
    if (!user) return [];
    
    if (user.userType === "openclaw") {
      // OpenClaw用户：显示OpenClaw中已安装的skills
      return mockSkills.filter(skill => 
        user.openclawInstalledSkills?.includes(skill.id)
      );
    } else {
      // 注册用户：显示在平台安装的skills
      return mockSkills.filter(skill => 
        user.installedSkills.includes(skill.id)
      );
    }
  }, [user]);

  // 获取推荐skills
  const recommendedSkills = useMemo(() => {
    if (!user || !user.profession) return mockSkills.slice(0, 4);
    
    // 基于职业推荐
    const professionBased = mockSkills.filter(skill => 
      skill.recommendedProfessions?.includes(user.profession!) &&
      !installedSkills.some(installed => installed.id === skill.id)
    );

    // 热门skills
    const popular = mockSkills
      .filter(skill => !installedSkills.some(installed => installed.id === skill.id))
      .sort((a, b) => b.downloads - a.downloads);

    // 合并并去重
    const combined = [...professionBased, ...popular];
    const unique = combined.filter((skill, index, self) => 
      index === self.findIndex(s => s.id === skill.id)
    );

    return unique.slice(0, 4);
  }, [user, installedSkills]);

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="size-8" /> : <Sparkles className="size-8" />;
  };

  const handleSkillClick = (skill: typeof mockSkills[0]) => {
    if (user?.userType === "openclaw") {
      // OpenClaw用户点击灰度skill
      if (user.openclawInstalledSkills?.includes(skill.id) && !skill.availableInPlatform) {
        return; // 显示提示弹窗（下面会处理）
      }
    }
    navigate(`/skill/${skill.id}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <Sparkles className="size-6 text-white" />
              </div>
              <div>
                <h1 
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
                  onDoubleClick={fixGstackInstallation}
                  title="双击修复gstack安装"
                >
                  Auto Craft
                </h1>
                <p className="text-xs text-slate-500">
                  {user?.userType === "openclaw" ? "OpenClaw 授权模式" : "平台托管模式"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right mr-2">
                <p className="text-sm font-medium">{user?.email || "OpenClaw 用户"}</p>
                <p className="text-xs text-slate-500">
                  {user?.profession && professionLabels[user.profession]}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleLogout}
                title="退出登录"
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <Input
              type="text"
              placeholder="搜索 Skills... （例如：代码分析、文件管理、数据采集）"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg border-2 focus:border-blue-500 rounded-xl shadow-sm"
            />
          </div>
        </div>

        {/* 已安装Skills */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <User className="size-6 text-blue-600" />
              我的 Skills
              <Badge variant="secondary">{installedSkills.length}</Badge>
            </h3>
            {user?.userType === "openclaw" && installedSkills.length > 0 && (
              <p className="text-sm text-slate-500">
                从你的 OpenClaw 自动匹配
              </p>
            )}
          </div>

          {installedSkills.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Sparkles className="size-16 text-slate-300 mb-4" />
                <p className="text-slate-500 text-lg mb-2">
                  {user?.userType === "openclaw" 
                    ? "你的 OpenClaw 中还没有安装我们支持的 Skills"
                    : "你还没有安装任何 Skills"}
                </p>
                <p className="text-slate-400 text-sm">
                  浏览下方推荐，找到适合你的 Skills
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {installedSkills.map((skill) => {
                const isAvailable = skill.availableInPlatform;
                return (
                  <Card
                    key={skill.id}
                    className={`transition-all cursor-pointer border-2 group ${
                      isAvailable
                        ? "hover:shadow-lg hover:border-blue-300"
                        : "opacity-60 bg-slate-50"
                    }`}
                    onClick={() => isAvailable && handleSkillClick(skill)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className={`p-3 rounded-lg ${
                          isAvailable 
                            ? "bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 group-hover:scale-110"
                            : "bg-slate-200 text-slate-400"
                        } transition-transform`}>
                          {getIcon(skill.icon)}
                        </div>
                        {isAvailable ? (
                          <Badge className="bg-green-100 text-green-700">
                            已安装
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-slate-300 text-slate-600">
                            待支持
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{skill.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {skill.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>⭐ {skill.rating}</span>
                        <span>↓ {(skill.downloads / 1000).toFixed(1)}K</span>
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {skill.category}
                      </Badge>
                    </CardContent>
                    {!isAvailable && user?.userType === "openclaw" && (
                      <CardFooter>
                        <Alert>
                          <AlertCircle className="size-4" />
                          <AlertDescription className="text-xs">
                            推荐 Apexunit 团队迅猛开发
                          </AlertDescription>
                        </Alert>
                      </CardFooter>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* 推荐Skills */}
        {!searchQuery && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="size-6 text-purple-600" />
                为你推荐
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedSkills.map((skill) => (
                <Card
                  key={skill.id}
                  className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-purple-300 group"
                  onClick={() => handleSkillClick(skill)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-lg text-purple-600 group-hover:scale-110 transition-transform">
                        {getIcon(skill.icon)}
                      </div>
                      {user?.profession && skill.recommendedProfessions?.includes(user.profession) && (
                        <Badge className="bg-purple-100 text-purple-700">
                          职业推荐
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {skill.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>⭐ {skill.rating}</span>
                      <span>↓ {(skill.downloads / 1000).toFixed(1)}K</span>
                    </div>
                    <Badge variant="outline" className="mt-2">
                      {skill.category}
                    </Badge>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">
                      查看详情
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 搜索结果 */}
        {searchQuery && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                搜索结果
              </h3>
              <p className="text-slate-500">找到 {filteredSkills.length} 个结果</p>
            </div>

            {filteredSkills.length === 0 ? (
              <div className="text-center py-12">
                <Search className="size-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">没有找到匹配的 Skills</p>
                <p className="text-slate-400 text-sm mt-2">试试其他关键词</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSkills.map((skill) => {
                  const isInstalled = installedSkills.some(s => s.id === skill.id);
                  return (
                    <Card
                      key={skill.id}
                      className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-300 group"
                      onClick={() => handleSkillClick(skill)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                            {getIcon(skill.icon)}
                          </div>
                          {isInstalled && (
                            <Badge className="bg-green-100 text-green-700">
                              已安装
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{skill.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {skill.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>⭐ {skill.rating}</span>
                          <span>↓ {(skill.downloads / 1000).toFixed(1)}K</span>
                        </div>
                        <Badge variant="outline" className="mt-2">
                          {skill.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

// 职业标签映射
const professionLabels: Record<string, string> = {
  "individual": "个人用户",
  "ai-enthusiast": "AI爱好者",
  "content-creator": "自媒体",
  "freelancer": "自由职业者",
  "ai-professional": "AI专业人士",
  "internet-professional": "互联网从业者",
  "team": "团队",
  "entrepreneur": "创业者",
};