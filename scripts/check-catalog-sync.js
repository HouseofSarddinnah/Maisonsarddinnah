const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const rootCatalogPath = path.join(rootDir, 'data', 'posts.json');
const publicCatalogPath = path.join(rootDir, 'public', 'data', 'posts.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function byId(posts) {
  const map = new Map();
  posts.forEach((p) => map.set(p.id, p));
  return map;
}

function normalize(post) {
  return JSON.stringify(post);
}

const rootCatalog = readJson(rootCatalogPath);
const publicCatalog = readJson(publicCatalogPath);

const rootPosts = rootCatalog.posts || [];
const publicPosts = publicCatalog.posts || [];

const rootMap = byId(rootPosts);
const publicMap = byId(publicPosts);

const missingInPublic = [];
const missingInRoot = [];
const mismatched = [];

for (const [id, post] of rootMap) {
  if (!publicMap.has(id)) {
    missingInPublic.push(id);
    continue;
  }
  if (normalize(post) !== normalize(publicMap.get(id))) {
    mismatched.push(id);
  }
}

for (const id of publicMap.keys()) {
  if (!rootMap.has(id)) {
    missingInRoot.push(id);
  }
}

console.log(`root posts: ${rootPosts.length}`);
console.log(`public posts: ${publicPosts.length}`);
console.log(`missing in public: ${missingInPublic.length}`);
console.log(`missing in root: ${missingInRoot.length}`);
console.log(`mismatched by id: ${mismatched.length}`);

if (missingInPublic.length || missingInRoot.length || mismatched.length) {
  console.log('differences detected:');
  missingInPublic.slice(0, 20).forEach((id) => console.log(`- missing in public: ${id}`));
  missingInRoot.slice(0, 20).forEach((id) => console.log(`- missing in root: ${id}`));
  mismatched.slice(0, 20).forEach((id) => console.log(`- mismatched: ${id}`));
  process.exit(1);
}

console.log('Catalog sync check passed.');
