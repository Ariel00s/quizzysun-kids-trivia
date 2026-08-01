const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-\\[#FFF9E6\\]">/g,
  '<div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#FFF9E6]" dir={lang === "he" ? "rtl" : "ltr"}>'
);

// If the previous replace failed because of escaping:
code = code.replace(
  '<div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#FFF9E6]">',
  '<div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#FFF9E6]" dir={lang === "he" ? "rtl" : "ltr"}>'
);

fs.writeFileSync('src/App.tsx', code);
