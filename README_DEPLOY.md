# ToDoList Fullstack - Deploy Vercel

Projeto fullstack com **Angular SSR** (frontend) e **Express + MongoDB** (backend) configurado para deploy serverless no Vercel.

## 📦 Estrutura do Projeto

```
workspace/
├── api/                           # Backend Serverless (Vercel Functions)
│   ├── tarefas/
│   │   ├── post.ts               # POST - Criar tarefa
│   │   ├── getAll.ts             # GET - Listar tarefas
│   │   ├── delete.ts             # DELETE - Remover tarefa
│   │   └── update.ts             # PATCH - Atualizar tarefa
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/TODOapp/              # Frontend Angular SSR
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.ts            # Componente principal (detecta URL API)
│   │   │   ├── tarefa.ts         # Modelo de dados
│   │   │   └── item/             # Componente de item
│   │   ├── server.ts             # Configuração SSR
│   │   └── main.ts
│   ├── angular.json
│   ├── tsconfig.json
│   └── package.json
│
├── vercel.json                    # Configuração Vercel
├── package.json                   # Package raiz
├── .env.example                   # Variáveis de ambiente (exemplo)
├── .gitignore
├── DEPLOY_GUIDE.md               # Guia completo de deployment
└── Connect_strings_MongoDBAtlas.txt
```

## 🚀 Quick Start Local

### 1. Instalar dependências

```bash
npm run install:all
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do workspace:

```bash
MONGO_URI=mongodb+srv://seu-usuario:sua-senha@cluster.cioq1q6.mongodb.net/TarefasDB?appName=Cluster0
```

### 3. Rodar em desenvolvimento

**Terminal 1 - Backend (Express):**
```bash
cd backend/api
# Edite o código para usar .env.local ou passe via CLI
node index.js "mongodb+srv://seu-usuario:sua-senha@cluster.cioq1q6.mongodb.net/TarefasDB"
```

**Terminal 2 - Frontend:**
```bash
cd frontend/TODOapp
npm start
```

Acesse: http://localhost:4200

## 🔧 Endpoints da API

| Método | Endpoint | Função |
|--------|----------|--------|
| POST | `/api/tarefas/post` | Criar tarefa |
| GET | `/api/tarefas/getAll` | Listar tarefas |
| DELETE | `/api/tarefas/delete?id=<ID>` | Deletar tarefa |
| PATCH | `/api/tarefas/update?id=<ID>` | Atualizar tarefa |

## 🌐 Deploy no Vercel

Para instruções detalhadas de deployment, veja [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)

**Resumo:**
1. Faça push do código para GitHub
2. Conecte ao Vercel
3. Configure variáveis de ambiente (MONGO_URI)
4. Deploy automático ao fazer push

**URL final:** `https://seu-nome-seu-ra.vercel.app`

## 📋 O que foi configurado

✅ Backend Express convertido para Vercel Serverless Functions  
✅ Frontend Angular SSR otimizado para Vercel  
✅ URL da API detectada automaticamente (localhost em dev, Vercel em prod)  
✅ CORS configurado para comunicação frontend-backend  
✅ MongoDB Atlas conectado  
✅ TypeScript para type-safety  
✅ .gitignore e .env.example criados  

## ⚠️ Importante

**MongoDB Atlas Network Access:**
- Configure para aceitar qualquer IP: `0.0.0.0/0`
- Vercel usa IPs dinâmicos
- Alternativa: Use conexão com DNS restrito

## 📚 Documentação

- [Vercel Functions](https://vercel.com/docs/functions)
- [Angular SSR](https://angular.io/guide/ssr)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Dúvidas?** Veja o [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) para troubleshooting detalhado.
