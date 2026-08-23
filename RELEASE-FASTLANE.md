# Release Fastlane

Use this quick flow for cleaner, faster releases.

## Daily Publish Flow

1. Edit content in root files.
2. Run:

```bash
npm run prepare:release
```

This command will:
- verify `data/posts.json` and `public/data/posts.json` are in sync
- verify canonical links exist on blog pages
- build generated pages and sync root content to `public/`

3. Commit and push:

```bash
git add -A
git commit -m "your message"
git push origin main
```

4. Confirm Cloudflare Pages auto-deployment appears.

## Useful Commands

```bash
npm run check:catalog
npm run check:canonicals
npm run sync:public
npm run build
```

## Notes

- Keep root files as source of truth.
- Avoid editing `public/` manually unless needed for emergency hotfixes.
