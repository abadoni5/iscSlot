import Image from 'next/image';
import Navbar from '@/components/Navbar';
import MainText from 'components/landing/mainText.jsx'
import img from '../public/landing.png'

export default function Home() {
  const styling = {
    backgroundImage: `url(${img.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
  }

  return (
    <div style={styling}>
      <Navbar />
      <MainText />
    </div>
  );
}
