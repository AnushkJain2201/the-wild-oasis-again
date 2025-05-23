import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";

export const useEditCabin = () => {
    const queryClient = useQueryClient();
    const {reset} = useForm();

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin edited successfully!");
			queryClient.invalidateQueries({ queryKey: ["cabin"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

    return { isEditing, editCabin };
};