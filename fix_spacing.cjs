const fs = require('fs');
let code = fs.readFileSync('src/components/Leaderboard.tsx', 'utf8');

code = code.replace(/mb-md/g, 'mb-4');
code = code.replace(/mb-lg/g, 'mb-6');
code = code.replace(/gap-md/g, 'gap-4');
code = code.replace(/gap-sm/g, 'gap-2');
code = code.replace(/p-sm md:p-md/g, 'p-3 md:p-4');
code = code.replace(/py-xl/g, 'py-8');
code = code.replace(/gap-xs/g, 'gap-1');

fs.writeFileSync('src/components/Leaderboard.tsx', code);
