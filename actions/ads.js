import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createLogo = (blog, token) => {
    let createLogoEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createLogoEndpoint = `${API}/logo`;
    } else if (isAuth() && isAuth().role === 0) {
        createLogoEndpoint = `${API}/user/blog`;
    }

    return fetch(`${createLogoEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createAds = (ads, token) => {
    let createBlogEndpoint = `${API}/create-ads`;
   
    return fetch(`${createBlogEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: ads
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeAds = (_id, token) => {
    let deleteBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deleteBlogEndpoint = `${API}/ads/delete`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteBlogEndpoint = `${API}/user/ads/delete`;
    }

    return fetch(`${deleteBlogEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};



