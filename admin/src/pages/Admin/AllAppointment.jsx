import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets_admin/assets.js";

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border border-gray-300 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointments - Latest First */}
        {[...appointments].reverse().map((item, index) => {
          return (
            <div
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-amber-50"
              key={item._id || index + 1}
            >
              {/* Number */}
              <p className="max-sm:hidden">{index + 1}</p>
              {/* Patient */}
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={item.userData.image}
                  alt={item.userData.name}
                />

                <p>{item.userData.name}</p>
              </div>
              {/* Age */}
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              {/* Date & Time */}
              <p>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
              {/* Doctor */}
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full object-cover bg-gray-200"
                  src={item.docData.image}
                  alt="Error"
                />
                <p className="max-sm:hidden">{item.docData?.name || "N/A"}</p>
              </div>
              {/* Fees */}
              <p className="max-sm:hidden">
                {currency}
                {item.amount}
              </p>
              {/* Action */}
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Error"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllAppointment;
