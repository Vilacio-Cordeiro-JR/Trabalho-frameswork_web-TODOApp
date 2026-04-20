# API Endpoints Documentation

## 🔗 Base URL

**Desenvolvimento:** `http://localhost:3000`  
**Produção:** `https://seu-nome-seu-ra.vercel.app`

---

## 📝 Endpoints

### 1. Criar Tarefa (CREATE)

**Endpoint:** `POST /api/tarefas/post`

**Request:**
```bash
curl -X POST https://seu-dominio.vercel.app/api/tarefas/post \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Estudar TypeScript",
    "statusRealizada": false
  }'
```

**Response (201):**
```json
{
  "_id": "65a7b2c1d4e5f6g7h8i9j0k1",
  "descricao": "Estudar TypeScript",
  "statusRealizada": false
}
```

**Response (400):**
```json
{
  "message": "Missing required fields"
}
```

---

### 2. Listar Todas as Tarefas (READ)

**Endpoint:** `GET /api/tarefas/getAll`

**Request:**
```bash
curl https://seu-dominio.vercel.app/api/tarefas/getAll
```

**Response (200):**
```json
[
  {
    "_id": "65a7b2c1d4e5f6g7h8i9j0k1",
    "descricao": "Estudar TypeScript",
    "statusRealizada": false
  },
  {
    "_id": "65a7b2c1d4e5f6g7h8i9j0k2",
    "descricao": "Fazer exercícios",
    "statusRealizada": true
  }
]
```

---

### 3. Deletar Tarefa (DELETE)

**Endpoint:** `DELETE /api/tarefas/delete?id=<TAREFA_ID>`

**Request:**
```bash
curl -X DELETE 'https://seu-dominio.vercel.app/api/tarefas/delete?id=65a7b2c1d4e5f6g7h8i9j0k1'
```

**Response (200):**
```json
{
  "_id": "65a7b2c1d4e5f6g7h8i9j0k1",
  "descricao": "Estudar TypeScript",
  "statusRealizada": false
}
```

**Response (400):**
```json
{
  "message": "ID is required"
}
```

**Response (404):**
```json
{
  "message": "Tarefa not found"
}
```

---

### 4. Atualizar Tarefa (UPDATE)

**Endpoint:** `PATCH /api/tarefas/update?id=<TAREFA_ID>`

**Request:**
```bash
curl -X PATCH 'https://seu-dominio.vercel.app/api/tarefas/update?id=65a7b2c1d4e5f6g7h8i9j0k1' \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Estudar TypeScript e JavaScript",
    "statusRealizada": true
  }'
```

**Response (200):**
```json
{
  "_id": "65a7b2c1d4e5f6g7h8i9j0k1",
  "descricao": "Estudar TypeScript e JavaScript",
  "statusRealizada": true
}
```

**Response (400):**
```json
{
  "message": "ID is required"
}
```

---

## 🔧 Tipos de Resposta

### Tarefa Object
```typescript
interface Tarefa {
  _id: string;           // ID MongoDB (gerado automaticamente)
  descricao: string;     // Descrição da tarefa (obrigatório)
  statusRealizada: boolean; // Status de conclusão (obrigatório)
}
```

### Erro Response
```json
{
  "message": "Descrição do erro"
}
```

---

## ⚙️ Códigos HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 404 | Not Found - Recurso não encontrado |
| 405 | Method Not Allowed - Método HTTP não permitido |
| 500 | Internal Server Error - Erro no servidor |

---

## 🔐 CORS

Todos os endpoints permitem requisições de qualquer origem:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
```

---

## 📱 Frontend Integration

O frontend (Angular) chama automaticamente os endpoints:

```typescript
// app.ts
constructor(private http: HttpClient) {
  this.apiURL = isDevelopment ? 'http://localhost:3000' : window.location.origin;
  this.READ_tarefas();
}

// Criar
this.http.post(`${this.apiURL}/api/tarefas/post`, tarefa)

// Listar
this.http.get(`${this.apiURL}/api/tarefas/getAll`)

// Deletar
this.http.delete(`${this.apiURL}/api/tarefas/delete/${id}`)

// Atualizar
this.http.patch(`${this.apiURL}/api/tarefas/update/${id}`, tarefa)
```

---

## 🧪 Testar com Postman

1. Abra [Postman](https://www.postman.com/)
2. Crie uma nova requisição
3. Selecione o método (GET, POST, PATCH, DELETE)
4. Cole a URL
5. Para POST/PATCH, vá em "Body" → "raw" → "JSON"
6. Cole o JSON
7. Clique "Send"

---

## 🐛 Troubleshooting

### Erro: "ECONNREFUSED"
- Backend não está rodando
- Verifique se Express está escutando na porta 3000

### Erro: "CORS error"
- Verifique o console do navegador
- CORS já está configurado nos endpoints
- Teste com curl primeiro

### Erro: "Cannot GET /api/tarefas/post"
- Endpoint está errado
- Verifique o URL exato
- Método HTTP deve ser POST, não GET

### Erro: "Internal server error"
- Verifique logs do backend
- Verifique conexão com MongoDB
- Confirme que MONGO_URI está correto

---

## 📚 Referências

- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [MongoDB ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

**Próximo:** Veja [LOCAL_DEV.md](./LOCAL_DEV.md) para testes locais
