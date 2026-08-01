const fs = require('fs');
let code = fs.readFileSync('src/components/MainMenu.tsx', 'utf8');

code = code.replace(
  /<span>\{p.avatar\}<\/span>/,
  `{p.profilePic ? (
                                  <div className="w-5 h-5 rounded-full border border-current overflow-hidden shrink-0 bg-white flex items-center justify-center">
                                    <img src={p.profilePic} alt={p.name} className="w-full h-full object-cover scale-x-[-1]" />
                                  </div>
                                ) : (
                                  <span>{p.avatar}</span>
                                )}`
);

fs.writeFileSync('src/components/MainMenu.tsx', code);
