import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Sparkles, Settings, Trash2, Search, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { mockSkills } from "../data/skills";
import * as Icons from "lucide-react";

export default function MySkills() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const mySkills = mockSkills.filter(skill => skill.installed);
  
  const filteredSkills = mySkills.filter(skill =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="size-8" /> : <Sparkles className="size-8" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="size-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Sparkles className="size-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Auto Craft
                  </h1>
                  <p className="text-xs text-slate-500">我的 Skills</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
            >
              浏览更多 Skills
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">我的 Skills</h2>
          <p className="text-slate-600">
            管理你在 OpenClaw 中已安装的 Skills，点击即可打开可视化界面
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              type="text"
              placeholder="搜索已安装的 Skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats Card */}
        <Card className="mb-8 border-2 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-blue-600" />
              已安装统计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-3xl font-bold text-blue-600">{mySkills.length}</div>
                <p className="text-sm text-slate-600">Skills 总数</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">
                  {new Set(mySkills.map(s => s.category)).size}
                </div>
                <p className="text-sm text-slate-600">涵盖类别</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {mySkills.reduce((sum, s) => sum + s.rating, 0) / mySkills.length || 0}
                </div>
                <p className="text-sm text-slate-600">平均评分</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12">
            <Sparkles className="size-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              {searchQuery ? "没有找到匹配的 Skills" : "你还没有安装任何 Skills"}
            </p>
            <p className="text-slate-400 text-sm mt-2 mb-4">
              {searchQuery ? "试试其他关键词" : "去首页浏览并安装你需要的 Skills"}
            </p>
            {!searchQuery && (
              <Button onClick={() => navigate("/")}>
                浏览 Skills
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <Card
                key={skill.id}
                className="hover:shadow-lg transition-all border-2 hover:border-blue-300 group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                      {getIcon(skill.icon)}
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      运行中
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{skill.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {skill.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <span>⭐ {skill.rating}</span>
                    <span>↓ {(skill.downloads / 1000).toFixed(1)}K</span>
                  </div>
                  <Badge variant="outline">
                    {skill.category}
                  </Badge>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => navigate(`/skill/${skill.id}`)}
                  >
                    <ExternalLink className="size-4 mr-2" />
                    打开界面
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Settings action
                    }}
                  >
                    <Settings className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Delete action
                    }}
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
