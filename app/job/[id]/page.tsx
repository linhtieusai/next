async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/job/${id}`);

  console.log(res);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page({ params: { id } }) {
  const data = await getData(id);

  return (
    <main>
      <h1>job title 2</h1>
      <h1>{data.data.title}</h1>
    </main>
  );
}
