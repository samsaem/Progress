import {UserDataType, ResponseType} from "@/types";
import {doc, getDoc, updateDoc} from "@firebase/firestore";
import {firestore} from "@/config/firebase";

export const updateUser = async (
    uid: string,
    updatedData: UserDataType
): Promise<ResponseType> => {
    try {
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
            msg: error.message};
    }
}