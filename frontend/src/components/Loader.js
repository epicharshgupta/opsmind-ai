function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-6 text-gray-600 text-lg">
        Indexing your SOP...
      </p>
    </div>
  );
}

export default Loader;