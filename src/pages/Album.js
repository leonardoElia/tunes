import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
      parar: false,
    };
  }

  buscandoMusicas = async (id) => {
    const musicas = await getMusics(id);
    this.setState({
      musicas,
      parar: true,
    });
  };

  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { musicas, parar } = this.state;
    console.log(musicas);
    if (parar === false) {
      this.buscandoMusicas(id);
    }

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
              />
            ))}
          </>
        ) : (<p>carregando</p>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
