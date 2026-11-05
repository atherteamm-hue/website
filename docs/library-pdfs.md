# Library PDF hosting

The academic library PDFs are no longer stored in this repository. They are
published as assets on the [`library-pdfs-v1`][release] GitHub release, and the
site links directly to those asset URLs. Keeping them out of `public/` keeps the
GitHub Pages artifact small, so deployments stay fast.

[release]: https://github.com/atherteamm-hue/website/releases/tag/library-pdfs-v1

How it fits together:

- `src/data/pdfReleaseMap.ts` maps each original site path (for example
  `/english101/books/textbook-english-101.pdf`) to its release asset name.
- `src/data/curriculumData.ts` rewrites every `url` it recognises using that
  map when the data module loads, so no component needed to change.
- `PDF_RELEASE_BASE` builds the public URL from the release tag.

## Adding or replacing a PDF

1. Upload the file to the release. Asset names must be unique and may only use
   ASCII letters, digits, `.`, `_` and `-` (GitHub rewrites anything else, and
   spaces become dots).
2. Add an entry to `PDF_RELEASE_ASSETS` mapping the path used in
   `curriculumData.ts` to the asset name.

Keep the release published: deleting it breaks every PDF link on the site.

GitHub serves release assets with `Content-Disposition: attachment`, so clicking
a library link downloads the PDF instead of opening it in the browser's viewer.
