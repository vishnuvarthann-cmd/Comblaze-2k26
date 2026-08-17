import React from 'react';

export const ScanlineOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-30">
      <div className="w-full h-full scanlines" />
    </div>
  );
};

export default ScanlineOverlay;
