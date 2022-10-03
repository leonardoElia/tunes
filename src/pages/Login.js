import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './carregando';

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
      <div data-testid="page-login">
        <h1>Login</h1>
        <label htmlFor="nome">
          Nome
          <input
            data-testid="login-name-input"
            type="text"
            id="nome"
            name="nome"
            value={ nome }
            onChange={ this.mudarEstado }
          />
        </label>
        <button
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
