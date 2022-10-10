import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { nomeMusica,
      prevMusica, idMusica, controleCheckbox, favoritosRecuperados } = this.props;
    console.log(favoritosRecuperados);
    return (
      <>
        <p>{nomeMusica}</p>
        <audio data-testid="audio-component" src={ prevMusica } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="fav">
          Favorita
          <input
            id="fav"
            type="checkbox"
            checked={ favoritosRecuperados.some((e) => e.trackId === idMusica) }
            data-testid={ `checkbox-music-${idMusica}` }
            onChange={ () => controleCheckbox(idMusica) }
            name="favorito"
          />
        </label>

      </>
    );
  }
}
MusicCard.propTypes = {
  nomeMusica: PropTypes.string.isRequired,
  favoritosRecuperados: arrayOf.isRequired,
  prevMusica: PropTypes.string.isRequired,
  idMusica: PropTypes.number.isRequired,
  controleCheckbox: PropTypes.func.isRequired,
};

export default MusicCard;
