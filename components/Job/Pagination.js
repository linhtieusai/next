'use client';

import { Pagination } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Paginationx ({ data, pageChangeCallback })  {
  const router =  useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  function handleChangePage(event, value) {
    pageChangeCallback();
    console.log("currentPath");
    const params = new URLSearchParams(searchParams);
    params.set("page", value);
    console.log(searchParams);
    console.log(searchParams.toString());

    router.push(currentPath + `?` + params.toString());
  }

  const page = parseInt(data.page);

  return (
    <>
      <Pagination count={data.totalPages} page={page} onChange={handleChangePage} shape="rounded" />
    </>
  );
}

export default Paginationx;