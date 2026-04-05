import Image from 'next/image';

export default function Dado({ valor }) {
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