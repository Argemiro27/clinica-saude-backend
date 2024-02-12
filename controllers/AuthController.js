
const bcrypt = require("bcrypt");
const db = require("../config/database");
const AuthService = require("../services/Auth/AuthService");

const authService = new AuthService();

const AuthController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const { token, usuario, dadosEmpresa } = await authService.login(email, senha);
      res.json({
        success: true,
        usuario: {
          id: usuario.id_usuario,
          nome: usuario.nome,
          email: usuario.email,
        },
        empresa: {
          dadosEmpresa,
        },
        token
      });
    } catch (error) {
      console.error("Erro durante o login:", error.message);
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
