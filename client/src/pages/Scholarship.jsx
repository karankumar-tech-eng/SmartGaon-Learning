import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Scholarship() {
  const scholarships = [
    {
      name: "Post Matric Scholarship",
      category: "SC/ST/OBC",
      eligibility: "Reserved category students studying after Class 10.",
      benefit: "Tuition fee support and maintenance allowance.",
      amount: "Up to ₹20,000/year",
      status: "Open",
      icon: "🎓",
      website: "https://scholarships.gov.in",
      documents: [
        "Aadhaar Card",
        "Caste Certificate",
        "Income Certificate",
        "Bank Passbook",
        "Previous Year Marksheet",
      ],
    },
    {
      name: "National Means Cum Merit Scholarship",
      category: "All Students",
      eligibility: "Class 8 students with good marks and low family income.",
      benefit: "Financial support for school education.",
      amount: "₹12,000/year",
      status: "Open",
      icon: "📘",
      website: "https://scholarships.gov.in",
      documents: [
        "Aadhaar Card",
        "Income Certificate",
        "School Certificate",
        "Bank Details",
        "Marksheet",
      ],
    },
    {
      name: "AICTE Pragati Scholarship",
      category: "Girls",
      eligibility: "Girl students in technical diploma or degree courses.",
      benefit: "Support for technical education.",
      amount: "Up to ₹50,000/year",
      status: "Open",
      icon: "👩‍🎓",
      website: "https://www.aicte-india.org",
      documents: [
        "Aadhaar Card",
        "Admission Proof",
        "Income Certificate",
        "Bank Details",
        "Previous Academic Records",
      ],
    },
    {
      name: "State Government Scholarship",
      category: "State Based",
      eligibility: "Based on state, income, category, and course.",
      benefit: "Fee reimbursement and education support.",
      amount: "Varies",
      status: "Check State Portal",
      icon: "🏛️",
      website: "https://scholarships.gov.in",
      documents: [
        "Aadhaar Card",
        "Domicile Certificate",
        "Income Certificate",
        "Category Certificate",
        "Bank Passbook",
      ],
    },
    {
      name: "Minority Scholarship",
      category: "Minority",
      eligibility: "Students from minority communities with low family income.",
      benefit: "School and college education support.",
      amount: "Varies",
      status: "Open",
      icon: "🌟",
      website: "https://scholarships.gov.in",
      documents: [
        "Aadhaar Card",
        "Minority Certificate",
        "Income Certificate",
        "Bank Details",
        "Marksheet",
      ],
    },
    {
      name: "Education Loan Support",
      category: "Financial Aid",
      eligibility: "Students needing support for higher education.",
      benefit: "Loan guidance and repayment support information.",
      amount: "Based on course",
      status: "Available",
      icon: "💰",
      website: "https://www.vidyalakshmi.co.in",
      documents: [
        "Aadhaar Card",
        "Admission Letter",
        "Fee Structure",
        "Income Proof",
        "Bank Documents",
      ],
    },
  ];

  const [search, setSearch] = useState("");
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const filteredScholarships = scholarships.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const searchOnGoogle = (name) => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        name + " scholarship official"
      )}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="p-4 md:p-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 md:p-8 rounded-3xl shadow mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Scholarship Finder 🎓
          </h1>

          <p className="text-base md:text-lg max-w-3xl">
            Discover scholarships, financial aid, and education support schemes
            for rural and economically weaker students.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <input
            className="w-full border p-4 rounded-2xl shadow outline-none focus:border-blue-500 text-base md:text-lg text-black bg-white"
            placeholder="Search scholarship by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="text-5xl mb-4">{item.icon}</div>

              <div className="flex justify-between items-center mb-3 gap-3">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {item.category}
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {item.status}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-blue-700 mb-3">
                {item.name}
              </h2>

              <p className="text-gray-700 mb-3">
                <strong>Eligibility:</strong> {item.eligibility}
              </p>

              <p className="text-gray-700 mb-3">
                <strong>Benefit:</strong> {item.benefit}
              </p>

              <p className="text-gray-700 mb-5">
                <strong>Amount:</strong> {item.amount}
              </p>

              <button
                onClick={() => setSelectedScholarship(item)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {selectedScholarship && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white text-black max-w-3xl w-full rounded-3xl shadow-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedScholarship(null)}
                className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
              >
                Close
              </button>

              <div className="text-6xl mb-4">{selectedScholarship.icon}</div>

              <h2 className="text-3xl font-bold text-blue-700 mb-3 pr-24">
                {selectedScholarship.name}
              </h2>

              <div className="flex flex-wrap gap-3 mb-5">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {selectedScholarship.category}
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {selectedScholarship.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-blue-50 p-5 rounded-2xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">
                    Eligibility
                  </h3>
                  <p className="text-gray-700">
                    {selectedScholarship.eligibility}
                  </p>
                </div>

                <div className="bg-green-50 p-5 rounded-2xl">
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    Benefits
                  </h3>
                  <p className="text-gray-700">{selectedScholarship.benefit}</p>
                </div>

                <div className="bg-purple-50 p-5 rounded-2xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-2">
                    Amount
                  </h3>
                  <p className="text-gray-700">{selectedScholarship.amount}</p>
                </div>

                <div className="bg-yellow-50 p-5 rounded-2xl">
                  <h3 className="text-xl font-bold text-yellow-700 mb-2">
                    Application Mode
                  </h3>
                  <p className="text-gray-700">Online application process</p>
                </div>
              </div>

              <div className="mt-6 bg-slate-50 p-5 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Required Documents
                </h3>

                <ul className="grid sm:grid-cols-2 gap-2 text-gray-700">
                  {selectedScholarship.documents.map((doc, index) => (
                    <li key={index}>✅ {doc}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={() => window.open(selectedScholarship.website, "_blank")}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold"
                >
                  🌐 Visit Official Website
                </button>

                <button
                  onClick={() => searchOnGoogle(selectedScholarship.name)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-semibold"
                >
                  🔍 Search on Google
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}