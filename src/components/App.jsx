import React, { useEffect, useState } from 'react';

import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';
import Posts from './Posts';
import { getPagination } from '../utils/getPagination';

export function App() {
  let [posts, setPosts] = useState([]);
  let [categories, setCategories] = useState([]);
  let [filteredPosts, setFilteredPosts] = useState([]);
  let [pagination, setPagination] = useState({ pages: [] });

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((json) => {
        const list = json.posts;
        setPosts(list);
        setFilteredPosts(list);
      });
  }, []);

  useEffect(() => {
    let categoriesMap = new Map();

    posts.map((post) => {
      return post.categories.forEach((c) => {
        const category = categoriesMap.get(c.name);
        if (!category) {
          // we use 'name' as key here because 'id' wasn't unique
          categoriesMap.set(c.name, { ...c, posts: [] });
        } else if (category.name === c.name) {
          const posts = category.posts.filter((p) => p.id === post.id)[0];
          if (!posts) {
            categoriesMap.set(c.name, {
              ...c,
              posts: [...category.posts, post],
            });
          }
        }
      });
    });

    /**
     * Creates an object with category name as key, and array of posts as value
     * -- e.g. {
     *            Surveys and Forms: {id: xx, name: 'Surveys and Forms', posts: [post1, post2, ...],
     *            ...
     *         }
     */
    setCategories(Object.fromEntries(categoriesMap));
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

  return (
    <div className="container mx-auto px-8 my-8 grid gap-8 grid-cols-1 md:grid-cols-6 lg:grid-cols-6">
      <div className="md:col-span-2 lg:col-span-1">
        <CategoryFilter list={categories} onSelect={onSelect} />
      </div>
      <div className="md:col-span-4 lg:col-span-5">
        <Posts list={filteredPosts} pagination={pagination} />
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          list={filteredPosts}
        />
      </div>
    </div>
  );
}

export default App;
