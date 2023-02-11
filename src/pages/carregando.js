import React from 'react';
import '../style/carregando.css';

class Carregando extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = 'white';
  }

  render() {
    return (
      <main>
        <div className="loader">Carregando...</div>
      </main>
    );
  }
}

export default Carregando;
