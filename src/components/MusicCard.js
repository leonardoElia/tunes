import React from "react";

class MusicCard extends React.Component {
    render() {
        const {nomeMusica, prevMusica} = this.props
        return(
        <>
         <p>{nomeMusica}</p>
         <audio data-testid="audio-component" src={prevMusica} controls>
  <track kind="captions" />
  O seu navegador não suporta o elemento{" "} <code>audio</code>.
</audio>
        </>
        )
    }
}

export default MusicCard