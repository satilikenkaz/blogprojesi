// pages/index.js
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Home() {
  const { register, handleSubmit, reset } = useForm();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('http://localhost:8000/api/posts/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:8000/api/posts/', data);
      console.log('Post created successfully!');
      reset(); // Formu sıfırla
      // Yeni post ekledikten sonra sayfayı güncelle
      const response = await axios.get('http://localhost:8000/api/posts/');
      setPosts(response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-4xl font-bold mb-8">Simple Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title:</label>
        <input {...register('title')} id="title" className="input" required />
        <label htmlFor="content">Content:</label>
        <textarea {...register('content')} id="content" className="input" required />
        <button type="submit" className="btn">Submit Post</button>
      </form>

      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Recent Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
