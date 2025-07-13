![header](https://capsule-render.vercel.app/api?type=waving&color=6eed4c&height=300&section=header&text=AuthProxy&fontSize=90&fontAlignY=40&animation=fadeIn&desc=번개처럼%20빠른%20API%20게이트웨이)

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

<p align="center">
<img src="https://img.shields.io/badge/100%25_vibe_coding-6eed4c?style=for-the-badge">
</p>

> 순수하고 진정한 바이브 코딩이 이 강력한 프로젝트를 움직입니다. <img src="https://emojik.vercel.app/s/🤖_😎?size=32" width="16px" alt="vibe coding" />

**몇 초 만에 API를 보호하세요.** nginx 기반의 초고속 API 게이트웨이로, 악의적인 사용자를 차단하면서 정상적인 트래픽은 원활하게 유지합니다.

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

> ⤷ 이미지가 보이지 않는 경우 [Github에서 확인](https://github.com/john-theo/auth-proxy)할 수 있습니다.

## 🎯 왜 AuthProxy인가?

**API 남용이 시작되기 전에 막으세요.** 공개 API, 내부 마이크로서비스 또는 그 사이의 어떤 것을 운영하든, AuthProxy는 디지털 문지기 역할을 합니다 - 좋은 사용자는 들여보내고 나쁜 사용자는 막아냅니다.

### 문제점
- 💸 **API 남용은 비용이 듭니다** - 승인되지 않은 사용자가 리소스를 소비
- 🐌 **기존 솔루션은 무겁습니다** - 복잡한 API 관리 플랫폼이 속도를 저하
- 🔒 **보안 격차는 비쌉니다** - 하나의 침해가 수백만 원의 비용을 초래할 수 있음
- ⚡ **속도가 중요합니다** - 모든 밀리초의 지연이 사용자에게 영향을 미침

### 해결책
AuthProxy는 단일 구성 파일의 단순성으로 **기업급 API 보호**를 제공합니다. 데이터베이스 없음, 복잡한 설정 없음, 벤더 종속성 없음.

## ✨ 주요 이점

### 🏎️ **번개같은 속도**
- **nginx 기반** - 세계에서 가장 신뢰받는 웹 서버
- **제로 데이터베이스 아키텍처** - 쿼리 지연 없음, 순수한 속도
- **최소 점유** - 인프라를 느리게 하지 않음

### 🔐 **철통 보안**
- **API 키 인증** - 인증된 사용자만 통과
- **구성 가능한 속도 제한** - 무차별 대입 공격을 완전히 차단
- **사용자 이름 매핑** - API를 누가 사용하는지 정확히 파악

### 🚀 **몇 분 만에 배포**
- **단일 구성 파일** - 모든 설정이 한 곳에
- **Docker 준비 완료** - `docker-compose up`으로 끝
- **외부 종속성 없음** - Docker가 실행되는 모든 곳에서 작동

### 💰 **비용 효율적**
- **라이선스 비용 없음** - 완전 무료 오픈 소스
- **최소 리소스** - 가장 작은 서버에서 실행
- **남용 방지** - 비용이 발생하기 전에 무단 사용 차단

## 🎬 실제 작동 모습

```bash
# 1. 클론 및 구성(30초)
git clone https://github.com/yourusername/AuthProxy.git
cd AuthProxy
vim .env  # 기본 상수를 변경해야 하는지 확인
vim api-keys.map  # apikey-username 매핑을 여기에 일반 텍스트로 구성

# 2. API 보호 시작(10초)
docker-compose up -d

# 3. 작동 테스트(5초)
curl http://localhost:8080/health
# ✅ OK

# 4. API가 이제 보호됩니다!
curl -H "X-APIKEY: sk-1234567890abcdef" http://localhost:8080/your-endpoint
```

이 프로젝트는 사용자 요청의 본문과 헤더를 에코하는 데모 백엔드를 사용합니다. 다음과 같은 내용이 표시됩니다:

```json
{
  "path": "/your-endpoint",
  "headers": {
    "x-username": "john_doe",  // 🔥 이것은 AuthProxy가 추가한 것입니다!
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

**이게 전부입니다!** 이제 API가 프로덕션 준비가 된 게이트웨이로 보호됩니다.

## 🛡️ 제공되는 기능

### **스마트 속도 제한**
- **인증되지 않은 사용자**: 분당 10개 요청(구성 가능)
- **인증된 사용자**: 분당 60개 요청(구성 가능)
- **글로벌 안전망**: 서비스 과부하 방지
- **버스트 처리**: 트래픽 스파이크 완화

### **안전한 API 키 관리**
- **간단한 매핑 파일** - 데이터베이스 복잡성 없음
- **사용자 이름 주입** - 백엔드가 호출자를 알 수 있음
- **키 순환 준비** - 키 쉽게 업데이트
- **헤더 제거** - API 키가 백엔드에 도달하지 않음

### **프로덕션 준비 완료**
- **상태 모니터링** - 내장 상태 확인
- **포괄적 로깅** - 모든 것을 추적
- **보안 헤더** - XSS, CSRF, 클릭재킹 보호
- **연결 풀링** - 최적의 백엔드 성능

## 🔧 완벽한 사용 사례

- **🌐 공개 API** - 남용을 방지하고 사용량 수익화
- **🏢 내부 API** - 마이크로서비스 통신 보안
- **🔄 레거시 시스템** - 기존 서비스에 현대적 인증 추가
- **🚀 스타트업** - 기업급 보안, 기업급 복잡성 없이
- **☁️ 클라우드 네이티브** - Kubernetes와 Docker 준비

## 📊 중요한 성능 지표

```
🔥 번개같은 속도
├── <1ms 지연 시간 오버헤드
├── 10,000+ 요청/초
├── <50MB 메모리 사용
└── 99.9% 가동 시간 능력

🔒 보안 우선
├── API 키 인증
├── 속도 제한 보호
├── DDoS 완화
├── 보안 헤더
└── 요청 정화
```

## 🧪 실전 테스트 완료

AuthProxy는 포괄적인 테스트를 제공합니다:

```bash
# 테스트 의존성 설치
npm install

# 전체 테스트 스위트 실행
npm test

# 테스트 범위:
# ✅ API 키 인증
# ✅ 속도 제한 적용
# ✅ 부하 테스트 시나리오
# ✅ 보안 헤더
# ✅ 상태 모니터링
```

## ⚙️ 완벽한 구성

AuthProxy는 환경 변수를 통해 완전히 구성할 수 있도록 설계되었습니다. 모든 것이 단일 `.env` 파일을 통해 제어됩니다:

### 🔑 **가장 중요한 변수**

```bash
# 필수 설정
NGINX_EXTERNAL_PORT=8080         # 외부에 노출되는 포트
BACKEND_HOST=your-backend-server # 실제 API 서버
BACKEND_PORT=8080               # 백엔드 포트

# API 키 구성
API_KEY_HEADER=x_apikey         # nginx 변수 이름(소문자와 밑줄)
API_KEY_HEADER_NAME=X-APIKEY    # 실제 HTTP 헤더 이름

# 속도 제한(첫 번째 방어선)
UNAUTHORIZED_RATE_LIMIT=10r/m   # API 키 없는 분당 요청 수
AUTHORIZED_RATE_LIMIT=60r/m     # 유효한 API 키의 분당 요청 수
AUTHORIZED_BURST=10             # 트래픽 스파이크 허용
```

### 📋 **전체 환경 변수 참조**

#### **🌐 네트워크 & 프록시**
```bash
NGINX_EXTERNAL_PORT=8080        # 외부 포트(사용자가 연결하는)
NGINX_PORT=80                   # 내부 nginx 포트
INTERNAL_AUTH_PORT=8081         # 내부 401 서버 포트
```

#### **🎯 백엔드 구성**
```bash
BACKEND_HOST=backend            # 백엔드 서버 호스트이름
BACKEND_PORT=8080              # 백엔드 서버 포트
BACKEND_MAX_FAILS=3            # 비정상으로 표시하기 전 최대 실패 시도
BACKEND_FAIL_TIMEOUT=30s       # 실패한 백엔드 재시도 전 대기 시간
```

#### **🔄 연결 풀링**
```bash
BACKEND_KEEPALIVE_CONNECTIONS=32  # 유지할 연결 수
BACKEND_KEEPALIVE_REQUESTS=100    # 연결당 최대 요청 수
BACKEND_KEEPALIVE_TIMEOUT=60s     # 연결 유지 시간
```

#### **⏱️ 타임아웃 설정**
```bash
PROXY_CONNECT_TIMEOUT=30s       # 백엔드 연결 설정 시간
PROXY_SEND_TIMEOUT=30s          # 백엔드로 요청 전송 시간
PROXY_READ_TIMEOUT=30s          # 백엔드에서 응답 수신 시간
```

#### **🚦 속도 제한**
```bash
RATE_LIMIT_MEMORY=10m           # 속도 제한에 할당된 메모리
UNAUTHORIZED_RATE_LIMIT=10r/m   # API 키 없는 요청의 속도 제한
AUTHORIZED_RATE_LIMIT=60r/m     # API 키 있는 요청의 속도 제한
GLOBAL_RATE_LIMIT=30r/m         # 글로벌 속도 제한 폴백
AUTHORIZED_BURST=10             # 인증된 사용자의 버스트 용량
```

#### **🔐 API 키 헤더 구성**
```bash
API_KEY_HEADER=x_apikey         # nginx 변수 이름(소문자와 밑줄)
API_KEY_HEADER_NAME=X-APIKEY    # 테스트와 프록시 클리어링을 위한 실제 HTTP 헤더 이름
```

### 🎛️ **구성 예제**

#### **고트래픽 프로덕션**
```bash
NGINX_EXTERNAL_PORT=80
AUTHORIZED_RATE_LIMIT=300r/m
AUTHORIZED_BURST=50
BACKEND_KEEPALIVE_CONNECTIONS=64
WORKER_CONNECTIONS=2048
```

#### **개발 환경**
```bash
NGINX_EXTERNAL_PORT=8080
UNAUTHORIZED_RATE_LIMIT=30r/m
AUTHORIZED_RATE_LIMIT=120r/m
PROXY_READ_TIMEOUT=300s  # 디버깅을 위한 더 긴 타임아웃
```

#### **보안 우선 설정**
```bash
UNAUTHORIZED_RATE_LIMIT=5r/m     # 매우 엄격
AUTHORIZED_RATE_LIMIT=30r/m      # 보수적
AUTHORIZED_BURST=3               # 최소 버스트
BACKEND_MAX_FAILS=1              # 빠른 실패
```

#### **사용자 정의 API 키 헤더**
```bash
# X-API-KEY 헤더용
API_KEY_HEADER=x_api_key
API_KEY_HEADER_NAME=X-API-KEY

# X-CUSTOM-AUTH 헤더용
API_KEY_HEADER=x_custom_auth
API_KEY_HEADER_NAME=X-CUSTOM-AUTH
```

### 🔧 **빠른 구성 팁**

1. **기본값으로 시작** - 기본값이 잘 작동합니다
2. **속도 제한 조정** - 트래픽 패턴에 따라
3. **모니터링과 튜닝** - 상태 엔드포인트와 로그 사용
4. **철저한 테스트** - 포함된 테스트 스위트 사용

```bash
# 구성 테스트
docker-compose config
curl http://localhost:8080/health
```

## 📈 실제 영향

**AuthProxy 이전:**
- 🚨 API 남용으로 수익 감소
- 🐌 복잡한 API 관리 오버헤드
- 💸 비싼 기업용 솔루션
- 🔧 설정과 유지보수에 많은 시간 소요

**AuthProxy 이후:**
- ✅ API 남용이 게이트웨이에서 차단됨
- ⚡ 번개같은 요청 처리
- 💰 라이선스 비용 제로
- 🚀 5분 배포 시간

## 🤝 기여

우리는 기여를 환영합니다! 다음과 같은 형태로:
- 🐛 버그 리포트
- 💡 기능 제안
- 🔧 코드 개선
- 📖 문서 업데이트

[기여 가이드](CONTRIBUTING.md)를 확인하여 시작하세요.

## 📄 라이선스

MIT 라이선스 - 사용하고, 수정하고, 배포하세요. 우리는 오픈 소스를 믿습니다.

---

<div align="center">

**API를 보호할 준비가 되셨나요?**

[⚡ 지금 시작하기](#-빠른-시작-가이드) | [📖 문서 읽기](https://your-docs-url.com) | [🌟 GitHub에서 스타 주기](https://github.com/yourusername/AuthProxy)

*속도, 보안, 단순성을 중요시하는 개발자를 위해 ❤️로 만들었습니다.*

</div> 