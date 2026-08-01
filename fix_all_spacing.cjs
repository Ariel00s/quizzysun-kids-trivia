const fs = require('fs');

const files = [
  'src/components/CameraCapture.tsx',
  'src/components/BadgeBook.tsx',
  'src/components/RegisterPlayer.tsx',
  'src/components/VictoryView.tsx',
  'src/components/QuizView.tsx',
  'src/components/VersusQuizView.tsx'
];

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/mb-md/g, 'mb-4');
  code = code.replace(/mb-lg/g, 'mb-6');
  code = code.replace(/gap-md/g, 'gap-4');
  code = code.replace(/gap-sm/g, 'gap-2');
  code = code.replace(/p-sm/g, 'p-2');
  code = code.replace(/gap-xs/g, 'gap-1');
  code = code.replace(/p-md/g, 'p-4');
  code = code.replace(/mb-sm/g, 'mb-2');
  code = code.replace(/mt-md/g, 'mt-4');
  code = code.replace(/mt-sm/g, 'mt-2');
  fs.writeFileSync(file, code);
});
