import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfiledata, getProfileData, backendUrl } =
    useContext(DoctorContext);

  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  // Separate state for editing
  const [editData, setEditData] = useState({
    fees: "",
    line1: "",
    line2: "",
    available: false,
  });

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  // Edit button
  const handleEdit = () => {
    setEditData({
      fees: String(profileData.fees ?? ""),
      line1: String(profileData.address?.line1 ?? ""),
      line2: String(profileData.address?.line2 ?? ""),
      available: Boolean(profileData.available),
    });

    setIsEdit(true);
  };

  // Save profile
  const updateProfile = async () => {
    try {
      const updateData = {
        address: {
          line1: editData.line1,
          line2: editData.line2,
        },
        fees: editData.fees,
        available: editData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        {
          headers: {
            dToken: dToken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        // Update frontend state
        setProfiledata((prev) => ({
          ...prev,
          fees: editData.fees,
          address: {
            ...prev.address,
            line1: editData.line1,
            line2: editData.line2,
          },
          available: editData.available,
        }));

        setIsEdit(false);

        // Get latest data from backend
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEdit(false);
  };

  if (!profileData) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-5 m-2 sm:m-5">
        {/* Doctor Image */}
        <div className="w-full lg:w-auto">
          <img
            className="bg-primary/80 w-full sm:w-64 lg:w-72 rounded-lg object-cover"
            src={profileData.image}
            alt="Doctor"
          />
        </div>

        {/* Doctor Information */}
        <div className="flex-1 border border-gray-200 rounded-lg p-5 sm:p-8 bg-white">
          {/* Name */}
          <p className="text-2xl sm:text-3xl font-medium text-gray-700">
            {profileData.name}
          </p>

          {/* Degree + Speciality + Experience */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-600">
            <p>
              {profileData.degree} - {profileData.speciality}
            </p>

            <span className="py-1 px-3 border border-gray-300 text-xs rounded-full">
              {profileData.experience}
            </span>
          </div>

          {/* About */}
          <div className="mt-4">
            <p className="text-sm font-medium text-neutral-800">About</p>

            <p className="text-sm text-gray-600 max-w-[700px] mt-1 leading-6">
              {profileData.about}
            </p>
          </div>

          {/* Appointment Fee */}
          <div className="mt-5">
            <p className="text-gray-600 font-medium mb-2">Appointment Fee:</p>

            {isEdit ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-800">{currency}</span>

                <input
                  type="number"
                  value={editData.fees}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  className="w-28 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-primary"
                />
              </div>
            ) : (
              <span className="text-gray-800">
                {currency} {profileData.fees}
              </span>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <p className="font-medium text-gray-600">Address:</p>

            <div className="flex flex-col gap-2 w-full max-w-[500px]">
              {isEdit ? (
                <>
                  {/* Address Line 1 */}
                  <input
                    type="text"
                    value={editData.line1}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        line1: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-primary"
                    placeholder="Address line 1"
                  />

                  {/* Address Line 2 */}
                  <input
                    type="text"
                    value={editData.line2}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        line2: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-primary"
                    placeholder="Address line 2"
                  />
                </>
              ) : (
                <p className="text-sm text-gray-600">
                  {profileData.address?.line1}
                  <br />
                  {profileData.address?.line2}
                </p>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 pt-5">
            <input
              type="checkbox"
              checked={isEdit ? editData.available : profileData.available}
              disabled={!isEdit}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  available: e.target.checked,
                }))
              }
              className="w-4 h-4 cursor-pointer"
            />

            <label className="text-sm text-gray-600">Available</label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            {!isEdit ? (
              <button
                type="button"
                onClick={handleEdit}
                className="px-5 py-2 border border-primary text-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={updateProfile}
                  className="px-5 py-2 bg-primary text-white text-sm rounded-full hover:opacity-90 transition-all"
                >
                  Save Information
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2 border border-gray-300 text-gray-600 text-sm rounded-full hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
