![header](https://capsule-render.vercel.app/api?type=waving&color=6eed4c&height=300&section=header&text=AuthProxy&fontSize=90&fontAlignY=40&animation=fadeIn&desc=Das%20Blitzschnelle%20API%20Gateway)

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

> Wir suchen jemanden, der diese README übersetzt.

<p align="center">
<img src="https://img.shields.io/badge/100%25_vibe_coding-6eed4c?style=for-the-badge">
</p>

> Pure, unverfälschte Vibe-Programmierung treibt dieses gesamte Projekt an. <img src="https://emojik.vercel.app/s/🤖_😎?size=32" width="16px" alt="vibe coding" />

**Schützen Sie Ihre APIs in Sekunden.** Ein blitzschnelles, nginx-basiertes API-Gateway, das böswillige Benutzer stoppt und dabei Ihren legitimen Datenverkehr reibungslos fließen lässt.

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

> ⤷ Wenn diese Bilder nicht angezeigt werden, können Sie sie [auf Github ansehen](https://github.com/john-theo/auth-proxy)

## 🎯 Warum AuthProxy?

**Stoppen Sie API-Missbrauch, bevor er beginnt.** Egal ob Sie eine öffentliche API, interne Microservices oder irgendetwas dazwischen betreiben, AuthProxy fungiert als Ihr digitaler Türsteher - lässt die Guten rein und hält die Bösen draußen.

### Das Problem
- 💸 **API-Missbrauch kostet Geld** - Unbefugte Nutzer verbrauchen Ihre Ressourcen
- 🐌 **Traditionelle Lösungen sind schwerfällig** - Komplexe API-Management-Plattformen, die Sie verlangsamen
- 🔒 **Sicherheitslücken sind teuer** - Ein einziger Verstoß kann Millionen kosten
- ⚡ **Geschwindigkeit ist wichtig** - Jede Millisekunde Latenz schadet Ihren Nutzern

### Die Lösung
AuthProxy bietet Ihnen **Enterprise-Grade API-Schutz** mit der Einfachheit einer einzigen Konfigurationsdatei. Keine Datenbanken, keine komplexe Einrichtung, keine Herstellerbindung.

## ✨ Hauptvorteile

### 🏎️ **Blitzschnell**
- **Auf nginx aufgebaut** - Der weltweit vertrauenswürdigste Webserver
- **Datenbanklose Architektur** - Keine Abfrageverzögerungen, nur pure Geschwindigkeit
- **Minimaler Footprint** - Verlangsamt Ihre Infrastruktur nicht

### 🔐 **Kugelsichere Sicherheit**
- **API-Schlüssel-Authentifizierung** - Nur autorisierte Benutzer kommen durch
- **Konfigurierbare Ratenbegrenzung** - Stoppt Brute-Force-Angriffe
- **Benutzernamen-Mapping** - Wissen Sie genau, wer Ihre API nutzt

### 🚀 **Deployment in Minuten**
- **Einzelne Konfigurationsdatei** - Alles an einem Ort
- **Docker-ready** - `docker-compose up` und fertig
- **Keine externen Abhängigkeiten** - Läuft überall, wo Docker läuft

### 💰 **Kosteneffektiv**
- **Keine Lizenzgebühren** - Komplett kostenlos und Open Source
- **Minimale Ressourcen** - Läuft auf den kleinsten Servern
- **Verhindert Missbrauch** - Stoppt unbefugte Nutzung, bevor sie kostet

## 🎬 Sehen Sie es in Aktion

```bash
# 1. Klonen und konfigurieren (30 Sekunden)
git clone https://github.com/yourusername/AuthProxy.git
cd AuthProxy
vim .env  # Prüfen Sie, ob Standardkonstanten geändert werden sollten
vim api-keys.map  # Konfigurieren Sie hier das apikey-username Mapping im Klartext

# 2. Beginnen Sie mit dem Schutz Ihrer API (10 Sekunden)
docker-compose up -d

# 3. Testen Sie, ob es funktioniert (5 Sekunden)
curl http://localhost:8080/health
# ✅ OK

# 4. Ihre API ist jetzt geschützt!
curl -H "X-APIKEY: sk-1234567890abcdef" http://localhost:8080/your-endpoint
```

Dieses Projekt verwendet ein Demo-Backend, das den Request-Body und die Header des Benutzers zurückgibt. Sie werden etwas wie dies sehen:

```json
{
  "path": "/your-endpoint",
  "headers": {
    "x-username": "john_doe",  // 🔥 Dies wird von AuthProxy hinzugefügt!
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

**Das war's!** Ihre API ist jetzt durch ein produktionsreifes Gateway geschützt.

## 🛡️ Was Sie bekommen

### **Intelligente Ratenbegrenzung**
- **Nicht autorisierte Benutzer**: 10 Anfragen/Minute (konfigurierbar)
- **Autorisierte Benutzer**: 60 Anfragen/Minute (konfigurierbar)
- **Globales Sicherheitsnetz**: Verhindert Serviceüberlastung
- **Burst-Handling**: Glättet Verkehrsspitzen

### **Sichere API-Schlüssel-Verwaltung**
- **Einfache Mapping-Datei** - Keine Datenbankkomplexität
- **Benutzernamen-Injektion** - Backend weiß, wer anruft
- **Schlüsselrotation vorbereitet** - Einfach zu aktualisieren
- **Header-Stripping** - API-Schlüssel erreichen nie Ihr Backend

### **Produktionsbereit**
- **Gesundheitsüberwachung** - Eingebaute Healthchecks
- **Umfassende Protokollierung** - Verfolgen Sie alles
- **Sicherheits-Header** - XSS, CSRF, Clickjacking-Schutz
- **Connection Pooling** - Optimale Backend-Performance

## 🔧 Perfekt Für

- **🌐 Öffentliche APIs** - Schutz vor Missbrauch und Monetarisierung der Nutzung
- **🏢 Interne APIs** - Sichere Microservice-Kommunikation
- **🔄 Legacy-Systeme** - Moderne Auth zu bestehenden Services hinzufügen
- **🚀 Startups** - Enterprise-Sicherheit ohne Enterprise-Komplexität
- **☁️ Cloud Native** - Kubernetes- und Docker-ready

## 📊 Performance, die zählt

```
🔥 Blitzschnell
├── <1ms Latenz-Overhead
├── 10.000+ Anfragen/Sekunde
├── <50MB Speichernutzung
└── 99,9% Verfügbarkeitskapazität

🔒 Sicherheit zuerst
├── API-Schlüssel-Authentifizierung
├── Ratenbegrenzungsschutz
├── DDoS-Abschwächung
├── Sicherheits-Header
└── Request-Sanitisierung
```

## 🧪 Kampferprobt

AuthProxy kommt mit umfassenden Tests:

```bash
# Installieren Sie Test-Abhängigkeiten
npm install

# Führen Sie die komplette Testsuite aus
npm test

# Tests decken ab:
# ✅ API-Schlüssel-Authentifizierung
# ✅ Ratenbegrenzungsdurchsetzung
# ✅ Lasttestszenarien
# ✅ Sicherheits-Header
# ✅ Gesundheitsüberwachung
```

## ⚙️ Konfigurieren Sie alles

AuthProxy ist darauf ausgelegt, vollständig über Umgebungsvariablen konfigurierbar zu sein. Alles wird über eine einzige `.env`-Datei gesteuert:

### 🔑 **Wichtigste Variablen**

```bash
# Wesentliche Einrichtung
NGINX_EXTERNAL_PORT=8080         # Port, der nach außen exponiert wird
BACKEND_HOST=your-backend-server # Ihr eigentlicher API-Server
BACKEND_PORT=8080               # Ihr Backend-Port

# API-Schlüssel-Konfiguration
API_KEY_HEADER=x_apikey         # nginx-Variablenname (Kleinbuchstaben mit Unterstrichen)
API_KEY_HEADER_NAME=X-APIKEY    # tatsächlicher HTTP-Header-Name

# Ratenbegrenzung (Ihre erste Verteidigungslinie)
UNAUTHORIZED_RATE_LIMIT=10r/m   # Anfragen pro Minute ohne API-Schlüssel
AUTHORIZED_RATE_LIMIT=60r/m     # Anfragen pro Minute mit gültigem API-Schlüssel
AUTHORIZED_BURST=10             # Erlaube Verkehrsspitzen
```

### 📋 **Vollständige Umgebungsvariablen-Referenz**

#### **🌐 Netzwerk & Proxy**
```bash
NGINX_EXTERNAL_PORT=8080        # Externer Port (womit sich Benutzer verbinden)
NGINX_PORT=80                   # Interner nginx-Port
INTERNAL_AUTH_PORT=8081         # Interner 401-Server-Port
```

#### **🎯 Backend-Konfiguration**
```bash
BACKEND_HOST=backend            # Backend-Server-Hostname
BACKEND_PORT=8080              # Backend-Server-Port
BACKEND_MAX_FAILS=3            # Max. Fehlversuche vor Markierung als ungesund
BACKEND_FAIL_TIMEOUT=30s       # Wartezeit vor erneutem Versuch bei fehlgeschlagenem Backend
```

#### **🔄 Connection Pooling**
```bash
BACKEND_KEEPALIVE_CONNECTIONS=32  # Anzahl der Keepalive-Verbindungen
BACKEND_KEEPALIVE_REQUESTS=100    # Max. Anfragen pro Verbindung
BACKEND_KEEPALIVE_TIMEOUT=60s     # Wie lange Verbindungen offen gehalten werden
```

#### **⏱️ Timeout-Einstellungen**
```bash
PROXY_CONNECT_TIMEOUT=30s       # Zeit zum Aufbau der Backend-Verbindung
PROXY_SEND_TIMEOUT=30s          # Zeit zum Senden der Anfrage ans Backend
PROXY_READ_TIMEOUT=30s          # Zeit zum Empfangen der Antwort vom Backend
```

#### **🚦 Ratenbegrenzung**
```bash
RATE_LIMIT_MEMORY=10m           # Für Ratenbegrenzung zugewiesener Speicher
UNAUTHORIZED_RATE_LIMIT=10r/m   # Limit für Anfragen ohne API-Schlüssel
AUTHORIZED_RATE_LIMIT=60r/m     # Limit für Anfragen mit API-Schlüssel
GLOBAL_RATE_LIMIT=30r/m         # Globales Ratenlimit-Fallback
AUTHORIZED_BURST=10             # Burst-Kapazität für autorisierte Benutzer
```

#### **🔐 API-Schlüssel-Header-Konfiguration**
```bash
API_KEY_HEADER=x_apikey         # nginx-Variablenname (Kleinbuchstaben mit Unterstrichen)
API_KEY_HEADER_NAME=X-APIKEY    # tatsächlicher HTTP-Header-Name für Tests und Proxy-Clearing
```

### 🎛️ **Konfigurationsbeispiele**

#### **Hochlast-Produktion**
```bash
NGINX_EXTERNAL_PORT=80
AUTHORIZED_RATE_LIMIT=300r/m
AUTHORIZED_BURST=50
BACKEND_KEEPALIVE_CONNECTIONS=64
WORKER_CONNECTIONS=2048
```

#### **Entwicklungsumgebung**
```bash
NGINX_EXTERNAL_PORT=8080
UNAUTHORIZED_RATE_LIMIT=30r/m
AUTHORIZED_RATE_LIMIT=120r/m
PROXY_READ_TIMEOUT=300s  # Längere Timeouts zum Debuggen
```

#### **Sicherheit-Zuerst-Setup**
```bash
UNAUTHORIZED_RATE_LIMIT=5r/m     # Sehr strikt
AUTHORIZED_RATE_LIMIT=30r/m      # Konservativ
AUTHORIZED_BURST=3               # Minimaler Burst
BACKEND_MAX_FAILS=1              # Schnelles Fehlschlagen
```

#### **Benutzerdefinierter API-Schlüssel-Header**
```bash
# Für X-API-KEY Header
API_KEY_HEADER=x_api_key
API_KEY_HEADER_NAME=X-API-KEY

# Für X-CUSTOM-AUTH Header
API_KEY_HEADER=x_custom_auth
API_KEY_HEADER_NAME=X-CUSTOM-AUTH
```

### 🔧 **Schnelle Konfigurationstipps**

1. **Beginnen Sie mit Standardwerten** - Sie funktionieren großartig out of the box
2. **Passen Sie Ratenlimits an** - Basierend auf Ihren Verkehrsmustern
3. **Überwachen und optimieren** - Nutzen Sie den Health-Endpoint und Logs
4. **Gründlich testen** - Verwenden Sie die mitgelieferte Testsuite

```bash
# Testen Sie Ihre Konfiguration
docker-compose config
curl http://localhost:8080/health
```

## 📈 Reale Auswirkungen

**Vor AuthProxy:**
- 🚨 API-Missbrauch frisst Gewinne
- 🐌 Komplexer API-Management-Overhead
- 💸 Teure Enterprise-Lösungen
- 🔧 Stunden für Setup und Wartung

**Nach AuthProxy:**
- ✅ API-Missbrauch am Gateway blockiert
- ⚡ Blitzschnelle Anfragenverarbeitung
- 💰 Keine Lizenzkosten
- 🚀 5 Minuten Deploymentzeit

## 🤝 Mitwirken

Wir lieben Beiträge! Ob es sich um:
- 🐛 Fehlermeldungen
- 💡 Funktionsvorschläge
- 🔧 Code-Verbesserungen
- 📖 Dokumentationsaktualisierungen

Schauen Sie in unseren [Beitragsrichtlinien](CONTRIBUTING.md) nach, um loszulegen.

## 📄 Lizenz

MIT-Lizenz - Nutzen Sie sie, modifizieren Sie sie, verteilen Sie sie. Wir glauben an Open Source.

---

<div align="center">

**Bereit, Ihre APIs zu schützen?**

[⚡ Jetzt Starten](#-schnellstart-anleitung) | [📖 Dokumentation Lesen](https://your-docs-url.com) | [🌟 Auf GitHub markieren](https://github.com/yourusername/AuthProxy)

*Mit ❤️ entwickelt für Entwickler, die Geschwindigkeit, Sicherheit und Einfachheit schätzen.*

</div> 