<script lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "coss-svelte";

const items = [
	{
		content: "Base UI provides unstyled primitives for design systems and product interfaces.",
		id: "1",
		title: "What is Base UI?",
	},
	{
		content: "Start with the quick-start guide and compose the parts your interface needs.",
		id: "2",
		title: "How do I get started?",
	},
	{
		content: "Yes. Base UI is free and open source.",
		id: "3",
		title: "Can I use it for my project?",
	},
];
</script>

<Accordion class="w-full" value="3">
	{#each items as item}
		<AccordionItem value={item.id}>
			<AccordionTrigger>{item.title}</AccordionTrigger>
			<AccordionContent>{item.content}</AccordionContent>
		</AccordionItem>
	{/each}
</Accordion>
