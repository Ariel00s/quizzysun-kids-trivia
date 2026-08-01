const fs = require('fs');
let code = fs.readFileSync('src/components/MainMenu.tsx', 'utf8');

code = code.replace(
  /onSave=\{\(name, age, avatar\) => onRegisterPlayer\(name, age, avatar, null, false\)\}/g,
  'onSave={(name, age, avatar, profilePic) => onRegisterPlayer(name, age, avatar, profilePic, false)}'
);

code = code.replace(
  /const handleSaveInlinePlayer = \(name: string, ageGroup: AgeGroup, avatar: string\) => {/g,
  'const handleSaveInlinePlayer = (name: string, ageGroup: AgeGroup, avatar: string, profilePic: string | null) => {'
);

code = code.replace(
  /onRegisterPlayer\(name, ageGroup, avatar, null, false\);/g,
  'onRegisterPlayer(name, ageGroup, avatar, profilePic, false);'
);

fs.writeFileSync('src/components/MainMenu.tsx', code);
