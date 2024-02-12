class UsuarioDTO {
  constructor(
    id_usuario,
    nome,
    email,
    senha,
    telefone,
    endereco,
    per_comissao,
    num_pix,
    url_foto,
    id_empresa,
    id_cargo,
    nom_cargo
  ) {
    this.id_usuario = id_usuario;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone;
    this.endereco = endereco;
    this.per_comissao = per_comissao;
    this.num_pix = num_pix;
    this.url_foto = url_foto;
    this.id_empresa = id_empresa;
    this.id_cargo = id_cargo;
    this.nom_cargo = nom_cargo;
  }
}

module.exports = UsuarioDTO;
