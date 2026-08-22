import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();

  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Get doctor information
  const fetchDocInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  };

  // Generate available appointment slots
  const getAvailableSlots = () => {
    if (!docInfo) return;

    setDocSlots([]);
    setSlotIndex(0);
    setSlotTime("");

    const today = new Date();
    const allSlots = [];

    let i = 0;

    // Generate 7 available days
    while (allSlots.length < 7) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // Start time
      if (i === 0) {
        const currentHour = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();

        if (currentHour < 10) {
          currentDate.setHours(10, 0, 0, 0);
        } else if (currentMinutes <= 30) {
          currentDate.setHours(currentHour, 30, 0, 0);
        } else {
          currentDate.setHours(currentHour + 1, 0, 0, 0);
        }
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);

      const timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        // Must match backend format
        const slotDate = `${day}_${month}_${year}`;

        const bookedSlots = docInfo.slots_booked?.[slotDate] || [];

        const isSlotAvailable = !bookedSlots.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // Next slot after 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Add only if at least one slot is available
      if (timeSlots.length > 0) {
        allSlots.push(timeSlots);
      }

      // Move to next calendar day
      i++;
    }

    setDocSlots(allSlots);
  };

  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      navigate("/login");
      return;
    }

    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    if (!docSlots[slotIndex] || !docSlots[slotIndex][0]) {
      toast.warn("Please select a date");
      return;
    }

    try {
      const date = docSlots[slotIndex][0].datetime;

      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: {
            token,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        await getDoctorsData();

        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch doctor information
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  // Generate slots after doctor info is available
  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* Doctor Name */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}

              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>

            {/* Degree + Speciality */}
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>

              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/* About Doctor */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About
                <img src={assets.info_icon} alt="Info" />
              </p>

              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            {/* Appointment Fee */}
            <p className="text-gray-500 font-medium mt-2">
              Appointment fee:
              <span className="ml-1">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-[400px] sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>

          {/* Available Days */}
          <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2">
            {docSlots.map((item, index) => {
              const date = item[0]?.datetime;

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime("");
                  }}
                  className={`text-center py-6 min-w-16 px-2 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                >
                  <p>{date && daysOfWeek[date.getDay()]}</p>

                  <p>{date && date.getDate()}</p>
                </div>
              );
            })}
          </div>

          {/* Time Slots */}
          <div className="flex items-center gap-3 w-full overflow-x-auto pt-3 pb-2">
            {docSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-primary text-white"
                    : "text-gray-400 border border-gray-300"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          {/* Book Appointment */}
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
