# ⚠️ Dicas Importantes para Deploy no Vercel

## 🔴 CRÍTICO

### 1. MongoDB Atlas - Network Access

**PROBLEMA:** Vercel usa IPs dinâmicos, então o IP que você configura hoje pode mudar amanhã.

**SOLUÇÃO:**
1. Vá em: **MongoDB Atlas → Network Access**
2. Clique em **"ADD IP ADDRESS"**
3. Selecione **"ALLOW ACCESS FROM ANYWHERE"** (0.0.0.0/0)
4. Clique **"Confirm"**

```
⚠️ Isso permite qualquer IP, use com cuidado em produção
✅ Para desenvolvimento/teste é adequado
```

### 2. Connection String

**IMPORTANTE:** A connection string do MongoDB Atlas contém sua senha. 

**NÃO FAÇA:**
- ❌ Commitar `.env.local` no GitHub
- ❌ Compartilhar a connection string em chats
- ❌ Usar a connection string no código

**FAÇA:**
- ✅ Usar variáveis de ambiente no Vercel
- ✅ Manter `.env.local` local (no .gitignore)
- ✅ Usar `.env.example` para documentar

---

## 🟡 IMPORTANTE

### 3. Rotas do Vercel

O arquivo `vercel.json` possui rotas importantes:

```json
"routes": [
  {
    "src": "/api/(.*)",
    "dest": "/api/$1"
  },
  {
    "src": "/(.*)",
    "dest": "/index.html",
    "status": 200
  }
]
```

**O que faz:**
- `/api/...` → Redireciona para serverless functions
- `/(.*)`  → Redireciona para `index.html` (SPA/SSR)

### 4. Output Directory

```json
"outputDirectory": "frontend/TODOapp/dist/TODOapp/browser"
```

**DEVE SER:**
- A pasta `browser` gerada pelo build Angular
- Não a raiz de `dist/TODOapp`

### 5. Build Command

```json
"buildCommand": "cd frontend/TODOapp && npm install && npm run build"
```

**Certifique-se que:**
- O diretório está correto
- npm run build cria `/dist/TODOapp/browser`

---

## 🟢 BOAS PRÁTICAS

### 6. Testing Checklist

Antes de fazer deploy:

```bash
# 1. Teste local
cd workspace
npm run install:all

# 2. Teste backend
cd backend/api
node index.js "seu-mongo-uri"

# 3. Teste frontend
cd ../frontend/TODOapp
npm start

# 4. Teste SSR
npm run serve:ssr:TODOapp
```

### 7. Environment Variables

**Em Desenvolvimento:**
```
.env.local (local, não comita)
```

**Em Produção (Vercel):**
1. Dashboard → Settings → Environment Variables
2. Adicione:
   - `MONGO_URI`: Sua connection string
   - Qualquer outra variável necessária

### 8. Domínio Personalizado

**Para colocar seu nome e RA na URL:**

1. Vercel Dashboard → Seu projeto
2. Settings → Domains
3. Add Domain
4. Digite: `seu-nome-seu-ra.vercel.app`
5. Vercel vai validar automaticamente

**Exemplo:**
```
https://joaosilva-12345678.vercel.app
```

---

## 🔍 DEBUGGING

### 9. Verificar Logs do Build

1. Vá em: **Vercel Dashboard → Seu projeto → Deployments**
2. Clique no deployment mais recente
3. Clique em "Build" para ver logs

**Procure por:**
- ❌ Erros de build
- ❌ Erros de módulos faltantes
- ❌ Erros de sintaxe TypeScript

### 10. Testar API Remotamente

Após deploy:

```bash
# Testar se API está respondendo
curl https://seu-nome-seu-ra.vercel.app/api/tarefas/getAll

# Criar tarefa
curl -X POST https://seu-nome-seu-ra.vercel.app/api/tarefas/post \
  -H "Content-Type: application/json" \
  -d '{"descricao": "Test", "statusRealizada": false}'
```

### 11. Verificar Console do Navegador

Abra DevTools (F12) no seu aplicação após deploy:

**Console:**
- Deve estar limpo (sem erros vermelhos)
- Procure por mensagens de erro

**Network:**
- Clique em qualquer requisição para `/api/`
- Verifique Status (deve ser 200)
- Verifique Response (deve ser JSON)

---

## 📋 CHECKLIST PRÉ-DEPLOY

- [ ] `MONGO_URI` configurado no Vercel
- [ ] MongoDB Atlas aceita IP 0.0.0.0/0
- [ ] `.env.local` criado localmente
- [ ] `.gitignore` tem `.env.local`
- [ ] Código local roda sem erros
- [ ] Git push realizado
- [ ] Build no Vercel passou
- [ ] Frontend carrega sem erro
- [ ] API responde
- [ ] CRUD completo funciona
- [ ] Domínio personalizado configurado

---

## 🆘 SUPORTE

### Error: "Cannot find module 'mongoose'"
```bash
# No diretório backend/api
npm install mongoose
# Ou em todos os diretórios
npm run install:all
```

### Error: "MONGO_URI is not defined"
- Verifique se a variável foi adicionada no Vercel
- Faça novo deploy
- Aguarde 1-2 minutos para ativar

### Frontend vê "Cannot POST /api/..."
- Backend não está sendo implantado
- Verifique logs de build no Vercel
- Confirme que arquivos em `/api` existem

### Lentidão nas requisições
- Vercel cold start (primeira requisição é mais lenta)
- MongoDB Atlas pode estar em região diferente
- Considere usar MongoDB local para testes

---

## 🚀 APÓS DEPLOY

### Compartilhar seu projeto:

```
🎉 Meu ToDoList está ao vivo!

Frontend: https://seu-nome-seu-ra.vercel.app
API: https://seu-nome-seu-ra.vercel.app/api/

Feito com: Angular + Express + MongoDB + Vercel
```

---

## 📞 Recuros Úteis

- [Vercel Docs](https://vercel.com/docs)
- [Vercel Status Page](https://www.vercelstatus.com/)
- [MongoDB Atlas Support](https://docs.atlas.mongodb.com/)
- [Angular SSR Guide](https://angular.io/guide/ssr)

---

**Última atualização:** Abril 2026  
**Versão:** 1.0
