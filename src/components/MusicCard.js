import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { nomeMusica, prevMusica, idMusica, favorito,controleCheckbox } = this.props;
    return (
      <>
        <p>{nomeMusica}</p>
        <audio data-testid="audio-component" src={ prevMusica } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento<code>audio</code>
          .
        </audio>
        <label htmlFor='fav'>
          Favorita
          <input id="fav"
        type="checkbox" checked={favorito} data-testid={`checkbox-music-${idMusica}`} onChange={(event) => controleCheckbox(event, idMusica)} name="favorito"/>
        </label>
        
      </>
    );
  }
}
MusicCard.propTypes = {
  nomeMusica: PropTypes.string.isRequired,
  prevMusica: PropTypes.string.isRequired,
};

export default MusicCard;
