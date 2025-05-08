import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { FormRow } from "../../ui/FormRow";

function CreateCabinForm() {
	const queryClient = useQueryClient();

	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors } = formState;

	const { mutate, isLoading: isCreating } = useMutation({
		mutationFn: (newCabin) => createCabin(newCabin),
		onSuccess: () => {
			toast.success("New cabin created successfully!");
			queryClient.invalidateQueries({ queryKey: ["cabin"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	const onSubmit = (data) => {
		mutate({...data, image: data.image[0]});
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
					disabled={isCreating}
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
					disabled={isCreating}
				/>
			</FormRow>

			<FormRow label='regularPrice' error={errors?.regularPrice?.message}>
				<Input
					type='number'
					id='regularPrice'
					{...register("regularPrice", {
						required: "Cabin regular price is required",
					})}
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
				/>
			</FormRow>

			<FormRow label='image'>
				<FileInput
					id='image'
					accept='image/*'
          type="file"
					disabled={isCreating}
					{...register("image", {
						required: "Cabin image is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation='secondary' type='reset'>
					Cancel
				</Button>
				<Button disabled={isCreating}>Edit cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
