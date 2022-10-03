import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      infoUser: 'Carregando...',
    };
  }

  nomeUsuario = async () => {
    const infoUsuario = await getUser();
    this.setState({
      infoUser: infoUsuario.name,
    });
  };

  render() {
    const { infoUser } = this.state;
    this.nomeUsuario();
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{infoUser}</p>
      </header>
    );
  }
}

export default Header;
