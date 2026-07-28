# Design QA: Particle search follow-up

- Source visual truth:
  `.artifacts/particles-search-reference.png`
- Rendered implementation:
  `.artifacts/particles-search-implementation-full.png`
- Focused implementation crop:
  `.artifacts/particles-search-implementation.png`
- Combined comparison:
  `.artifacts/particles-search-comparison.png`
- Source pixels: 1514 × 986; source display density is not encoded in the
  screenshot metadata.
- Implementation pixels and CSS viewport: 1280 × 720 at device scale factor 1.
- Focused comparison panels: 729 × 504 each, aspect-preserving resize on a
  white canvas without stretching.
- State: light theme, empty search value, focused input, filter popup open.

## Findings

No actionable P0, P1, or P2 differences remain for the requested interaction.

- The standalone tag trigger is gone.
- The search field opens directly into the filter list.
- The popup retains the reference hierarchy, rounded framing, search icon,
  visible "Filter particles" label, tag-labelled options, and restrained
  shadow.
- Typography, row density, tag glyph shape, and color use the existing
  coss-svelte tokens rather than replacing the local design system with the
  reference site's exact theme. This is an intentional P3-level difference.
- No raster imagery or custom visual assets are involved.
- App-specific copy matches the reference state.

## Interaction and accessibility evidence

- Clicking or focusing the search opens the popup.
- Typing filters the available particle tags.
- Selecting multiple tags keeps the picker usable and clears the query.
- Clicking outside closes the popup.
- Backspace and Delete remove the most recently selected tag from an empty
  input.
- The selected filters remain synchronized with the `tags` URL parameter.
- The production browser regression and open-state axe scan pass.
- A fresh in-app browser session reports no console warnings or errors for the
  compared state.

## Comparison history

1. Baseline: the input and native `details` picker were separate, so input
   focus did not open the menu, the query did not filter menu options,
   outside-click did not dismiss it, and deletion keys did not remove tags.
   Fix: replaced the split controls with one multiple Combobox state machine.
2. First production accessibility pass: the popup had unnamed/invalid listbox
   ownership, no explicit input-to-popup relationship, and an unreachable
   scroll region. Fix: added `aria-controls`, labelled the listbox, used a
   proper option group, and made its first option the scroll region's keyboard
   entry point.
3. Final comparison: no actionable P0/P1/P2 mismatch remained. The focused
   comparison confirms the intended empty, open search state without the old
   trailing tag trigger.

## Follow-up polish

- P3: the local theme uses slightly stronger text and roomier option rows than
  the source screenshot. Retaining those tokens keeps `/particles` consistent
  with the rest of coss-svelte.

final result: passed
