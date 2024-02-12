const bcrypt = require("bcrypt");
const { generateToken } = require("./TokenService");
const UsuariosRepository = require("../../repositories/Usuarios/UsuariosRepository");
const EmpresasRepository = require("../../repositories/Usuarios/EmpresasRepository");

class AuthService {
  constructor() {
    this.usuariosRepository = new UsuariosRepository();
    this.empresasRepository = new EmpresasRepository();
  }

  async login(email, senha) {
    if (!email || !senha) {
      throw new Error("Email e senha são obrigatórios");
    }

    const results = await this.usuariosRepository.getByEmail(email);

    // Verificar a senha
    const usuario = results[0];

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    console.log(senha, usuario.senha);

    const senhaMatch = await bcrypt.compare(senha, usuario.senha);
    if (!senhaMatch) {
      throw new Error("Credenciais inválidas");
    }

    const token = generateToken(usuario);

    // Rotina para recuperar empresa referente ao usuário
    const dadosEmpresa = await this.empresasRepository.getEmpresaById(
      usuario.id_empresa
    );

    if (!dadosEmpresa) {
      throw new Error("Erro ao obter os dados da empresa");
    }
    console.log(dadosEmpresa);
    // Autenticação bem-sucedida
    console.log("Login bem-sucedido!");

    // Retorna os dados necessários para o controller criar a resposta
    return { token, usuario, dadosEmpresa };
  }
}

module.exports = AuthService;
