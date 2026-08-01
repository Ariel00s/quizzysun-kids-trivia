const fs = require('fs');
let code = fs.readFileSync('src/components/VersusQuizView.tsx', 'utf8');

code = code.replace(
  /<span className="text-5xl">\{player1\.avatar\}<\/span>/,
  `{player1.profilePic ? (
              <div className="w-14 h-14 rounded-full border-4 border-[#74B9FF] overflow-hidden shrink-0 bg-white flex items-center justify-center">
                <img src={player1.profilePic} alt={player1.name} className="w-full h-full object-cover scale-x-[-1]" />
              </div>
            ) : (
              <span className="text-5xl">{player1.avatar}</span>
            )}`
);

code = code.replace(
  /<span className="text-5xl">\{player2\.avatar\}<\/span>/,
  `{player2.profilePic ? (
              <div className="w-14 h-14 rounded-full border-4 border-rose-300 overflow-hidden shrink-0 bg-white flex items-center justify-center">
                <img src={player2.profilePic} alt={player2.name} className="w-full h-full object-cover scale-x-[-1]" />
              </div>
            ) : (
              <span className="text-5xl">{player2.avatar}</span>
            )}`
);

code = code.replace(
  /\{activeChallenger\.avatar\}/,
  `{activeChallenger.profilePic ? (
            <img src={activeChallenger.profilePic} alt={activeChallenger.name} className="w-16 h-16 rounded-full object-cover scale-x-[-1] border-4 border-current" />
          ) : (
            activeChallenger.avatar
          )}`
);

code = code.replace(
  /\{currentChallenger\.avatar\}/,
  `{currentChallenger.profilePic ? (
            <img src={currentChallenger.profilePic} alt={currentChallenger.name} className="w-8 h-8 rounded-full object-cover scale-x-[-1] border-2 border-current" />
          ) : (
            currentChallenger.avatar
          )}`
);

// We won't worry about the small text inline ones as much, or we could replace those as well.
code = code.replace(
  /<span className="mr-1">\{player1\.avatar\} \{player1\.name\}:<\/span>/,
  `<span className="mr-1 flex items-center gap-1">
              {player1.profilePic ? <img src={player1.profilePic} className="w-4 h-4 rounded-full object-cover scale-x-[-1]" /> : player1.avatar} {player1.name}:
            </span>`
);

code = code.replace(
  /<span className="mr-1">\{player2\.avatar\} \{player2\.name\}:<\/span>/,
  `<span className="mr-1 flex items-center gap-1">
              {player2.profilePic ? <img src={player2.profilePic} className="w-4 h-4 rounded-full object-cover scale-x-[-1]" /> : player2.avatar} {player2.name}:
            </span>`
);

fs.writeFileSync('src/components/VersusQuizView.tsx', code);
