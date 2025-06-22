import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="flex flex-col w-full px-5 py-6 text-white gap-y-3 bg-gradient-to-r from-cyan-500 to-blue-600 md:px-5 lg:px-25 ">
        <div className="flex flex-col md:flex-row md:justify-between gap-y-4">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold">Weather</h1>
            <p className="pl-1.5 text-sm md:text-base text-neutral-200 w-3/4 md:w-1/2">
              Stay updated with the latest weather information.
            </p>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <h1 className="text-lg font-bold">Contact Us</h1>
            <ul className="flex flex-col gap-y-0.5 pl-1.5">
              <li className="text-sm md:text-base text-neutral-100">
                Email:{" "}
                <span className="text-xs md:text-sm text-neutral-100">
                  contact@weather.com
                </span>
              </li>
              <li className="text-sm md:text-base text-neutral-100">
                Phone:{" "}
                <span className="text-xs md:text-sm text-neutral-100">
                  +966 123 456 7890
                </span>
              </li>
              <li className="text-sm md:text-base text-neutral-100">
                Address:{" "}
                <span className="text-xs md:text-sm text-neutral-100">
                  123 King Fahd Road, Riyadh, Saudi Arabia
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center w-full md:justify-end gap-x-4 ">
          <FaFacebook className="text-2xl transition duration-200 cursor-pointer hover:text-white text-neutral-200 hover:scale-105" />
          <FaXTwitter className="text-2xl transition duration-200 cursor-pointer hover:text-white text-neutral-200 hover:scale-105" />
          <FaInstagram className="text-2xl transition duration-200 cursor-pointer hover:text-white text-neutral-200 hover:scale-105" />
          <FaLinkedin className="text-2xl transition duration-200 cursor-pointer hover:text-white text-neutral-200 hover:scale-105" />
          <FaDiscord className="text-2xl transition duration-200 cursor-pointer hover:text-white text-neutral-200 hover:scale-105" />
          <FaGithub className="text-2xl transition duration-200 cursor-pointer hover:text-white text-neutral-200 hover:scale-105" />
        </div>
        <div className="text-center text-white ">
          <p className="text-xs md:text-sm text-neutral-200">
            © 2025 Weather. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
