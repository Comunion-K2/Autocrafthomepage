export type UserType = "registered" | "openclaw" | null;

export type Profession =
  | "individual" // 个人
  | "ai-enthusiast" // AI爱好者
  | "content-creator" // 自媒体
  | "freelancer" // 自由职业者
  | "ai-professional" // AI专业人士
  | "internet-professional" // 互联网人士
  | "team" // 团队
  | "entrepreneur"; // 创业者

export interface User {
  id: string;
  email?: string;
  userType: UserType;
  profession?: Profession;
  openclawApiKey?: string;
  openclawInstalledSkills?: string[]; // OpenClaw已安装的skill IDs
  installedSkills: string[]; // 在平台安装的skill IDs
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}
