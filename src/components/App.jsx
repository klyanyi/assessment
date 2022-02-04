import React, { useEffect, useState } from 'react';

export function App() {
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json.posts));
  }, []);

  return (
    <div className="container mx-auto">
      <div>Filter:<input></input></div>
      <div className="mt-48 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-2">
        {posts.map((post) => (
          <>
            <div
              className="flex flex-col bg-slate-200 rounded-md p-4"
              key={post.id}
            >
   
              <div className="text-xl font-bold text-center">{post.title}</div>
              <div className="text-md self-start py-4 flex-1">{post.summary}</div>
              {/* <div className="flex justify-center">
                <img className="bg-white rounded-full p-4 " src={post.author.avatar}></img>
                <span className="font-bold">{post.author.name}</span>
              </div> */}
              <div className="">{new Date(post.publishDate).toLocaleDateString()}</div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
