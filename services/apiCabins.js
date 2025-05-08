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

export const createCabin = async (newCabin) => {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;
    // https://nowepdlshtpdzrsjpvhy.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
    // Create cabin
    const { data, error } = await supabase
        .from('cabins')
        .insert([
            { ...newCabin, image: imagePath },
        ])
        .select()

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