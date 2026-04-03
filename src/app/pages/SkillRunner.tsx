import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Play, Loader2, CheckCircle2, AlertCircle, Sparkles, TrendingUp, BarChart3, Lightbulb, Target } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { mockSkills } from "../data/skills";
import { toast } from "sonner";

// gstack 的子功能定义
const gstackFeatures = [
  {
    id: "ceo-chat",
    name: "CEO 对话",
    icon: Sparkles,
    description: "与 AI CEO 对话，获得专业的项目评估和建议",
    placeholder: "描述你的创业想法...\n例如：我想做一个帮助开发者管理API的SaaS平台",
  },
  {
    id: "market-analysis",
    name: "市场分析",
    icon: TrendingUp,
    description: "分析目标市场规模、竞争对手和增长机会",
    placeholder: "输入你的产品或服务类型...\n例如：面向中小企业的客户关系管理系统",
  },
  {
    id: "business-model",
    name: "商业模式",
    icon: BarChart3,
    description: "优化你的商业模式画布和收入策略",
    placeholder: "描述你的商业模式...\n例如：订阅制SaaS，按用户数量收费",
  },
  {
    id: "product-roadmap",
    name: "产品路线图",
    icon: Target,
    description: "规划产品功能优先级和开发里程碑",
    placeholder: "列出你的产品核心功能...\n例如：用户管理、数据分析、API集成",
  },
];

