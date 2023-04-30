'use client';

import { Pagination } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

function Paginationx ({ data, pageChangeCallback })  {
  const router =  useRouter();
  const currentPath = usePathname();
  function handleChangePage(event, value) {
    pageChangeCallback();
    router.push(currentPath + `?page=${value}`);
  }

  const page = parseInt(data.page);

  return (
    <>
      <Pagination count={data.totalPages} page={page} onChange={handleChangePage} shape="rounded" />
    </>
  );
}

export default Paginationx;