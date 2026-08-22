import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-8xl m-2 sm:m-5">
      <p className="mb-3 text-base sm:text-lg font-medium">All Appointments</p>

      <div
        className="
          w-full
          bg-white
          border border-gray-200
          rounded-lg
          text-sm
          max-h-[80vh]
          min-h-[50vh]
          overflow-y-auto
          overflow-x-hidden
        "
      >
        {/* Heading */}
        <div
          className="
            hidden sm:grid
            grid-cols-[0.5fr_2fr_1.3fr_0.8fr_2fr_1fr_1.4fr]
            items-center
            gap-2
            py-4
            px-6
            border-b border-gray-200
            text-gray-700
            font-medium
          "
        >
          <p className="text-center">#</p>
          <p className="text-center">Patient</p>
          <p className="text-center">Payment</p>
          <p className="text-center">Age</p>
          <p className="text-center">Date&Time</p>
          <p className="text-center">Fees</p>
          <p className="text-center">Action</p>
        </div>

        {appointments.map((item, index) => {
          return (
            <div
              key={index}
              className="
                grid
                grid-cols-[20px_minmax(80px,1.5fr)_45px_28px_65px_40px_55px]
                sm:grid-cols-[0.5fr_2fr_1.3fr_0.8fr_2fr_1fr_1.4fr]
                items-center
                justify-items-center
                gap-1
                sm:gap-2
                py-4
                px-2
                sm:px-6
                border-b border-gray-200
                text-gray-500
                hover:bg-amber-50
              "
            >
              {/* Number */}
              <p className="text-xs sm:text-sm text-center">{index + 1}</p>

              {/* Patient */}
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  min-w-0
                  w-full
                "
              >
                <img
                  className="
                    w-8 h-8
                    sm:w-10 sm:h-10
                    rounded-full
                    object-cover
                    flex-shrink-0
                  "
                  src={item.userData.image}
                  alt="Patient"
                />

                <p
                  className="
                    text-[9px]
                    sm:text-sm
                    truncate
                    max-w-[80px]
                    sm:max-w-none
                  "
                >
                  {item.userData.name}
                </p>
              </div>

              {/* Payment */}
              <div className="text-[9px] sm:text-sm text-center">
                <p>{item.payment ? "Online" : "Cash"}</p>
              </div>

              {/* Age */}
              <p className="text-[9px] sm:text-sm text-center">
                {calculateAge(item.userData.dob)}
              </p>

              {/* Date & Time */}
              <p className="text-[9px] sm:text-sm leading-tight text-center">
                <span className="block">{slotDateFormat(item.slotDate)}</span>

                <span className="block">{item.slotTime}</span>
              </p>

              {/* Fees */}
              <p
                className="
                  text-[9px]
                  sm:text-sm
                  text-center
                  whitespace-nowrap
                "
              >
                {currency}
                {item.amount}
              </p>

              {/* Action */}
              {item.cancelled ? (
                <p
                  className="
                    text-red-400
                    text-[9px]
                    sm:text-xs
                    font-medium
                    text-center
                  "
                >
                  Cancelled
                </p>
              ) : item.isCompleted ? (
                <p
                  className="
                    text-green-500
                    text-[9px]
                    sm:text-xs
                    font-medium
                    text-center
                  "
                >
                  Completed
                </p>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {/* Cancel Button */}
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="
                      w-6 h-6
                      sm:w-12 sm:h-12
                      p-1
                      sm:p-2.5
                      cursor-pointer
                      rounded-full
                      sm:rounded-xl
                      border
                      sm:border-2
                      border-red-200
                      bg-red-50
                      hover:bg-red-100
                      hover:scale-105
                      transition-all
                      duration-200
                    "
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />

                  {/* Complete Button */}
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="
                      w-6 h-6
                      sm:w-12 sm:h-12
                      p-1
                      sm:p-2.5
                      cursor-pointer
                      rounded-full
                      sm:rounded-xl
                      border
                      sm:border-2
                      border-green-200
                      bg-green-50
                      hover:bg-green-100
                      hover:scale-105
                      transition-all
                      duration-200
                    "
                    src={assets.tick_icon}
                    alt="Complete"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorAppointments;
