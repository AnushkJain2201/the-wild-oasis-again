/* eslint-disable no-const-assign */
import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
    const { data, error } = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded')
    }

    return data;

}

export const createEditCabin = async (newCabin, id) => {
    // Checking if we have an image path, i.e. we are not uploading a new image
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;
    // Create cabin
    let query = supabase.from('cabins');

    // If we are not editing but creating a new cabin
    if(!id) {
        query = query.insert([
            {...newCabin, image: imagePath },
        ]);
    }

    // If we are editing a cabin
    if(id) {
        query = query.update({
            ...newCabin,
            image: imagePath,
        })
        .eq('id', id);
    }

    const { data, error } = await query.select();


    if (error) {
        console.error(error);
        throw new Error('Cabins could not be created.')
    }

    // Upload image
    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // Delete the cabin if there was an error uploading the iamge
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);

        console.log(storageError);
        throw new Error("Cabin could not be created.");
    }


    return data;
}

export const deleteCabin = async (id) => {

    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);
    if (error) {
        console.error(error);
        throw new Error('Cabin could not be deleted')
    }

    return data;

}