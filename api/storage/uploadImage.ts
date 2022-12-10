import { storage } from "../../config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//Important bug fixed: If the uploadBytes function was used, then the app crashed for unknown yet reasons.
//So now we're using the uploadBytesResumable and it works as expected.

//upload image function will upload the image to firebase storage and return
//the remote url to store it as the mediaUrl in the "media" collection posts
export const uploadImage = async (
  uploadUri: any,
  fileName: string
): Promise<string> => {
  const imagesRef = ref(storage, `images/${fileName}`);
  let imageUrl = "";

  const response = await fetch(uploadUri);
  const blob = await response.blob();

  try {
    await uploadBytesResumable(imagesRef, blob);
  } catch (error) {
    console.log("error in uploading the image to the cloud storage: ", error);
  }

  try {
    imageUrl = await getImageUrl(fileName);
  } catch (error: any) {
    console.log("Error in getting the imageURL with error,", error);
  }

  return imageUrl;
};

/* Logic to get the media Google storage url for using in the app */
export const getImageUrl = async (mediaReference: string): Promise<string> => {
  const imageRef = ref(storage, `images/${mediaReference}`);

  try {
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;
  } catch (error: any) {
    throw Error(error);
  }
};
