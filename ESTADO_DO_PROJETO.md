# 📝 ESTADO DO PROJETO - Histórico de Correções

**Data de Atualização:** 20 de Abril de 2026  
**Status:** ⏳ Aguardando resultado do build no Vercel (esperado: SUCESSO)

---

## 🎯 Objetivo do Projeto

Deploy de uma aplicação **ToDoList Fullstack** no Vercel:
- **Frontend:** Angular com SSR
- **Backend:** Express como Vercel Serverless Functions
- **Database:** MongoDB Atlas
- **URL:** `seu-nome-seu-ra.vercel.app`

---

## ✅ O Que Foi Feito

### 1️⃣ Estrutura Backend Serverless (Novos Arquivos)

Criados 4 endpoints em `/api/tarefas/`:

```typescript
// api/tarefas/post.ts - Criar tarefa
export default async function handler(req, res) {
  // POST /api/tarefas/post
  // Body: { descricao, statusRealizada }
}

// api/tarefas/getAll.ts - Listar tarefas
export default async function handler(req, res) {
  // GET /api/tarefas/getAll
}

// api/tarefas/delete.ts - Deletar tarefa
export default async function handler(req, res) {
  // DELETE /api/tarefas/delete?id=...
}

// api/tarefas/update.ts - Atualizar tarefa
export default async function handler(req, res) {
  // PATCH /api/tarefas/update?id=...
  // Body: { descricao, statusRealizada }
}
```

**Cada função possui:**
- ✅ CORS headers pré-configurados
- ✅ Conexão pool ao MongoDB
- ✅ Error handling robusto
- ✅ TypeScript com type-safety

---

### 2️⃣ Configuração Frontend (Modificado)

**Arquivo:** `frontend/TODOapp/src/app/app.ts`

**O que mudou:**
- Detecção automática de URL da API (dev vs produção)
- Compatibilidade com SSR (Server-Side Rendering)

