// Crossword generator: lays out a list of words and clues as an interlocking grid.
// Works in the browser (window.Crossword) and in Node (require("./crossword.js")).
(function (root) {
  "use strict";

  // Turns pasted text into entries. One per line, answer then clue, separated by
  // a colon, tab, " - ", " = " or "|". Lines starting with # are ignored.
  function parseInput(text) {
    const entries = [], problems = [];
    text.split(/\r?\n/).forEach((raw, i) => {
      const line = raw.trim();
      if (!line || line.startsWith("#")) return;
      const m = line.match(/^(.+?)\s*(?:\t|:|\s[-–—=|]\s|\|)\s*(.+)$/);
      if (!m) { problems.push("Line " + (i + 1) + " has no clue: \"" + line + "\""); return; }
      const shown = m[1].trim();
      const answer = shown.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Z]/g, "");
      if (answer.length < 2) { problems.push("Line " + (i + 1) + ": \"" + shown + "\" needs at least 2 letters"); return; }
      if (entries.some((e) => e.answer === answer)) { problems.push("\"" + shown + "\" is listed twice; the repeat was skipped"); return; }
      // Letter count, with word breaks for phrases: ICE CREAM -> (3,5), T-REX -> (1-3)
      const parts = shown.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
        .split(/([\s-]+)/);
      let enumeration = "";
      parts.forEach((p) => {
        if (/^[\s-]+$/.test(p)) enumeration += p.includes("-") ? "-" : ",";
        else { const n = p.replace(/[^A-Z]/g, "").length; if (n) enumeration += n; }
      });
      enumeration = enumeration.replace(/^[,-]+|[,-]+$/g, "");
      entries.push({ answer, shown, clue: m[2].trim(), enumeration: "(" + enumeration + ")" });
    });
    return { entries, problems };
  }

  // Small seeded random generator, so a layout can be reproduced from its seed.
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const key = (r, c) => r + "," + c;

  // One attempt at placing every word. Grid coordinates are unbounded while building.
  function attempt(entries, rand, maxW, maxH) {
    const cells = new Map(); // "r,c" -> { ch, across: bool, down: bool }
    const placed = [];
    let minR = 0, maxR = 0, minC = 0, maxC = 0;

    // mostly longest words first, but shake the order up so each attempt differs
    const shake = rand() < 0.5 ? 3 : 12;
    const order = entries.map((e) => ({ e, k: e.answer.length + rand() * shake }))
      .sort((a, b) => b.k - a.k).map((x) => x.e);

    function canPlace(word, r, c, dir) {
      const dr = dir === "down" ? 1 : 0, dc = dir === "across" ? 1 : 0;
      const before = cells.get(key(r - dr, c - dc));
      const after = cells.get(key(r + dr * word.length, c + dc * word.length));
      if (before || after) return -1;
      let crossings = 0;
      for (let i = 0; i < word.length; i++) {
        const rr = r + dr * i, cc = c + dc * i;
        const cell = cells.get(key(rr, cc));
        if (cell) {
          if (cell.ch !== word[i] || cell[dir]) return -1;
          crossings++;
        } else {
          // a new letter must not touch other letters side by side
          const s1 = cells.get(key(rr + dc, cc + dr)), s2 = cells.get(key(rr - dc, cc - dr));
          if (s1 || s2) return -1;
        }
      }
      if (maxW || maxH) {
        const nMinR = Math.min(minR, r), nMaxR = Math.max(maxR, r + dr * (word.length - 1));
        const nMinC = Math.min(minC, c), nMaxC = Math.max(maxC, c + dc * (word.length - 1));
        if (maxH && nMaxR - nMinR + 1 > maxH) return -1;
        if (maxW && nMaxC - nMinC + 1 > maxW) return -1;
      }
      return crossings;
    }

    function put(entry, r, c, dir) {
      const dr = dir === "down" ? 1 : 0, dc = dir === "across" ? 1 : 0;
      for (let i = 0; i < entry.answer.length; i++) {
        const k = key(r + dr * i, c + dc * i);
        const cell = cells.get(k) || { ch: entry.answer[i], across: false, down: false };
        cell[dir] = true;
        cells.set(k, cell);
      }
      minR = Math.min(minR, r); maxR = Math.max(maxR, r + dr * (entry.answer.length - 1));
      minC = Math.min(minC, c); maxC = Math.max(maxC, c + dc * (entry.answer.length - 1));
      placed.push({ entry, r, c, dir });
    }

    let pending = order.slice();
    const first = pending.shift();
    const firstDir = maxW && first.answer.length > maxW ? "down" : "across";
    if ((firstDir === "across" && maxW && first.answer.length > maxW) ||
        (firstDir === "down" && maxH && first.answer.length > maxH)) {
      return { placed, unplaced: entries.slice(), cells, bounds: { minR, maxR, minC, maxC } };
    }
    put(first, 0, 0, firstDir);

    // Keep passing over the leftovers while new words keep fitting in.
    let progress = true;
    while (pending.length && progress) {
      progress = false;
      const still = [];
      for (const entry of pending) {
        const word = entry.answer;
        let best = null, bestScore = -Infinity;
        for (const [k, cell] of cells) {
          for (let i = 0; i < word.length; i++) {
            if (word[i] !== cell.ch) continue;
            const [r, c] = k.split(",").map(Number);
            for (const dir of ["across", "down"]) {
              if (cell[dir]) continue;
              const sr = dir === "down" ? r - i : r, sc = dir === "across" ? c - i : c;
              const crossings = canPlace(word, sr, sc, dir);
              if (crossings < 1) continue;
              // favour many crossings and a squarish, compact grid
              const er = dir === "down" ? sr + word.length - 1 : sr, ec = dir === "across" ? sc + word.length - 1 : sc;
              const h = Math.max(maxR, er) - Math.min(minR, sr) + 1, w = Math.max(maxC, ec) - Math.min(minC, sc) + 1;
              const score = crossings * 12 - (w * h) * 0.15 - Math.abs(w - h) * 0.8 + rand() * 4;
              if (score > bestScore) { bestScore = score; best = { r: sr, c: sc, dir }; }
            }
          }
        }
        if (best) { put(entry, best.r, best.c, best.dir); progress = true; }
        else still.push(entry);
      }
      pending = still;
    }
    return { placed, unplaced: pending, cells, bounds: { minR, maxR, minC, maxC } };
  }

  function score(result) {
    const { minR, maxR, minC, maxC } = result.bounds;
    const w = maxC - minC + 1, h = maxR - minR + 1;
    let crossings = 0;
    for (const cell of result.cells.values()) if (cell.across && cell.down) crossings++;
    const fill = result.cells.size / (w * h);
    return result.placed.length * 1000 + crossings * 15 + fill * 60 - Math.abs(w - h) * 3 - (w * h) * 0.2;
  }

  // Builds the best layout from many tries. Options: attempts, seed, maxWidth, maxHeight.
  function generate(entries, options) {
    const opts = { attempts: 1500, seed: Math.floor(Math.random() * 1e9) };
    Object.entries(options || {}).forEach(([k, v]) => { if (v !== undefined && !Number.isNaN(v)) opts[k] = v; });
    if (!entries.length) throw new Error("Add at least one word and clue.");
    const rand = rng(opts.seed);
    let best = null, bestScore = -Infinity;
    for (let i = 0; i < opts.attempts; i++) {
      const res = attempt(entries, rand, opts.maxWidth || 0, opts.maxHeight || 0);
      const s = score(res);
      if (s > bestScore) { bestScore = s; best = res; }
      if (!best.unplaced.length && i > opts.attempts / 2) break;
    }
    return finish(best, opts.seed);
  }

  // Moves the layout to start at 0,0, numbers the squares and sorts the clues.
  function finish(res, seed) {
    const { minR, maxR, minC, maxC } = res.bounds;
    const width = maxC - minC + 1, height = maxR - minR + 1;
    const grid = Array.from({ length: height }, () => Array(width).fill(null));
    for (const [k, cell] of res.cells) {
      const [r, c] = k.split(",").map(Number);
      grid[r - minR][c - minC] = cell.ch;
    }
    const words = res.placed.map((p) => ({ ...p.entry, row: p.r - minR, col: p.c - minC, dir: p.dir }));
    const starts = new Map();
    words.forEach((w) => starts.set(key(w.row, w.col), true));
    let n = 0;
    const numbers = Array.from({ length: height }, () => Array(width).fill(0));
    for (let r = 0; r < height; r++) for (let c = 0; c < width; c++) {
      if (starts.has(key(r, c))) numbers[r][c] = ++n;
    }
    words.forEach((w) => { w.number = numbers[w.row][w.col]; });
    const byNum = (a, b) => a.number - b.number;
    return {
      seed, width, height, grid, numbers,
      across: words.filter((w) => w.dir === "across").sort(byNum),
      down: words.filter((w) => w.dir === "down").sort(byNum),
      unplaced: res.unplaced
    };
  }

  // Plain-text version, handy for checking a layout from the command line.
  function toText(puzzle, showAnswers) {
    const rows = puzzle.grid.map((row) => row.map((ch) => (ch ? (showAnswers ? ch : "_") : ".")).join(" "));
    const list = (title, ws) => title + "\n" + ws.map((w) => "  " + w.number + ". " + w.clue + " " + w.enumeration + (showAnswers ? "  [" + w.shown + "]" : "")).join("\n");
    let out = rows.join("\n") + "\n\n" + list("ACROSS", puzzle.across) + "\n\n" + list("DOWN", puzzle.down);
    if (puzzle.unplaced.length) out += "\n\nCOULD NOT FIT: " + puzzle.unplaced.map((e) => e.shown).join(", ");
    return out;
  }

  const api = { parseInput, generate, toText };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Crossword = api;
})(typeof window !== "undefined" ? window : globalThis);

// Command line: node crossword/crossword.js words.txt [--answers] [--seed N] [--max N]
if (typeof require !== "undefined" && typeof module !== "undefined" && require.main === module) {
  const fs = require("fs");
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith("--") && !/^\d+$/.test(a));
  const num = (flag) => { const i = args.indexOf(flag); return i >= 0 ? Number(args[i + 1]) : undefined; };
  const { parseInput, generate, toText } = module.exports;
  const { entries, problems } = parseInput(fs.readFileSync(file || 0, "utf8"));
  problems.forEach((p) => console.error("! " + p));
  const max = num("--max");
  const puzzle = generate(entries, { seed: num("--seed"), maxWidth: max, maxHeight: max });
  console.log(toText(puzzle, args.includes("--answers")));
  console.log("\nseed " + puzzle.seed + ", " + puzzle.width + "x" + puzzle.height);
}
