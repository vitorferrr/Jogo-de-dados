import JogoDados from '../components/JogoDados';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <title>Jogo de Dados - 5 Rodadas</title>
      <JogoDados />
    </div>
  );
}