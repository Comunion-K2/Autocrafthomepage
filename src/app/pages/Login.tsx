import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Mail, Sparkles, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../types/user";

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const initialMode = searchParams.get("mode") === "openclaw" ? "openclaw" : "register";
  const [activeTab, setActiveTab] = useState(initialMode);

  // 邮箱注册表单
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // OpenClaw授权表单
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = () => {
    // TODO: 实际发送验证码逻辑
    setCodeSent(true);
    setCountdown(60);
    console.log("发送验证码到:", email);
  };

  const handleEmailRegister = () => {
    // TODO: 验证验证码
    const newUser: User = {
      id: Date.now().toString(),
      email,
      userType: "registered",
      installedSkills: [],
      createdAt: new Date().toISOString(),
    };
    
    // 跳转到职业选择
    login(newUser);
    navigate("/select-profession");
  };

  const handleOpenClawAuth = () => {
    // TODO: 验证API Key
    const newUser: User = {
      id: Date.now().toString(),
      userType: "openclaw",
      openclawApiKey: apiKey,
      openclawInstalledSkills: ["gstack", "1", "2", "4", "7"], // Mock: 模拟从OpenClaw获取的已安装skills，gstack放第一个
      installedSkills: [],
      createdAt: new Date().toISOString(),
    };
    
    // 跳转到职业选择
    login(newUser);
    navigate("/select-profession");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
              <Sparkles className="size-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            欢迎来到 Auto Craft
          </h1>
          <p className="text-slate-600">选择你的登录方式，开启 AI 生产力之旅</p>
        </div>

        {/* Login Cards */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="register" className="text-base py-3">
              <Mail className="size-4 mr-2" />
              邮箱注册
            </TabsTrigger>
            <TabsTrigger value="openclaw" className="text-base py-3">
              <Zap className="size-4 mr-2" />
              OpenClaw 授权
            </TabsTrigger>
          </TabsList>

          {/* 邮箱注册 */}
          <TabsContent value="register">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>邮箱注册</CardTitle>
                <CardDescription>
                  推荐：<span className="font-semibold">个人、AI爱好者、自媒体、自由职业者</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="size-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-blue-900 mb-1">平台托管模式</p>
                      <ul className="text-blue-800 space-y-1">
                        <li>• 无需配置，开箱即用</li>
                        <li>• 平台统一 API，按次计费</li>
                        <li>• 数据安全存储在我们的数据库</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱地址</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={codeSent}
                    />
                    {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <span>⚠️</span> 请输入正确的邮箱格式
                      </p>
                    )}
                  </div>

                  {!codeSent ? (
                    <Button
                      className="w-full"
                      onClick={handleSendCode}
                      disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                    >
                      发送验证码
                    </Button>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="code">验证码</Label>
                        <div className="flex gap-2">
                          <Input
                            id="code"
                            type="text"
                            placeholder="请输入6位验证码"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            maxLength={6}
                          />
                          <Button
                            variant="outline"
                            onClick={handleSendCode}
                            disabled={countdown > 0}
                            className="whitespace-nowrap"
                          >
                            {countdown > 0 ? `${countdown}秒` : "重新发送"}
                          </Button>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={handleEmailRegister}
                        disabled={verificationCode.length !== 6}
                      >
                        下一步
                        <ArrowRight className="size-4 ml-2" />
                      </Button>
                    </>
                  )}
                </div>

                <p className="text-xs text-slate-500 text-center">
                  注册即表示你同意我们的服务条款和隐私政策
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* OpenClaw授权 */}
          <TabsContent value="openclaw">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>OpenClaw API 授权</CardTitle>
                <CardDescription>
                  推荐：<span className="font-semibold">AI专业人士、互联网从业者、团队、创业者</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="size-5 text-purple-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-purple-900 mb-1">自主掌控模式</p>
                      <ul className="text-purple-800 space-y-1">
                        <li>• 使用你自己的 OpenClaw API Key</li>
                        <li>• 直接调用你的配置，无需额外付费</li>
                        <li>• 自动匹配你已安装的 Skills</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">OpenClaw API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="sk-oc-xxxxxxxxxxxxxxxx"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-xs text-slate-500">
                      在 OpenClaw 控制台获取你的 API Key
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleOpenClawAuth}
                    disabled={!apiKey || apiKey.length < 10}
                  >
                    授权并继续
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-sm text-slate-700 mb-2">
                    <span className="font-semibold">如何获取 API Key？</span>
                  </p>
                  <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside">
                    <li>访问 OpenClaw 官网并登录</li>
                    <li>进入"设置" - "API Keys"</li>
                    <li>创建新的 API Key 并复制</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
          >
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
}