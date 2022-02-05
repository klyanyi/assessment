export function getPagination(length, currentPage = 1) {
  const pageSize = 9;

  const totalItems = length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startIndex = pageSize * currentPage - pageSize;
  const endIndex = startIndex + pageSize;

  const lastPageIndex = pages[pages.length - 1];

  return {
    totalItems: length,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages,
    lastPageIndex: lastPageIndex,
    maxPages: 5,
  };
}
