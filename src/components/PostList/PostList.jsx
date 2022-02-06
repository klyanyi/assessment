import { Card } from './Card';
import React from 'react';

export function PostList({ list, pagination }) {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {list.map((post, index) => {
        if (index < pagination.startIndex || index >= pagination.endIndex) {
          return null;
        }
        return <Card key={post.id} post={post} />;
      })}
    </div>
  );
}
