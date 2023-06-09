import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './carregando';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
      parar: false,
      favoritosRecuperados: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.buscandoMusicas(id);
    const retorno = await getFavoriteSongs();
    this.setState({
      favoritosRecuperados: retorno,
    });
  }

  verificaCheck = (idMusica) => {
    const { favoritosRecuperados } = this.state;
    const retorno = favoritosRecuperados.some((e) => e.trackId === idMusica);
    console.log(retorno);
    console.log(idMusica);
    return retorno;
  };

  controleCheckbox = async (idMusica) => {
    const { musicas } = this.state;
    this.setState({ parar: false });
    const objMusica = musicas.find((e) => e.trackId === idMusica);
    await addSong(objMusica);
    const retorno = await getFavoriteSongs();
    this.setState({
      parar: true,
      favoritosRecuperados: retorno,
    });
    this.verificaCheck(idMusica);
  };

  buscandoMusicas = async (id) => {
    const musicas = await getMusics(id);
    this.setState({
      musicas,
      parar: true,
    });
  };

  render() {
    const { musicas, parar, favoritosRecuperados } = this.state;
    return (
      <div className="pageAlbums">
        <Header />
        <h1>album</h1>
        {parar ? (
          <>
            <center><p>{musicas[0].artistName}</p></center>
            <center><p>{musicas[0].collectionName}</p></center>
            {musicas.filter((e) => e.kind === 'song').map((e, i) => (

              <MusicCard
                key={ i }
                nomeMusica={ e.trackName }
                prevMusica={ e.previewUrl }
                idMusica={ e.trackId }
                controleCheckbox={ this.controleCheckbox }
                verificaCheck={ this.verificaCheck }
                favoritosRecuperados={ favoritosRecuperados }

              />
            ))}
          </>
        ) : (<Carregando />)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
