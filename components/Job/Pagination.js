'use client';

import { Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';

function Paginationx (data)  {
  const router =  useRouter();
  function handleChangePage(event, value) {
    router.push(`?page=${value}`);
  }

  console.log(data);
  const page = 1;

  return (
    <>
    <Pagination count={data.totalPages} page={page} onChange={handleChangePage} shape="rounded" />
    </>
  );
}

export default Paginationx;