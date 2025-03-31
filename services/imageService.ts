export const getProfileImage = (file: any) => {
    if (file && typeof file == "string")
        return file;
    if (file && typeof file == "object" && file.uri)
        return file.uri;
    else
        return require("../assets/images/defaultAvatar.png")
}