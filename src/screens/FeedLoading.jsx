import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import lightAnim from '../assets/searching-light.json';
import darkAnim from '../assets/searching-dark.json';
import styles from './FeedLoading.module.css';

const rotatingTexts = [
  'from your industry...',
  'from your hometown...',
  'who speak your language...',
  'with shared interests...',
  'who match your goals...',
];

export default function FeedLoading({ onComplete }) {
  const containerRef = useRef(null);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const isDark = containerRef.current?.closest('[data-theme="dark"]') !== null;
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: isDark ? darkAnim : lightAnim,
    });

    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % rotatingTexts.length);
    }, 2000);

    const doneTimer = setTimeout(() => onComplete?.(), 6000);

    return () => {
      anim.destroy();
      clearInterval(textInterval);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={styles.loadingArea}>
      <div ref={containerRef} className={styles.animation} />
      <div className={styles.textBlock}>
        <p className={styles.constantText}>Finding people</p>
        <p className={styles.rotatingText} key={textIndex}>
          {rotatingTexts[textIndex]}
        </p>
      </div>
    </div>
  );
}
