import { Link } from 'react-router-dom';
import React from 'react';

export function Card({ post }) {
  return (
    <div
      id={post.id}
      className="flex flex-col bg-gray-100 rounded-lg p-4 hover:drop-shadow-xl hover:cursor-auto"
    >
      <div className="flex flex-wrap justify-center">
        {post.categories.map((c) => (
          <span
            key={c.id}
            className="text-xs font-bold text-gray-500 uppercase pr-4 whitespace-nowrap tracking-wider"
          >
            {c.name}
          </span>
        ))}
      </div>

      <div className="flex-1">
        <div className="text-2xl font-bold my-4 text-gray-800">
          {post.title}
        </div>
        <div className="text-md self-start my-4 text-gray-900">
          {post.summary}
        </div>
      </div>
      <div className="flex">
        <img
          alt={post.author.avatar}
          className="rounded-full bg-white p-2 mr-4"
          src={post.author.avatar}
        />
        <div className="self-center">
          <p className="text-xs text-gray-600 font-bold uppercase py-1">
            by {post.author.name}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(post.publishDate).toDateString()}
          </p>
        </div>
      </div>

      <Link
        className="text-md text-gray-500 mx-auto mt-2 hover:text-gray-800"
        to={`/posts/${post.id}`}
      >
        Read more
      </Link>
    </div>
  );
}
