import express from 'express'
import path from 'path';
import routes from './routes';
import cors from 'cors';
import './database/connection';

const app = express();

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'uploads')))
app.use(routes)

app.listen(process.env.PORT || 3000);
