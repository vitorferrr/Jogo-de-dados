"use client";

import { useState } from 'react';
import Dado from './Dado';

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosP1, setDadosP1] = useState([null, null]);
  const [dadosP2, setDadosP2] = useState([null, null]);
  const [vitoriasP1, setVitoriasP1] = useState(0);
  const [vitoriasP2, setVitoriasP2] = useState(0);
  const [turno, setTurno] = useState('P1');
  const [msgRodada, setMsgRodada] = useState('Inicie a partida!');
  const [finalizado, setFinalizado] = useState(false);

  const rolarDado = () => Math.floor(Math.random() * 6) + 1;

  const jogarP1 = () => {
    const novosDados = [rolarDado(), rolarDado()];
    setDadosP1(novosDados);
    setTurno('P2');
    setMsgRodada('Vez do Jogador 2');
  };

  const jogarP2 = () => {
    const novosDados = [rolarDado(), rolarDado()];
    setDadosP2(novosDados);

    //resultado da partida
    const soma1 = dadosP1[0] + dadosP1[1];
    const soma2 = novosDados[0] + novosDados[1];

    if (soma1 > soma2) {
      setVitoriasP1(vitoriasP1 + 1);
      setMsgRodada('Jogador 1 venceu a rodada!');
    } else if (soma2 > soma1) {
      setVitoriasP2(vitoriasP2 + 1);
      setMsgRodada('Jogador 2 venceu a rodada!');
    } else {
      setMsgRodada('Empate na rodada!');
    }

    //verificador das rodadas
    if (rodada < 5) {
      setTimeout(() => {
        setRodada(rodada + 1);
        setTurno('P1');
        setDadosP1([null, null]);
        setDadosP2([null, null]);
      }, 1500);
    } else {
      setFinalizado(true);
    }
  };

  const reiniciar = () => {
    setRodada(1);
    setVitoriasP1(0);
    setVitoriasP2(0);
    setDadosP1([null, null]);
    setDadosP2([null, null]);
    setTurno('P1');
    setFinalizado(false);
    setMsgRodada('Boa sorte!');
  };

  const getVencedorGeral = () => {
    if (vitoriasP1 > vitoriasP2) return "Jogador 1 venceu a partida!";
    if (vitoriasP2 > vitoriasP1) return "Jogador 2 venceu a partida!";
    return "Empate!";
  };

  return (
    <div style={styles.container}>
      <h2>Rodada: {rodada} / 5</h2>
      
      <div style={styles.placar}>
        <div style={styles.playerBox}>
          <h3>Jogador 1 ({vitoriasP1} vitórias)</h3>
          <div style={styles.dadosArea}>
            <Dado valor={dadosP1[0]} />
            <Dado valor={dadosP1[1]} />
          </div>
          <button onClick={jogarP1} disabled={turno !== 'P1' || finalizado} style={styles.btn}>Jogar P1</button>
        </div>

        <div style={styles.playerBox}>
          <h3>Jogador 2 ({vitoriasP2} vitórias)</h3>
          <div style={styles.dadosArea}>
            <Dado valor={dadosP2[0]} />
            <Dado valor={dadosP2[1]} />
          </div>
          <button onClick={jogarP2} disabled={turno !== 'P2' || finalizado} style={styles.btn}>Jogar P2</button> 
        </div>
      </div>

      <div style={styles.feedback}>
        {finalizado ? (
          <>
            <h1 style={{ color: '#00ff00' }}>{getVencedorGeral()}</h1>
            <button onClick={reiniciar} style={{ ...styles.btn, backgroundColor: '#fff', color: '#000' }}>Jogar Novamente</button>
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
  btn: { padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '5px', border: 'none', backgroundColor: '#333', color: 'white', opacity: '1' },
  feedback: { marginTop: '20px' }
};