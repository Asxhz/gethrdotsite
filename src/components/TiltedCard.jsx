import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './TiltedCard.css';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  children,
  containerHeight = '300px',
  containerWidth = '100%',
  cardHeight = '300px',
  cardWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showTooltip = false,
  captionText = '',
  onClick,
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{ height: containerHeight, width: containerWidth, cursor: onClick ? 'pointer' : 'default' }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="tilted-card-inner"
        style={{
          width: cardWidth,
          height: cardHeight,
          rotateX,
          rotateY,
          scale
        }}
      >
        {children}
      </motion.div>

      {showTooltip && captionText && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
