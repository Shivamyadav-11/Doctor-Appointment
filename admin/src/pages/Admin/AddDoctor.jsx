import { toast } from "react-toastify";
import { assets } from "../../assets/assets_admin/assets";
import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const { backendUrl, aToken } = useContext(AdminContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image is not selected");
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("fees", Number(fees));
      formData.append(
        "address",
        JSON.stringify({
          line1: address1,
          line2: address2,
        }),
      );
      formData.append("image", docImg);
      //   console log formdata
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: {
            aToken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setAddress1("");
        setAddress2("");
        setFees("");
        setAbout("");
        setDegree("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border border-gray-200 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        {/* Doctor Image */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload doctor"
            />
          </label>

          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            accept="image/*"
            hidden
          />

          <p>
            Upload doctor <br />
            picture
          </p>
        </div>

        {/* Left + Right Columns */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* Left Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {/* Doctor Name */}
            <div className="flex flex-col gap-1">
              <p>Doctor Name</p>

              <input
                className="border border-gray-200 rounded px-3 py-2 outline-primary"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Doctor Email */}
            <div className="flex flex-col gap-1">
              <p>Doctor Email</p>

              <input
                className="border border-gray-200 rounded px-3 py-2 outline-primary"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Doctor Password */}
            <div className="flex flex-col gap-1">
              <p>Doctor Password</p>

              <input
                className="border border-gray-200 rounded px-3 py-2 outline-primary"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-1">
              <p>Experience</p>

              <select
                className="border border-gray-200 rounded px-3 py-2 outline-primary"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            {/* Fees */}
            <div className="flex flex-col gap-1">
              <p>Fees</p>

              <input
                className="border border-gray-200 rounded px-3 py-2 outline-primary"
                type="number"
                placeholder="Fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {/* Speciality */}
            <div className="flex flex-col gap-1">
              <p>Speciality</p>

              <select
                className="border border-gray-200 rounded px-3 py-2 outline-primary"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            {/* Education */}
            <div className="flex flex-col gap-1">
              <p>Education</p>

              <input
                className="border border-gray-200 rounded px-3 py-2 outline-primary"
                type="text"
                placeholder="Education"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1">
              <p>Address</p>

              <input
                className="border border-gray-200 rounded px-3 py-2 outline-primary"
                type="text"
                placeholder="Address 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />

              <input
                className="border border-gray-200 rounded px-3 py-2 outline-primary"
                type="text"
                placeholder="Address 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="mt-4 flex flex-col gap-1 text-gray-600">
          <p>About Doctor</p>

          <textarea
            className="w-full border border-gray-200 rounded px-4 pt-2 outline-primary"
            placeholder="Write about doctor"
            rows={5}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white px-10 py-3 rounded-full mt-4"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
