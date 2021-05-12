export function paginationHelper(data: Array<any>, page: number, per_page: number) {
  const pageStart = (Number(page) - 1) * Number(per_page);
  const pageEnd = pageStart + Number(per_page);
  let dataPaginate = data;
  if(data && data.length > 0 ) {
    dataPaginate = data.slice(pageStart, pageEnd);
  }

  return dataPaginate;
}
