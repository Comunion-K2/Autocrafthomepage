# Auto Craft 版本历史

## v0.0.2 (2026-04-02) - 登录系统与用户分类

### 🎯 核心功能

#### 1. 登录前页面
- ✅ Landing Page：展示品牌、Slogan和价值主张
- ✅ 未登录状态仅显示"立即体验"入口
- ✅ 产品特性展示：零学习成本、强大技能库、灵活使用方式

#### 2. 双登录模式
**登录方式1：邮箱注册**
- 目标用户：个人、AI爱好者、自媒体、自由职业者
- 流程：邮箱验证码 → 职业选择
- 特点：平台托管API，按次计费，数据存储在平台

**登录方式2：OpenClaw API授权**
- 目标用户：AI专业人士、互联网从业者、团队、创业者
- 流程：API Key授权 → 职业选择
- 特点：使用自己的API，无需额外付费，自动匹配已安装skills

#### 3. 职业选择系统
- ✅ 8个职业选项分类展示
- ✅ 根据登录方式推荐对应职业
- ✅ 清晰说明不同模式的区别

#### 4. 首页（登录后）
**已安装Skills板块**
- OpenClaw用户：
  - 自动匹配OpenClaw中已安装的skills
  - 平台支持的高亮显示
  - 平台未支持的灰度显示，提示"推荐Apexunit团队开发"
- 注册用户：
  - 显示在平台安装的skills列表

**热门Skills推荐**
- P1：基于用户职业 + 已安装skills推荐（智能推荐）
- P2：市面上热门skills（下载量排序）
- 每行3-4个skill卡片

#### 5. Skill详情页
- ✅ 完整的skill信息展示
- ✅ 一键安装功能：
  - 注册用户：直接添加到已安装列表
  - OpenClaw用户：提示OpenClaw命令行安装指令
- ✅ 已安装状态显示和管理

#### 6. 认证系统
- ✅ AuthContext：全局状态管理
- ✅ localStorage持久化登录状态
- ✅ 路由守卫：保护需要登录的页面
- ✅ 用户类型区分：registered vs openclaw

### 📁 文件结构

```
/src/app/
├── types/
│   └── user.ts                 # 用户类型定义
├── contexts/
│   └── AuthContext.tsx         # 认证上下文
├── data/
│   ├── skills.ts              # Skills数据（新增字段）
│   └── professions.ts         # 职业选项数据
├── pages/
│   ├── LandingPage.tsx        # 登录前首页
│   ├── Login.tsx              # 登录页面（双模式）
│   ├── ProfessionSelect.tsx   # 职业选择页
│   ├── HomeAuthenticated.tsx  # 登录后首页
│   ├── MySkills.tsx           # 我的Skills（v0.0.1保留）
│   ├── SkillDetail.tsx        # Skill详情（更新）
│   └── NotFound.tsx           # 404页面
├── routes.tsx                 # 路由配置（更新）
└── App.tsx                    # 根组件（更新）
```

### 🆕 新增功能

1. **用户认证系统**
   - 完整的登录注册流程
   - 两种用户类型支持
   - 持久化登录状态

2. **智能推荐引擎**
   - 基于职业的skill推荐
   - 基于已安装skill的关联推荐
   - 热门skill展示

3. **一键安装**
   - 注册用户即时安装
   - OpenClaw用户命令提示
   - 安装状态实时反馈（Toast通知）

4. **OpenClaw集成**
   - 自动匹配已安装skills
   - 区分平台支持/未支持的skills
   - API Key授权流程

### 🎨 设计亮点

1. **差异化UI**
   - 注册用户：蓝色主题，强调便捷性
   - OpenClaw用户：紫色主题，强调专业性

2. **职业选择**
   - 可视化卡片设计
   - 推荐选项优先展示
   - 清晰的说明文案

3. **状态反馈**
   - 加载状态动画
   - Toast消息通知
   - 实时更新UI

### 🔄 相比v0.0.1的变化

| 功能 | v0.0.1 | v0.0.2 |
|------|--------|--------|
| 登录系统 | ❌ 无 | ✅ 双模式登录 |
| 用户类型 | ❌ 单一 | ✅ 注册/OpenClaw |
| 职业系统 | ❌ 无 | ✅ 8种职业 |
| 推荐引擎 | ❌ 固定展示 | ✅ 智能推荐 |
| 安装功能 | ❌ 仅跳转 | ✅ 一键安装 |
| OpenClaw集成 | ❌ 无 | ✅ 完整支持 |

### 📊 数据模型

**User接口**
```typescript
{
  id: string;
  email?: string;
  userType: "registered" | "openclaw" | null;
  profession?: Profession;
  openclawApiKey?: string;
  openclawInstalledSkills?: string[];
  installedSkills: string[];
  createdAt: string;
}
```

**Skill接口（扩展）**
```typescript
{
  // v0.0.1字段
  id, name, description, category, icon, downloads, rating, installed,
  // v0.0.2新增
  availableInPlatform: boolean;           // 平台是否支持
  recommendedProfessions?: Profession[];  // 推荐职业
  openclawSkillName?: string;            // OpenClaw skill名
}
```

### 🎯 业务逻辑

1. **登录流程**
   ```
   未登录 → 选择登录方式 → 验证 → 选择职业 → 进入首页
   ```

2. **Skill展示逻辑**
   - OpenClaw用户：匹配 `openclawInstalledSkills` + `availableInPlatform`
   - 注册用户：显示 `installedSkills`

3. **推荐算法**
   ```javascript
   推荐 = 职业匹配Skills + 热门Skills - 已安装Skills
   优先级：职业匹配 > 下载量
   ```

### 🚀 下一步计划（v0.0.3）

- [ ] Skill运行界面（可视化参数配置）
- [ ] 工作流编辑器（拖拽式连接skills）
- [ ] 用户使用统计
- [ ] API调用计费系统
- [ ] 团队协作功能

---

## v0.0.1 (2026-04-02) - 基础原型

### 核心功能
- ✅ 首页：浏览和搜索Skills
- ✅ 我的Skills：管理已安装Skills
- ✅ Skill详情页：查看Skill信息
- ✅ 基础路由系统

### 特点
- 简洁的卡片式设计
- 搜索和筛选功能
- 基础的导航系统

---

**开发团队**：Apexunit (冷峰 + 乔军 + 周杰)
**项目愿景**：让AI技能像微信小程序一样简单可用
