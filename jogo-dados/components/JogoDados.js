"use client";

import { useState } from 'react';
import Dado from './Dado';

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosJogador1, setDadosJogador1] = useState([null, null]);
  const [dadosJogador2, setDadosJogador2] = useState([null, null]);
  const [vitoriasJogador1, setVitoriasJogador1] = useState(0);
  const [vitoriasJogador2, setVitoriasJogador2] = useState(0);
  const [turno, setTurno] = useState('Jogador 1');
  const [msgRodada, setMsgRodada] = useState('Inicie a partida!');
  const [finalizado, setFinalizado] = useState(false);

  const rolarDado = () => Math.floor(Math.random() * 6) + 1;

  const jogarJogador1 = () => {
    const novosDados = [rolarDado(), rolarDado()];
    setDadosJogador1(novosDados);
    setTurno('Jogador 2');
    setMsgRodada('Vez do Jogador 2');
  };

  const jogarJogador2 = () => {

    setTurno('JOGADA FINALIZADA');  //coloquei pra tirar a opção do jogador 2 ficar jogando depois de ja ter girado o dado na primeira
                                    //  vez, tava quebrando o código e o jogador 2 ficava ganhando várias rodadas

    const novosDados = [rolarDado(), rolarDado()];
    setDadosJogador2(novosDados);

    //a soma que o resultado da partida recebe
    const soma1 = dadosJogador1[0] + dadosJogador1[1];
    const soma2 = novosDados[0] + novosDados[1];

    
    if (soma1 > soma2) {
      setVitoriasJogador1(vitoriasJogador1 + 1);
      setMsgRodada('Jogador 1 venceu a rodada!');
    } else if (soma2 > soma1) {
      setVitoriasJogador2(vitoriasJogador2 + 1);
      setMsgRodada('Jogador 2 venceu a rodada!');
    } else {
      setMsgRodada('Empate na rodada!');
    }

    
    //verificador das rodadas
    if (rodada < 5) {
      setTimeout(() => {
        setRodada(rodada + 1);
        setTurno('Jogador 1');
        setDadosJogador1([null, null]);
        setDadosJogador2([null, null]);
      }, 1500);
    } else {
      setFinalizado(true);
    }
  };
  
  const reiniciar = () => {
    setRodada(1);
    setVitoriasJogador1(0);
    setVitoriasJogador2(0);
    setDadosJogador1([null, null]);
    setDadosJogador2([null, null]);
    setTurno('Jogador 1');
    setFinalizado(false);
    setMsgRodada('Boa sorte!');
  };

  const getVencedorGeral = () => {
    if (vitoriasJogador1 > vitoriasJogador2) 
      return "Jogador 1 venceu a partida!";
    if (vitoriasJogador2 > vitoriasJogador1) 
      return "Jogador 2 venceu a partida!";
    else 
      return "Empate!";
  };

  return (
    <div style={styles.container}>
      <h2>Rodada: {rodada} / 5</h2>
      
      <div style={styles.placar}>
        <div style={styles.playerBox}>
          <h3>Jogador 1 ({vitoriasJogador1} vitórias)</h3>
          <div style={styles.dadosArea}>
            <Dado valor={dadosJogador1[0]} />
            <Dado valor={dadosJogador1[1]} />
          </div>
          <button onClick={jogarJogador1} disabled={turno !== 'Jogador 1' || finalizado} style={{
              ...styles.button,
              opacity: (turno === 'Jogador 1' && !finalizado) ? 1 : 0.3,
              cursor: (turno === 'Jogador 1' && !finalizado) ? 'pointer' : 'not-allowed'
            }}>Jogar Jogador 1</button>
        </div>

        <div style={styles.playerBox}>
          <h3>Jogador 2 ({vitoriasJogador2} vitórias)</h3>
          <div style={styles.dadosArea}>
            <Dado valor={dadosJogador2[0]} />
            <Dado valor={dadosJogador2[1]} />
          </div>
          <button onClick={jogarJogador2} disabled={turno !== 'Jogador 2' || finalizado} style={{
              ...styles.button,
              opacity: (turno === 'Jogador 2' && !finalizado) ? 1 : 0.3,
              cursor: (turno === 'Jogador 2' && !finalizado) ? 'pointer' : 'not-allowed'
            }}>Jogar Jogador 2</button> 
        </div>
      </div>

      <div style={styles.feedback}>
        {finalizado ? (
          <>
            <h1 style={{ color: '#34bd34' }}>{getVencedorGeral()}</h1>
            <button onClick={reiniciar} style={{ ...styles.button, backgroundColor: '#fff', color: '#000' }}>Jogar Novamente</button>
          </>
        ) : (
          <h3>{msgRodada}</h3>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { color: 'white', textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' },
  placar: { display: 'flex', justifyContent: 'space-around', margin: '30px 0' },
  playerBox: { backgroundColor: '#111', padding: '20px', borderRadius: '15px', width: '40%' },
  dadosArea: { display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' },
  button: { padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '5px', border: 'none', backgroundColor: '#333', color: 'white', opacity: '1' },
  feedback: { marginTop: '20px' }
};
