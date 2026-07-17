const fs = require('fs');
const files = [
  'src/app/admin/layout.tsx',
  'src/app/admin/page.tsx',
  'src/app/agenda/layout.tsx',
  'src/app/agenda/page.tsx',
  'src/app/cadastro/layout.tsx',
  'src/app/cadastro/page.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/nyavgcggwygkywjboaxh/g, 'yslikzkgiaxafcgrqvzh');
    fs.writeFileSync(file, content);
  }
}
