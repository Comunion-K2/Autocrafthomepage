# Auto Craft v0.0.2 - 产品功能说明

> **让 AI 技能像微信小程序一样简单可用**

## 🎯 版本概览

**当前版本**：v0.0.2  
**发布日期**：2026-04-02  
**核心更新**：完整的登录系统 + 用户分类 + 智能推荐

---

## 📋 功能清单

### 1. 登录前体验

#### Landing Page
- 🎨 精美的品牌展示页
- 📝 清晰的价值主张：「AI技能，一键即用」
- 💡 三大核心优势展示
- 🚀 两个明确的CTA按钮

**访问路径**：`/`（未登录状态）

---

### 2. 双登录模式

#### 模式一：邮箱注册 📧
**推荐用户**：
- ✅ 个人用户
- ✅ AI爱好者
- ✅ 自媒体
- ✅ 自由职业者

**特点**：
- 平台托管API，按次付费
- 零配置，开箱即用
- 数据安全存储

**流程**：
```
1. 输入邮箱 → 2. 验证码验证 → 3. 选择职业 → 4. 开始使用
```

#### 模式二：OpenClaw API授权 ⚡
**推荐用户**：
- ✅ AI专业人士
- ✅ 互联网从业者
- ✅ 团队
- ✅ 创业者

**特点**：
- 使用自己的OpenClaw API
- 无需额外付费
- 自动匹配已安装skills

**流程**：
```
1. 输入API Key → 2. 授权验证 → 3. 选择职业 → 4. 开始使用
```

**访问路径**：`/login`

---

### 3. 职业选择系统 🎓

**8种职业身份**：
1. 个人用户 - 探索AI可能性
2. AI爱好者 - 学习体验AI应用
3. 自媒体 - 内容创作自动化
4. 自由职业者 - 提高工作效率
5. AI专业人士 - 深度使用AI工具
6. 互联网从业者 - 产品开发运营
7. 团队 - 协作工作流管理
8. 创业者 - 快速验证想法

**智能推荐**：
- 根据登录方式推荐最适合的职业
- 清晰标注"为你推荐"和"其他选项"
- 卡片式选择，体验友好

**访问路径**：`/select-profession`

---

### 4. 首页（登录后）🏠

#### 搜索功能
- 🔍 实时搜索skills
- 支持名称、描述、分类多维度搜索
- 显示匹配结果数量

#### 已安装Skills板块

**注册用户视图**：
```
┌─────────────────────────┐
│ 我的 Skills (3)         │
├─────────────────────────┤
│ ✅ Code Analyzer        │
│ ✅ File Organizer       │
│ ✅ Image Processor      │
└─────────────────────────┘
```

**OpenClaw用户视图**：
```
┌─────────────────────────┐
│ 我的 Skills (4)         │
│ 从你的OpenClaw自动匹配   │
├─────────────────────────┤
│ ✅ Code Analyzer (支持)  │
│ ✅ File Organizer (支持) │
│ ⚪ Social Media (待支持) │ ← 灰度显示，提示推荐开发
│ ⚪ Video Transcriber (待支持)│
└─────────────────────────┘
```

**区分逻辑**：
- 高亮显示：平台已支持的skills
- 灰度显示：OpenClaw已安装但平台未支持
- 点击灰度skill：提示"推荐Apexunit团队迅猛开发"

#### 推荐Skills板块

**智能推荐算法**：
```javascript
推荐来源：
1. 职业匹配 (P1优先级)
   - 根据用户选择的职业推荐相关skills
   
2. 热门推荐 (P2优先级)
   - 市面上下载量最高的skills

排除规则：
- 已安装的skills不再推荐
- 最多显示4个skill

展示效果：
- 职业推荐标签：紫色"职业推荐" Badge
- 一行3-4个卡片
```

**访问路径**：`/home`

---

### 5. Skill详情页 📄

#### 信息展示
- 完整的skill介绍和描述
- 评分、下载量、分类等数据
- 功能特性、使用说明
- 相关推荐skills

#### 一键安装功能 🚀

