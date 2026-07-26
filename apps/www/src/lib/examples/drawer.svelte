<script lang="ts">
import {
	Drawer,
	DrawerClose,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerPopup,
	DrawerTitle,
	DrawerTrigger,
} from "coss-svelte";
</script>

<Drawer>
	<DrawerTrigger>Open drawer</DrawerTrigger>
	<DrawerPopup>
		<DrawerHeader class="text-center">
			<DrawerTitle>Notifications</DrawerTitle>
			<DrawerDescription>This is the description of the drawer.</DrawerDescription>
		</DrawerHeader>
		<DrawerFooter class="justify-center sm:justify-center">
			<DrawerClose>Close</DrawerClose>
		</DrawerFooter>
	</DrawerPopup>
</Drawer>
