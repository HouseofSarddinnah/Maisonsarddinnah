const fs = require('fs');
const path = require('path');

function walkHtml(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const stack = [dir];

  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
        out.push(full);
      }
    }
  }

  return out;
}

function checkCanonical(files, rootDir) {
  const missing = [];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('<link rel="canonical"')) {
      missing.push(path.relative(rootDir, file).replace(/\\/g, '/'));
    }
  }
  return missing;
}

const rootDir = path.resolve(__dirname, '..');
const blogFiles = walkHtml(path.join(rootDir, 'blog'));
const publicBlogFiles = walkHtml(path.join(rootDir, 'public', 'blog'));

const missingBlog = checkCanonical(blogFiles, rootDir);
const missingPublicBlog = checkCanonical(publicBlogFiles, rootDir);

console.log(`blog HTML files: ${blogFiles.length}`);
console.log(`public/blog HTML files: ${publicBlogFiles.length}`);
console.log(`missing canonical in blog: ${missingBlog.length}`);
console.log(`missing canonical in public/blog: ${missingPublicBlog.length}`);

if (missingBlog.length || missingPublicBlog.length) {
  const preview = [...missingBlog, ...missingPublicBlog].slice(0, 20);
  console.log('first missing files:');
  preview.forEach((f) => console.log(`- ${f}`));
  process.exit(1);
}

console.log('Canonical check passed.');
