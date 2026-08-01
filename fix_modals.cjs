const fs = require('fs');
let code = fs.readFileSync('src/components/MainMenu.tsx', 'utf8');

// Find the modal block
const modalRegex = /\s*\{\/\* Avatar Selector Modal \*\/\}\s*\{showAvatarModal && activePlayer && \([\s\S]*?\}\s*\)\}/g;

// Extract one instance
const match = code.match(modalRegex);
if (match) {
  const modalCode = match[0];
  // Remove all instances
  code = code.replace(modalRegex, '');
  // Append one instance before the final closing div of MainMenu
  // Look for the last closing div of the return statement
  code = code.replace(/    <\/div>\s*\)\;\s*\}/, modalCode + '\n    </div>\n  );\n}');
}

fs.writeFileSync('src/components/MainMenu.tsx', code);
