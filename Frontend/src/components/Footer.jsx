import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">

      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* Left Section */}
        <div>
          <img
            className="mb-5 w-40"
            src={assets.logo}
            alt="Error"
          />

          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Experience a smarter and easier way to manage your healthcare
            with our trusted doctor appointment platform. Discover experienced
            doctors, explore different medical specialities, and book
            appointments quickly and conveniently. We bring reliable healthcare
            services closer to you with a simple, user-friendly, and
            hassle-free experience.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-xl font-medium mb-5 text-gray-800">
            Company
          </p>

          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="hover:text-primary cursor-pointer transition-all">
              Home
            </li>
            <li className="hover:text-primary cursor-pointer transition-all">
              About
            </li>
            <li className="hover:text-primary cursor-pointer transition-all">
              Contact
            </li>
            <li className="hover:text-primary cursor-pointer transition-all">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5 text-gray-800">
            GET IN TOUCH
          </p>

          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="hover:text-primary cursor-pointer transition-all">
              +1 443-422-5456
            </li>

            <li className="hover:text-primary cursor-pointer transition-all">
              Washington@gmail.com
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500">

        <hr className="border-gray-200" />

        <p className="py-5">
          Copyright 2026 © Prescripto - All Rights Reserved.
        </p>

      </div>

    </div>
  );
};

export default Footer;