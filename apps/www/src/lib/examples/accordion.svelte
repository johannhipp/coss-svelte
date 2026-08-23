<script lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "coss-svelte";

const items = [
	{
		content:
			"Base UI is a library of high-quality unstyled React components for design systems and web apps.",
		id: "1",
		title: "What is Base UI?",
	},
	{
		content:
			"Head to the \u201CQuick start\u201D guide in the docs. If you\u2019ve used unstyled libraries before, you\u2019ll feel at home.",
		id: "2",
		title: "How do I get started?",
	},
	{
		content: "Of course! Base UI is free and open source.",
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
