const fs = require('fs');
const code = fs.readFileSync('src/components/MainMenu.tsx', 'utf8');

let tags = [];
let lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  let opens = (line.match(/<[a-zA-Z][a-zA-Z0-9]*[^>]*?(?<!\/)>/g) || []).length;
  let closes = (line.match(/<\/[a-zA-Z][a-zA-Z0-9]*>/g) || []).length;
  // This is very naive, doesn't handle strings or comments well, but gives a rough idea
}
// Just try to build and see the exact error.
