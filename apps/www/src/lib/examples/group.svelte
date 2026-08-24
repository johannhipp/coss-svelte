<script lang="ts">
import { Archive, Ellipsis, Files, Film, Pencil, Share2, Trash2 } from "@lucide/svelte";
import { Button, Group, GroupSeparator, Menu, MenuItem, MenuPopup, MenuTrigger } from "coss-svelte";
</script>

<Group aria-label="File actions">
	<Button variant="outline">
		<Files aria-hidden="true" />
		Files
	</Button>
	<GroupSeparator />
	<Button variant="outline">
		<Film aria-hidden="true" />
		Media
	</Button>
	<GroupSeparator />
	<Menu>
		<MenuTrigger aria-label="Menu">
			<Ellipsis class="size-4" />
		</MenuTrigger>
		<MenuPopup align="end">
			<MenuItem>
				<Pencil aria-hidden="true" />
				Edit
			</MenuItem>
			<MenuItem>
				<Archive aria-hidden="true" />
				Archive
			</MenuItem>
			<MenuItem>
				<Share2 aria-hidden="true" />
				Share
			</MenuItem>
			<MenuItem variant="destructive">
				<Trash2 aria-hidden="true" />
				Delete
			</MenuItem>
		</MenuPopup>
	</Menu>
</Group>
