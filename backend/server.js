// backend/server.js
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// --- DADOS FALSOS (PLACEHOLDERS) ---
let rankingFake = [
    { name: "Ash Ketchum", time: 55 },
    { name: "Misty", time: 60 },
    { name: "Brock", time: 75 }
];

// --- A BANDEIRA DE CONTROLE ---
// Começa como true (verdadeiro), indicando que ainda estamos usando dados falsos
let usandoDadosFalsos = true;

// Rota GET: O Front-End pede a lista
app.get('/api/ranking', (req, res) => {
    res.json(rankingFake);
});

// Rota POST: O Front-End manda salvar
app.post('/api/ranking', (req, res) => {
    const { name, time } = req.body;
    console.log(`📝 Novo recorde recebido: ${name} - ${time}s`);
    
    // --- A MÁGICA ACONTECE AQUI ---
    if (usandoDadosFalsos) {
        rankingFake = []; // 1. Zera a lista (tchau Ash!)
        usandoDadosFalsos = false; // 2. Desliga o modo "falso" para sempre
    }

    // Salva o novo jogador na lista (agora limpa ou já com outros reais)
    rankingFake.push({ name, time });
    
    // Ordena e limita
    rankingFake.sort((a, b) => a.time - b.time);
    rankingFake = rankingFake.slice(0, 10);
    
    res.status(201).json({ message: 'Salvo com sucesso!' });
});



const PORT = process.env.PORT || 3000; // Usa a porta do Render OU a 3000 (se for local)

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});