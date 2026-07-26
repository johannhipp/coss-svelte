<script lang="ts">
import {
	Button,
	Dialog,
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPanel,
	DialogPopup,
	DialogTitle,
	DialogTrigger,
	Field,
	FieldLabel,
	Form,
	Input,
} from "coss-svelte";
</script>

<Dialog>
	<DialogTrigger>Open Dialog</DialogTrigger>
	<DialogPopup class="sm:max-w-sm">
		<DialogHeader>
			<DialogTitle>Edit profile</DialogTitle>
			<DialogDescription>
				Make changes to your profile here. Click save when you’re done.
			</DialogDescription>
		</DialogHeader>
		<Form class="contents">
			<DialogPanel class="grid gap-4">
				<Field>
					<FieldLabel>Name</FieldLabel>
					<Input value="Margaret Welsh" type="text" />
				</Field>
				<Field>
					<FieldLabel>Username</FieldLabel>
					<Input value="@maggie.welsh" type="text" />
				</Field>
			</DialogPanel>
			<DialogFooter>
				<DialogClose>Cancel</DialogClose>
				<Button type="submit">Save</Button>
			</DialogFooter>
		</Form>
	</DialogPopup>
</Dialog>
