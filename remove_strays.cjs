const fs = require('fs');
let code = fs.readFileSync('src/components/MainMenu.tsx', 'utf8');

const stray = `            </div>
          </div>
        </div>
      )}`;

// We want to replace the first 7 occurrences of this stray block with empty string.
let count = 0;
code = code.replace(new RegExp(stray.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), (match) => {
  count++;
  if (count <= 7) return '';
  return match;
});

fs.writeFileSync('src/components/MainMenu.tsx', code);
console.log('Replaced', count, 'occurrences.');
