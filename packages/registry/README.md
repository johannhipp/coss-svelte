# packages/registry

Registry schema, item metadata, and build utilities.

This package defines source-of-truth registry metadata for components, examples, dependencies, and generated install targets.

The public entry is `src/index.js`; generated registry JSON is written by `pnpm registry:build` into `apps/registry/static/r`.
