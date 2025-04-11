import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, enviarPost, uploadImage, atualizarNovoPost } from "../controller/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configurar as definições de armazenamento do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Defina o diretório de destino para os arquivos enviados (./uploads neste caso)
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantenha o nome do arquivo original para os arquivos enviados
    cb(null, file.originalname);
  }
});

// Crie uma instância do Multer com o armazenamento configurado
const upload = multer({
  dest: "./uploads", // Destino alternativo (comentado)
  storage
});

// Função para definir rotas para o aplicativo
const route = (app) => {
  // Habilitar análise de dados JSON no corpo da solicitação
  app.use(express.json());

  app.use(cors(corsOptions));

  // Rota GET para listar todas as postagens
  app.get("/posts", listarPosts);

  // Rota POST para criar uma nova postagem (sem upload de imagem)
  app.post("/posts", enviarPost);

  // Rota POST para carregar uma imagem e criar uma nova postagem
  app.post("/upload", upload.single("image"), uploadImage);

  app.put("/upload/:id", atualizarNovoPost);
};

export default route;
