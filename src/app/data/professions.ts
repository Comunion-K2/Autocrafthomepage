import { Profession } from "../types/user";

export interface ProfessionOption {
  value: Profession;
  label: string;
  description: string;
  icon: string;
  recommendedFor: "registered" | "openclaw";
}

export const professionOptions: ProfessionOption[] = [
  {
    value: "individual",
    label: "个人用户",
    description: "探索AI的可能性，提升个人效率",
    icon: "User",
    recommendedFor: "registered",
  },
  {
    value: "ai-enthusiast",
    label: "AI爱好者",
    description: "学习和体验各种AI应用",
    icon: "Sparkles",
    recommendedFor: "registered",
  },
  {
    value: "content-creator",
    label: "自媒体",
    description: "内容创作、编辑、发布自动化",
    icon: "Megaphone",
    recommendedFor: "registered",
  },
  {
    value: "freelancer",
    label: "自由职业者",
    description: "提高工作效率，自动化重复任务",
    icon: "Briefcase",
    recommendedFor: "registered",
  },
  {
    value: "ai-professional",
    label: "AI专业人士",
    description: "深度使用AI工具，自定义工作流",
    icon: "Code",
    recommendedFor: "openclaw",
  },
  {
    value: "internet-professional",
    label: "互联网从业者",
    description: "产品开发、运营、增长工具",
    icon: "Laptop",
    recommendedFor: "openclaw",
  },
  {
    value: "team",
    label: "团队",
    description: "协作工作流，统一管理",
    icon: "Users",
    recommendedFor: "openclaw",
  },
  {
    value: "entrepreneur",
    label: "创业者",
    description: "快速验证想法，降低成本",
    icon: "Rocket",
    recommendedFor: "openclaw",
  },
];
