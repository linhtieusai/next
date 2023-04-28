'use client';

import { Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';

function Paginationx ({ data })  {
  const router =  useRouter();
  function handleChangePage(event, value) {
    router.push(`?page=${value}`);
  }

  const page = parseInt(data.page);

  console.log(data);

  return (
    <>
    <Pagination count={data.totalPages} page={page} onChange={handleChangePage} shape="rounded" />
    </>
  );
}

export default Paginationx;