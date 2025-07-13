![header](https://capsule-render.vercel.app/api?type=waving&color=6eed4c&height=300&section=header&text=AuthProxy&fontSize=90&fontAlignY=40&animation=fadeIn&desc=闪电般快速的API网关)

<p align="center"> 
  <a href="../README.md">English</a> 
  ·
  <a href="README_fr.md">Français</a>
  ·
  <a href="README_de.md">Deutsch</a>
  ·
  <a href="README_zh-cn.md">简体中文</a>  
  ·
  <a href="README_zh-tw.md">繁體中文</a>
  ·
  <a href="README_kr.md">한국어</a> 
  ·
  <a href="README_pt.md">Português</a>
</p>

> 我们正在寻找人来翻译这份README。

<p align="center">
<img src="https://img.shields.io/badge/100%25_vibe_coding-6eed4c?style=for-the-badge">
</p>

> 纯粹、原汁原味的代码活力驱动着这个强大的项目。 <img src="https://emojik.vercel.app/s/🤖_😎?size=32" width="16px" alt="vibe coding" />

**几秒钟内保护您的API。** 一个基于nginx的超快速API网关，可以有效阻止恶意用户，同时保持合法流量顺畅运行。

<p align="center">
  <a href="https://hub.docker.com/r/johndope/auth-proxy">
    <img src="https://img.shields.io/badge/docker-ready-blue?logo=docker&logoColor=white" alt="Docker Ready">
  </a>
  <a href="https://github.com/john-theo/auth-proxy">
    <img src="https://img.shields.io/github/stars/john-theo/auth-proxy" alt="GitHub stars">
  </a>
  <a href="https://github.com/john-theo/auth-proxy">
    <img src="https://img.shields.io/github/license/john-theo/auth-proxy?color=green" alt="License">
  </a>
</p>

<img src="../static/demo.jpg">

> ⤷ 如果这些图片无法显示，您可以[在Github上查看它们](https://github.com/john-theo/auth-proxy)

## 🎯 为什么选择AuthProxy？

**在API滥用开始之前就阻止它。** 无论您是运行公共API、内部微服务还是介于两者之间的任何服务，AuthProxy都充当您的数字门卫 - 让好人进来，同时把坏人挡在外面。

### 问题
- 💸 **API滥用会造成成本** - 未经授权的用户消耗您的资源
- 🐌 **传统解决方案太重** - 复杂的API管理平台会降低您的速度
- 🔒 **安全漏洞代价高昂** - 一次泄露可能造成数百万损失
- ⚡ **速度至关重要** - 每一毫秒的延迟都会影响您的用户

### 解决方案
AuthProxy通过单个配置文件的简单性为您提供**企业级API保护**。无需数据库，无需复杂设置，无供应商锁定。

## ✨ 主要优势

### 🏎️ **闪电般快速**
- **基于nginx构建** - 世界上最值得信赖的Web服务器
- **零数据库架构** - 无查询延迟，纯粹的速度
- **最小占用** - 不会拖慢您的基础设施

### 🔐 **坚不可摧的安全性**
- **API密钥认证** - 只有授权用户才能通过
- **可配置的速率限制** - 彻底阻止暴力攻击
- **用户名映射** - 准确知道谁在使用您的API

### 🚀 **分钟级部署**
- **单一配置文件** - 所有配置集中一处
- **Docker就绪** - `docker-compose up` 即可完成
- **无外部依赖** - 在任何支持Docker的地方运行

### 💰 **成本效益**
- **无许可费用** - 完全免费和开源
- **资源占用最小** - 在最小的服务器上运行
- **防止滥用** - 在产生成本之前阻止未授权使用

## 🎬 实际演示

```bash
# 1. 克隆并配置（30秒）
git clone https://github.com/yourusername/AuthProxy.git
cd AuthProxy
vim .env  # 检查是否需要更改默认常量
vim api-keys.map  # 在此以纯文本配置apikey-username映射

# 2. 开始保护您的API（10秒）
docker-compose up -d

# 3. 测试是否正常工作（5秒）
curl http://localhost:8080/health
# ✅ OK

# 4. 您的API现在受到保护！
curl -H "X-APIKEY: sk-1234567890abcdef" http://localhost:8080/your-endpoint
```

本项目使用演示后端，它会回显用户请求的主体和头部。您将看到类似这样的内容：

```json
{
  "path": "/your-endpoint",
  "headers": {
    "x-username": "john_doe",  // 🔥 这是由AuthProxy添加的！
    "host": "localhost",
    "x-real-ip": "192.168.147.1",
    "x-forwarded-for": "192.168.147.1",
    "x-forwarded-proto": "http",
    "user-agent": "curl/8.7.1",
    "accept": "*/*"
  },
  "method": "GET",
  "body": "",
  "fresh": false,
  "hostname": "localhost",
  "ip": "192.168.147.1",
  "ips": [
    "192.168.147.1"
  ],
  "protocol": "http",
  "query": {},
  "subdomains": [],
  "xhr": false,
  "os": {
    "hostname": "a608b96726bc"
  },
  "connection": {}
}
```

**就是这样！** 您的API现在受到生产级网关的保护。

## 🛡️ 功能特性

### **智能速率限制**
- **未授权用户**：10请求/分钟（可配置）
- **授权用户**：60请求/分钟（可配置）
- **全局安全网**：防止服务过载
- **突发处理**：平滑流量峰值

### **安全的API密钥管理**
- **简单映射文件** - 无数据库复杂性
- **用户名注入** - 后端知道谁在调用
- **密钥轮换就绪** - 易于更新
- **头部剥离** - API密钥永不到达您的后端

### **生产就绪**
- **健康监控** - 内置健康检查
- **全面日志记录** - 追踪一切
- **安全头部** - XSS、CSRF、点击劫持保护
- **连接池** - 最佳后端性能

## 🔧 完美适用于

- **🌐 公共API** - 防止滥用并实现使用货币化
- **🏢 内部API** - 安全的微服务通信
- **🔄 遗留系统** - 为现有服务添加现代认证
- **🚀 初创企业** - 企业级安全性而无企业级复杂性
- **☁️ 云原生** - Kubernetes和Docker就绪

## 📊 性能表现

```
🔥 闪电般快速
├── <1ms延迟开销
├── 10,000+请求/秒
├── <50MB内存使用
└── 99.9%可用性能力

🔒 安全第一
├── API密钥认证
├── 速率限制保护
├── DDoS缓解
├── 安全头部
└── 请求净化
```

## 🧪 经过实战检验

AuthProxy附带全面的测试：

```bash
# 安装测试依赖
npm install

# 运行完整测试套件
npm test

# 测试覆盖：
# ✅ API密钥认证
# ✅ 速率限制执行
# ✅ 负载测试场景
# ✅ 安全头部
# ✅ 健康监控
```

## ⚙️ 全面可配置

AuthProxy设计为通过环境变量完全可配置。所有配置通过单个`.env`文件控制：

### 🔑 **最重要的变量**

```bash
# 基本设置
NGINX_EXTERNAL_PORT=8080         # 对外暴露的端口
BACKEND_HOST=your-backend-server # 您的实际API服务器
BACKEND_PORT=8080               # 您的后端端口

# API密钥配置
API_KEY_HEADER=x_apikey         # nginx变量名（小写带下划线）
API_KEY_HEADER_NAME=X-APIKEY    # 实际HTTP头部名称

# 速率限制（您的第一道防线）
UNAUTHORIZED_RATE_LIMIT=10r/m   # 无API密钥时的每分钟请求数
AUTHORIZED_RATE_LIMIT=60r/m     # 有效API密钥的每分钟请求数
AUTHORIZED_BURST=10             # 允许流量突发
```

### 📋 **完整环境变量参考**

#### **🌐 网络和代理**
```bash
NGINX_EXTERNAL_PORT=8080        # 外部端口（用户连接的端口）
NGINX_PORT=80                   # 内部nginx端口
INTERNAL_AUTH_PORT=8081         # 内部401服务器端口
```

#### **🎯 后端配置**
```bash
BACKEND_HOST=backend            # 后端服务器主机名
BACKEND_PORT=8080              # 后端服务器端口
BACKEND_MAX_FAILS=3            # 标记为不健康前的最大失败尝试
BACKEND_FAIL_TIMEOUT=30s       # 失败后端重试前的等待时间
```

#### **🔄 连接池**
```bash
BACKEND_KEEPALIVE_CONNECTIONS=32  # 保持活动连接数
BACKEND_KEEPALIVE_REQUESTS=100    # 每个连接的最大请求数
BACKEND_KEEPALIVE_TIMEOUT=60s     # 连接保持打开的时间
```

#### **⏱️ 超时设置**
```bash
PROXY_CONNECT_TIMEOUT=30s       # 建立后端连接的时间
PROXY_SEND_TIMEOUT=30s          # 发送请求到后端的时间
PROXY_READ_TIMEOUT=30s          # 从后端接收响应的时间
```

#### **🚦 速率限制**
```bash
RATE_LIMIT_MEMORY=10m           # 分配给速率限制的内存
UNAUTHORIZED_RATE_LIMIT=10r/m   # 无API密钥请求的限制
AUTHORIZED_RATE_LIMIT=60r/m     # 有API密钥请求的限制
GLOBAL_RATE_LIMIT=30r/m         # 全局速率限制回退
AUTHORIZED_BURST=10             # 授权用户的突发容量
```

#### **🔐 API密钥头部配置**
```bash
API_KEY_HEADER=x_apikey         # nginx变量名（小写带下划线）
API_KEY_HEADER_NAME=X-APIKEY    # 实际HTTP头部名称用于测试和代理清理
```

### 🎛️ **配置示例**

#### **高流量生产环境**
```bash
NGINX_EXTERNAL_PORT=80
AUTHORIZED_RATE_LIMIT=300r/m
AUTHORIZED_BURST=50
BACKEND_KEEPALIVE_CONNECTIONS=64
WORKER_CONNECTIONS=2048
```

#### **开发环境**
```bash
NGINX_EXTERNAL_PORT=8080
UNAUTHORIZED_RATE_LIMIT=30r/m
AUTHORIZED_RATE_LIMIT=120r/m
PROXY_READ_TIMEOUT=300s  # 更长的超时用于调试
```

#### **安全优先设置**
```bash
UNAUTHORIZED_RATE_LIMIT=5r/m     # 非常严格
AUTHORIZED_RATE_LIMIT=30r/m      # 保守
AUTHORIZED_BURST=3               # 最小突发
BACKEND_MAX_FAILS=1              # 快速失败
```

#### **自定义API密钥头部**
```bash
# 对于X-API-KEY头部
API_KEY_HEADER=x_api_key
API_KEY_HEADER_NAME=X-API-KEY

# 对于X-CUSTOM-AUTH头部
API_KEY_HEADER=x_custom_auth
API_KEY_HEADER_NAME=X-CUSTOM-AUTH
```

### 🔧 **快速配置提示**

1. **从默认值开始** - 开箱即用效果很好
2. **调整速率限制** - 基于您的流量模式
3. **监控和调优** - 使用健康端点和日志
4. **彻底测试** - 使用包含的测试套件

```bash
# 测试您的配置
docker-compose config
curl http://localhost:8080/health
```

## 📈 实际影响

**使用AuthProxy之前：**
- 🚨 API滥用侵蚀利润
- 🐌 复杂的API管理开销
- 💸 昂贵的企业解决方案
- 🔧 耗时的设置和维护

**使用AuthProxy之后：**
- ✅ 在网关处阻止API滥用
- ⚡ 闪电般快速的请求处理
- 💰 零许可成本
- 🚀 5分钟部署时间

## 🤝 贡献

我们欢迎各种贡献！无论是：
- 🐛 错误报告
- 💡 功能建议
- 🔧 代码改进
- 📖 文档更新

查看我们的[贡献指南](CONTRIBUTING.md)开始参与。

## 📄 许可证

MIT许可证 - 使用它，修改它，分发它。我们相信开源。

---

<div align="center">

**准备好保护您的API了吗？**

[⚡ 立即开始](#-快速入门指南) | [📖 阅读文档](https://your-docs-url.com) | [🌟 在GitHub上加星](https://github.com/yourusername/AuthProxy)

*用❤️为重视速度、安全性和简单性的开发者打造。*

</div> 