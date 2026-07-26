<script lang="ts">
import { CornerUpLeft, Star } from "@lucide/svelte";
import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "coss-svelte";
</script>

<PreviewCard>
	<PreviewCardTrigger href="https://coss.com/ui">coss.com/ui</PreviewCardTrigger>
	<PreviewCardPopup>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-1">
				<h4 class="font-medium text-sm">coss.com/ui</h4>
				<p class="text-muted-foreground text-sm">
					Beautifully designed components that you can copy and paste into your apps.
				</p>
			</div>
			<div class="flex items-center gap-4 text-muted-foreground text-xs">
				<div class="flex items-center gap-1">
					<span aria-hidden="true" class="size-2 rounded-full bg-blue-500"></span>
					<span>TypeScript</span>
				</div>
				<div class="flex items-center gap-1"><Star class="size-3" /> <span>58.2k</span></div>
				<div class="flex items-center gap-1">
					<CornerUpLeft class="size-3" /> <span>5.1k</span>
				</div>
			</div>
		</div>
	</PreviewCardPopup>
</PreviewCard>
