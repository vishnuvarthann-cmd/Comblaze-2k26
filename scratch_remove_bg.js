import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

function processImage(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(inputPath)
      .pipe(new PNG({ filterType: 4 }))
      .on('parsed', function () {
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            const idx = (this.width * y + x) << 2;
            const r = this.data[idx];
            const g = this.data[idx + 1];
            const b = this.data[idx + 2];
            
            // Calculate max brightness of RGB channels
            const maxVal = Math.max(r, g, b);
            
            // Threshold for background removal
            if (maxVal < 28) {
              this.data[idx + 3] = 0; // 100% Transparent Alpha
            } else if (maxVal < 60) {
              // Smooth edge feathering
              const alphaRatio = (maxVal - 28) / 32;
              this.data[idx + 3] = Math.round(this.data[idx + 3] * alphaRatio);
            }
          }
        }

        this.pack()
          .pipe(fs.createWriteStream(outputPath))
          .on('finish', () => {
            console.log(`[Success] Processed: ${outputPath}`);
            resolve();
          })
          .on('error', reject);
      })
      .on('error', reject);
  });
}

async function run() {
  const images = [
    {
      in: 'C:/Users/pavun/.gemini/antigravity/brain/4cb8c656-8b01-4eb7-bc5c-5ac42e6f7368/.user_uploaded/media_1786657041422.png',
      out: path.resolve('public/images/logo-comblaze.png')
    },
    {
      in: 'C:/Users/pavun/.gemini/antigravity/brain/4cb8c656-8b01-4eb7-bc5c-5ac42e6f7368/.user_uploaded/media_1786657041396.png',
      out: path.resolve('public/images/logo-mamce.png')
    }
  ];

  for (const img of images) {
    const tempOut = img.out + '.tmp.png';
    await processImage(img.in, tempOut);
    if (fs.existsSync(img.out)) fs.unlinkSync(img.out);
    fs.renameSync(tempOut, img.out);
  }
  console.log('ALL LOGO BACKGROUNDS SUCCESSFULLY REMOVED!');
}

run().catch(console.error);
