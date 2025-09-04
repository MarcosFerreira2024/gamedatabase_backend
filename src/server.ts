import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { routes } from "./routes/routes";
import { container } from "tsyringe";
import "./shared/containers";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
