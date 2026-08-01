const fs = require('fs');
let code = fs.readFileSync('src/components/MainMenu.tsx', 'utf8');

code = code.replace(
  /<span className="text-3xl">\{activePlayer.avatar\}<\/span>/,
  `{activePlayer.profilePic ? (
                            <div className="w-10 h-10 rounded-full border-2 border-[#74B9FF] overflow-hidden shrink-0 bg-slate-50 flex items-center justify-center">
                              <img src={activePlayer.profilePic} alt={activePlayer.name} className="w-full h-full object-cover scale-x-[-1]" />
                            </div>
                          ) : (
                            <span className="text-3xl">{activePlayer.avatar}</span>
                          )}`
);

fs.writeFileSync('src/components/MainMenu.tsx', code);
