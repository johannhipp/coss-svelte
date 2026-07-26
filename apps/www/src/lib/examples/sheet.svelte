<script lang="ts">
import {
	Button,
	Field,
	FieldLabel,
	Form,
	Input,
	Sheet,
	SheetClose,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetPanel,
	SheetPopup,
	SheetTitle,
	SheetTrigger,
} from "coss-svelte";
</script>

<Sheet>
	<SheetTrigger>Open Sheet</SheetTrigger>
	<SheetPopup>
		<SheetHeader>
			<SheetTitle>Edit profile</SheetTitle>
			<SheetDescription>
				Make changes to your profile here. Click save when you’re done.
			</SheetDescription>
		</SheetHeader>
		<Form class="contents">
			<SheetPanel class="grid gap-4">
				<Field>
					<FieldLabel>Name</FieldLabel>
					<Input value="Margaret Welsh" type="text" />
				</Field>
				<Field>
					<FieldLabel>Username</FieldLabel>
					<Input value="@maggie.welsh" type="text" />
				</Field>
			</SheetPanel>
			<SheetFooter>
				<SheetClose>Cancel</SheetClose>
				<Button type="submit">Save</Button>
			</SheetFooter>
		</Form>
	</SheetPopup>
</Sheet>
