# Guia de Deploy - ToDoList Fullstack no Vercel

## 📋 Pré-requisitos
- Conta no Vercel (https://vercel.com)
- Repositório GitHub com o projeto
- MongoDB Atlas Connection String

## 🚀 Passos para Deploy

### 1. Preparar o Projeto Localmente

```bash
# Clone o repositório
git clone <seu-repositorio>
cd workspace

# Instale todas as dependências
npm run install:all
```

### 2. Configurar Variáveis de Ambiente

No Vercel, adicione as seguintes variáveis de ambiente:

**Environment Variables:**
- `MONGO_URI`: Cole sua connection string do MongoDB Atlas
  
Exemplo:
```
MONGO_URI=mongodb+srv://seu-usuario:sua-senha@cluster.cioq1q6.mongodb.net/TarefasDB?appName=Cluster0
```

### 3. Deploy no Vercel (via GitHub)

1. Faça push do seu código para o GitHub
2. Acesse https://vercel.com/new
3. Selecione "Import Git Repository"
4. Escolha seu repositório
5. Configure:
   - **Root Directory**: `workspace/`
   - **Build Command**: `cd frontend/TODOapp && npm install && npm run build`
   - **Output Directory**: `frontend/TODOapp/dist/TODOapp`
6. Adicione as variáveis de ambiente (MONGO_URI)
7. Clique em "Deploy"

### 4. Configurar Nome Personalizado da URL

O Vercel gera uma URL padrão. Para usar um nome personalizado:

1. No dashboard do Vercel, vá até seu projeto
2. Clique em "Settings" → "Domains"
3. Adicione seu domínio ou use o formato sugerido

**Formato da URL com seu nome e RA:**
```
https://seu-nome-seu-ra.vercel.app
```

Exemplo:
```
https://joaosilva-12345678.vercel.app
```

### 5. Testar o Deployment

Após o deploy:

1. Acesse a URL do seu projeto no Vercel
2. Teste a criação de uma tarefa
3. Verifique se as operações CRUD funcionam:
   - **CREATE**: Adicionar nova tarefa
   - **READ**: Listar tarefas
   - **UPDATE**: Marcar como realizada
   - **DELETE**: Remover tarefa

## 📁 Estrutura do Projeto no Vercel

```
workspace/
├── api/                    # Serverless Functions (Backend)
│   └── tarefas/
│       ├── post.ts        # POST /api/tarefas/post
│       ├── getAll.ts      # GET /api/tarefas/getAll
│       ├── delete.ts      # DELETE /api/tarefas/delete
│       └── update.ts      # PATCH /api/tarefas/update
├── frontend/TODOapp/       # Frontend Angular SSR
│   ├── src/
│   │   └── app/
│   │       └── app.ts     # Detecta URL da API automaticamente
│   └── package.json
├── vercel.json            # Configuração do Vercel
├── .env.example           # Variáveis de exemplo
└── package.json           # Package.json da raiz
```

## 🔄 Endpoints da API

### Criar Tarefa
```
POST /api/tarefas/post
Content-Type: application/json

{
  "descricao": "Nova tarefa",
  "statusRealizada": false
}
```

### Listar Todas as Tarefas
```
GET /api/tarefas/getAll
```

### Deletar Tarefa
```
DELETE /api/tarefas/delete?id=<TAREFA_ID>
```

### Atualizar Tarefa
```
PATCH /api/tarefas/update?id=<TAREFA_ID>
Content-Type: application/json

{
  "descricao": "Tarefa modificada",
  "statusRealizada": true
}
```

## 🐛 Troubleshooting

### Erro: "MONGO_URI not set"
- Verifique se a variável de ambiente foi adicionada no Vercel
- Faça novo deploy após adicionar a variável

### API não responde
- Verifique a conexão com MongoDB Atlas
- Confirme que o IP do Vercel está na whitelist do MongoDB Atlas
- Em MongoDB Atlas, vá para Network Access e configure para aceitar todas as IPs (0.0.0.0/0)

### CORS errors
- Os CORS headers já estão configurados nos endpoints
- Se persistir, verifique o console do navegador

### Build falha
- Garanta que todas as dependências estão no package.json
- Execute `npm run install:all` localmente para testar

## 📝 Notas Importantes

1. **MongoDB Atlas**: Certifique-se de que a connection string está correta
2. **IP Whitelist**: O Vercel usa IP dinâmico, configure MongoDB Atlas para aceitar 0.0.0.0/0
3. **SSR**: O Angular SSR está configurado no frontend para melhor SEO
4. **URL da API**: O frontend detecta automaticamente se está em dev ou produção

## ✅ Verificação Final

Antes do deploy final, execute localmente:

```bash
# Testar build
npm run build:all

# Validar estrutura
ls -la api/tarefas/
```

---

**Boa sorte com seu deploy! 🚀**
