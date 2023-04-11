'use client';
import { Pagination } from '@mui/material';

const Paginations = () => {
  // const router =  useRouter();
  function handleChangePage(event, value) {
    // router.push(`?page=${value}`);
  }

  const page = 1;

  return (
    <Pagination count={19} page={page} onChange={handleChangePage} shape="rounded" />
  );
}

export default Paginations;