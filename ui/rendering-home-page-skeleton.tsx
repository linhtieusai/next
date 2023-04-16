export default function HomePageSkeleton() {
  return (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12">
        <div className="h-32 bg-gray-400 rounded-lg animate-pulse mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg animate-pulse p-4"
            >
              <div className="h-32 bg-gray-400 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-400 mb-2"></div>
              <div className="h-4 bg-gray-400"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};