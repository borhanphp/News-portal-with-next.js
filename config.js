import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()

<<<<<<< HEAD
export const API = 'localhost:5000/api';
export const DOMAIN_IP = 'http://82.180.161.124';
export const IMG_API = 'https://82.180.161.124/api/images';
=======
export const API = 'https://api-mliu.onrender.com/api';
export const DOMAIN_IP = 'http://bdtech.live';
export const IMG_API = 'http://api-mliu.onrender.com/api/images';
>>>>>>> 37338f65264c04f74621e614d6abbf595380539a
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const DOMAIN = "bdtech.live";

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;
// publicRuntimeConfig.PRODUCTION 
// ? publicRuntimeConfig.API_PRODUCTION 
// : publicRuntimeConfig.API_DEVELOPMENT;
// export const APP_NAME = publicRuntimeConfig.APP_NAME;
// mongodb://82.180.161.124:27017/chalamannewyork
