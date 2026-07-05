<script lang="ts">
import { onDestroy } from "svelte";

export let slug: string;
export let name: string;

const frameworks = ["SvelteKit", "Vite", "React", "Next.js"];
const commands = ["Open command menu", "Create component", "Run build", "Copy import path"];
const days = Array.from({ length: 30 }, (_, index) => index + 1);

let dialogOpen = false;
let alertDialogOpen = false;
let sheetOpen = false;
let drawerOpen = false;
let popoverOpen = false;
let menuOpen = false;
let commandOpen = false;
let selectValue = "SvelteKit";
let comboValue = "Vite";
let autoValue = "";
let otpValues = ["1", "2", "3", "4", "5", "6"];
let numberValue = 12;
let sliderValue = 60;
let activeTab = "preview";
let switchOn = true;
let toggleOn = true;
let groupValues = ["bold"];
let toastVisible = false;
let toastTimeout: ReturnType<typeof setTimeout> | undefined;

function toggleGroupValue(value: string) {
	groupValues = groupValues.includes(value)
		? groupValues.filter((item) => item !== value)
		: [...groupValues, value];
}

function closeOpenSurfaces() {
	dialogOpen = false;
	alertDialogOpen = false;
	sheetOpen = false;
	drawerOpen = false;
	popoverOpen = false;
	menuOpen = false;
	commandOpen = false;
}

function handleGlobalKeydown(event: KeyboardEvent) {
	if (event.key === "Escape") {
		closeOpenSurfaces();
	}
}

function handleBackdropClick(event: MouseEvent, close: () => void) {
	if (event.target === event.currentTarget) {
		close();
	}
}

function clearToastTimeout() {
	if (toastTimeout !== undefined) {
		clearTimeout(toastTimeout);
		toastTimeout = undefined;
	}
}

function showToast() {
	clearToastTimeout();
	toastVisible = true;
	toastTimeout = setTimeout(() => {
		toastVisible = false;
		toastTimeout = undefined;
	}, 2200);
}

onDestroy(clearToastTimeout);
</script>

<svelte:window onkeydown={handleGlobalKeydown} />

