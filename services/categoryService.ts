import {ResponseType, CategoryType} from "@/types";
import {collection, doc, setDoc} from "@firebase/firestore";
import {firestore} from "@/config/firebase";

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
}