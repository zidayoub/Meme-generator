import memesData from './memesData.js'; // Import the data
import fs from 'fs';
import https from 'https';

// Extract the memes array from the object
const memes = memesData.data.memes;

// Ensure the output folder exists
const outputFolder = './downloaded_memes';
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Function to download an image from a URL
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (error) => {
      fs.unlink(filename, () => {}); // Delete the file if an error occurs
      reject(error.message);
    });
  });
}

// Function to download all images
async function downloadAllImages() {
  for (const meme of memes) {
    const filename = `${outputFolder}/${meme.id}.jpg`;
    try {
      console.log(`Downloading ${meme.name}...`);
      await downloadImage(meme.url, filename);
      console.log(`Saved ${meme.name} as ${filename}`);
    } catch (error) {
      console.error(`Failed to download ${meme.name}: ${error}`);
    }
  }
}

// Start downloading
downloadAllImages();
