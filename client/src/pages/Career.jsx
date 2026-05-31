export default function Career() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Career Guidance
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <input
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Enter your class, example: Class 10"
        />

        <input
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Enter your interest, example: Science, Computer, Medical"
        />

        <input
          className="w-full border p-3 rounded-lg mb-5"
          placeholder="Enter your goal, example: Engineer, Doctor, Teacher"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
          Get Career Advice
        </button>

        <div className="mt-8 bg-blue-100 p-5 rounded-xl">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">
            Suggested Path
          </h2>

          <p className="text-gray-700">
            Based on your interest, you can explore engineering, government
            scholarships, free online courses, and skill development programs.
          </p>
        </div>
      </div>
    </div>
  );
}