import { jwtDecode } from "jwt-decode";


export const decryptToken = (encryptedToken: string) => {
    try {
        const decoded = jwtDecode(encryptedToken)
        return decoded;
    } catch (error) {
        // console.error('Error decoding token:', error);
        return null;
    }
};