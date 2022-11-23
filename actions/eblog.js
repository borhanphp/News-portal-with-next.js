import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createBlog = (blog, token) => {
    let createBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createBlogEndpoint = `${API}/eblog`;
    } else if (isAuth() && isAuth().role === 0) {
        createBlogEndpoint = `${API}/user/eblog`;
    }

    return fetch(`${createBlogEndpoint}`, {
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

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/test?cat=6220fc0a36c00b3d8bf08af5&name=createdAt&sort=-1&limit=2&skip=0`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// experiment
export const listBlogs = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/posts`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleEblog = (slug = undefined) => {
    return fetch(`${API}/eblog/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const elistRelated = blog => {
    return fetch(`${API}/eblogs/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listBlogsEndpoint;

    if (username) {
        listBlogsEndpoint = `${API}/${username}/eblogs`;
    } else {
        listBlogsEndpoint = `${API}/eblogs`;
    }

    return fetch(`${listBlogsEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeBlog = (slug, token) => {
    let deleteBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deleteBlogEndpoint = `${API}/eblog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteBlogEndpoint = `${API}/user/eblog/${slug}`;
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

export const updateBlog = (blog, token, slug) => {
    let updateBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateBlogEndpoint = `${API}/eblog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateBlogEndpoint = `${API}/user/eblog/${slug}`;
    }

    return fetch(`${updateBlogEndpoint}`, {
        method: 'PUT',
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

export const listSearch = params => {
    console.log('search params', params);
    let query = queryString.stringify(params);
    console.log('query params', query);
    return fetch(`${API}/eblogs/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
