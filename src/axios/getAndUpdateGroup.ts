import axiosInstance from "./axiosConfig";

export const getAndUpdateGroupMemberAPI = async (groupId: string, userId:string) => {
    try {
        console.log(groupId)
        const response = await axiosInstance.put("/groups/add/" + groupId, { 
            user_id : userId
        });
        return response;
    } catch (error) {
        return null;
    }
};
