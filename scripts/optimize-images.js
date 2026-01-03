import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, "../public");
const OUTPUT_DIR = path.join(__dirname, "../public/optimized");
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 75;
const WEBP_QUALITY = 75;

// Image extensions to process
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

async function optimizeImages() {
  console.log("🖼️  Starting image optimization...\n");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all image files in public directory
  const files = fs.readdirSync(PUBLIC_DIR).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  });

  console.log(`Found ${files.length} images to optimize\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of files) {
    const inputPath = path.join(PUBLIC_DIR, file);
    const baseName = path.basename(file, path.extname(file));

    try {
      const originalStats = fs.statSync(inputPath);
      totalOriginalSize += originalStats.size;

      // Get image metadata
      const metadata = await sharp(inputPath).metadata();
      const needsResize = metadata.width > MAX_WIDTH;

      // Create optimized JPEG
      const jpegOutputPath = path.join(OUTPUT_DIR, `${baseName}.jpg`);
      let jpegPipeline = sharp(inputPath);

      if (needsResize) {
        jpegPipeline = jpegPipeline.resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: "inside",
        });
      }

      await jpegPipeline
        .jpeg({
          quality: JPEG_QUALITY,
          progressive: true,
          mozjpeg: true,
        })
        .toFile(jpegOutputPath);

      // Create WebP version
      const webpOutputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);
      let webpPipeline = sharp(inputPath);

      if (needsResize) {
        webpPipeline = webpPipeline.resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: "inside",
        });
      }

      await webpPipeline
        .webp({
          quality: WEBP_QUALITY,
        })
        .toFile(webpOutputPath);

      // Get optimized sizes
      const jpegStats = fs.statSync(jpegOutputPath);
      const webpStats = fs.statSync(webpOutputPath);
      totalOptimizedSize += webpStats.size; // Count WebP as the primary format

      const originalKB = (originalStats.size / 1024).toFixed(1);
      const jpegKB = (jpegStats.size / 1024).toFixed(1);
      const webpKB = (webpStats.size / 1024).toFixed(1);
      const savings = (
        ((originalStats.size - webpStats.size) / originalStats.size) *
        100
      ).toFixed(0);

      console.log(
        `✅ ${file}${needsResize ? " (resized)" : ""}`
      );
      console.log(
        `   ${originalKB}KB → JPEG: ${jpegKB}KB, WebP: ${webpKB}KB (-${savings}%)\n`
      );
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message, "\n");
    }
  }

  // Print summary
  const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
  const totalOptimizedMB = (totalOptimizedSize / 1024 / 1024).toFixed(2);
  const totalSavings = (
    ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) *
    100
  ).toFixed(0);

  console.log("─".repeat(50));
  console.log(`\n📊 Summary:`);
  console.log(`   Original total:  ${totalOriginalMB} MB`);
  console.log(`   Optimized total: ${totalOptimizedMB} MB (WebP)`);
  console.log(`   Total savings:   ${totalSavings}%`);
  console.log(`\n✨ Optimized images saved to: ${OUTPUT_DIR}`);
  console.log(
    `\n💡 To use the optimized images, update your image paths from:`
  );
  console.log(`   "/image.jpg" → "/optimized/image.webp"`);
}

optimizeImages().catch(console.error);
