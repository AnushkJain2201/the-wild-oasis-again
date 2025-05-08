import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";

export const useCreateCabin = () => {
    const queryClient = useQueryClient();
    const {reset} = useForm();

    const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: (newCabin) => createEditCabin(newCabin),
		onSuccess: () => {
			toast.success("New cabin created successfully!");
			queryClient.invalidateQueries({ queryKey: ["cabin"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createCabin };
};