<script lang="ts">
import { Pause, Play, SkipBack, SkipForward, Trash2 } from "@lucide/svelte";
import {
	Menu,
	MenuCheckboxItem,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuPopup,
	MenuRadioGroup,
	MenuRadioItem,
	MenuSeparator,
	MenuShortcut,
	MenuSub,
	MenuSubPopup,
	MenuSubTrigger,
	MenuTrigger,
} from "coss-svelte";
</script>

<Menu>
	<MenuTrigger>Open menu</MenuTrigger>
	<MenuPopup>
		<MenuGroup>
			<MenuGroupLabel>Playback</MenuGroupLabel>
			<MenuItem><Play aria-hidden="true" /> Play <MenuShortcut>⌘P</MenuShortcut></MenuItem>
			<MenuItem disabled>
				<Pause aria-hidden="true" /> Pause <MenuShortcut>⇧⌘P</MenuShortcut>
			</MenuItem>
			<MenuItem>
				<SkipBack aria-hidden="true" /> Previous <MenuShortcut>⌘[</MenuShortcut>
			</MenuItem>
			<MenuItem>
				<SkipForward aria-hidden="true" /> Next <MenuShortcut>⌘]</MenuShortcut>
			</MenuItem>
		</MenuGroup>
		<MenuSeparator />
		<MenuCheckboxItem>Shuffle</MenuCheckboxItem>
		<MenuCheckboxItem>Repeat</MenuCheckboxItem>
		<MenuCheckboxItem disabled>Enhanced Audio</MenuCheckboxItem>
		<MenuSeparator />
		<MenuGroup>
			<MenuGroupLabel>Sort by</MenuGroupLabel>
			<MenuRadioGroup>
				<MenuRadioItem value="artist">Artist</MenuRadioItem>
				<MenuRadioItem value="album">Album</MenuRadioItem>
				<MenuRadioItem value="title">Title</MenuRadioItem>
			</MenuRadioGroup>
		</MenuGroup>
		<MenuSeparator />
		<MenuCheckboxItem variant="switch">Auto save</MenuCheckboxItem>
		<MenuSeparator />
		<MenuSub>
			<MenuSubTrigger>Add to Playlist</MenuSubTrigger>
			<MenuSubPopup>
				<MenuItem>Jazz</MenuItem>
				<MenuSub>
					<MenuSubTrigger>Rock</MenuSubTrigger>
					<MenuSubPopup>
						<MenuItem>Hard Rock</MenuItem>
						<MenuItem>Soft Rock</MenuItem>
						<MenuItem>Classic Rock</MenuItem>
						<MenuSeparator />
						<MenuItem>Metal</MenuItem>
						<MenuItem>Punk</MenuItem>
						<MenuItem>Grunge</MenuItem>
						<MenuItem>Alternative</MenuItem>
						<MenuItem>Indie</MenuItem>
						<MenuItem>Electronic</MenuItem>
					</MenuSubPopup>
				</MenuSub>
				<MenuItem>Pop</MenuItem>
			</MenuSubPopup>
		</MenuSub>
		<MenuSeparator />
		<MenuItem variant="destructive">
			<Trash2 aria-hidden="true" /> Delete <MenuShortcut>⌘⌫</MenuShortcut>
		</MenuItem>
	</MenuPopup>
</Menu>
