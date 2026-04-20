import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

// Schema da Tarefa
const schemaTarefa = new mongoose.Schema(
  {
    descricao: {
      required: true,
      type: String,
    },
    statusRealizada: {
      required: true,
      type: Boolean,
    },
  },
  {
    versionKey: false,
  }
);

const Tarefa = mongoose.model('Tarefa', schemaTarefa);

// Garantir conexão ao banco de dados
let cachedConnection: typeof mongoose | null = null;

async function connectDB() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error('MONGO_URI environment variable not set');
  }

  try {
    const connection = await mongoose.connect(mongoURI);
    cachedConnection = connection;
    console.log('Database Connected');
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

    if (req.method === 'POST') {
      const { descricao, statusRealizada } = req.body;

      if (!descricao || statusRealizada === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const novaTarefa = new Tarefa({
        descricao,
        statusRealizada,
      });

      const tarefaSalva = await novaTarefa.save();
      return res.status(201).json(tarefaSalva);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