**Lógica:**
```typescript
// Verifica se está em ambiente de browser
if (typeof window !== 'undefined') {
  // Verifica se é localhost (dev)
  if (window.location.hostname === 'localhost') {
    this.apiURL = 'http://localhost:3000';
  } else {
    // Produção (Vercel)
    this.apiURL = `${window.location.protocol}//${window.location.host}`;
  }
} else {
  // SSR - servidor Node.js
  this.apiURL = '/api';
}
```

---

### 3️⃣ Configuração Vercel (Novos Arquivos)

**vercel.json:**
```json
{
  "buildCommand": "cd frontend/TODOapp && npm install && npm run build",
  "outputDirectory": "frontend/TODOapp/dist/TODOapp/browser",
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/(.*)", "dest": "/index.html", "status": 200 }
  ]
}
```

**package.json (raiz):**
- Scripts para install:all e build:all

**Environment Setup:**
- `.env.example` - Template
- `.env.local` - Desenvolvimento (preenchido com connection string)
- `.gitignore` - Segurança

---

### 4️⃣ Documentação Completa

8 documentos criados:
- `INDEX.md` - Índice e navegação
- `CHECKLIST.md` - Lista de arquivos
- `DEPLOY_GUIDE.md` - Passo-a-passo deployment
- `TIPS.md` - Dicas críticas
- `LOCAL_DEV.md` - Desenvolvimento local
- `API_DOCS.md` - Endpoints API
- `README_DEPLOY.md` - Overview
- `RESUMO_MUDANCAS.md` - Mudanças realizadas

---

## 🐛 Erros Encontrados & Corrigidos

### ❌ Erro 1: Secret References

**Log:**
```
Environment Variable "MONGO_URI" references
Secret "mongo_uri", which does not exist.
```

**Causa:** `vercel.json` tinha `"env": { "MONGO_URI": "@mongo_uri" }`

**Solução:** Remover bloco `env` completo

**Commit:** `87031b7`

---

### ❌ Erro 2: Invalid Runtime Version

**Log:**
```
Function Runtimes must have a valid version, 
for example `now-php@1.0.0`.
```

**Causa:** `"runtime": "nodejs20.x"` é formato inválido

**Solução:** Remover bloco `functions`, deixar Vercel auto-detectar

**Commit:** `e5227b6`

---

### ❌ Erro 3: window is not defined (SSR)

**Log:**
```
ERROR ReferenceError: window is not defined
  at new e (file:///vercel/path0/frontend/TODOapp/.angular/prerender-root/...)
```

**Causa:** Angular SSR tentava acessar `window` no servidor Node.js

**Solução:** Adicionar verificação `typeof window !== 'undefined'`

**Arquivo:** `frontend/TODOapp/src/app/app.ts`

**Commit:** `fdd77cc`

---

## 📊 Git Commits

```
fdd77cc - 🔧 Fix: Verificar window antes de acessar em SSR
e5227b6 - 🔧 Fix: Remover especificação de runtime do vercel.json
87031b7 - 🔧 Fix: Remover referência de secret inexistente
4fd41d5 - 🚀 Configuração completa para deploy Vercel
```

**Repository:** https://github.com/Vilacio-Cordeiro-JR/Trabalho-frameswork_web-TODOApp

---

## 🔄 Build Progress

```
✅ Repo clonado do GitHub
✅ Dependências instaladas (489 packages)
✅ Frontend compilado (Angular build)
❌ SSR prerendering falhou (WINDOW ISSUE)
   → CORRIGIDO no commit fdd77cc
⏳ Aguardando novo build no Vercel...
```

---

## 🔍 O Que Testar Após Deploy

### Checklist de Validação

- [ ] Frontend carrega em `https://projeto.vercel.app`
- [ ] Página exibe "Mozilla Dev - My To Do List"
- [ ] Campo de input para nova tarefa funciona
- [ ] Botão "Adicionar Tarefa" funciona
- [ ] Tarefa criada aparece na lista
- [ ] Checkbox marca tarefa como realizada
- [ ] Ícone lixeira deleta tarefa
- [ ] Atualizações refletem em tempo real

### Testes de API

```bash
# Testar endpoints manualmente
curl https://seu-dominio.vercel.app/api/tarefas/getAll
curl -X POST https://seu-dominio.vercel.app/api/tarefas/post \
  -H "Content-Type: application/json" \
  -d '{"descricao":"Test","statusRealizada":false}'
```

---

## ⚠️ Possíveis Próximos Problemas

### 1. MongoDB Connection Timeout
```
Error: connect ETIMEDOUT
```
**Solução:** Adicionar IP `0.0.0.0/0` no MongoDB Atlas Network Access

### 2. CORS Error no Browser
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solução:** CORS já configurado em cada função, verificar headers

### 3. API Returns 404
```
Cannot POST /api/tarefas/post
```
**Solução:** Verificar estrutura exata de pastas em `/api/tarefas/`

### 4. HttpClient undefined
```
NullInjectorError: No provider for HttpClient!
```
**Solução:** Verificar `HttpClientModule` em `app-module.ts`

### 5. Environment variables não carregam
```
MONGO_URI is not defined
```
**Solução:** Adicionar em Vercel → Settings → Environment Variables

---

## 🛠️ Como Continuar Corrigindo

### Padrão para Qualquer Novo Erro:

1. **Analisar o erro no Vercel:**
   - Vá em Dashboard → Projeto → Deployments → Clique no deploy

2. **Identificar o arquivo problemático:**
   - Procurar pela linha exata mencionada no stack trace

3. **Fazer a correção:**
   - Editar arquivo localmente
   - Testar se possível

4. **Commit & Push:**
   ```bash
   git add .
   git commit -m "🔧 Fix: [descrição do erro]"
   git push origin main
   ```

5. **Redeploy no Vercel:**
   - Automático via GitHub integration
   - Ou clique "Redeploy" manualmente

---

## 📋 Arquivos Críticos

| Arquivo | Função | Status |
|---------|--------|--------|
| `api/tarefas/*.ts` | Endpoints | ✅ Criado |
| `frontend/TODOapp/src/app/app.ts` | URL dinâmica | ✅ Corrigido |
| `vercel.json` | Build config | ✅ Corrigido |
| `package.json` (raiz) | Scripts | ✅ Criado |
| `.env.local` | Credenciais | ✅ Preenchido |

---

## 🎓 O Que Funcionando

```typescript
// ✅ Backend Serverless
const tarefas = await Tarefa.find();
await Tarefa.save();
await Tarefa.findByIdAndDelete(id);

// ✅ Frontend SSR
const isDevelopment = typeof window !== 'undefined' && 
  window.location.hostname === 'localhost';

// ✅ CORS
res.setHeader('Access-Control-Allow-Origin', '*');

// ✅ MongoDB
mongoose.connect(mongoURI);
```

---

## 📞 Recursos

- **Documentação:** Ver `INDEX.md` no projeto
- **GitHub:** https://github.com/Vilacio-Cordeiro-JR/Trabalho-frameswork_web-TODOApp
- **Vercel:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas

---

## ✨ Status Resumido

```
Frontend:  ✅ Pronto para SSR
Backend:   ✅ Serverless Functions configuradas
Vercel:    ✅ Configuração corrigida
Build:     ⏳ Aguardando resultado (esperado: SUCESSO)
Deploy:    🚀 Pronto para ir ao ar
```

---

**Última Atualização:** 20 de Abril, 2026 - 16:29 UTC  
**Próximo Passo:** Aguardar resultado do build no Vercel
