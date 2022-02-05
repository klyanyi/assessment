import React from 'react';
import { getPagination } from '../utils/getPagination';

export default function Pagination({ pagination, setPagination, list }) {
  const prevPage = () => {
    const newPagination = getPagination(
      list.length,
      pagination.currentPage - 1
    );
    setPagination(newPagination);
  };

  const nextPage = () => {
    const newPagination = getPagination(
      list.length,
      pagination.currentPage + 1
    );
    setPagination(newPagination);
  };

  const goToPage = (idx) => {
    const newPagination = getPagination(list.length, idx);
    setPagination(newPagination);
  };

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={pagination.startIndex === 0 ? null : prevPage}
        className={`p-2 ${pagination.startIndex === 0 ? 'text-slate-300 hover:cursor-auto' : 'text-slate-800'}`}
      >
        &laquo;
      </button>
      {pagination.pages.map((page, index) => {
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 ${
              pagination.currentPage - 1 === index ? 'text-white bg-slate-400 rounded-full font-bold hover:cursor-auto' : 'text-slate-800'
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={
          pagination.lastPageIndex === pagination.currentPage ? null : nextPage
        }
        className={`p-2 ${
          pagination.lastPageIndex === pagination.currentPage
            ? 'text-slate-300 hover:cursor-auto'
            : 'text-slate-800'
        }`}
      >
        &raquo;
      </button>
    </div>
  );
}