**注册用户**：
```
点击"安装到OpenClaw" 
  ↓
即时添加到已安装列表
  ↓  Toast通知："安装成功！"
```

**OpenClaw用户**：
```
点击"安装到OpenClaw"
  ↓
显示命令行指令
  ↓
Toast提示："请在OpenClaw中安装此Skill"
命令：openclaw skill install code-analyzer
```

#### 状态管理
- 已安装：显示"打开Skill界面"按钮
- 未安装：显示"安装到OpenClaw"按钮
- 安装中：按钮显示loading状态

**访问路径**：`/skill/:skillId`

---

## 🎨 设计系统

### 颜色主题

**注册用户（平台托管）**：
- 主色：蓝色 (#2563eb)
- 辅助色：紫色 (#7c3aed)
- 含义：便捷、友好、易用

**OpenClaw用户（自主掌控）**：
- 主色：紫色 (#7c3aed)
- 辅助色：粉色 (#db2777)
- 含义：专业、强大、自由

### 关键UI元素

1. **Skill卡片**
   - 图标 + 名称 + 描述
   - 评分 + 下载量
   - 状态Badge（已安装/待支持/职业推荐）
   - Hover效果：边框高亮 + 阴影 + 图标缩放

2. **用户信息栏**
   - 邮箱/用户类型
   - 职业身份
   - 登出按钮

3. **Toast通知**
   - 成功：绿色
   - 信息：蓝色
   - 警告：黄色
   - 位置：右上角

---

## 💾 数据结构

### User对象
```typescript
{
  id: "user_123",
  email: "user@example.com",        // 注册用户专有
  userType: "registered",           // "registered" | "openclaw"
  profession: "ai-enthusiast",      // 职业选择
  openclawApiKey: "sk-oc-xxx",     // OpenClaw用户专有
  openclawInstalledSkills: ["1","2"], // OpenClaw用户专有
  installedSkills: ["3","4"],      // 平台安装列表
  createdAt: "2026-04-02T10:00:00Z"
}
```

### Skill对象（扩展）
```typescript
{
  id: "1",
  name: "Code Analyzer",
  description: "分析代码质量和复杂度",
  category: "开发工具",
  icon: "Code",                    // Lucide图标名
  downloads: 15420,
  rating: 4.8,
  installed: true,
  // v0.0.2新增
  availableInPlatform: true,      // 平台支持状态
  recommendedProfessions: [       // 推荐职业列表
    "ai-professional",
    "internet-professional"
  ],
  openclawSkillName: "code-analyzer" // OpenClaw中的名称
}
```

---

## 🔐 认证流程

### 状态管理（AuthContext）

```typescript
// 全局状态
{
  isAuthenticated: boolean,  // 是否已登录
  user: User | null,        // 用户对象
  isLoading: boolean        // 加载状态
}

// 方法
login(user)         // 登录
logout()           // 登出
updateUser(updates) // 更新用户信息
```

### 持久化
- 使用 `localStorage` 存储用户信息
- key: `autocraft_user`
- 页面刷新自动恢复登录状态

### 路由守卫

**公开路由**：
- `/` - Landing Page
- `/login` - 登录页

**受保护路由**：
- `/select-profession` - 职业选择
- `/home` - 首页
- `/my-skills` - 我的Skills
- `/skill/:id` - Skill详情

未登录访问受保护路由 → 自动跳转到 `/`

---

## 🚦 用户旅程

### 旅程1：新用户注册（邮箱）

```
1. 访问 / 
   └─ 看到Landing Page，了解产品

2. 点击"立即体验"
   └─ 跳转到 /login

3. 选择"邮箱注册"
   ├─ 输入邮箱
   ├─ 接收验证码
   └─ 验证成功

4. 跳转到 /select-profession
   └─ 选择职业（如："AI爱好者"）

5. 跳转到 /home
   ├─ 查看已安装skills（初始为空）
   ├─ 查看推荐skills（基于职业）
   └─ 搜索感兴趣的skills

6. 点击skill卡片
   └─ 进入 /skill/1 查看详情

7. 点击"安装到OpenClaw"
   ├─ Toast提示安装成功
   └─ 返回首页，"已安装"板块出现该skill

8. 点击已安装的skill
   └─ "打开Skill界面"（后续版本实现）
```

### 旅程2：OpenClaw用户授权

```
1. 访问 /
   └─ 点击"OpenClaw授权登录"

2. 跳转到 /login（OpenClaw标签）
   ├─ 输入API Key
   └─ 授权验证

3. 后台自动获取OpenClaw已安装skills
   └─ 匹配平台skill库

4. 跳转到 /select-profession
   └─ 选择职业（如："AI专业人士"）

5. 跳转到 /home
   ├─ "已安装skills"显示4个匹配的skills
   │   ├─ 3个高亮（平台支持）
   │   └─ 1个灰度（平台待支持）
   └─ "推荐skills"显示职业相关 + 热门

6. 点击灰度skill
   └─ 提示"推荐Apexunit团队迅猛开发"

7. 点击高亮skill
   └─ 进入详情页，直接"打开Skill界面"

8. 点击未安装的推荐skill
   ├─ 进入详情页
   ├─ 点击"安装到OpenClaw"
   └─ Toast提示OpenClaw命令行安装指令
```

---

## 📱 响应式设计

### 断点
- 移动端：< 768px
- 平板：768px - 1024px
- 桌面：> 1024px

### 布局适配
- Skill卡片网格：
  - 移动端：1列
  - 平板：2列
  - 桌面：3-4列
  
- 职业选择：
  - 移动端：1列
  - 平板：2列
  - 桌面：4列

---

## 🔧 技术栈

- **前端框架**：React 18
- **路由**：React Router v7
- **状态管理**：Context API + localStorage
- **UI组件**：Radix UI + Tailwind CSS v4
- **图标**：Lucide React
- **通知**：Sonner (Toast)

---

## 📊 核心指标（计划跟踪）

### 用户行为
- [ ] 注册转化率：Landing → 完成注册
- [ ] 职业分布：各职业用户占比
- [ ] Skill安装率：详情页 → 安装完成
- [ ] 留存率：7日/30日留存

### 功能使用
- [ ] 搜索使用频率
- [ ] 推荐点击率：职业推荐 vs 热门推荐
- [ ] Skill打开率：已安装 → 实际使用

---

## 🐛 已知问题与限制

1. **Mock数据**
   - 当前使用前端mock数据
   - 后续需要连接真实后端API

2. **OpenClaw集成**
   - API Key验证为模拟验证
   - 已安装skills为硬编码
   - 需要真实的OpenClaw API集成

3. **验证码系统**
   - 当前为前端模拟
   - 需要后端邮件服务

4. **Skill运行界面**
   - "打开Skill界面"功能待实现
   - 需要可视化参数配置UI

---

## 🚀 下一步开发（v0.0.3）

### 优先级P0
1. **Skill运行界面**
   - 每个skill的可视化参数配置页面
   - 表单自动生成（基于skill schema）
   - 实时预览和执行

2. **后端API集成**
   - 用户注册/登录API
   - Skill安装API
   - 使用记录API

### 优先级P1
3. **工作流编辑器**
   - 拖拽式连接多个skills
   - 可视化流程图
   - 保存和复用工作流

4. **计费系统**
   - API调用次数统计
   - 用量显示和提醒
   - 充值/订阅功能

---

## 👥 团队

**Apexunit团队**：
- 冷峰 - CEO & 技术架构师
- 乔军 - 产品经理
- 周杰 - 合伙人 & 战略决策者

**项目愿景**：让AI技能像微信小程序一样简单可用

---

## 📝 更新日志

查看完整版本历史：[VERSION_HISTORY.md](./VERSION_HISTORY.md)

**v0.0.2** (2026-04-02)
- ✅ 完整的登录系统（双模式）
- ✅ 职业选择和智能推荐
- ✅ 一键安装功能
- ✅ OpenClaw集成基础

**v0.0.1** (2026-04-02)
- ✅ 基础原型和页面结构
