export default function SkeletonCard() {

  const cards = Array.from({ length: 5}, (_, index) => index);
  return (
    <>
      <div className="flex flex-col  animate-pulse">
      {cards.map((card) => (
           <div className="flex w-full mt-4" key={card}>
              <div className="flex-shrink-0">
                <span className="block w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-700"></span>
              </div>

              <div className="w-full mt-2 ml-4">
                <h3 className="h-4 w-1/2 bg-gray-200 rounded-md dark:bg-gray-700"></h3>
                <h3 className="h-20 mt-5 bg-gray-200 rounded-md dark:bg-gray-700 w-full "></h3>
              </div>
          </div>
      ))}
    </div>
    </>
  );
};