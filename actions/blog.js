import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createBlog = (blog, token) => {
    let createBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createBlogEndpoint = `${API}/blog`;
    } else if (isAuth() && isAuth().role === 0) {
        createBlogEndpoint = `${API}/user/blog`;
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

export const singleBlog = (slug = undefined) => {
    return fetch(`${API}/blog/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = blog => {
    return fetch(`${API}/blogs/related`, {
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
        listBlogsEndpoint = `${API}/${username}/blogs`;
    } else {
        listBlogsEndpoint = `${API}/blogs`;
    }

    return fetch(`${listBlogsEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const allposts = ()=> {
 

    return fetch(`${API}/allposts`, {
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
        deleteBlogEndpoint = `${API}/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteBlogEndpoint = `${API}/user/blog/${slug}`;
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
        updateBlogEndpoint = `${API}/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateBlogEndpoint = `${API}/user/blog/${slug}`;
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

export const listSearch = (params, page) => {
    let query = queryString.stringify({ ...params, page });
    return fetch(`${API}/blogs/search?${query}`, {
      method: 'GET'
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };



export const listSearchDashboard = (params, page) => {
    // console.log('search params', params);
    let query = queryString.stringify({ ...params, page });
    // console.log('query params', query);
    return fetch(`${API}/blogs/searchdashboard?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const PostList = (params, page) => {
    // console.log('search params', params);
    let query = queryString.stringify({ ...params, page });
    // console.log('query params', query);
    return fetch(`${API}/blogs/postlist?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const listSearch2 = params => {
    // console.log('search params', params);
    let query = queryString.stringify(params);
    // console.log('query params', query);
    return fetch(`${API}/blogs/searching?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearchByAuthor = (params, page) => {
    // console.log('search params', params);
    let query = queryString.stringify({ ...params, page });
    // console.log('query params', query);
    return fetch(`${API}/searchbyuser?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearchByCategory = (params, page) => {
    // console.log('search params', params);
    let query = queryString.stringify({ ...params, page });
    // console.log('query params', query);
    return fetch(`${API}/searchbycategory?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearchByDate = (params, page) => {
    // console.log('search params', params);
    let query = queryString.stringify({ ...params, page });
    // console.log('query params', query);
    return fetch(`${API}/searchbydate?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearchByFeatured = (params, page) => {
    // console.log('search params', params);
    let query = queryString.stringify({ ...params, page });
    // console.log('query params', query);
    return fetch(`${API}/searchbyfeatured?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearchByStatus = (params, page) => {
    // console.log('search params', params);
    let query = queryString.stringify({ ...params, page });
    // console.log('query params', query);
    return fetch(`${API}/searchbystatus?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
