import * as mod from 'threejs-components/build/module.min.js';

console.log('threejs-components mod keys:', Object.keys(mod || {}));
if (mod.cursors) {
  console.log('cursors keys:', Object.keys(mod.cursors));
  console.log('particles1 is function:', typeof mod.cursors.particles1);
}
