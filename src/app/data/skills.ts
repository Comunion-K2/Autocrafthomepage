import { Profession } from "../types/user";

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  downloads: number;
  rating: number;
  installed: boolean;
  availableInPlatform: boolean; // 我们平台是否已支持此skill
  recommendedProfessions?: Profession[]; // 推荐给哪些职业
  openclawSkillName?: string; // OpenClaw中的skill名称
  author?: string; // 作者
  version?: string; // 版本号
}

export const mockSkills: Skill[] = [
  {
    id: "gstack",
    name: "gstack",
    description: "Y Combinator风格的创业加速器工具包。与AI CEO对话获得项目评估、进行市场分析、优化商业模式、规划产品路线图",
    category: "创业工具",
    icon: "🚀",
    downloads: 45230,
    rating: 4.9,
    installed: true, // 改为已安装
    availableInPlatform: true,
    recommendedProfessions: ["ai-professional", "internet-professional", "team", "entrepreneur"],
    openclawSkillName: "gstack",
    author: "Garry Tan",
    version: "1.1.0",
  },
  {
    id: "1",
    name: "Code Analyzer",
    description: "分析代码质量和复杂度，提供优化建议",
    category: "开发工具",
    icon: "Code",
    downloads: 15420,
    rating: 4.8,
    installed: true,
    availableInPlatform: true,
    recommendedProfessions: ["ai-professional", "internet-professional", "entrepreneur"],
    openclawSkillName: "code-analyzer",
  },
  {
    id: "2",
    name: "File Organizer",
    description: "自动整理和分类文件，提高工作效率",
    category: "文件管理",
    icon: "FolderOpen",
    downloads: 23150,
    rating: 4.6,
    installed: true,
    availableInPlatform: true,
    recommendedProfessions: ["individual", "freelancer"],
    openclawSkillName: "file-organizer",
  },
  {
    id: "3",
    name: "Web Scraper",
    description: "从网页提取数据并保存为结构化格式",
    category: "数据采集",
    icon: "Globe",
    downloads: 18920,
    rating: 4.7,
    installed: false,
    availableInPlatform: true,
    recommendedProfessions: ["ai-professional", "content-creator", "entrepreneur"],
    openclawSkillName: "web-scraper",
  },
  {
    id: "4",
    name: "Image Processor",
    description: "批量处理图片：调整大小、格式转换、添加水印",
    category: "图像处理",
    icon: "Image",
    downloads: 31200,
    rating: 4.9,
    installed: true,
    availableInPlatform: true,
    recommendedProfessions: ["content-creator", "freelancer", "ai-enthusiast"],
    openclawSkillName: "image-processor",
  },
  {
    id: "5",
    name: "Text Summarizer",
    description: "使用AI技术自动总结长文本内容",
    category: "文本处理",
    icon: "FileText",
    downloads: 12890,
    rating: 4.5,
    installed: false,
    availableInPlatform: true,
    recommendedProfessions: ["content-creator", "individual", "ai-enthusiast"],
    openclawSkillName: "text-summarizer",
  },
  {
    id: "6",
    name: "API Tester",
    description: "测试和调试REST API接口",
    category: "开发工具",
    icon: "Network",
    downloads: 9320,
    rating: 4.4,
    installed: false,
    availableInPlatform: true,
    recommendedProfessions: ["ai-professional", "internet-professional"],
    openclawSkillName: "api-tester",
  },
  {
    id: "7",
    name: "Database Manager",
    description: "可视化管理数据库，支持多种数据库类型",
    category: "数据库",
    icon: "Database",
    downloads: 20150,
    rating: 4.7,
    installed: true,
    availableInPlatform: true,
    recommendedProfessions: ["ai-professional", "team", "entrepreneur"],
    openclawSkillName: "database-manager",
  },
  {
    id: "8",
    name: "Markdown Editor",
    description: "所见即所得的Markdown编辑器",
    category: "文本编辑",
    icon: "Edit",
    downloads: 16780,
    rating: 4.6,
    installed: false,
    availableInPlatform: true,
    recommendedProfessions: ["content-creator", "freelancer"],
    openclawSkillName: "markdown-editor",
  },
  {
    id: "9",
    name: "Social Media Manager",
    description: "多平台社交媒体内容发布和管理",
    category: "社交媒体",
    icon: "Share2",
    downloads: 28500,
    rating: 4.8,
    installed: false,
    availableInPlatform: false, // 我们还不支持
    recommendedProfessions: ["content-creator", "entrepreneur"],
    openclawSkillName: "social-media-manager",
  },
  {
    id: "10",
    name: "Video Transcriber",
    description: "自动转录视频音频为文字",
    category: "视频处理",
    icon: "Video",
    downloads: 19800,
    rating: 4.7,
    installed: false,
    availableInPlatform: false, // 我们还不支持
    recommendedProfessions: ["content-creator", "ai-enthusiast"],
    openclawSkillName: "video-transcriber",
  },
];