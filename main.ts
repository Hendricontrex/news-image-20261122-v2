// Entry program: copy the pre-rendered front page to the output directory.
//
// The image itself is drawn by scripts/compose.py (deterministic PIL render);
// this program only validates it and copies it, so running it twice yields
// byte-identical output.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const dst = join(outDir, "entry.png");

const png = readFileSync(src);

// PNG signature
const magic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!png.subarray(0, 8).equals(magic)) {
  throw new Error("entry.png is not a PNG file");
}
// IHDR: width and height at bytes 16..24 (big-endian uint32)
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png must be 1024x1024, got ${width}x${height}`);
}
// Size cap: 1 MiB
if (png.length > 1048576) {
  throw new Error(`entry.png is ${png.length} bytes, over the 1 MiB cap`);
}
// IEND trailer must be present (last 12 bytes: length 0, "IEND", CRC)
if (png.subarray(-8, -4).toString("ascii") !== "IEND") {
  throw new Error("entry.png has no IEND trailer");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Prove the copy: re-read, byte-compare, and hash both sides.
const back = readFileSync(dst);
if (!back.equals(png)) {
  throw new Error("output copy differs from entry.png");
}
const sha = createHash("sha256").update(png).digest("hex");
const shaBack = createHash("sha256").update(back).digest("hex");
if (sha !== shaBack) {
  throw new Error("output sha256 does not match entry.png");
}
console.log(
  `wrote ${dst} (${png.length} bytes, 1024x1024 PNG, verified identical)`,
);
console.log(`sha256 ${sha}`);
