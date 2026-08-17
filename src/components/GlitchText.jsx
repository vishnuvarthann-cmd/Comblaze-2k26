import React from 'react';

export const GlitchText = ({
  text,
  as: Component = 'span',
  className = '',
  color = 'cyan', // 'cyan', 'magenta', 'purple'
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'magenta':
        return 'text-pink-500 neon-text-magenta';
      case 'purple':
        return 'text-purple-400';
      case 'cyan':
      default:
        return 'text-cyan-400 neon-text-cyan';
    }
  };

  return (
    <Component className={`glitch-wrapper font-orbitron tracking-wider ${className}`}>
      <span className={`glitch-text-layer ${getColorClass()}`} data-text={text}>
        {text}
      </span>
    </Component>
  );
};

export default GlitchText;