<div class="demo-surface" data-demo={slug}>
  {#if slug === "button"}
    <div class="demo-row wrap">
      <button class="button" type="button">Default</button>
      <button class="button secondary" type="button">Secondary</button>
      <button class="button outline" type="button">Outline</button>
      <button class="button ghost" type="button">Ghost</button>
      <button class="button destructive" type="button">Destructive</button>
      <button class="button link" type="button">Link</button>
      <button class="button small" type="button">Small</button>
      <button class="button large" type="button">Large</button>
      <button class="button icon" aria-label="Add item" type="button">+</button>
      <button class="button" disabled type="button">Loading...</button>
    </div>
  {:else if slug === "dialog"}
    <button class="button outline" type="button" onclick={() => (dialogOpen = true)}>Open dialog</button>
    {#if dialogOpen}
      <div class="overlay" role="presentation" onclick={(event) => handleBackdropClick(event, () => (dialogOpen = false))}>
        <div class="modal" aria-labelledby="dialog-title" aria-modal="true" role="dialog">
          <header>
            <h4 id="dialog-title">Edit project</h4>
            <button class="button icon ghost" aria-label="Close dialog" type="button" onclick={() => (dialogOpen = false)}>x</button>
          </header>
          <label class="field">
            <span>Name</span>
            <input value="COSS demo" />
          </label>
          <footer>
            <button class="button ghost" type="button" onclick={() => (dialogOpen = false)}>Cancel</button>
            <button class="button" type="button" onclick={() => (dialogOpen = false)}>Save</button>
          </footer>
        </div>
      </div>
    {/if}
  {:else if slug === "alert-dialog"}
    <button class="button destructive" type="button" onclick={() => (alertDialogOpen = true)}>Delete item</button>
    {#if alertDialogOpen}
      <div class="overlay" role="presentation" onclick={(event) => handleBackdropClick(event, () => (alertDialogOpen = false))}>
        <div class="modal compact" aria-labelledby="alert-dialog-title" aria-modal="true" role="alertdialog">
          <h4 id="alert-dialog-title">Delete component?</h4>
          <p>This action needs confirmation before it continues.</p>
          <footer>
            <button class="button ghost" type="button" onclick={() => (alertDialogOpen = false)}>Cancel</button>
            <button class="button destructive" type="button" onclick={() => (alertDialogOpen = false)}>Delete</button>
          </footer>
        </div>
      </div>
    {/if}
  {:else if slug === "sheet"}
    <button class="button outline" type="button" onclick={() => (sheetOpen = true)}>Open sheet</button>
    {#if sheetOpen}
      <div class="overlay" role="presentation" onclick={(event) => handleBackdropClick(event, () => (sheetOpen = false))}>
        <aside class="sheet-panel" aria-label="Settings sheet">
          <header>
            <h4>Settings</h4>
            <button class="button icon ghost" aria-label="Close sheet" type="button" onclick={() => (sheetOpen = false)}>x</button>
          </header>
          <label class="field">
            <span>Workspace name</span>
            <input value="Product" />
          </label>
        </aside>
      </div>
    {/if}
  {:else if slug === "drawer"}
    <button class="button outline" type="button" onclick={() => (drawerOpen = true)}>Open drawer</button>
    {#if drawerOpen}
      <div class="overlay" role="presentation" onclick={(event) => handleBackdropClick(event, () => (drawerOpen = false))}>
        <aside class="drawer-panel" aria-label="Mobile drawer">
          <header>
            <h4>Drawer</h4>
            <button class="button icon ghost" aria-label="Close drawer" type="button" onclick={() => (drawerOpen = false)}>x</button>
          </header>
          <p>Bottom sheet content with a primary action.</p>
          <button class="button" type="button" onclick={() => (drawerOpen = false)}>Done</button>
        </aside>
      </div>
    {/if}
  {:else if slug === "popover"}
    <div class="popover-wrap">
      <button class="button outline" type="button" aria-expanded={popoverOpen} aria-controls="popover-panel" onclick={() => (popoverOpen = !popoverOpen)}>Toggle popover</button>
      {#if popoverOpen}
        <div id="popover-panel" class="popover-panel" role="dialog">
          <strong>Quick edit</strong>
          <label class="field">
            <span>Status</span>
            <select bind:value={selectValue}>
              {#each frameworks as framework}
                <option>{framework}</option>
              {/each}
            </select>
          </label>
        </div>
      {/if}
    </div>
  {:else if slug === "tooltip"}
    <span class="tooltip">
      <button class="button outline" type="button">Hover or focus</button>
      <span class="tooltip-content" role="tooltip">Short contextual hint</span>
    </span>
  {:else if slug === "preview-card"}
    <a class="preview-link" href="https://coss.com/ui" target="_blank" rel="noreferrer">
      coss.com/ui
      <span class="preview-card" role="presentation">
        <strong>COSS UI</strong>
        <span>Accessible React primitives with copy-paste ownership.</span>
      </span>
    </a>
  {:else if slug === "menu"}
    <div class="popover-wrap">
      <button class="button outline" type="button" onclick={() => (menuOpen = !menuOpen)} aria-haspopup="menu" aria-expanded={menuOpen} aria-controls="menu-panel">Open menu</button>
      {#if menuOpen}
        <div id="menu-panel" class="menu-panel" role="menu">
          <button role="menuitem" type="button">Rename</button>
          <button role="menuitem" type="button">Duplicate</button>
          <button role="menuitemcheckbox" aria-checked="true" type="button">Pinned</button>
          <button class="danger-text" role="menuitem" type="button">Delete</button>
        </div>
      {/if}
    </div>
  {:else if slug === "command"}
    <button class="button outline" type="button" onclick={() => (commandOpen = !commandOpen)} aria-haspopup="dialog" aria-expanded={commandOpen} aria-controls="command-panel">Command</button>
    {#if commandOpen}
      <div id="command-panel" class="command-panel">
        <input aria-label="Search commands" placeholder="Search commands..." />
        <ul>
          {#each commands as command}
            <li>{command}</li>
          {/each}
        </ul>
      </div>
    {/if}
  {:else if slug === "select"}
    <div class="demo-row wrap">
      <label class="field compact">
        <span>Small</span>
        <select class="small" bind:value={selectValue}>
          {#each frameworks as framework}
            <option>{framework}</option>
          {/each}
        </select>
      </label>
      <label class="field compact">
        <span>Default</span>
        <select bind:value={selectValue}>
          {#each frameworks as framework}
            <option>{framework}</option>
          {/each}
        </select>
      </label>
      <label class="field compact">
        <span>Disabled</span>
        <select disabled><option>Unavailable</option></select>
      </label>
    </div>
  {:else if slug === "combobox"}
    <label class="field">
      <span>Framework</span>
      <input list="framework-list" bind:value={comboValue} />
      <datalist id="framework-list">
        {#each frameworks as framework}
          <option value={framework}></option>
        {/each}
      </datalist>
    </label>
  {:else if slug === "autocomplete"}
    <div class="input-group">
      <input aria-label="Autocomplete" list="autocomplete-list" bind:value={autoValue} placeholder="Start typing..." />
      <button class="button outline" type="button" onclick={() => (autoValue = "")}>Clear</button>
      <datalist id="autocomplete-list">
        {#each frameworks as framework}
          <option value={framework}></option>
        {/each}
      </datalist>
    </div>
  {:else if slug === "input"}
    <div class="demo-row wrap">
      <input aria-label="Text input" placeholder="Text" type="text" />
      <input aria-label="Email input" placeholder="Email" type="email" />
      <input aria-label="Search input" placeholder="Search" type="search" />
      <input aria-label="Disabled input" disabled value="Disabled" />
    </div>
  {:else if slug === "textarea"}
    <div class="demo-row wrap">
      <textarea aria-label="Textarea" rows="3">Clean multiline content.</textarea>
      <textarea aria-label="Disabled textarea" disabled rows="3">Disabled</textarea>
    </div>
  {:else if slug === "input-group"}
    <div class="input-group">
      <input aria-label="Domain" value="workspace" />
      <span>.coss.dev</span>
      <button class="button outline" type="button">Check</button>
    </div>
  {:else if slug === "otp-field"}
    <div class="otp-row" aria-label="One-time password">
      {#each otpValues as value, index}
        <input aria-label={`Character ${index + 1} of 6`} maxlength="1" bind:value={otpValues[index]} />
      {/each}
    </div>
  {:else if slug === "number-field"}
    <div class="number-field">
      <button class="button outline icon" aria-label="Decrease" type="button" onclick={() => (numberValue -= 1)}>-</button>
      <input aria-label="Number" type="number" bind:value={numberValue} />
      <button class="button outline icon" aria-label="Increase" type="button" onclick={() => (numberValue += 1)}>+</button>
    </div>
  {:else if slug === "slider"}
    <label class="field">
      <span>Value {sliderValue}</span>
      <input type="range" min="0" max="100" bind:value={sliderValue} />
    </label>
  {:else if slug === "calendar"}
    <div class="calendar" aria-label="Calendar month">
      <header>June 2026</header>
      <div class="calendar-grid day-names">
        {#each ["M", "T", "W", "T", "F", "S", "S"] as day}
          <span>{day}</span>
        {/each}
      </div>
      <div class="calendar-grid">
        {#each days.slice(0, 28) as day}
          <button class:active={day === 9} type="button">{day}</button>
        {/each}
      </div>
    </div>
  {:else if slug === "date-picker"}
    <div class="demo-row wrap">
      <label class="field compact">
        <span>Single date</span>
        <input type="date" value="2026-06-09" />
      </label>
      <label class="field compact">
        <span>Range start</span>
        <input type="date" value="2026-06-09" />
      </label>
      <label class="field compact">
        <span>Range end</span>
        <input type="date" value="2026-06-12" />
      </label>
    </div>
  {:else if slug === "form"}
    <form class="form-demo" onsubmit={(event) => event.preventDefault()}>
      <label class="field">
        <span>Email</span>
        <input required type="email" value="team@coss.com" />
      </label>
      <button class="button" type="submit">Submit</button>
    </form>
  {:else if slug === "field"}
    <label class="field invalid">
      <span>Email</span>
      <input aria-invalid="true" type="email" value="not-an-email" />
      <small>Enter a valid email address.</small>
    </label>
  {:else if slug === "fieldset"}
    <fieldset>
      <legend>Notification channel</legend>
      <label><input checked name="channel" type="radio" /> Email</label>
      <label><input name="channel" type="radio" /> SMS</label>
    </fieldset>
  {:else if slug === "label"}
    <div class="demo-row wrap">
      <label class="field compact">
        <span>Project label</span>
        <input value="Design system" />
      </label>
      <label class="inline-label">
        <input checked type="checkbox" />
        Visible in navigation
      </label>
    </div>
  {:else if slug === "checkbox"}
    <div class="demo-row wrap">
      <label class="inline-label"><input checked type="checkbox" /> Checked</label>
      <label class="inline-label"><input type="checkbox" /> Unchecked</label>
      <label class="inline-label"><input disabled type="checkbox" /> Disabled</label>
    </div>
  {:else if slug === "checkbox-group"}
    <fieldset>
      <legend>Components</legend>
      <label><input checked type="checkbox" /> Overlays</label>
      <label><input checked type="checkbox" /> Forms</label>
      <label><input type="checkbox" /> Data display</label>
    </fieldset>
  {:else if slug === "radio-group"}
    <fieldset>
      <legend>Density</legend>
      <label><input checked name="density" type="radio" /> Comfortable</label>
      <label><input name="density" type="radio" /> Compact</label>
    </fieldset>
  {:else if slug === "switch"}
    <button class="switch" class:on={switchOn} role="switch" aria-checked={switchOn} type="button" onclick={() => (switchOn = !switchOn)}>
      <span></span>
      Notifications
    </button>
  {:else if slug === "toggle"}
    <button class="button outline" class:pressed={toggleOn} aria-pressed={toggleOn} type="button" onclick={() => (toggleOn = !toggleOn)}>Bold</button>
  {:else if slug === "toggle-group"}
    <div class="segmented" aria-label="Formatting">
      {#each ["bold", "italic", "underline"] as value}
        <button class:active={groupValues.includes(value)} type="button" onclick={() => toggleGroupValue(value)}>{value}</button>
      {/each}
    </div>
  {:else if slug === "tabs"}
    <div class="tabs">
      <div role="tablist" aria-label="Demo tabs">
        {#each ["preview", "code", "data"] as tab}
          <button class:active={activeTab === tab} role="tab" aria-selected={activeTab === tab} type="button" onclick={() => (activeTab = tab)}>{tab}</button>
        {/each}
      </div>
      <div role="tabpanel">Active panel: {activeTab}</div>
    </div>
  {:else if slug === "accordion"}
    <div class="stack">
      <details open>
        <summary>Usage</summary>
        <p>One panel can start open.</p>
      </details>
      <details>
        <summary>Multiple panels</summary>
        <p>Native details keeps this simple.</p>
      </details>
    </div>
  {:else if slug === "collapsible"}
    <details class="collapsible" open>
      <summary>Release notes</summary>
      <p>Collapsible content stays in the document flow.</p>
    </details>
  {:else if slug === "sidebar"}
    <div class="sidebar-demo">
      <nav aria-label="Sidebar">
        <a href="#top">Overview</a>
        <a href="#forms">Forms</a>
        <a href="#status">Status</a>
      </nav>
      <main>Workspace</main>
    </div>
  {:else if slug === "breadcrumb"}
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        <li><a href="#top">Home</a></li>
        <li><a href="#components">Components</a></li>
        <li>{name}</li>
      </ol>
    </nav>
  {:else if slug === "pagination"}
    <nav class="pagination" aria-label="Pagination">
      <button class="button outline" type="button">Previous</button>
      <button class="active" type="button">1</button>
      <button type="button">2</button>
      <button type="button">3</button>
      <button class="button outline" type="button">Next</button>
    </nav>
  {:else if slug === "toolbar"}
    <div class="toolbar" role="toolbar" aria-label="Editor toolbar">
      <button type="button">B</button>
      <button type="button">I</button>
      <button type="button">Link</button>
      <button type="button">Save</button>
    </div>
  {:else if slug === "scroll-area"}
    <div class="scroll-area" role="region" aria-label="Scrollable rows">
      {#each Array.from({ length: 8 }, (_, index) => index + 1) as item}
        <p>Scrollable row {item}</p>
      {/each}
    </div>
  {:else if slug === "card"}
    <article class="sample-card">
      <header>
        <strong>Component card</strong>
        <span class="badge secondary">Draft</span>
      </header>
      <p>Grouped content with a clear action.</p>
      <button class="button outline" type="button">Open</button>
    </article>
  {:else if slug === "frame"}
    <div class="frame">
      <span>Preview frame</span>
      <strong>16:9</strong>
    </div>
  {:else if slug === "table"}
    <table>
      <thead><tr><th>Name</th><th>Status</th><th>Count</th></tr></thead>
      <tbody>
        <tr><td>Button</td><td>Ready</td><td>40</td></tr>
        <tr><td>Badge</td><td>Ready</td><td>20</td></tr>
      </tbody>
    </table>
  {:else if slug === "avatar"}
    <div class="avatar-row">
      <span class="avatar">JD</span>
      <span class="avatar square">AK</span>
      <span class="avatar large">UI</span>
      <span class="avatar status">CS</span>
    </div>
  {:else if slug === "badge"}
    <div class="demo-row wrap">
      <span class="badge">Default</span>
      <span class="badge outline">Outline</span>
      <span class="badge secondary">Secondary</span>
      <span class="badge destructive">Destructive</span>
      <span class="badge info">Info</span>
      <span class="badge success">Success</span>
      <span class="badge warning">Warning</span>
      <span class="badge error">Error</span>
    </div>
  {:else if slug === "kbd"}
    <div class="demo-row wrap">
      <kbd>⌘</kbd><kbd>K</kbd><span>Open command menu</span>
    </div>
  {:else if slug === "separator"}
    <div class="separator-demo">
      <span>Before</span>
      <hr />
      <span>After</span>
    </div>
  {:else if slug === "group"}
    <div class="group">
      <button type="button">Left</button>
      <button type="button">Center</button>
      <button type="button">Right</button>
    </div>
  {:else if slug === "empty"}
    <div class="empty-state">
      <strong>No components selected</strong>
      <p>Empty states pair a short message with a next action.</p>
      <button class="button outline" type="button">Create</button>
    </div>
  {:else if slug === "alert"}
    <div class="stack">
      <div class="alert info">Info alert with neutral guidance.</div>
      <div class="alert success">Success alert after a completed action.</div>
      <div class="alert warning">Warning alert for risk.</div>
      <div class="alert error">Error alert for failed state.</div>
    </div>
  {:else if slug === "toast"}
    <button class="button outline" type="button" onclick={showToast}>Show toast</button>
    {#if toastVisible}
      <div class="toast" role="status">Saved changes</div>
    {/if}
  {:else if slug === "progress"}
    <div class="stack">
      <progress value="62" max="100">62%</progress>
      <div class="progress-bar"><span style="width: 62%"></span></div>
    </div>
  {:else if slug === "meter"}
    <div class="stack">
      <meter min="0" max="100" low="35" high="80" optimum="90" value="72">72</meter>
      <span>72 of 100</span>
    </div>
  {:else if slug === "spinner"}
    <div class="demo-row wrap">
      <span class="spinner" aria-label="Loading"></span>
      <span class="spinner large" aria-label="Loading"></span>
    </div>
  {:else if slug === "skeleton"}
    <div class="skeleton-stack" aria-label="Loading placeholder">
      <span></span>
      <span></span>
      <span></span>
    </div>
  {:else}
    <div class="placeholder-demo">
      <strong>{name}</strong>
      <span>Scope demo</span>
    </div>
  {/if}
</div>
