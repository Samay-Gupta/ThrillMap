const THRILL_MAP_API_ROOT = import.meta.env.VITE_THRILL_MAP_API_ROOT;

console.log('THRILL_MAP_API_ROOT', THRILL_MAP_API_ROOT);

export const API_ROOT = THRILL_MAP_API_ROOT || 'http://localhost:3000/api';

export const AUTH_TOKEN_KEY = 'JWT_AUTH_TOKEN';

export const PROFILE_KEY = 'profile';
