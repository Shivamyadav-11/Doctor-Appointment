import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);

  const [showAll, setShowAll] = useState(false);
  const [relDocs, setRelDocs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId,
      );

      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      {/* Heading */}
      <h1 className="text-3xl font-medium">Related Doctors</h1>

      <p className="sm:w-1/3 text-center text-sm text-gray-500">
        Simply browse through our list of trusted doctors.
      </p>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDocs.slice(0, showAll ? relDocs.length : 6).map((item, index) => (
          <div
            key={item._id || index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-500 bg-white"
          >
            {/* Doctor Image */}
            <img
              className="w-full bg-blue-50"
              src={item.image}
              alt={item.name}
            />

            {/* Doctor Details */}
            <div className="p-4">
              {/* Availability */}
              <div
                className={`flex items-center gap-2 text-sm mb-2 ${
                  item.available ? "text-green-500" : "text-gray-500"
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    item.available ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>

                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>

              {/* Name */}
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>

              {/* Speciality */}
              <p className="text-gray-500 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less */}
      {relDocs.length > 6 &&
        (!showAll ? (
          <button
            onClick={() => setShowAll(true)}
            className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition-all duration-300"
          >
            Show More
          </button>
        ) : (
          <button
            onClick={() => setShowAll(false)}
            className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition-all duration-300"
          >
            Show Less
          </button>
        ))}
    </div>
  );
};

export default RelatedDoctors;
