import { useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, ArrowRight, Check, Zap, Shield, Rocket } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
              <Sparkles className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Auto Craft
              </h1>
              <p className="text-xs text-slate-500">自动工坊</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              🎉 让 AI 技能像微信小程序一样简单可用
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI 技能，一键即用
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            无需学习复杂的命令行，无需配置繁琐的参数。
            <br />
            Auto Craft 为你提供可视化的 AI 技能界面，让每个人都能享受 AI 生产力。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => navigate("/login?mode=register")}
            >
              <Sparkles className="size-5 mr-2" />
              立即体验
              <ArrowRight className="size-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2"
              onClick={() => navigate("/login?mode=openclaw")}
            >
              <Zap className="size-5 mr-2" />
              OpenClaw 授权登录
            </Button>
          </div>

          <p className="text-sm text-slate-500 mt-6">
            已有 <span className="font-semibold text-blue-600">10,000+</span> 用户使用 Auto Craft 提升效率
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-2 hover:border-blue-300 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <Sparkles className="size-8 text-blue-600" />
              </div>
              <CardTitle>零学习成本</CardTitle>
              <CardDescription className="text-base">
                告别命令行，用可视化界面操作所有 AI 技能
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-green-600" />
                  图形化参数配置
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-green-600" />
                  实时预览效果
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-green-600" />
                  一键执行任务
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-purple-300 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <Rocket className="size-8 text-purple-600" />
              </div>
              <CardTitle>强大的技能库</CardTitle>
              <CardDescription className="text-base">
                基于 OpenClaw 生态，集成海量优质 AI 技能
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-green-600" />
                  代码分析优化
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-green-600" />
                  文件自动整理
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-green-600" />
                  内容创作辅助
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-300 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                <Shield className="size-8 text-green-600" />
              </div>
              <CardTitle>灵活的使用方式</CardTitle>
              <CardDescription className="text-base">
                支持平台 API 或使用你自己的 OpenClaw 配置
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-green-600" />
                  平台托管，按量付费
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-green-600" />
                  自带 API，完全掌控
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-green-600" />
                  数据安全可靠
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-4xl font-bold mb-4">
            准备好提升你的生产力了吗？
          </h3>
          <p className="text-xl mb-8 opacity-90">
            现在开始，让 AI 成为你的得力助手
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8 py-6"
            onClick={() => navigate("/login?mode=register")}
          >
            免费开始使用
            <ArrowRight className="size-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-500 text-sm">
            <p className="mb-2">© 2026 Auto Craft by Apexunit Team</p>
            <p>用硅基智慧，服务碳基需求</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
