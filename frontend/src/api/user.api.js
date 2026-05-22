import axiosInstance from "../config/axiosInstance"

export const getUserProfileApi = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("getUserProfileData: No token in localStorage");
            throw new Error("No token found");
        }

        const response = await axiosInstance.get("/user/get-profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Log the full response to see the structure
        console.log("Full API Response Object:", response.data.data.user);

        return response.data.data.user; // Fallback
    } catch (error) {
        // Log details to identify if it's a 401, 404, or Network Error
        console.error("Axios Error Details:", {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            data: error.response?.data
        });
        throw error;
    }
}

