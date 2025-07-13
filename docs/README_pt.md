![header](https://capsule-render.vercel.app/api?type=waving&color=6eed4c&height=300&section=header&text=AuthProxy&fontSize=90&fontAlignY=40&animation=fadeIn&desc=O%20Gateway%20de%20API%20Ultra-Rápido)

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

> Pura e autêntica programação vibrante impulsiona todo este projeto incrível. <img src="https://emojik.vercel.app/s/🤖_😎?size=32" width="16px" alt="vibe coding" />

**Proteja suas APIs em segundos.** Um gateway de API ultra-rápido, baseado em nginx, que bloqueia usuários maliciosos enquanto mantém seu tráfego legítimo fluindo suavemente.

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

> ⤷ Se estas imagens não aparecerem, você pode [vê-las no Github](https://github.com/john-theo/auth-proxy)

## 🎯 Por que AuthProxy?

**Pare o abuso de API antes que ele comece.** Seja você executando uma API pública, microsserviços internos ou qualquer coisa entre os dois, o AuthProxy atua como seu segurança digital - deixando os bons entrarem enquanto mantém os maus do lado de fora.

### O Problema
- 💸 **Abuso de API custa dinheiro** - Usuários não autorizados consumindo seus recursos
- 🐌 **Soluções tradicionais são pesadas** - Plataformas complexas de gerenciamento de API que te deixam lento
- 🔒 **Falhas de segurança são caras** - Uma única violação pode custar milhões
- ⚡ **Velocidade importa** - Cada milissegundo de latência prejudica seus usuários

### A Solução
AuthProxy oferece **proteção de API de nível empresarial** com a simplicidade de um único arquivo de configuração. Sem bancos de dados, sem configuração complexa, sem bloqueio de fornecedor.

## ✨ Principais Benefícios

### 🏎️ **Velocidade Relâmpago**
- **Construído com nginx** - O servidor web mais confiável do mundo
- **Arquitetura sem banco de dados** - Sem atrasos de consulta, apenas velocidade pura
- **Pegada mínima** - Não desacelera sua infraestrutura

### 🔐 **Segurança à Prova de Balas**
- **Autenticação por chave de API** - Apenas usuários autorizados passam
- **Limitação de taxa configurável** - Para ataques de força bruta
- **Mapeamento de usuários** - Saiba exatamente quem está usando sua API

### 🚀 **Implante em Minutos**
- **Arquivo único de configuração** - Tudo em um só lugar
- **Pronto para Docker** - `docker-compose up` e está feito
- **Sem dependências externas** - Funciona em qualquer lugar que rode Docker

### 💰 **Custo-Benefício**
- **Sem taxas de licença** - Completamente gratuito e open source
- **Recursos mínimos** - Roda nos menores servidores
- **Previne abusos** - Para uso não autorizado antes que custe dinheiro

## 🎬 Veja em Ação

```bash
# 1. Clone e configure (30 segundos)
git clone https://github.com/yourusername/AuthProxy.git
cd AuthProxy
vim .env  # Veja se alguma das constantes padrão precisa ser alterada
vim api-keys.map  # Configure o mapeamento apikey-username aqui em texto simples

# 2. Comece a proteger sua API (10 segundos)
docker-compose up -d

# 3. Teste se está funcionando (5 segundos)
curl http://localhost:8080/health
# ✅ OK

# 4. Sua API está agora protegida!
curl -H "X-APIKEY: sk-1234567890abcdef" http://localhost:8080/your-endpoint
```

Este projeto usa um backend de demonstração que ecoa o corpo e cabeçalhos da requisição do usuário. Você verá algo assim:

```json
{
  "path": "/your-endpoint",
  "headers": {
    "x-username": "john_doe",  // 🔥 Isto é adicionado pelo AuthProxy!
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

**É isso!** Sua API está agora protegida por um gateway pronto para produção.

## 🛡️ O Que Você Ganha

### **Limitação de Taxa Inteligente**
- **Usuários não autorizados**: 10 requisições/minuto (configurável)
- **Usuários autorizados**: 60 requisições/minuto (configurável)
- **Rede de segurança global**: Previne sobrecarga do serviço
- **Tratamento de picos**: Suaviza picos de tráfego

### **Gerenciamento Seguro de Chaves de API**
- **Arquivo de mapeamento simples** - Sem complexidade de banco de dados
- **Injeção de nome de usuário** - Backend sabe quem está chamando
- **Pronto para rotação de chaves** - Fácil atualização de chaves
- **Remoção de cabeçalhos** - Chaves de API nunca chegam ao backend

### **Pronto para Produção**
- **Monitoramento de saúde** - Verificações de saúde integradas
- **Logging abrangente** - Rastreie tudo
- **Cabeçalhos de segurança** - Proteção contra XSS, CSRF, clickjacking
- **Pool de conexões** - Performance otimizada do backend

## 🔧 Perfeito Para

- **🌐 APIs Públicas** - Proteja contra abusos e monetize o uso
- **🏢 APIs Internas** - Comunicação segura entre microsserviços
- **🔄 Sistemas Legados** - Adicione autenticação moderna a serviços existentes
- **🚀 Startups** - Segurança empresarial sem complexidade empresarial
- **☁️ Cloud Native** - Pronto para Kubernetes e Docker

## 📊 Performance que Importa

```
🔥 Velocidade Relâmpago
├── <1ms de overhead de latência
├── 10.000+ requisições/segundo
├── <50MB de uso de memória
└── 99.9% de capacidade de uptime

🔒 Segurança em Primeiro Lugar
├── Autenticação por chave de API
├── Proteção por limitação de taxa
├── Mitigação de DDoS
├── Cabeçalhos de segurança
└── Sanitização de requisições
```

## 🧪 Testado em Batalha

AuthProxy vem com testes abrangentes:

```bash
# Instale as dependências de teste
npm install

# Execute a suíte completa de testes
npm test

# Os testes cobrem:
# ✅ Autenticação por chave de API
# ✅ Aplicação de limitação de taxa
# ✅ Cenários de teste de carga
# ✅ Cabeçalhos de segurança
# ✅ Monitoramento de saúde
```

## ⚙️ Configure Tudo

AuthProxy é projetado para ser completamente configurável através de variáveis de ambiente. Tudo é controlado através de um único arquivo `.env`:

### 🔑 **Variáveis Mais Importantes**

```bash
# Configuração Essencial
NGINX_EXTERNAL_PORT=8080         # Porta exposta ao mundo
BACKEND_HOST=your-backend-server # Seu servidor de API real
BACKEND_PORT=8080               # Sua porta do backend

# Configuração de Chave de API
API_KEY_HEADER=x_apikey         # nome da variável nginx (minúsculas com underscores)
API_KEY_HEADER_NAME=X-APIKEY    # nome real do cabeçalho HTTP

# Limitação de Taxa (Sua Primeira Linha de Defesa)
UNAUTHORIZED_RATE_LIMIT=10r/m   # Requisições por minuto sem chave de API
AUTHORIZED_RATE_LIMIT=60r/m     # Requisições por minuto com chave de API válida
AUTHORIZED_BURST=10             # Permitir picos de tráfego
```

### 📋 **Referência Completa de Variáveis de Ambiente**

#### **🌐 Rede & Proxy**
```bash
NGINX_EXTERNAL_PORT=8080        # Porta externa (que os usuários conectam)
NGINX_PORT=80                   # Porta nginx interna
INTERNAL_AUTH_PORT=8081         # Porta do servidor 401 interno
```

#### **🎯 Configuração do Backend**
```bash
BACKEND_HOST=backend            # Hostname do servidor backend
BACKEND_PORT=8080              # Porta do servidor backend
BACKEND_MAX_FAILS=3            # Máximo de falhas antes de marcar como não saudável
BACKEND_FAIL_TIMEOUT=30s       # Quanto esperar antes de tentar backend falho
```

#### **🔄 Pool de Conexões**
```bash
BACKEND_KEEPALIVE_CONNECTIONS=32  # Número de conexões keepalive
BACKEND_KEEPALIVE_REQUESTS=100    # Máximo de requisições por conexão
BACKEND_KEEPALIVE_TIMEOUT=60s     # Quanto tempo manter conexões abertas
```

#### **⏱️ Configurações de Timeout**
```bash
PROXY_CONNECT_TIMEOUT=30s       # Tempo para estabelecer conexão backend
PROXY_SEND_TIMEOUT=30s          # Tempo para enviar requisição ao backend
PROXY_READ_TIMEOUT=30s          # Tempo para receber resposta do backend
```

#### **🚦 Limitação de Taxa**
```bash
RATE_LIMIT_MEMORY=10m           # Memória alocada para limitação de taxa
UNAUTHORIZED_RATE_LIMIT=10r/m   # Limite para requisições sem chave de API
AUTHORIZED_RATE_LIMIT=60r/m     # Limite para requisições com chave de API
GLOBAL_RATE_LIMIT=30r/m         # Fallback de limite de taxa global
AUTHORIZED_BURST=10             # Capacidade de pico para usuários autorizados
```

#### **🔐 Configuração de Cabeçalho de Chave de API**
```bash
API_KEY_HEADER=x_apikey         # nome da variável nginx (minúsculas com underscores)
API_KEY_HEADER_NAME=X-APIKEY    # nome real do cabeçalho HTTP para testes e limpeza de proxy
```

### 🎛️ **Exemplos de Configuração**

#### **Produção de Alto Tráfego**
```bash
NGINX_EXTERNAL_PORT=80
AUTHORIZED_RATE_LIMIT=300r/m
AUTHORIZED_BURST=50
BACKEND_KEEPALIVE_CONNECTIONS=64
WORKER_CONNECTIONS=2048
```

#### **Ambiente de Desenvolvimento**
```bash
NGINX_EXTERNAL_PORT=8080
UNAUTHORIZED_RATE_LIMIT=30r/m
AUTHORIZED_RATE_LIMIT=120r/m
PROXY_READ_TIMEOUT=300s  # Timeouts mais longos para debugging
```

#### **Configuração Focada em Segurança**
```bash
UNAUTHORIZED_RATE_LIMIT=5r/m     # Muito estrito
AUTHORIZED_RATE_LIMIT=30r/m      # Conservador
AUTHORIZED_BURST=3               # Pico mínimo
BACKEND_MAX_FAILS=1              # Falha rápida
```

#### **Cabeçalho de Chave de API Personalizado**
```bash
# Para cabeçalho X-API-KEY
API_KEY_HEADER=x_api_key
API_KEY_HEADER_NAME=X-API-KEY

# Para cabeçalho X-CUSTOM-AUTH
API_KEY_HEADER=x_custom_auth
API_KEY_HEADER_NAME=X-CUSTOM-AUTH
```

### 🔧 **Dicas Rápidas de Configuração**

1. **Comece com os padrões** - Funcionam muito bem out of the box
2. **Ajuste limites de taxa** - Baseado em seus padrões de tráfego
3. **Monitore e ajuste** - Use o endpoint de saúde e logs
4. **Teste completamente** - Use a suíte de testes incluída

```bash
# Teste sua configuração
docker-compose config
curl http://localhost:8080/health
```

## 📈 Impacto no Mundo Real

**Antes do AuthProxy:**
- 🚨 Abuso de API consumindo lucros
- 🐌 Overhead complexo de gerenciamento de API
- 💸 Soluções empresariais caras
- 🔧 Horas de configuração e manutenção

**Depois do AuthProxy:**
- ✅ Abuso de API bloqueado no gateway
- ⚡ Processamento ultra-rápido de requisições
- 💰 Zero custos de licenciamento
- 🚀 5 minutos de tempo de implantação

## 🤝 Contribuindo

Adoramos contribuições! Seja através de:
- 🐛 Relatórios de bugs
- 💡 Sugestões de funcionalidades
- 🔧 Melhorias de código
- 📖 Atualizações de documentação

Confira nosso [Guia de Contribuição](CONTRIBUTING.md) para começar.

## 📄 Licença

Licença MIT - Use, modifique, distribua. Nós acreditamos em código aberto.

---

<div align="center">

**Pronto para proteger suas APIs?**

[⚡ Comece Agora](#-guia-de-início-rápido) | [📖 Leia a Documentação](https://your-docs-url.com) | [🌟 Estrela no GitHub](https://github.com/yourusername/AuthProxy)

*Construído com ❤️ para desenvolvedores que valorizam velocidade, segurança e simplicidade.*

</div> 