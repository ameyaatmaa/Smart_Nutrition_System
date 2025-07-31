// Google OAuth Authentication Utility

// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id',
  clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
  redirectUri: process.env.REACT_APP_GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback',
  scope: 'email profile'
};

// Initialize Google OAuth
export const initializeGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    // Load Google API
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CONFIG.clientId,
          callback: handleGoogleSignIn,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        resolve();
      } else {
        reject(new Error('Google API failed to load'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load Google API'));
    document.head.appendChild(script);
  });
};

// Handle Google Sign In
export const handleGoogleSignIn = (response) => {
  if (response.credential) {
    const decoded = jwt_decode(response.credential);
    return {
      success: true,
      user: {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        given_name: decoded.given_name,
        family_name: decoded.family_name
      }
    };
  }
  return { success: false, error: 'No credential received' };
};

// Render Google Sign In Button
export const renderGoogleSignInButton = (elementId) => {
  if (window.google && window.google.accounts) {
    window.google.accounts.id.renderButton(
      document.getElementById(elementId),
      {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: 300
      }
    );
  }
};

// Sign Out from Google
export const signOutFromGoogle = () => {
  if (window.google && window.google.accounts) {
    window.google.accounts.id.disableAutoSelect();
    window.google.accounts.id.revoke(localStorage.getItem('google_token'), () => {
      localStorage.removeItem('google_token');
    });
  }
};

// Mock JWT Decode function (in production, use a proper JWT library)
const jwt_decode = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return {};
  }
};

// Check if user is signed in with Google
export const isGoogleSignedIn = () => {
  return localStorage.getItem('google_token') !== null;
};

// Get Google user data
export const getGoogleUserData = () => {
  const token = localStorage.getItem('google_token');
  if (token) {
    return jwt_decode(token);
  }
  return null;
}; 