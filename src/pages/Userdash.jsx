import React, { useState, useEffect } from "react";

import PopupForm from "../components/PopupForm";

import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "../components";

import { useStateContext } from "../contexts/ContextProvider";

import { FaUserCircle } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";

const Userdash = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState("new"); // Track the form type: 'new' or 'repeated'

  const openForm = (type) => {
    setFormType(type);
    setIsFormOpen(true);
  };
  return (
    <>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-10 bottom-28" style={{ zIndex: "10" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>

            <div className="grid grid-cols-1 mx-2 gap-2 mt-16 md:grid-cols-3 md:mt-4">
              <div className="...">
                <div className="bg-white dark:text-gray-200 shadow-md dark:bg-secondary-dark-bg h-34 rounded-xl w-full lg:w-80 p-8 pt-9 m-1 md:mx-10 bg-hero-pattern bg-no-repeat bg-cover bg-center">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className=" text-black font-semibold text-xl">
                        Total User's
                      </p>
                      <p className="text-lg text-slate-500">53476</p>
                    </div>
                    <button
                      type="button"
                      style={{
                        backgroundColor: currentColor,
                        height: "4rem",
                        width: "4rem",
                      }}
                      className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-5"
                    >
                      <FaUserCircle />
                    </button>
                  </div>
                </div>
              </div>

              <div className="..." onClick={() => openForm("new")}>
                <div className="p-7 max-w-sm mx-auto bg-white rounded-lg shadow-md flex items-center space-x-10 md:me-8">
                  <button
                    type="button"
                    style={{
                      backgroundColor: currentColor,
                      height: "4rem",
                      width: "4rem",
                    }}
                    className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-5"
                  >
                    <FaUserTag />
                  </button>
                  <div>
                    <div className="text-xl font-semibold text-black">
                      New User
                    </div>
                    <p className="text-slate-500">
                      Explore Now What's New and Exciting on SKK.
                    </p>
                  </div>
                </div>
              </div>

              <div className="..." onClick={() => openForm("repeated")}>
                <div className="p-7 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-10 md:me-8">
                  <button
                    type="button"
                    style={{
                      backgroundColor: currentColor,
                      height: "4rem",
                      width: "4rem",
                    }}
                    className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-5"
                  >
                    <FaRepeat />
                  </button>

                  <div>
                    <div className="text-xl font-semibold text-black">
                      Repeated User
                    </div>
                    <p className="text-slate-500">
                      Welcome Back! Check Out What's New on SKK.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {isFormOpen && (
              <PopupForm
                onClose={() => setIsFormOpen(false)}
                formType={formType}
              />
            )}

            {!isFormOpen && (
              <center>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="gray"
                  className="w-60 h-60 mt-20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>

                <h1 className="text-xl text-slate-400 capitalize text-center">
                  No Data Available
                </h1>
              </center>
            )}
            {themeSettings && <ThemeSettings />}

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Userdash;
