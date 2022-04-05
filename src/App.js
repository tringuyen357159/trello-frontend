import React from 'react';
import Navbar from 'components/Navbar/Navbar'
import Header from './components/Header/Header'
import Board from 'components/Board/Board'
import './App.scss'

function App() {
  return (
    <div className='app'>
      <Header />
      <Navbar />
      <Board />
    </div>
  );
}

export default App;
