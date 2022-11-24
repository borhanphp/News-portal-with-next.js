import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()

export const API = 'https://api-mliu.onrender.com/api';
export const DOMAIN_IP = 'http://bdtech.live';
export const IMG_API = 'http://api-mliu.onrender.com/api/images';
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const DOMAIN = "bdtech.live";

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;
// publicRuntimeConfig.PRODUCTION 
// ? publicRuntimeConfig.API_PRODUCTION 
// : publicRuntimeConfig.API_DEVELOPMENT;
// export const APP_NAME = publicRuntimeConfig.APP_NAME;
// mongodb://82.180.161.124:27017/chalamannewyork
