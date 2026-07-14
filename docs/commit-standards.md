# Commit Standards

This repository follows the [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) specification.

All human contributors and coding agents must use this format when creating commits:

```text
<type>[optional scope]: <description>
```

## Commit types

Use the type that best describes the user-visible or repository-level intent:

- `feat` - add a new capability
- `fix` - correct a defect
- `docs` - change documentation only
- `style` - change formatting without changing behavior
- `refactor` - restructure code without changing behavior
- `perf` - improve performance
- `test` - add or update tests
- `build` - change dependencies or build tooling
- `ci` - change continuous integration configuration
- `chore` - make maintenance changes that do not fit another type

Use a short, imperative description. Do not end it with a period.

## Examples

```text
feat(dialog): add controlled open state
fix(particles): generate unique registry URLs
docs: document agent commit standards
test(search): cover empty query state
```

## Scope and body

Use a scope when it makes the affected area clearer, such as `docs`, `particles`, `theme`, or
`registry`. Keep the subject concise. Add a blank line followed by a body when the reason or
impact needs more context:

```text
fix(docs-search): keep the command dialog compact

Match the search surface to the compact COSS layout while preserving keyboard navigation.
```

## Breaking changes

Append `!` before the colon when a commit introduces a breaking change, or add a `BREAKING CHANGE:`
footer with migration details:

```text
feat!: rename the public registry command
```

Agents must read this guide before committing, choose the most specific applicable type, and avoid
combining unrelated changes in one commit.

## Commit template

The repository includes a reusable [commit template](../.gitmessage.txt). Configure it once per
local checkout:

```sh
git config commit.template .gitmessage.txt
```

The template provides prompts for the Conventional Commit subject, rationale, changes, and
verification. Remove unused sections before committing.
