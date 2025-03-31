import {UserDataType, ResponseType} from "@/types";
import {doc, getDoc, updateDoc} from "@firebase/firestore";
import {firestore} from "@/config/firebase";
import {uploadFileToCloudinary} from "@/services/imageService";

export const updateUser = async (
    uid: string,
    updatedData: UserDataType
): Promise<ResponseType> => {
    try {
        // choose pfp from library
        if (updatedData.image && updatedData?.image?.uri) {
            const imageUploadResponse = await uploadFileToCloudinary(
                updatedData.image,
                "users"
            );

            if (!imageUploadResponse.success) {
                return {
                    success: false,
                    msg: imageUploadResponse.msg || "Failed to upload image",
                };
            }
        }

        const userRef = doc(firestore, "users", uid);
        // Update the user document with the provided updatedData
        await updateDoc(userRef, updatedData);

        // Fetch the updated user data
        const updatedUserDoc = await getDoc(userRef);
        return {
            success: true,
            msg: "Successfully updated user"
        };
    } catch(error: any) {
        console.log('error updating user: ', error);
        return {
            success: false,
            msg: error.message
        };
    }
}