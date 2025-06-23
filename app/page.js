import Link from "next/link";

export default function Home() {
  return (
    <div className="px-2 pt-4">
      <h2 className="text-xl font-extrabold">Before you start...</h2>
      <p className="mt-12 mb-24">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum odio
        provident, excepturi consectetur fugit optio delectus facere esse
        incidunt sed autem repellendus ipsam quod laboriosam possimus corrupti a
        voluptatem cumque.
      </p>
      <div className="flex items-center justify-center">
        <Link
          href={"/form"}
          className="bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-200 px-12 py-6 mx-auto rounded-xl transition duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
