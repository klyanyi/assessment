import React, { useEffect, useState } from 'react';

export default function CategoryFilter({ list, onSelect }) {
  let [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(new Array(Object.keys(list).length).fill(false));
  }, [list]);

  useEffect(() => {
    const posts = [];
    selected.filter(
      (isSelected, idx) =>
        isSelected && posts.push(...Object.values(list)[idx].posts)
    );
    onSelect(posts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const onClick = (idx) => {
    const prevSelected = [...selected];
    prevSelected[idx] = !prevSelected[idx];
    setSelected(prevSelected);
  };

  return (
    <>
      <p className="font-bold text-xl mb-4 text-slate-800">Category</p>
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1">
        {Object.keys(list).map((key, idx) => (
          <div key={list[key].id} className="flex items-center py-1 hover:cursor-pointer">
            <input
              onClick={()=>onClick(idx)}
              id={`category-filter-${key}`}
              value={key}
              type="checkbox"
              className="h-4 w-4 border-slate-300 rounded default:ring-2 checked:bg-slate-300"
            />
            <label
              htmlFor={`category-filter-${key}`}
              className={`ml-3 hover:cursor-pointer text-slate-700 ${selected[idx] === true ? 'font-bold':''}`}
            >
              {key}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
