const fs = require('fs');
let code = fs.readFileSync('src/components/MainMenu.tsx', 'utf8');

// The modal at line 463 is missing its closing tags.
// Let's find:
//               })}
//     </div>
//   );
// }
//   return (
// and insert the closing tags.

code = code.replace(
`              })}
    </div>
  );
}
  return (`,
`              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

  return (`
);

fs.writeFileSync('src/components/MainMenu.tsx', code);
