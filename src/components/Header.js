import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../style/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      infoUser: 'Carregando...',
    };
  }

  componentDidMount() {
    this.nomeUsuario();
  }

  nomeUsuario = async () => {
    const infoUsuario = await getUser();
    this.setState({
      infoUser: infoUsuario.name,
    });
  };

  render() {
    const { infoUser } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{infoUser}</p>
        <div className="links">
          <Link to="/search" data-testid="link-to-search">PROCURAR</Link>
          <Link to="/profile" data-testid="link-to-profile">PERFIL</Link>
          <Link to="/favorites" data-testid="link-to-favorites">FAVORITOS</Link>
        </div>
      </header>
    );
  }
}

export default Header;
