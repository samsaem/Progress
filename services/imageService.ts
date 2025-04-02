import {CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET} from "@/constants";
import { ResponseType } from "@/types";
import axios from "axios";

// https://cloudinary.com/documentation/image_upload_api_reference
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (
    file: {uri?: string} | string,
    folderName: string
): Promise<ResponseType> => {
    try {
        // file already uploaded
        if (typeof file === "string") {
            return {
                success: true,
                data: file,
            };
        }

        // file not yet uploaded
        // making API request
        if (file && file.uri) {
            const formData = new FormData();
            formData.append("file", {
                uri: file?.uri,
                type: "image/jpeg",
                name: file?.uri?.split("/").pop() || "file.jpg",
            } as any);

            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            formData.append("folder", folderName);

            // AXIOS POST
            const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log('upload img result: ', response?.data);

            return {
                success: true,
                data: response.data.secure_url,
            };
        } else {
            return {
                success: false,
                msg: "Invalid file upload",
            };
        }

    } catch(error) {
        console.log('upload file error: ', error);
        return {
            success: false,
            msg: error.message || "cannot upload image"
        };
    }
}

export const getProfileImage = (file: any) => {
    if (file && typeof file == "string")
        return file;
    if (file && typeof file == "object" && file.uri)
        return file.uri;
    else
        return require("../assets/images/defaultAvatar.png")
};

export const getFilePath = (file: any) => {
    if (file && typeof file == "string") return file;
    if (file && typeof file == "object" && file.uri) return file.uri;
};