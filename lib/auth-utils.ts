/**
 * Utility functions for authentication and user management
 */

/**
 * Extracts the user ID from a JWT token
 * @param token - The JWT token string
 * @returns The user ID or 'anon' if token is invalid
 */
export function extractUserIdFromToken(token: string | null): string {
  if (!token) {
    return 'anon';
  }

  try {
    // JWT tokens have 3 parts separated by dots: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn('Invalid JWT token format');
      return 'anon';
    }

    // Decode the payload (second part)
    const payload = parts[1];
    
    // Add padding if needed for base64 decoding
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    
    // Decode base64
    const decodedPayload = atob(paddedPayload);
    
    // Parse JSON
    const payloadObj = JSON.parse(decodedPayload);
    
    // Extract user ID from the payload
    const userId = payloadObj.id || payloadObj.user_id || payloadObj.sub;
    
    if (!userId) {
      console.warn('No user ID found in JWT token');
      return 'anon';
    }
    
    console.log('Extracted user ID from token:', userId);
    return userId;
  } catch (error) {
    console.error('Error extracting user ID from token:', error);
    return 'anon';
  }
}

/**
 * Gets the current user ID from localStorage token
 * @returns The user ID or 'anon' if no valid token
 */
export function getCurrentUserId(): string {
  const token = localStorage.getItem('token');
  return extractUserIdFromToken(token);
}
