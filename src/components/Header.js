import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
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

  componentDidMount () {
   this.nomeUsuario()
  }

  render() {
    const { infoUser } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{infoUser}</p>
        <Link to="/search" data-testid="link-to-search">Procurar</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        <Link to="/favorites" data-testid="link-to-favorites">FAVORITOS</Link>
      </header>
    );
  }
}

export default Header;
