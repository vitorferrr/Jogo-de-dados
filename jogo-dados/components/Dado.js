import Image from 'next/image';

export default function Dado({ valor }) {
    if (!valor) return <div style={{ width: 80, height: 80, border: '1px dashed #444', borderRadius: '10px' }} />;

  return (
    <div style={{ textAlign: 'center' }}>
      <Image 
        src={`/dados/Dado${valor}.png`} 
        alt={`Dado ${valor}`}
        width={80} 
        height={80}
      />
    </div>
  );
}