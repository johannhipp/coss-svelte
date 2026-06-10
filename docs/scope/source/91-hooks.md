# Hooks

The live `llms.txt` docs map lists 2 hooks in addition to the component library. They are included here because they affect responsive COSS composition and common action patterns.

## useMediaQuery

- Source: [docs](https://coss.com/ui/docs/hooks/use-media-query.md)
- Purpose: Reactive media query hook with Tailwind-like syntax.
- Install: `npx shadcn@latest add @coss/use-media-query`
- Covers breakpoint shorthand such as `md`, `max-md`, and `md:max-lg`.
- Covers object API queries for `min`, `max`, and pointer type.
- Covers raw CSS media queries as an escape hatch.
- Returns `false` during SSR and uses `useSyncExternalStore`.
- Also exports `useIsMobile` for shadcn-style mobile checks.

## useCopyToClipboard

- Source: [docs](https://coss.com/ui/docs/hooks/use-copy-to-clipboard.md)
- Purpose: Copy text to clipboard with a temporary "copied" state.
- Install: `npx shadcn@latest add @coss/use-copy-to-clipboard`
- Covers Clipboard API writes through `copyToClipboard(value)`.
- Tracks `isCopied` for feedback UI.
- Supports custom reset timeout.
- Supports an `onCopy` callback after successful copy.
- Pairs naturally with Button particles for copy buttons and icon-swap feedback.
