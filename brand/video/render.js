// Renders brand/video/scene.html into seamless looping MP4s (1080x1920, 30fps, 12s).
// Usage: node render.js <framesDir> <ffmpegPath>
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path");
const LOOP = 12, FPS = 30;
(async () => {
  const [framesDir, ffmpeg] = process.argv.slice(2);
  const browser = await chromium.launch({ proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined, args: ["--ignore-certificate-errors"] });
  for (const qr of ["instagram", "tiktok"]) {
    const dir = path.join(framesDir, qr); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    const page = await browser.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2 });
    await page.goto("file://" + path.resolve(__dirname, "scene.html") + "?qr=" + qr);
    await page.waitForLoadState("networkidle"); await page.waitForTimeout(1500);
    await page.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
    for (let f = 0; f < LOOP * FPS; f++) {
      const t = (f / FPS) * 1000;
      await page.evaluate((t) => document.getAnimations().forEach((a) => { a.currentTime = t; }), t);
      await page.screenshot({ path: path.join(dir, String(f).padStart(4, "0") + ".png") });
    }
    await page.close();
    const out = path.resolve(__dirname, "corvidzz-loop-" + qr + ".mp4");
    execFileSync(ffmpeg, ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(dir, "%04d.png"),
      // a silent sound track: some apps (TikTok among them) refuse or stall on videos with no audio at all
      "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100", "-shortest",
      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-preset", "slow", "-c:a", "aac", "-b:a", "128k",
      "-movflags", "+faststart", out]);
    console.log("wrote", out);
  }
  await browser.close();
})();
