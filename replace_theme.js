const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // General Tailwind classes replacements
  content = content.replace(/text-white\/40/g, 'text-slate-500');
  content = content.replace(/text-white\/50/g, 'text-slate-500');
  content = content.replace(/text-white\/60/g, 'text-slate-600');
  content = content.replace(/text-white\/70/g, 'text-slate-600');
  content = content.replace(/text-white\/80/g, 'text-slate-700');
  content = content.replace(/text-white\/90/g, 'text-slate-700');
  content = content.replace(/text-white/g, 'text-slate-900');
  content = content.replace(/text-\[\#0f172a\]/g, 'text-slate-900'); // in case it replaced part of text-white

  content = content.replace(/border-white\/10/g, 'border-slate-200');
  content = content.replace(/border-white\/20/g, 'border-slate-200');
  content = content.replace(/border-white\/30/g, 'border-slate-300');
  content = content.replace(/border-white\/5/g, 'border-slate-100');

  content = content.replace(/bg-white\/5/g, 'bg-white shadow-sm border border-slate-200');
  content = content.replace(/bg-white\/10/g, 'bg-slate-50 border border-slate-200');
  content = content.replace(/bg-white\/20/g, 'bg-slate-100');

  // specific bg colors
  content = content.replace(/bg-\[\#121212\]/g, 'bg-transparent');
  content = content.replace(/bg-\[\#010101\]/g, 'bg-transparent');
  content = content.replace(/bg-black\/50/g, 'bg-white/80');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath);
  }
}

const dir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(dir);
for (const file of files) {
  if (file.endsWith('.tsx')) {
    replaceInFile(path.join(dir, file));
  }
}
replaceInFile(path.join(__dirname, 'src', 'App.tsx'));

