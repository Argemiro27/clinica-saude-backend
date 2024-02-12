const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Função para gerar uma chave secreta aleatória
const generateSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};

// Gera a chave secreta automaticamente
const secret = generateSecret();

module.exports.generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id_usuario,
      email: user.email,
    },
    secret,
    { expiresIn: "7d" }
  );
};
