import Image from 'next/image';
import Navbar from '@/components/Navbar';
import MainText from 'components/landing/mainText.jsx'
import Slider from 'components/landing/slider.jsx'
import img from '../public/landing.png'
import styles from './page.module.css';
import FAQ from '@/components/landing/faq';

export default function Home() {
  const styling = {
    backgroundImage: `url(${img.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '120vh',
  }

  const faqData = [
    {
      question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia?',
      answer: 'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
    },
    {
      question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia?',
      answer: 'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
    },
    {
      question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia?',
      answer: 'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
    },
    {
      question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia?',
      answer: 'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
    },
    {
      question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia?',
      answer: 'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
    },
  ];

  return (
    <div>
      <div style={styling}>
        <Navbar />
        <MainText />
      </div>

      <div className={styles.mainClass}>
        <h2 className="text-4xl text-center font-semibold mt-12 mb-12 text-emerald-900">Select a Sport</h2>
        <Slider />
        <FAQ faqData={faqData} />
        <img src="ellipse.png" className={styles.img1} />
        <img src="ellipse2.png" className={styles.img2} />
        <img src="rectangle13.png" className='mt-8' alt="rectangle bottom" />
      </div>
    </div>
  );
}
