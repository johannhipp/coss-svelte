<script lang="ts">
import {
	Button,
	Field,
	Form,
	Popover,
	PopoverDescription,
	PopoverPopup,
	PopoverTitle,
	PopoverTrigger,
	Textarea,
} from "coss-svelte";
</script>

<Popover>
	<PopoverTrigger>Open Popover</PopoverTrigger>
	<PopoverPopup class="w-80">
		<div class="mb-4">
			<PopoverTitle class="text-base">Send us feedback</PopoverTitle>
			<PopoverDescription>Let us know how we can improve.</PopoverDescription>
		</div>
		<Form class="flex w-full flex-col gap-4">
			<Field>
				<Textarea aria-label="Send feedback" placeholder="How can we improve?" />
			</Field>
			<Button type="submit">Send feedback</Button>
		</Form>
	</PopoverPopup>
</Popover>
