async function getData(id: number) {
  const res = await fetch(`http://localhost:3000/api/job/${id}`);


  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}

export default async function Page({ params }) {
  const data = await getData(params.id);
  console.log(data);
  return (
    <main>
      <h1>job title 2</h1>
      <h1>{data.title}</h1>
    </main>
  );
}
