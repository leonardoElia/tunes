import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artista: '',
      nomeArtista: '',
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
      nomeArtista: artista,
      artista: '',
      artistaInfo,
    });
  };

  render() {
    const { artista, ButtonHab, artistaInfo, nomeArtista } = this.state;

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

        {artistaInfo.length === 0 ? (<p>Nenhum álbum foi encontrado</p>) : (
          <>
            <p>
              Resultado de álbuns de:
              {' '}
              {nomeArtista}
            </p>
            {artistaInfo.map((e, i) => (
              <div key={ i }>
                <Link
                  to={ `/album/${e.collectionId}` }
                  data-testid={ `link-to-album-${e.collectionId}` }
                >
                  <img src={ e.artworkUrl100 } key={ i } alt="album" />

                </Link>
                {' '}
                <p key={ i }>{e.collectionName}</p>
                {' '}
                <p key={ i }>{e.artistName}</p>
                {' '}

              </div>))}

          </>
        )}

      </div>
    );
  }
}

export default Search;
