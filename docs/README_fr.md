![header](https://capsule-render.vercel.app/api?type=waving&color=6eed4c&height=300&section=header&text=AuthProxy&fontSize=90&fontAlignY=40&animation=fadeIn&desc=La%20Passerelle%20API%20Ultra-Rapide)

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

> Nous recherchons des personnes pour traduire ce README.

<p align="center">
<img src="https://img.shields.io/badge/100%25_vibe_coding-6eed4c?style=for-the-badge">
</p>

> Du code vibrant et pur alimente ce projet impressionnant. <img src="https://emojik.vercel.app/s/🤖_😎?size=32" width="16px" alt="vibe coding" />

**Protégez vos APIs en quelques secondes.** Une passerelle API ultra-rapide, propulsée par nginx, qui arrête les utilisateurs malveillants tout en maintenant votre trafic légitime fluide.

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

> ⤷ Si ces images ne s'affichent pas, vous pouvez les [voir sur Github](https://github.com/john-theo/auth-proxy)

## 🎯 Pourquoi AuthProxy ?

**Arrêtez les abus d'API avant qu'ils ne commencent.** Que vous gériez une API publique, des microservices internes ou tout autre service, AuthProxy agit comme votre videur numérique - laissant entrer les bons utilisateurs tout en gardant les mauvais à l'écart.

### Le Problème
- 💸 **Les abus d'API coûtent cher** - Utilisateurs non autorisés consommant vos ressources
- 🐌 **Les solutions traditionnelles sont lourdes** - Plateformes de gestion d'API complexes qui vous ralentissent
- 🔒 **Les failles de sécurité sont coûteuses** - Une seule brèche peut coûter des millions
- ⚡ **La vitesse est cruciale** - Chaque milliseconde de latence nuit à vos utilisateurs

### La Solution
AuthProxy vous offre une **protection d'API de niveau entreprise** avec la simplicité d'un seul fichier de configuration. Pas de bases de données, pas de configuration complexe, pas de dépendance à un fournisseur.

## ✨ Avantages Clés

### 🏎️ **Ultra Rapide**
- **Construit sur nginx** - Le serveur web le plus fiable au monde
- **Architecture sans base de données** - Pas de délais de requête, juste de la vitesse pure
- **Empreinte minimale** - Ne ralentit pas votre infrastructure

### 🔐 **Sécurité à Toute Épreuve**
- **Authentification par clé API** - Seuls les utilisateurs autorisés passent
- **Limitation de débit configurable** - Arrête les attaques par force brute
- **Mappage des noms d'utilisateur** - Sachez exactement qui utilise votre API

### 🚀 **Déploiement en Minutes**
- **Fichier de configuration unique** - Tout au même endroit
- **Prêt pour Docker** - `docker-compose up` et c'est parti
- **Pas de dépendances externes** - Fonctionne partout où Docker tourne

### 💰 **Rentable**
- **Pas de frais de licence** - Complètement gratuit et open source
- **Ressources minimales** - Fonctionne sur les plus petits serveurs
- **Prévient les abus** - Arrête l'utilisation non autorisée avant qu'elle ne coûte

## 🎬 Voyez-le en Action

```bash
# 1. Clonez et configurez (30 secondes)
git clone https://github.com/yourusername/AuthProxy.git
cd AuthProxy
vim .env  # Vérifiez si les constantes par défaut doivent être modifiées
vim api-keys.map  # Configurez le mappage apikey-username ici en texte brut

# 2. Commencez à protéger votre API (10 secondes)
docker-compose up -d

# 3. Testez que ça fonctionne (5 secondes)
curl http://localhost:8080/health
# ✅ OK

# 4. Votre API est maintenant protégée !
curl -H "X-APIKEY: sk-1234567890abcdef" http://localhost:8080/your-endpoint
```

Ce projet utilise un backend de démonstration qui renvoie le corps et les en-têtes de la requête de l'utilisateur. Vous verrez quelque chose comme ceci :

```json
{
  "path": "/your-endpoint",
  "headers": {
    "x-username": "john_doe",  // 🔥 Ceci est ajouté par AuthProxy !
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

**C'est tout !** Votre API est maintenant protégée par une passerelle prête pour la production.

## 🛡️ Ce Que Vous Obtenez

### **Limitation de Débit Intelligente**
- **Utilisateurs non autorisés** : 10 requêtes/minute (configurable)
- **Utilisateurs autorisés** : 60 requêtes/minute (configurable)
- **Filet de sécurité global** : Prévient la surcharge du service
- **Gestion des pics** : Lisse les pics de trafic

### **Gestion Sécurisée des Clés API**
- **Fichier de mappage simple** - Pas de complexité de base de données
- **Injection de nom d'utilisateur** - Le backend sait qui appelle
- **Prêt pour la rotation des clés** - Facile à mettre à jour
- **Suppression des en-têtes** - Les clés API n'atteignent jamais votre backend

### **Prêt pour la Production**
- **Surveillance de la santé** - Vérifications de santé intégrées
- **Journalisation complète** - Suivez tout
- **En-têtes de sécurité** - Protection contre XSS, CSRF, clickjacking
- **Pool de connexions** - Performance backend optimale

## 🔧 Parfait Pour

- **🌐 APIs Publiques** - Protection contre les abus et monétisation de l'usage
- **🏢 APIs Internes** - Communication sécurisée entre microservices
- **🔄 Systèmes Existants** - Ajoutez une auth moderne aux services existants
- **🚀 Startups** - Sécurité entreprise sans la complexité entreprise
- **☁️ Cloud Native** - Prêt pour Kubernetes et Docker

## 📊 Performance Qui Compte

```
🔥 Ultra Rapide
├── <1ms de latence ajoutée
├── 10,000+ requêtes/seconde
├── <50MB d'utilisation mémoire
└── Capacité de disponibilité 99.9%

🔒 Sécurité d'Abord
├── Authentification par clé API
├── Protection par limitation de débit
├── Atténuation DDoS
├── En-têtes de sécurité
└── Assainissement des requêtes
```

## 🧪 Testé en Bataille

AuthProxy est livré avec des tests complets :

```bash
# Installez les dépendances de test
npm install

# Exécutez la suite de tests complète
npm test

# Les tests couvrent :
# ✅ Authentification par clé API
# ✅ Application des limites de débit
# ✅ Scénarios de test de charge
# ✅ En-têtes de sécurité
# ✅ Surveillance de la santé
```

## ⚙️ Configurez Tout

AuthProxy est conçu pour être entièrement configurable via des variables d'environnement. Tout est contrôlé via un seul fichier `.env` :

### 🔑 **Variables Les Plus Importantes**

```bash
# Configuration Essentielle
NGINX_EXTERNAL_PORT=8080         # Port exposé au monde
BACKEND_HOST=your-backend-server # Votre serveur API réel
BACKEND_PORT=8080               # Votre port backend

# Configuration des Clés API
API_KEY_HEADER=x_apikey         # nom de variable nginx (minuscules avec underscores)
API_KEY_HEADER_NAME=X-APIKEY    # nom réel de l'en-tête HTTP

# Limitation de Débit (Votre Première Ligne de Défense)
UNAUTHORIZED_RATE_LIMIT=10r/m   # Requêtes par minute sans clé API
AUTHORIZED_RATE_LIMIT=60r/m     # Requêtes par minute avec clé API valide
AUTHORIZED_BURST=10             # Autoriser les pics de trafic
```

### 📋 **Référence Complète des Variables d'Environnement**

#### **🌐 Réseau & Proxy**
```bash
NGINX_EXTERNAL_PORT=8080        # Port externe (ce à quoi les utilisateurs se connectent)
NGINX_PORT=80                   # Port nginx interne
INTERNAL_AUTH_PORT=8081         # Port du serveur 401 interne
```

#### **🎯 Configuration Backend**
```bash
BACKEND_HOST=backend            # Nom d'hôte du serveur backend
BACKEND_PORT=8080              # Port du serveur backend
BACKEND_MAX_FAILS=3            # Max tentatives échouées avant marquage non sain
BACKEND_FAIL_TIMEOUT=30s       # Temps d'attente avant réessai backend échoué
```

#### **🔄 Pool de Connexions**
```bash
BACKEND_KEEPALIVE_CONNECTIONS=32  # Nombre de connexions keepalive
BACKEND_KEEPALIVE_REQUESTS=100    # Max requêtes par connexion
BACKEND_KEEPALIVE_TIMEOUT=60s     # Durée de maintien des connexions
```

#### **⏱️ Paramètres de Timeout**
```bash
PROXY_CONNECT_TIMEOUT=30s       # Temps pour établir la connexion backend
PROXY_SEND_TIMEOUT=30s          # Temps pour envoyer la requête au backend
PROXY_READ_TIMEOUT=30s          # Temps pour recevoir la réponse du backend
```

#### **🚦 Limitation de Débit**
```bash
RATE_LIMIT_MEMORY=10m           # Mémoire allouée pour la limitation de débit
UNAUTHORIZED_RATE_LIMIT=10r/m   # Limite pour requêtes sans clé API
AUTHORIZED_RATE_LIMIT=60r/m     # Limite pour requêtes avec clé API
GLOBAL_RATE_LIMIT=30r/m         # Limite de débit globale de repli
AUTHORIZED_BURST=10             # Capacité de pic pour utilisateurs autorisés
```

#### **🔐 Configuration En-tête Clé API**
```bash
API_KEY_HEADER=x_apikey         # nom variable nginx (minuscules avec underscores)
API_KEY_HEADER_NAME=X-APIKEY    # nom réel d'en-tête HTTP pour tests et nettoyage proxy
```

### 🎛️ **Exemples de Configuration**

#### **Production Haut Trafic**
```bash
NGINX_EXTERNAL_PORT=80
AUTHORIZED_RATE_LIMIT=300r/m
AUTHORIZED_BURST=50
BACKEND_KEEPALIVE_CONNECTIONS=64
WORKER_CONNECTIONS=2048
```

#### **Environnement de Développement**
```bash
NGINX_EXTERNAL_PORT=8080
UNAUTHORIZED_RATE_LIMIT=30r/m
AUTHORIZED_RATE_LIMIT=120r/m
PROXY_READ_TIMEOUT=300s  # Timeouts plus longs pour le débogage
```

#### **Configuration Sécurité d'Abord**
```bash
UNAUTHORIZED_RATE_LIMIT=5r/m     # Très strict
AUTHORIZED_RATE_LIMIT=30r/m      # Conservateur
AUTHORIZED_BURST=3               # Pic minimal
BACKEND_MAX_FAILS=1              # Échec rapide
```

#### **En-tête de Clé API Personnalisé**
```bash
# Pour l'en-tête X-API-KEY
API_KEY_HEADER=x_api_key
API_KEY_HEADER_NAME=X-API-KEY

# Pour l'en-tête X-CUSTOM-AUTH
API_KEY_HEADER=x_custom_auth
API_KEY_HEADER_NAME=X-CUSTOM-AUTH
```

### 🔧 **Conseils Rapides de Configuration**

1. **Commencez avec les valeurs par défaut** - Elles fonctionnent très bien
2. **Ajustez les limites de débit** - Selon vos modèles de trafic
3. **Surveillez et ajustez** - Utilisez le point de santé et les logs
4. **Testez minutieusement** - Utilisez la suite de tests incluse

```bash
# Testez votre configuration
docker-compose config
curl http://localhost:8080/health
```

## 📈 Impact Réel

**Avant AuthProxy :**
- 🚨 Abus d'API mangeant les profits
- 🐌 Surcharge de gestion API complexe
- 💸 Solutions entreprise coûteuses
- 🔧 Heures de configuration et maintenance

**Après AuthProxy :**
- ✅ Abus d'API bloqués à la passerelle
- ⚡ Traitement ultra-rapide des requêtes
- 💰 Zéro coût de licence
- 🚀 5 minutes de temps de déploiement

## 🤝 Contribuer

Nous adorons les contributions ! Que ce soit :
- 🐛 Rapports de bugs
- 💡 Suggestions de fonctionnalités
- 🔧 Améliorations de code
- 📖 Mises à jour de documentation

Consultez notre [Guide de Contribution](CONTRIBUTING.md) pour commencer.

## 📄 Licence

Licence MIT - Utilisez-la, modifiez-la, distribuez-la. Nous croyons en l'open source.

---

<div align="center">

**Prêt à protéger vos APIs ?**

[⚡ Commencer Maintenant](#-guide-de-démarrage-rapide) | [📖 Lire la Documentation](https://your-docs-url.com) | [🌟 Star sur GitHub](https://github.com/yourusername/AuthProxy)

*Construit avec ❤️ pour les développeurs qui valorisent la vitesse, la sécurité et la simplicité.*

</div> 