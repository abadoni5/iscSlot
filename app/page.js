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
      question: 'How can I book slots at the Indoor Sports Complex (ISC)?',
      answer: 'Our website allows you to easily book slots for the gym or any other sport without the need to visit in person. Simply log in and schedule your preferred time.',
    },
    {
      question: 'Is it possible to book slots for multiple sports at once?',
      answer: 'Absolutely! Our platform offers the flexibility to reserve slots for various sports activities, making it convenient for you to plan your fitness routine.',
    },
    {
      question: 'Can I issue sports equipment through the website?',
      answer: 'Yes, you can! The website provides a seamless process for issuing sports equipment and managing inventory. Enjoy the convenience of accessing the gear you need for your favorite sports.',
    },
    {
      question: 'What is the advantage of using the website over the current manual booking system?',
      answer: 'By using our website, you can bypass the need to physically visit every Sunday from 9-10 for slot bookings. It streamlines the process, saving you time and providing a more efficient way to manage your sports activities.',
    },
    {
      question: 'How do I navigate the inventory management feature on the website?',
      answer: 'Managing inventory is simple! The website offers an intuitive interface for you to easily keep track of sports equipment availability, making it straightforward to issue and return items as needed.',
    },
  ]

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
