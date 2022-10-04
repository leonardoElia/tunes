import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artista: '',
      ButtonHab: false,
    };
  }

  validacaoButton = () => {
    const { artista } = this.state;
    if (artista.length >= 2) {
      this.setState({
        ButtonHab: true,
      });
    } else {
      this.setState({
        ButtonHab: false,
      });
    }
  };

  mudarEstado = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.validacaoButton);
  };

  render() {
    const { artista, ButtonHab } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Procurar</h1>
        <label htmlFor="artista">
          artista
          <input
            type="text"
            id="artista"
            name="artista"
            value={ artista }
            onChange={ this.mudarEstado }
            data-testid="search-artist-input"
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ !ButtonHab }
        >
          Pesquisar

        </button>

      </div>
    );
  }
}

export default Search;
