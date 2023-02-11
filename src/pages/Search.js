import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../style/search.css';

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
       <div className='grupoPesquisar'>
          <div className="group">
            <svg
              className="icon"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" /></g>

            </svg>
            <input
              type="text"
              id="artista"
              name="artista"
              value={ artista }
              onChange={ this.mudarEstado }
              data-testid="search-artist-input"
              className="input"
              placeholder='Procurar por artista'
            />
          </div>
       

        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ !ButtonHab }
          onClick={ this.pesquisar }
          className="buttonPesquisar"
        >
          Pesquisar

        </button>
        </div>

        {artistaInfo.length === 0 ? (<center><p>Nenhum álbum foi encontrado</p></center>) : (
          <>
          <center>
            <p>
              Resultado de álbuns de:
              {' '}
              {nomeArtista}
            </p>
          </center>
          <div className='albums'>
            {artistaInfo.map((e, i) => (
              <div key={ i } className="album">
                <Link
                  to={ `/album/${e.collectionId}` }
                  data-testid={ `link-to-album-${e.collectionId}` }
                >
                  <img src={ e.artworkUrl100 } alt="album" />

                </Link>
                {' '}
                <p>{e.collectionName}</p>
                {' '}
                <p>{e.artistName}</p>
                {' '}

              </div>))}
           </div>

          </>
        )}

      </div>
    );
  }
}

export default Search;
