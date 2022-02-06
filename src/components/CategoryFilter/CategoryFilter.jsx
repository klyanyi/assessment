import React, { useEffect, useState } from 'react';

export default function CategoryFilter({ list, onSelect }) {
  // Array of Posts for selected Category
  let [selectedPosts, setSelectedPosts] = useState([]);
  
  // Array of true/false values for each Category
  let [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(new Array(list.size).fill(false));
  }, [list]);

  useEffect(() => {
    /**
     * Returns a set of selected posts
     */
    const filteredPosts = selected.reduce((prevPosts, isSelected, idx) => {
      if (isSelected) {
        const currentPosts = new Set([...list.values()][idx].posts);
        currentPosts.forEach(prevPosts.add, prevPosts); // merge two Sets
      }
      return prevPosts;
    }, new Set());

    setSelectedPosts([...filteredPosts]);
  }, [selected, list]);

  useEffect(() => {
    onSelect(selectedPosts);
  }, [selectedPosts, onSelect]);

  const onClick = (idx) => {
    const prevSelected = [...selected];
    prevSelected[idx] = !prevSelected[idx]; // toggle checked/unchecked checkbox
    setSelected(prevSelected);
  };

  return (
    <>
      <p className="font-bold text-xl mb-4 text-gray-800">Category</p>
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1">
        {[...list.keys()].map(
          (key, idx) =>
            key && (
              <div
                key={list.get(key).id}
                className="flex items-center hover:cursor-pointer my-2"
              >
                <input
                  onClick={() => onClick(idx)}
                  id={`category-filter-${key}`}
                  value={key}
                  type="checkbox"
                  className="h-4 w-4 rounded-full"
                />
                <label
                  htmlFor={`category-filter-${key}`}
                  className={`ml-3 text-md hover:cursor-pointer text-gray-700 ${
                    selected[idx] === true ? 'font-bold' : ''
                  }`}
                >
                  {key}
                </label>
              </div>
            )
        )}
      </div>
    </>
  );
}
