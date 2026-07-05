<script lang="ts">
import ComponentDemo from "$lib/ComponentDemo.svelte";
import { catalogComponents, catalogGroups } from "$lib/cossCatalog";

const totalParticles = catalogComponents.reduce(
	(sum, component) => sum + component.particles.length,
	0
);

function slugify(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
</script>

<svelte:head>
  <title>COSS Scope Catalog</title>
  <meta
    name="description"
    content="A SvelteKit and Vite catalog demonstrating the COSS UI component scope."
  />
</svelte:head>

<main class="app-shell" id="top">
  <header class="page-header">
    <p class="eyebrow">Scope inventory demos</p>
    <h1>COSS UI Scope Catalog</h1>
    <p>
      Clean Svelte-native demos for every component in the COSS scope inventory, with documented
      particle versions listed beside each component.
    </p>
    <dl class="stats">
      <div>
        <dt>Components</dt>
        <dd>{catalogComponents.length}</dd>
      </div>
      <div>
        <dt>Categories</dt>
        <dd>{catalogGroups.length}</dd>
      </div>
      <div>
        <dt>Versions</dt>
        <dd>{totalParticles}</dd>
      </div>
    </dl>
  </header>

  <nav class="category-nav" aria-label="Component categories">
    {#each catalogGroups as group}
      <a href={`#${slugify(group.category)}`}>{group.category}</a>
    {/each}
  </nav>

  {#each catalogGroups as group}
    <section class="category-section" id={slugify(group.category)}>
      <header class="section-header">
        <div>
          <p class="eyebrow">{group.components.length} components</p>
          <h2>{group.category}</h2>
        </div>
        <a href="#top">Top</a>
      </header>

      <div class="component-list">
        {#each group.components as component}
          <article class="component-panel" id={component.slug}>
            <header class="component-heading">
              <div>
                <h3>{component.name}</h3>
                <p>{component.scope}</p>
              </div>
              <a href={component.docsUrl} target="_blank" rel="noreferrer">Docs</a>
            </header>

            <ComponentDemo slug={component.slug} name={component.name} />

            <details class="version-list" open={component.particles.length > 0}>
              <summary>
                {component.particles.length === 0
                  ? "No particle versions listed"
                  : `${component.particles.length} documented version${component.particles.length === 1 ? "" : "s"}`}
              </summary>
              {#if component.particles.length > 0}
                <div class="version-grid">
                  {#each component.particles as particle}
                    <a href={particle.url} target="_blank" rel="noreferrer">
                      <span>{particle.id}</span>
                      {particle.title}
                    </a>
                  {/each}
                </div>
              {/if}
            </details>
          </article>
        {/each}
      </div>
    </section>
  {/each}
</main>
