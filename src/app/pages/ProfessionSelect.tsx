import { useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { professionOptions } from "../data/professions";
import { Profession } from "../types/user";
import * as Icons from "lucide-react";

export default function ProfessionSelect() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);

  if (!user) {
    navigate("/login");
    return null;
  }

  const recommendedType = user.userType === "openclaw" ? "openclaw" : "registered";
  const recommendedOptions = professionOptions.filter(
    (option) => option.recommendedFor === recommendedType
  );
  const otherOptions = professionOptions.filter(
    (option) => option.recommendedFor !== recommendedType
  );

  const handleContinue = () => {
    if (selectedProfession) {
      updateUser({ profession: selectedProfession });
      navigate("/home");
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="size-6" /> : <Sparkles className="size-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
              <Sparkles className="size-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            选择你的职业身份
          </h1>
          <p className="text-slate-600">
            告诉我们你是谁，我们将为你推荐最适合的 AI Skills
          </p>
        </div>

        {/* Recommended Options */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="size-5 text-blue-600" />
            为你推荐
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedOptions.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedProfession === option.value
                    ? "border-2 border-blue-500 bg-blue-50"
                    : "border-2 hover:border-blue-300"
                }`}
                onClick={() => setSelectedProfession(option.value)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-lg text-blue-600">
                      {getIcon(option.icon)}
                    </div>
                    {selectedProfession === option.value && (
                      <div className="bg-blue-500 text-white rounded-full p-1">
                        <Check className="size-4" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg">{option.label}</CardTitle>
                  <CardDescription className="text-sm">
                    {option.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Options */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-slate-600">
            其他选项
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherOptions.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedProfession === option.value
                    ? "border-2 border-blue-500 bg-blue-50"
                    : "border-2 hover:border-slate-300"
                }`}
                onClick={() => setSelectedProfession(option.value)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-slate-100 p-3 rounded-lg text-slate-600">
                      {getIcon(option.icon)}
                    </div>
                    {selectedProfession === option.value && (
                      <div className="bg-blue-500 text-white rounded-full p-1">
                        <Check className="size-4" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg">{option.label}</CardTitle>
                  <CardDescription className="text-sm">
                    {option.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <Card className="mb-6 border-2 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Sparkles className="size-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-slate-900 mb-2">
                  {user.userType === "registered"
                    ? "💡 平台托管模式提示"
                    : "⚡ OpenClaw 授权模式提示"}
                </p>
                <p className="text-slate-700">
                  {user.userType === "registered" ? (
                    <>
                      你选择了平台托管模式。使用 Skill 时会调用我们的 AI API，
                      <span className="font-semibold text-blue-700"> 按次计费</span>。
                      你的使用数据将安全存储在我们的数据库中。
                    </>
                  ) : (
                    <>
                      你选择了 OpenClaw 授权模式。所有 Skill 将直接调用你的 OpenClaw API，
                      <span className="font-semibold text-purple-700"> 无需额外付费</span>。
                      我们会自动匹配你已安装的 Skills。
                    </>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="px-8"
            onClick={handleContinue}
            disabled={!selectedProfession}
          >
            开始使用 Auto Craft
            <ArrowRight className="size-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
