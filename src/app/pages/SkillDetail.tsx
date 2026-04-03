import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Download, Star, Users, Calendar, ExternalLink, Settings, Check, Play } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { mockSkills } from "../data/skills";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import * as Icons from "lucide-react";

export default function SkillDetail() {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [isInstalling, setIsInstalling] = useState(false);
  
  const skill = mockSkills.find(s => s.id === skillId);

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Skill 未找到</h2>
          <Button onClick={() => navigate("/home")}>返回首页</Button>
        </div>
      </div>
    );
  }

  // 判断是否已安装
  const isInstalled = user?.userType === "openclaw"
    ? user.openclawInstalledSkills?.includes(skill.id)
    : user?.installedSkills.includes(skill.id);

  // 一键安装
  const handleInstall = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsInstalling(true);
    
    // 模拟安装过程
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (user.userType === "registered") {
      // 注册用户：添加到平台安装列表
      updateUser({
        installedSkills: [...user.installedSkills, skill.id],
      });
      toast.success(`${skill.name} 安装成功！`, {
        description: "你现在可以开始使用这个 Skill 了",
      });
    } else {
      // OpenClaw用户：提示需要在OpenClaw中安装
      toast.info("请在 OpenClaw 中安装此 Skill", {
        description: `运行命令: openclaw skill install ${skill.openclawSkillName}`,
      });
    }

    setIsInstalling(false);
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="size-12" /> : <ExternalLink className="size-12" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="size-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                {getIcon(skill.icon)}
              </div>
              <div>
                <h1 className="text-xl font-bold">{skill.name}</h1>
                <p className="text-xs text-slate-500">{skill.category}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Card */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-xl text-blue-600">
                        {getIcon(skill.icon)}
                      </div>
                      <div>
                        <CardTitle className="text-3xl">{skill.name}</CardTitle>
                        <CardDescription className="text-base mt-1">
                          {skill.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{skill.rating}</span>
                    <span className="text-slate-500 text-sm">(128 评价)</span>
                  </div>
                  <Separator orientation="vertical" className="h-6" />
                  <div className="flex items-center gap-1 text-slate-600">
                    <Download className="size-4" />
                    <span>{skill.downloads.toLocaleString()} 下载</span>
                  </div>
                  <Separator orientation="vertical" className="h-6" />
                  <Badge variant="outline">{skill.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {isInstalled ? (
                    <>
                      <Button 
                        size="lg" 
                        className="flex-1"
                        onClick={() => navigate(`/run/${skill.id}`)}
                      >
                        <Play className="size-5 mr-2" />
                        运行 Skill
                      </Button>
                      <Button size="lg" variant="outline">
                        <Settings className="size-5" />
                      </Button>
                    </>
                  ) : (
                    <Button size="lg" className="flex-1" onClick={handleInstall}>
                      {isInstalling ? (
                        <Check className="size-5 mr-2 animate-spin" />
                      ) : (
                        <Download className="size-5 mr-2" />
                      )}
                      安装到 OpenClaw
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">概述</TabsTrigger>
                <TabsTrigger value="features">功能特性</TabsTrigger>
                <TabsTrigger value="usage">使用说明</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>关于此 Skill</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 leading-relaxed">
                      {skill.name} 是一个强大的 OpenClaw Skill，通过 Auto Craft 的可视化界面，
                      你可以轻松使用其所有功能，无需记忆复杂的命令行参数。
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      {skill.description}
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">✨ 为什么选择此 Skill？</h4>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li>• 简单易用的可视化界面</li>
                        <li>• 高效稳定的执行性能</li>
                        <li>• 活跃的社区支持</li>
                        <li>• 持续更新和维护</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>核心功能</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg h-fit">
                          <Star className="size-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">智能处理</h4>
                          <p className="text-sm text-slate-600">
                            自动识别和处理各种输入格式，无需手动配置
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg h-fit">
                          <Settings className="size-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">灵活配置</h4>
                          <p className="text-sm text-slate-600">
                            通过直观的界面调整参数，实时预览效果
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex gap-3">
                        <div className="bg-green-100 p-2 rounded-lg h-fit">
                          <Download className="size-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">批量操作</h4>
                          <p className="text-sm text-slate-600">
                            支持同时处理多个任务，提高工作效率
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="usage" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>快速开始</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">1. 安装 Skill</h4>
                      <p className="text-sm text-slate-600 mb-2">
                        点击"安装到 OpenClaw"按钮，Auto Craft 将自动完成安装配置
                      </p>
                      <div className="bg-slate-100 p-3 rounded-lg font-mono text-sm">
                        openclaw skill install {skill.name.toLowerCase().replace(/\s+/g, '-')}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">2. 打开可视化界面</h4>
                      <p className="text-sm text-slate-600">
                        安装完成后，点击"打开 Skill 界面"即可开始使用，无需任何命令行操作
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">3. 配置和使用</h4>
                      <p className="text-sm text-slate-600">
                        在可视化界面中设置参数，点击执行按钮即可完成操作
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Skill 信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Users className="size-4" />
                    作者
                  </span>
                  <span className="font-medium">OpenClaw Team</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Calendar className="size-4" />
                    更新时间
                  </span>
                  <span className="font-medium">2026-03-28</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">版本</span>
                  <Badge>v2.1.0</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">许可证</span>
                  <span className="font-medium text-sm">MIT</span>
                </div>
              </CardContent>
            </Card>

            {/* Status Card */}
            {isInstalled && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                    运行状态
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-800">
                    此 Skill 已安装并正常运行
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Related Skills */}
            <Card>
              <CardHeader>
                <CardTitle>相关 Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockSkills
                  .filter(s => s.category === skill.category && s.id !== skill.id)
                  .slice(0, 3)
                  .map(relatedSkill => (
                    <div
                      key={relatedSkill.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
                      onClick={() => navigate(`/skill/${relatedSkill.id}`)}
                    >
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        {getIcon(relatedSkill.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{relatedSkill.name}</p>
                        <p className="text-xs text-slate-500">⭐ {relatedSkill.rating}</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}