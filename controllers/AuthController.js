const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/database");
const { promisify } = require("util");
const crypto = require("crypto");

// Função para gerar uma chave secreta aleatória
const generateSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};

// Gera a chave secreta automaticamente
const secret = generateSecret();

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id_usuario,
      email: user.email,
    },
    secret,
    { expiresIn: "7d" }
  );
};

const AuthController = {
  login: async (req, res) => {
    
    try {
      
      const { email, senha } = req.body;
      
      if (!email || !senha) {
        return res
          .status(400)
          .json({ error: "Email e senha são obrigatórios" });
      }
      console.log("Senha informada:", senha);

      // Verifica se o usuário com o email fornecido existe
      const query = `SELECT * FROM usuarios WHERE email = ?`;

      // Executar a consulta para obter as informações do usuário
      const results = await promisify(db.query).bind(db)(query, [email]);

      console.log(results);

      // Verificar se o usuário com o email fornecido existe
      if (results.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Verificar a senha
      const usuario = results[0];

      const senhaMatch = await bcrypt.compare(senha, usuario.senha);

      if (!senhaMatch) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // Geração do Token JWT
      const token = generateToken(usuario);

      // Autenticação bem-sucedida
      console.log("Login bem-sucedido!");
      console.log("Token de autenticação:", token);
      res.json({
        success: true,
        usuario: {
          id: usuario.id_usuario,
          nome: usuario.nome_usuario,
          email: usuario.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  registerUsuario: async (req, res) => {
    const {
      id_cargo,
      email,
      id_empresa,
      endereco,
      nome,
      senha,
      telefone,
    } = req.body;

    try {
      // Verificar se o email já está em uso
      const existingUsuario = await db.query(
        "SELECT * FROM Usuarios WHERE email = ?",
        [email]
      );

      if (existingUsuario.length > 0) {
        return res.status(400).json({ message: "Este email já está em uso" });
      }

      // Criptografar a senha antes de armazenar no banco de dados
      const hashedSenha = await bcrypt.hash(senha, 10);

      // Inserir novo usuário no banco de dados
      const newUsuario = {
        id_cargo, // Alteração aqui para garantir que seja atribuído corretamente
        email,
        id_empresa, // Alteração aqui para garantir que seja atribuído corretamente
        endereco,
        nome,
        senha: hashedSenha,
        telefone,
      };

      await db.query("INSERT INTO Usuarios SET ?", [newUsuario]);

      res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
};

module.exports = AuthController;