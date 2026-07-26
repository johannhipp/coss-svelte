<script lang="ts">
import { BookOpen, Route } from "@lucide/svelte";
import {
	Button,
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "coss-svelte";
</script>

<Empty>
	<EmptyHeader>
		<EmptyMedia data-variant="icon"><Route size={20} /></EmptyMedia>
		<EmptyTitle>No upcoming meetings</EmptyTitle>
		<EmptyDescription>Create a meeting to get started.</EmptyDescription>
	</EmptyHeader>
	<EmptyContent>
		<div class="flex gap-2">
			<Button size="sm">Create meeting</Button>
			<Button size="sm" variant="outline"><BookOpen size={16} /> View docs</Button>
		</div>
	</EmptyContent>
</Empty>
