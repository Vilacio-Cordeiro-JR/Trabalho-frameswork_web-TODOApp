# Local Development Guide

## 🛠️ Setup Local

### 1. Instalar dependências

```bash
npm run install:all
```

### 2. Verificar `.env.local`

Certifique-se de que `.env.local` está configurado com a connection string do MongoDB Atlas:

```bash
cat .env.local
```

Deve conter:
```
MONGO_URI=mongodb+srv://seu-usuario:senha@cluster.mongodb.net/TarefasDB?appName=Cluster0
API_URL=http://localhost:3000
```

### 3. Rodar Backend (Express)

**Option A: Node.js padrão**

```bash
cd backend/api
npm install
node index.js "mongodb+srv://seu-usuario:senha@cluster.mongodb.net/TarefasDB"
```

**Option B: Com variável de ambiente**

Edite `backend/api/index.js` para ler de `.env.local` automaticamente:

```javascript
require('dotenv').config({ path: '../../.env.local' });
// ... resto do código
```

### 4. Rodar Frontend (Angular)

Em outro terminal:

```bash
cd frontend/TODOapp
npm start
```

Acesse: **http://localhost:4200**

## 📱 Testando a Aplicação

1. ✅ Digite uma descrição de tarefa
2. ✅ Clique em "Adicionar Tarefa"
3. ✅ Veja a tarefa aparecer na lista
4. ✅ Clique na checkbox para marcar como realizada
5. ✅ Clique no ícone de lixeira para deletar

## 🔍 Debug

**Verificar conexão com MongoDB:**
```bash
# Verificar logs do Express no Terminal 1
# Deve mostrar: "Database Connected"
```

**Verificar requisições HTTP:**
- Abra DevTools (F12) → Network
- Clique em "Adicionar Tarefa"
- Veja a requisição POST em `/api/tarefas/post`

**Testar endpoints manualmente:**
```bash
# Criar tarefa
curl -X POST http://localhost:3000/api/post \
  -H "Content-Type: application/json" \
  -d '{"descricao": "Test", "statusRealizada": false}'

# Listar tarefas
curl http://localhost:3000/api/getAll

# Deletar tarefa (substitua ID)
curl -X DELETE http://localhost:3000/api/delete/TAREFA_ID

# Atualizar tarefa
curl -X PATCH http://localhost:3000/api/update/TAREFA_ID \
  -H "Content-Type: application/json" \
  -d '{"descricao": "Updated", "statusRealizada": true}'
```

## 🐛 Problemas Comuns

### ❌ "Cannot find module 'mongoose'"
```bash
cd backend/api
npm install
```

### ❌ "ECONNREFUSED 127.0.0.1:27017"
- MongoDB Atlas não está conectando
- Verifique a connection string em `.env.local`
- Confirme que seu IP está na whitelist do MongoDB Atlas

### ❌ "CORS error" no console
- Certifique-se que o backend está rodando em `http://localhost:3000`
- Verifique os CORS headers no `backend/api/index.js`

### ❌ "Cannot GET /api/tarefas/post"
- O backend não foi iniciado
- Verifique se o Express está escutando na porta 3000

## 📦 Builds para Produção

**Build Frontend:**
```bash
cd frontend/TODOapp
npm run build
```

**Testar SSR localmente:**
```bash
cd frontend/TODOapp
npm run serve:ssr:TODOapp
```

Acesse: **http://localhost:4000**

---

**Próximo passo:** [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)
