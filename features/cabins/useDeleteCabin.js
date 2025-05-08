import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
    // we want to invalidate the cache data and then it will refetch the data from the server, for calling the invalidate we need to use QueryClient
    const queryCliet = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: (id) => deleteCabinAPI(id),
        onSuccess: () => {
            // we want to invalidate the cache data and then it will refetch the data from the server
            toast.success("Cabin deleted successfully");
            queryCliet.invalidateQueries({
                queryKey: ["cabin"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isDeleting, deleteCabin };
}



