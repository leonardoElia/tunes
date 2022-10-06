import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
      parar: false,
      favorito: false,
    };
  }

  //async adicionarMusica () {
   // const {musicas}  = this.state
   // const MusicFiltro =
    //await addSong(objetoMusica);
     //this.setState({
      ////parar: false
     //})
    //} 

  controleCheckbox = async (event, idMusica) => {
    const {name, checked} = event.target;
    if(checked === true) {
      this.setState({parar: false})
      const {musicas} = this.state;
      const objMusica = musicas.find((e) => e.trackId === idMusica) ;
      await addSong(objMusica);
      this.setState({
        [name]: checked,
         parar: true,
      })
    }
   
   }

  buscandoMusicas = async (id) => {
    const musicas = await getMusics(id);
    this.setState({
      musicas,
      parar: true,
    });
  };

  componentDidMount () {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.buscandoMusicas(id);
  }

  render() {
    
    const { musicas, parar, favorito } = this.state;
    console.log(musicas);

    return (
      <div data-testid="page-album">
        <Header />
        <h1>album</h1>
        {parar ? (
          <>
            <p data-testid="artist-name">{musicas[0].artistName}</p>
            <p data-testid="album-name">{musicas[0].collectionName}</p>
            {musicas.filter((e) => e.kind === 'song').map((e, i) => (
          
              <MusicCard
                key={ i }
                nomeMusica={ e.trackName }
                prevMusica={ e.previewUrl }
                idMusica={e.trackId}
                favorito = {favorito}
                controleCheckbox = {this.controleCheckbox}
              />
            ))}
          </>
        ) : (<p>Carregando...</p>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
