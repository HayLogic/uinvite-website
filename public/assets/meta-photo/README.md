# Shared category images

Place the owner's supplied PNG files here:

- `wedding.png`: all wedding invitations
- `bapstrim.png`: all baptism invitations (filename spelling retained as requested)
- `birthday.png`: birthday and children's birthday invitations

These files are not supplied yet. Do not generate substitutes. The public URLs are `/assets/meta-photo/<filename>`; `public/` is not part of the URL. Other invitation categories retain their existing sharing images.

The viewer's OG/Twitter metadata uses `src/data/shareImages.json`. After changing assignments or paths, run `node scripts/sync-share-images.mjs` to update static metadata in standalone invitation entrypoints as well. Rebuild the website after adding the actual images. Share previews will work once the files and HTML are served by the target site; local testing does not change the live site.