export default function SkillRunner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const skill = mockSkills.find(s => s.id === id);

  // gstack 功能选择
  const [selectedFeature, setSelectedFeature] = useState(gstackFeatures[0].id);
  const [inputText, setInputText] = useState("");
  
  // 运行状态
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!skill) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Skill 不存在</CardTitle>
            <CardDescription>找不到这个Skill</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/home")}>返回首页</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 判断是否是gstack skill
  const isGstackSkill = skill.openclawSkillName === "gstack";

  const getCurrentFeature = () => {
    return gstackFeatures.find(f => f.id === selectedFeature) || gstackFeatures[0];
  };

  const handleRun = async () => {
    if (!inputText.trim()) {
      toast.error("请输入内容");
      return;
    }

    setIsRunning(true);
    setError(null);
    setResult(null);

    // 模拟运行过程
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));

      const feature = getCurrentFeature();
      
      // 根据不同功能生成不同的 mock 结果
      const mockResults: Record<string, any> = {
        "ceo-chat": {
          success: true,
          featureName: feature.name,
          response: {
            evaluation: "💡 这是一个很有潜力的想法！",
            strengths: [
              "✅ 市场需求明确，痛点真实存在",
              "✅ 目标用户群体清晰",
              "✅ 商业模式可行"
            ],
            concerns: [
              "⚠️ 需要关注竞品的差异化定位",
              "⚠️ 建议先做MVP验证核心假设",
              "⚠️ 考虑获客成本和用户留存策略"
            ],
            nextSteps: [
              "1. 进行用户访谈，验证需求假设",
              "2. 设计最小可行产品（MVP）",
              "3. 确定初始目标市场细分",
              "4. 制定3-6个月的产品路线图"
            ],
            score: "8.5/10"
          }
        },
        "market-analysis": {
          success: true,
          featureName: feature.name,
          response: {
            marketSize: "全球市场规模：$120B（2024）",
            growth: "年增长率：15-20%",
            competitors: [
              { name: "竞品A", marketShare: "35%", strength: "品牌知名度高" },
              { name: "竞品B", marketShare: "28%", strength: "价格优势" },
              { name: "竞品C", marketShare: "18%", strength: "功能丰富" }
            ],
            opportunities: [
              "🎯 中小企业市场仍有大量空白",
              "🎯 垂直行业解决方案需求增长",
              "🎯 自动化和AI集成是趋势"
            ],
            threats: [
              "⚠️ 市场竞争激烈",
              "⚠️ 大厂可能进入细分市场",
              "⚠️ 用户对价格敏感"
            ]
          }
        },
        "business-model": {
          success: true,
          featureName: feature.name,
          response: {
            recommendation: "基于你的描述，推荐采用分层订阅模式",
            plans: [
              {
                tier: "基础版",
                price: "$29/月",
                target: "个人用户和小团队",
                features: ["核心功能", "5个用户", "基础支持"]
              },
              {
                tier: "专业版",
                price: "$99/月",
                target: "成长型企业",
                features: ["全部功能", "无限用户", "优先支持", "API访问"]
              },
              {
                tier: "企业版",
                price: "定制",
                target: "大型企业",
                features: ["私有部署", "定制开发", "专属客户经理"]
              }
            ],
            revenueProjection: {
              year1: "$120K",
              year2: "$480K",
              year3: "$1.2M"
            }
          }
        },
        "product-roadmap": {
          success: true,
          featureName: feature.name,
          response: {
            phases: [
              {
                phase: "Phase 1: MVP（0-3个月）",
                goals: ["✓ 用户认证和管理", "✓ 核心功能开发", "✓ 基础UI/UX"],
                deliverables: "可用的最小产品版本"
              },
              {
                phase: "Phase 2: 市场验证（3-6个月）",
                goals: ["✓ 收集用户反馈", "✓ 优化核心体验", "✓ 增加2-3个关键功能"],
                deliverables: "产品市场匹配（PMF）"
              },
              {
                phase: "Phase 3: 增长（6-12个月）",
                goals: ["✓ 功能扩展", "✓ 集成生态", "✓ 自动化营销"],
                deliverables: "可扩展的产品和增长引擎"
              }
            ],
            keyMetrics: [
              "月活用户（MAU）",
              "用户留存率",
              "付费转化率",
              "客户生命周期价值（LTV）"
            ]
          }
        }
      };

      setResult(mockResults[selectedFeature]);
      toast.success("分析完成！");
    } catch (err) {
      setError("运行失败，请稍后重试");
      toast.error("Skill 运行失败");
    } finally {
      setIsRunning(false);
    }
  };

  // 渲染 gstack 结果
  const renderGstackResult = () => {
    if (!result || !result.response) return null;

    const feature = getCurrentFeature();

    switch (selectedFeature) {
      case "ceo-chat":
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="size-5 text-purple-600" />
                <h3 className="font-semibold text-purple-900">CEO 评估</h3>
              </div>
              <p className="text-lg text-purple-900 mb-4">{result.response.evaluation}</p>
              <div className="flex items-center justify-between pt-3 border-t border-purple-200">
                <span className="text-sm text-purple-700">综合评分</span>
                <span className="text-2xl font-bold text-purple-900">{result.response.score}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* 优势 */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="size-4" />
                  优势分析
                </h4>
                <ul className="space-y-2 text-sm text-green-800">
                  {(result.response.strengths || []).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* 关注点 */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="size-4" />
                  需要关注
                </h4>
                <ul className="space-y-2 text-sm text-yellow-800">
                  {(result.response.concerns || []).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 下一步行动 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Target className="size-4" />
                建议行动
              </h4>
              <ol className="space-y-2 text-sm text-blue-800">
                {(result.response.nextSteps || []).map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </div>
          </div>
        );

      case "market-analysis":
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Label className="text-blue-900 font-semibold mb-2 block">市场规模</Label>
                <p className="text-2xl font-bold text-blue-900">{result.response.marketSize}</p>
                <p className="text-sm text-blue-700 mt-2">增长率: {result.response.growth}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <Label className="text-green-900 font-semibold mb-2 block">主要竞品</Label>
                {(result.response.competitors || []).map((comp: any, idx: number) => (
                  <div key={idx} className="text-sm text-green-800 mb-1">
                    • {comp.name} ({comp.marketShare}) - {comp.strength}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-3">市场机会</h4>
                <ul className="space-y-2 text-sm text-purple-800">
                  {(result.response.opportunities || []).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-3">潜在威胁</h4>
                <ul className="space-y-2 text-sm text-orange-800">
                  {(result.response.threats || []).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case "business-model":
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">💡 推荐方案</h3>
              <p className="text-blue-800">{result.response.recommendation}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {(result.response.plans || []).map((plan: any, idx: number) => (
                <div key={idx} className="bg-white border-2 border-slate-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <h4 className="font-bold text-lg mb-1">{plan.tier}</h4>
                  <p className="text-2xl font-bold text-blue-600 mb-2">{plan.price}</p>
                  <p className="text-sm text-slate-600 mb-3">{plan.target}</p>
                  <ul className="space-y-1 text-sm text-slate-700">
                    {(plan.features || []).map((f: string, i: number) => (
                      <li key={i}>✓ {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-3">📈 收入预测</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-green-700">第1年</p>
                  <p className="text-xl font-bold text-green-900">{result.response.revenueProjection?.year1 || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-green-700">第2年</p>
                  <p className="text-xl font-bold text-green-900">{result.response.revenueProjection?.year2 || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-green-700">第3年</p>
                  <p className="text-xl font-bold text-green-900">{result.response.revenueProjection?.year3 || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "product-roadmap":
        return (
          <div className="space-y-4">
            {(result.response.phases || []).map((phase: any, idx: number) => (
              <div key={idx} className="bg-white border-2 border-slate-200 rounded-lg p-4">
                <h4 className="font-bold text-lg mb-2 text-slate-900">{phase.phase}</h4>
                <div className="mb-3">
                  <Label className="text-sm text-slate-600 mb-1 block">目标</Label>
                  <ul className="space-y-1 text-sm text-slate-700">
                    {(phase.goals || []).map((goal: string, i: number) => (
                      <li key={i}>{goal}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded px-3 py-2">
                  <span className="text-sm font-semibold text-blue-900">交付物：</span>
                  <span className="text-sm text-blue-800"> {phase.deliverables}</span>
                </div>
              </div>
            ))}

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-3">📊 关键指标</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(result.response.keyMetrics || []).map((metric: string, idx: number) => (
                  <div key={idx} className="bg-white border border-purple-200 rounded p-2 text-center">
                    <p className="text-xs text-purple-700">{metric}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="size-4 mr-2" />
              返回
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{skill.icon}</div>
                <div>
                  <h1 className="text-xl font-bold">{skill.name}</h1>
                  <p className="text-sm text-slate-600">{skill.description}</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary">{skill.category}</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {isGstackSkill ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 左侧：功能选择和输入 */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>选择功能</CardTitle>
                  <CardDescription>
                    选择你需要的创业加速功能
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 功能选择 Tabs */}
                  <Tabs value={selectedFeature} onValueChange={setSelectedFeature}>
                    <TabsList className="grid grid-cols-2 h-auto">
                      {gstackFeatures.map((feature) => {
                        const Icon = feature.icon;
                        return (
                          <TabsTrigger 
                            key={feature.id} 
                            value={feature.id}
                            className="flex flex-col items-center gap-1 py-3"
                          >
                            <Icon className="size-4" />
                            <span className="text-xs">{feature.name}</span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                  </Tabs>

                  {/* 当前功能描述 */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-900">
                      <Lightbulb className="size-4 inline mr-1" />
                      {getCurrentFeature().description}
                    </p>
                  </div>

                  {/* 输入区域 */}
                  <div className="space-y-2">
                    <Label htmlFor="input">输入你的内容</Label>
                    <Textarea
                      id="input"
                      placeholder={getCurrentFeature().placeholder}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={8}
                      className="resize-none"
                    />
                    <p className="text-xs text-slate-500">
                      {inputText.length} 字符
                    </p>
                  </div>

                  {/* 运行按钮 */}
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleRun}
                    disabled={isRunning || !inputText.trim()}
                  >
                    {isRunning ? (
                      <>
                        <Loader2 className="size-4 mr-2 animate-spin" />
                        分析中...
                      </>
                    ) : (
                      <>
                        <Play className="size-4 mr-2" />
                        开始分析
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* 技能信息 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">关于 gstack</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold">作者：</span>
                    <span className="text-slate-600">{skill.author}</span>
                  </div>
                  <div>
                    <span className="font-semibold">版本：</span>
                    <span className="text-slate-600">{skill.version}</span>
                  </div>
                  <div>
                    <span className="font-semibold">下载量：</span>
                    <span className="text-slate-600">{skill.downloads.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-semibold">GitHub：</span>
                    <a 
                      href="https://github.com/garrytan/gstack" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-2"
                    >
                      查看源码
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右侧：结果展示 */}
            <div className="space-y-6">
              <Card className="min-h-[600px]">
                <CardHeader>
                  <CardTitle>分析结果</CardTitle>
                  <CardDescription>
                    {getCurrentFeature().name} - AI 驱动的专业分析
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!result && !error && !isRunning && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="bg-slate-100 p-6 rounded-full mb-4">
                        {(() => {
                          const Icon = getCurrentFeature().icon;
                          return <Icon className="size-12 text-slate-400" />;
                        })()}
                      </div>
                      <p className="text-slate-500 mb-2">等待输入</p>
                      <p className="text-xs text-slate-400">
                        填写内容并点击"开始分析"
                      </p>
                    </div>
                  )}

                  {isRunning && (
                    <div className="flex flex-col items-center justify-center py-16">
                      <Loader2 className="size-12 text-blue-600 animate-spin mb-4" />
                      <p className="text-slate-600">AI 正在分析...</p>
                      <p className="text-xs text-slate-400 mt-2">
                        这可能需要几秒钟
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="size-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-900 mb-1">分析失败</p>
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {result && (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="size-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-green-900 mb-1">分析完成</p>
                            <p className="text-sm text-green-700">
                              已生成 {result.featureName} 报告
                            </p>
                          </div>
                        </div>
                      </div>

                      {renderGstackResult()}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 其他 Skill 的占位 UI */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>配置参数</CardTitle>
                  <CardDescription>
                    填写运行参数，无需编写命令行代码
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-slate-100 p-6 rounded-full mb-4">
                      <AlertCircle className="size-12 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-semibold mb-2">
                      UI 开发中
                    </p>
                    <p className="text-sm text-slate-500 mb-4">
                      这个 Skill 的可视化界面正在开发中
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left w-full">
                      <p className="text-sm text-blue-900 mb-2">
                        <strong>临时方案：</strong>
                      </p>
                      <p className="text-xs text-blue-700 font-mono">
                        $ openclaw run {skill.openclawSkillName || skill.name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="min-h-[500px]">
                <CardHeader>
                  <CardTitle>功能预览</CardTitle>
                  <CardDescription>
                    这个 Skill 即将支持可视化运行
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="text-6xl mb-4">{skill.icon}</div>
                    <p className="text-slate-600 font-semibold mb-2">
                      {skill.name}
                    </p>
                    <p className="text-sm text-slate-500 mb-6 max-w-md">
                      {skill.description}
                    </p>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-left w-full max-w-md">
                      <p className="text-sm text-purple-900 mb-2">
                        💡 <strong>提示：</strong>
                      </p>
                      <p className="text-xs text-purple-700">
                        Auto Craft 正在为所有 OpenClaw Skills 开发可视化界面。<br/>
                        目前已完成 <strong>gstack</strong> 的 UI 生成器演示。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}