import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './carregando';
import '../style/login.css';
import logo from '../imagens/logo.jpg';

const chacacteresMin = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      botaoHabilitacao: true,
      carregando: false,
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = 'blue';
  }

  criacaoDeUsuario = () => {
    const { nome } = this.state;
    const { history } = this.props;
    this.setState({
      carregando: true,
    });
    createUser({ name: nome }).then(() => history.push('/search'));
  };

  validacaoBotao = () => {
    const { nome } = this.state;
    if (nome.length >= chacacteresMin) {
      this.setState({
        botaoHabilitacao: false,
      });
    } else {
      this.setState({
        botaoHabilitacao: true,
      });
    }
  };

  mudarEstado = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.validacaoBotao);
  };

  render() {
    const { nome, botaoHabilitacao } = this.state;
    const { carregando } = this.state;
    if (carregando === true) return <Carregando />;
    return (
      <div className="boxLogin">
        <img src={ logo } alt="logo" className="logo" />
        <input
          className="inputNome"
          data-testid="login-name-input"
          type="text"
          id="nome"
          name="nome"
          placeholder=" Escreva seu primeiro nome"
          value={ nome }
          onChange={ this.mudarEstado }
        />

        <button
          className="buttonEntrar"
          type="button"
          data-testid="login-submit-button"
          disabled={ botaoHabilitacao }
          onClick={ this.criacaoDeUsuario }
        >
          Entrar

        </button>

      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape.isRequired,
};
export default Login;
