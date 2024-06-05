const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export const URL: string = isDevelopment
  ? process.env.REACT_APP_API_URL_DEV!
  : process.env.REACT_APP_API_URL_PROD!;
