import axiosInstance from "./axiosConfig";

export const getGroupStatusAPI = async (groupId: string) => {
    try {
        console.log(groupId)
        const response = await axiosInstance.get("/groups/" + groupId + "/status");
        return response;
    } catch (error) {
        return null;
    }
};
