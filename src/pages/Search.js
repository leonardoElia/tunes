import { element } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artista: '',
      ButtonHab: false,
      artistaInfo: [],
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

  pesquisar = async () => {
    const { artista } = this.state;
    const artistaInfo = await searchAlbumsAPI(artista);
    this.setState({
      artista: '',
      artistaInfo,
    });
  };

  render() {
    const { artista, ButtonHab, artistaInfo } = this.state;

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
          onClick={ this.pesquisar }
        >
          Pesquisar

        </button>
        <div>
          {artistaInfo.length === 0 ? (<p>Nenhum álbum encontrado</p>) : (
            artistaInfo.map((e, i) => (<>
              <Link to={ `/album/${e.collectionId}` } data-testid={ `link-to-album-${e.collectionId}` }><img src={ e.artworkUrl100 } key={ i } /></Link>
              {' '}
              <p key={ i }>
                Album 0
                {i + 1}
              </p>
              {' '}
              <p key={ i }>{e.artistName}</p>
            </>))
          )}

        </div>

      </div>
    );
  }
}

export default Search;
