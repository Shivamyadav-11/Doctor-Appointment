import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="w-full min-h-screen bg-gray-50 p-3 sm:p-5 lg:p-6 overflow-x-hidden">
        {/* ================= TOP CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {/* ================= EARNING ================= */}
          <div className="w-full min-w-0 bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-50">
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  src={assets.earning_icon}
                  alt="Earning"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-gray-700 truncate">
                  {currency} {dashData.earnings}
                </p>

                <p className="text-sm text-gray-400 mt-1">Total Earnings</p>
              </div>

              {/* Desktop Badge */}
              <span className="hidden sm:block flex-shrink-0 text-xs font-medium text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full">
                Earnings
              </span>
            </div>
          </div>

          {/* ================= APPOINTMENTS ================= */}
          <div className="w-full min-w-0 bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-green-50">
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  src={assets.appointment_icon}
                  alt="Appointments"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-gray-700 truncate">
                  {dashData.appointments}
                </p>

                <p className="text-sm text-gray-400 mt-1">Total Appointments</p>
              </div>

              {/* Desktop Badge */}
              <span className="hidden sm:block flex-shrink-0 text-xs font-medium text-green-500 bg-green-50 px-3 py-1.5 rounded-full">
                Appointments
              </span>
            </div>
          </div>

          {/* ================= PATIENTS ================= */}
          <div className="w-full min-w-0 bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-purple-50">
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  src={assets.patients_icon}
                  alt="Patients"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-gray-700 truncate">
                  {dashData.patients}
                </p>

                <p className="text-sm text-gray-400 mt-1">Total Patients</p>
              </div>

              {/* Desktop Badge */}
              <span className="hidden sm:block flex-shrink-0 text-xs font-medium text-purple-500 bg-purple-50 px-3 py-1.5 rounded-full">
                Patients
              </span>
            </div>
          </div>
        </div>

        {/* ================= LATEST BOOKINGS ================= */}
        <div className="w-full bg-white mt-6 sm:mt-8 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-indigo-50">
                <img
                  className="w-5 h-5"
                  src={assets.list_icon}
                  alt="Bookings"
                />
              </div>

              <div className="min-w-0">
                <p className="font-semibold text-gray-700 text-base sm:text-lg">
                  Latest Bookings
                </p>

                <p className="text-xs sm:text-sm text-gray-400 mt-0.5 truncate">
                  Your recent patient appointments
                </p>
              </div>
            </div>

            <span className="hidden sm:block flex-shrink-0 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              Recent
            </span>
          </div>

          {/* Booking List */}
          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex items-center justify-between gap-3 px-3 sm:px-6 py-4 sm:py-5 hover:bg-gray-50 transition-all duration-200"
                >
                  {/* Patient */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover bg-indigo-50 border-2 border-white shadow-sm"
                        src={item.userData?.image}
                        alt={item.userData?.name || "Patient"}
                      />

                      {!item.cancelled && !item.isCompleted && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>

                    {/* Patient Details */}
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-700 text-sm sm:text-base truncate">
                        {item.userData?.name || "Patient"}
                      </p>

                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Appointment
                      </p>

                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5 whitespace-nowrap">
                        {slotDateFormat(item.slotDate)}
                        <span className="mx-1.5 sm:mx-2 text-gray-300">|</span>
                        {item.slotTime}
                      </p>
                    </div>
                  </div>

                  {/* ================= ACTION ================= */}
                  <div className="flex items-center justify-end flex-shrink-0">
                    {/* Cancelled */}
                    {item.cancelled ? (
                      <span className="px-2.5 sm:px-4 py-2 rounded-lg bg-red-50 text-red-500 text-[10px] sm:text-sm font-medium whitespace-nowrap">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      /* Completed */
                      <span className="px-2.5 sm:px-4 py-2 rounded-lg bg-green-50 text-green-600 text-[10px] sm:text-sm font-medium whitespace-nowrap">
                        Completed
                      </span>
                    ) : (
                      /* Buttons */
                      <div className="flex items-center gap-2 sm:gap-3">
                        {/* Cancel */}
                        <button
                          type="button"
                          onClick={() => cancelAppointment(item._id)}
                          className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 hover:scale-105 active:scale-95 transition-all duration-200"
                          title="Cancel Appointment"
                        >
                          <img
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            src={assets.cancel_icon}
                            alt="Cancel"
                          />
                        </button>

                        {/* Complete */}
                        <button
                          type="button"
                          onClick={() => completeAppointment(item._id)}
                          className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-green-50 border border-green-100 hover:bg-green-100 hover:scale-105 active:scale-95 transition-all duration-200"
                          title="Complete Appointment"
                        >
                          <img
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            src={assets.tick_icon}
                            alt="Complete"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              /* No Appointments */
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <img
                    className="w-7 opacity-50"
                    src={assets.list_icon}
                    alt="No appointments"
                  />
                </div>

                <p className="text-gray-600 font-semibold text-sm sm:text-base">
                  No appointments found
                </p>

                <p className="text-xs sm:text-sm text-gray-400 mt-1 text-center">
                  There are no recent bookings available.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
