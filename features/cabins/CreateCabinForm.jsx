/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { FormRow } from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({cabinToEdit}) {
	
	const {isCreating, createCabin} = useCreateCabin();
	const {isEditing, editCabin} = useEditCabin();

	const {id:editId, ...editValues} = cabinToEdit || {};

	// if we have an id, we are in edit mode, then prepopulate the form with the cabin data
	const isEditSession = Boolean(editId);
	const { register, handleSubmit, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;
	const isWorking = isCreating || isEditing;

	const onSubmit = (data) => {
		const image = typeof data.image === "string"? data.image : data.image[0];
		if(isEditSession) {
			editCabin({newCabinData: {...data, image}, id: editId});
		} else {
			createCabin({...data, image});
		}
	};

	const onError = (errors) => {
		console.log(errors);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label='name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					{...register("name", {
						required: "Cabin name is required",
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow label='maxCapacity' error={errors?.maxCapacity?.message}>
				<Input
					type='number'
					id='maxCapacity'
					{...register("maxCapacity", {
						required: "Cabin max capacity is required",
						min: {
							value: 1,
							message: "Cabin max capacity must be at least 1",
						},
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow label='regularPrice' error={errors?.regularPrice?.message}>
				<Input
					type='number'
					id='regularPrice'
					{...register("regularPrice", {
						required: "Cabin regular price is required",
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow label='discount' error={errors?.discount?.message}>
				<Input
					type='number'
					id='discount'
					defaultValue={0}
					{...register("discount", {
						required: "Cabin discount is required",
						// we are implementing custom validation to always make sure that the discount is between 0 and the price of the cabin
						validate: (value) => {
							const discount = Number(value);
							const price = Number(getValues().regularPrice);
							return (
								discount <= price ||
								"Discount must be less than regular price"
							);
						},
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow label='description' error={errors?.description?.message}>
				<Textarea
					type='number'
					id='description'
					defaultValue=''
					{...register("description", {
						required: "Cabin description is required",
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow label='image'>
				<FileInput
					id='image'
					accept='image/*'
          type="file"
					disabled={isWorking}
					{...register("image", {
						required: isEditSession ? false : "Cabin image is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation='secondary' type='reset'>
					Cancel
				</Button>
				<Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create Cabin"}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
