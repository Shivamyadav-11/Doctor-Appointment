import { useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets.js";
import { DoctorContext } from "../context/DoctorContext.jsx";
const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return (
    <div className="min-h-screen bg-white border-r border-gray-300">
      {/* For the Admin */}
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="Error" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"/all-appointments"}
          >
            <img src={assets.appointment_icon} alt="Error" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} alt="Error" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} alt="Error" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}

      {/* For Doctor */}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"/doctor-dashboard"}
          >
            <img src={assets.home_icon} alt="Error" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"/doctor-appointments"}
          >
            <img src={assets.appointment_icon} alt="Error" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} alt="Error" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
