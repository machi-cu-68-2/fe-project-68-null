import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] pt-32 
    pb-16 px-4 font-sans text-center"
    >
      <h1
        className="text-[6rem] md:text-[8rem] font-bold font-playfair-display text-saddlebrown
       leading-none mb-4 drop-shadow-sm"
      >
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6 font-playfair-display">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mb-10 max-w-md leading-relaxed">
        We're sorry, but the page you are looking for doesn't exist or has been
        moved. Let's get you back on track to finding the perfect table.
      </p>
      <Link
        href="/"
        className="bg-[#D2691E] hover:bg-[#b55818] text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300"
      >
        Return to Home
      </Link>
    </div>
  );
}
