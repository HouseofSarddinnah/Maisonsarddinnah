const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

const filesToCopy = [
  '_headers',
  '_redirects',
  'about.html',
  'affiliate-disclosure.html',
  'contact.html',
  'disclaimer.html',
  'index.html',
  'newsletter.html',
  'privacy-policy.html',
  'resources.html',
  'robots.txt',
  'sitemap.xml',
  'terms-conditions.html'
];

const dirsToCopy = [
  'blog',
  'destinations',
  'sections',
  'data',
  path.join('assets', 'css'),
  path.join('assets', 'js')
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyFileRelative(relPath) {
  const src = path.join(rootDir, relPath);
  const dest = path.join(publicDir, relPath);
  if (!fs.existsSync(src) || fs.statSync(src).isDirectory()) {
    return 0;
  }
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  return 1;
}

function copyDirRecursive(srcRel) {
  const srcDir = path.join(rootDir, srcRel);
  const destDir = path.join(publicDir, srcRel);
  if (!fs.existsSync(srcDir) || !fs.statSync(srcDir).isDirectory()) {
    return 0;
  }

  let copied = 0;
  const stack = [srcDir];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(current, entry.name);
      const relFromRoot = path.relative(rootDir, srcPath);

      if (relFromRoot === 'public' || relFromRoot.startsWith(`public${path.sep}`)) {
        continue;
      }

      const destPath = path.join(publicDir, relFromRoot);
      if (entry.isDirectory()) {
        ensureDir(destPath);
        stack.push(srcPath);
      } else {
        ensureDir(path.dirname(destPath));
        fs.copyFileSync(srcPath, destPath);
        copied += 1;
      }
    }
  }

  return copied;
}

let copiedCount = 0;
for (const file of filesToCopy) {
  copiedCount += copyFileRelative(file);
}

for (const dir of dirsToCopy) {
  copiedCount += copyDirRecursive(dir);
}

console.log(`Synced ${copiedCount} files to public/.`);
