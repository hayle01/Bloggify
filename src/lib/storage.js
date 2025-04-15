import {v4 as uuidv4 } from 'uuid';
import supabase from './supabase'

export const updloadImage = async (file, userID, bucket = "featured-images") => {
  try {
    // get file extension
    const fileExt = file.name.split(".").pop().toLowerCase();
    // create uniqe file path
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${userID}/${fileName}`;

    // upload the file to supabase
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
        console.log('Error for uploading image', error.message);
      throw error;
    }

    //   get the public the URL before the uploaded file

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    console.log("Public URL", urlData);

    return {
      path: filePath,
      url: urlData,
    };
  } catch (error) {
    console.error("Error uploading image", error);
    throw error;
  }
};