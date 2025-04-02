import {ResponseType, CategoryType} from "@/types";
import {collection, deleteDoc, doc, setDoc} from "@firebase/firestore";
import {firestore} from "@/config/firebase";
import {uploadFileToCloudinary} from "@/services/imageService";

export const createOrUpdateCategory = async (
    categoryData: Partial<CategoryType>
): Promise<ResponseType> => {
    try {
        let categoryToSave = {...categoryData};

        // new Category
        if (!categoryData.id) {
            categoryToSave.amount = 0;
            categoryToSave.totalCategory = 0;
            categoryToSave.created = new Date();
        }

        if (categoryData.image) {
            const imageUploadResponse = await uploadFileToCloudinary(
                categoryData.image,
                "wallets"
            );

            if (!imageUploadResponse.success) {
                return {
                    success: false,
                    msg: imageUploadResponse.msg || "Failed to upload image",
                };
            }

            categoryToSave.image = imageUploadResponse.data;
        }

        // add data to Firebase -- using doc, setDoc
        // https://firebase.google.com/docs/firestore/manage-data/add-data

        const categoryRef = categoryData?.id
            // if category already exists
            ? doc(firestore, "categories", categoryData?.id)
            // else
            : doc(collection(firestore, "categories"));

        await setDoc(categoryRef, categoryToSave, {merge: true}); // update data

        return {
            success: true,
            data: {...categoryToSave, id: categoryRef.id},
        };
    } catch (error: any) {
        console.log('error creating/updating category', error);
        return {
            success: false,
            msg: error.message,
        }
    }
};

export const deleteCategory = async (categoryId: string): Promise<ResponseType> =>
{
    try {
        const categoryRef = doc(firestore, "categories", categoryId);
        await deleteDoc(categoryRef);
        return {
            success: true,
            msg: "Successfully deleting category",
        }

    } catch (error: any) {
        console.log('error deleting category: ', error);
        return {
            success: false,
            msg: error.message,
        }
    }
}