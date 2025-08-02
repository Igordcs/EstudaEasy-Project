import express from 'express'
import path from 'path';
import routes from './routes';
import cors from 'cors';
import './database/connection';

const app = express();
// Middleware para logar todas as requisições recebidas
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'uploads')))
app.use(routes)

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor rodando');
});
