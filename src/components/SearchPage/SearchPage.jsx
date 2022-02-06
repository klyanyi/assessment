import React, { useEffect, useState } from 'react';

import CategoryFilter from '../CategoryFilter/CategoryFilter';
import Pagination from '../Pagination/Pagination';
import PostList from '../PostList/PostList';
import { getPagination } from '../../utils/getPagination';

export default function SearchPage() {
  let [posts, setPosts] = useState([]);
  let [categories, setCategories] = useState([]);
  let [filteredPosts, setFilteredPosts] = useState([]);
  let [pagination, setPagination] = useState({ pages: [] });

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((json) => {
        setPosts(json.posts);
      });
  }, []);

  useEffect(() => {
    /**
     * Groups posts by category
     * -- e.g.
     * {
     *   Surveys and Forms: {id: xx, name: 'Surveys and Forms', posts: [post1, post2, ...],
     *   ...
     * }
     */

    const categories = posts.reduce((prevPost, currentPost) => {
      for (let i = 0; i < currentPost.categories.length; i++) {
        const c = currentPost.categories[i];

        const category = prevPost.get(c.name);
        if (category) {
          const hasPost = category.posts.has(currentPost);

          if (!hasPost) {
            prevPost.set(c.name, {
              ...c,
              posts: category.posts.add(currentPost),
            });
          }
        } else {
          // Initialize
          prevPost.set(c.name, { ...c, posts: new Set([currentPost]) });
        }
      }

      return prevPost;
    }, new Map());

    setCategories(categories);
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    const newPagination = getPagination(filteredPosts.length);
    setPagination(newPagination);
  }, [filteredPosts]);

  const onSelect = (selected) => {
    if (selected.length) {
      setFilteredPosts(selected);
    } else {
      setFilteredPosts(posts);
    }
  };

  if (!filteredPosts.length) {
    return <p>Loading..</p>;
  }

  return (
    <div className="container mx-auto px-8 my-8 grid gap-8 grid-cols-1 md:grid-cols-6 lg:grid-cols-6">
      <div className="md:col-span-2 lg:col-span-1">
        <CategoryFilter list={categories} onSelect={onSelect} />
      </div>
      <div className="md:col-span-4 lg:col-span-5">
        <PostList list={filteredPosts} pagination={pagination} />
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          list={filteredPosts}
        />
      </div>
    </div>
  );
}
