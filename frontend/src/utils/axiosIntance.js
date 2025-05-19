import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true // This enables sending cookies with requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
    config => {
        // You can add auth tokens or other headers here
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    response => {
        // Any status code within the range of 2xx
        return response;
    },
    error => {
        let errorMessage = "An unexpected error occurred";
        
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const status = error.response.status;
            const data = error.response.data;
            
            if (status === 400) {
                errorMessage = data.message || "Bad request";
            } else if (status === 401) {
                errorMessage = "Unauthorized access";
                // You could redirect to login page here
            } else if (status === 404) {
                errorMessage = data.message || "Resource not found";
            } else if (status === 409) {
                errorMessage = data.message || "Conflict error";
            } else if (status >= 500) {
                errorMessage = "Server error. Please try again later";
            }
        } else if (error.request) {
            // The request was made but no response was received
            errorMessage = "No response from server. Please check your connection";
        } else {
            // Something happened in setting up the request
            errorMessage = error.message;
        }
        
        // You can log errors here
        console.error("API Error:", errorMessage, error);
        
        // Return a rejected promise with the error message
        return Promise.reject(new Error(errorMessage));
    }
);

export default axiosInstance;
