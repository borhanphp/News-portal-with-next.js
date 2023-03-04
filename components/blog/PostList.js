import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API, DOMAIN_IP, IMG_API } from '../../config';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`${API}/posts?page=${currentPage}&search=${searchTerm}`);
      setPosts(response.data.blogs);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    };
    fetchPosts();
  }, [currentPage, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearchChange} />
      {posts?.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      ))}
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;
