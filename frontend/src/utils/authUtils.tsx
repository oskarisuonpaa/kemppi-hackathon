// src/utils/authUtils.ts
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

// Function to check token validity
export const checkTokenValidity = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token); // Type the decoded token
    const currentTime = Date.now() / 1000; // Current time in seconds

    // Check if the token is expired
    return decodedToken.exp >= currentTime;
  } catch (error) {
    console.error("Token decoding error:", error);
    return false;
  }
};