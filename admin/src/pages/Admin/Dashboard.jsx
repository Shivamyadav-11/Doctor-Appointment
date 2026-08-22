import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { assets } from "../../assets/assets_admin/assets.js";
import { AppContext } from "../../context/AppContext.jsx";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-5 lg:p-6">
        {/* ================= TOP CARDS ================= */}
        <div className="flex flex-wrap gap-4">
          {/* Doctors Card */}
          <div className="flex items-center gap-4 bg-white px-5 py-4 min-w-[220px] flex-1 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-blue-50">
              <img
                className="w-10 h-10 object-contain"
                src={assets.doctor_icon}
                alt="Doctors"
              />
            </div>

            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {dashData.doctors}
              </p>

              <p className="text-sm text-gray-400 mt-1">Doctors</p>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="flex items-center gap-4 bg-white px-5 py-4 min-w-[220px] flex-1 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-green-50">
              <img
                className="w-10 h-10 object-contain"
                src={assets.appointment_icon}
                alt="Appointments"
              />
            </div>

            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {dashData.appointments}
              </p>

              <p className="text-sm text-gray-400 mt-1">Appointments</p>
            </div>
          </div>

          {/* Patients Card */}
          <div className="flex items-center gap-4 bg-white px-5 py-4 min-w-[220px] flex-1 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-purple-50">
              <img
                className="w-10 h-10 object-contain"
                src={assets.patients_icon}
                alt="Patients"
              />
            </div>

            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {dashData.patients}
              </p>

              <p className="text-sm text-gray-400 mt-1">Patients</p>
            </div>
          </div>
        </div>

        {/* ================= LATEST BOOKINGS ================= */}
        <div className="bg-white mt-7 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-200 bg-white">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-indigo-50">
              <img className="w-5 h-5" src={assets.list_icon} alt="Bookings" />
            </div>

            <div>
              <p className="font-semibold text-gray-700">Latest Bookings</p>

              <p className="text-xs text-gray-400 mt-0.5">
                Recent appointment bookings
              </p>
            </div>
          </div>

          {/* Booking List */}
          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Doctor + Appointment Info */}
                  <div className="flex items-center gap-4">
                    {/* Doctor Image */}
                    <div className="relative">
                      <img
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover bg-indigo-50 border border-gray-200"
                        src={item.docData?.image}
                        alt={item.docData?.name || "Doctor"}
                      />

                      {/* Online/status dot */}
                      {!item.cancelled && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>

                    {/* Details */}
                    <div>
                      <p className="font-medium text-gray-700">
                        {item.docData?.name || "Doctor"}
                      </p>

                      <p className="text-sm text-gray-400 mt-1">
                        Appointment Date
                      </p>

                      <p className="text-sm text-gray-600 mt-0.5">
                        {slotDateFormat(item.slotDate)}
                        <span className="mx-2 text-gray-300">|</span>
                        {item.slotTime}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center sm:justify-end">
                    {item.cancelled ? (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-50 text-red-500 text-xs font-medium">
                        Appointment Cancelled
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="group w-9 h-9 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 transition-colors duration-200"
                        title="Cancel Appointment"
                      >
                        <img
                          className="w-5 h-5 group-hover:scale-110 transition-transform"
                          src={assets.cancel_icon}
                          alt="Cancel"
                        />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              /* No appointments */
              <div className="flex flex-col items-center justify-center py-12">
                <img
                  className="w-14 opacity-40 mb-3"
                  src={assets.list_icon}
                  alt="No appointments"
                />

                <p className="text-gray-500 font-medium">
                  No appointments found
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  There are no recent bookings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
