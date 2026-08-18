import React, { useEffect } from 'react';

export default function FireworkCursor() {
  useEffect(() => {
    document.documentElement.style.cursor = 'auto';
    if (document.body) document.body.style.cursor = 'auto';
  }, []);

  return null;
}
