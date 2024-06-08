import React, { useState, useEffect } from "react";
import NewUserForm from "../components/NewUserForm";
import RepeatedUserForm from "../components/RepeatedUserForm";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, ThemeSettings } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { FaUserCircle } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
import UserSideBar from "../components/UserSideBar";
import LeadForm from "../components/LeadForm";

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

  // State to manage which form to display
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  });

  const handleFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
    // Add any additional logic here, e.g., updating state or making API calls
    setSelectedForm(null); // Close the form after submission
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
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <UserSideBar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <UserSideBar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
                : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2"
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div className="grid grid-cols-1 mx-2 gap-2 mt-16 md:grid-cols-3 md:mt-4">
              <div
                className="bg-white dark:text-gray-200 shadow-md dark:bg-secondary-dark-bg h-34 rounded-xl w-full lg:w-80 p-8 pt-9 m-1 md:mx-10 bg-hero-pattern bg-no-repeat bg-cover bg-center cursor-pointer"
                onClick={() => setSelectedForm("leadGeneration")}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-black font-semibold text-xl">
                      Lead Generation
                    </p>
                    <p className="text-lg text-slate-500">
                      My Lead Generation
                    </p>
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

              <div
                className="p-7 max-w-sm mx-auto bg-white rounded-lg shadow-md flex items-center space-x-10 md:me-8 cursor-pointer"
                onClick={() => setSelectedForm("newUser")}
              >
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

              <div
                className="p-7 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-10 md:me-8 cursor-pointer"
                onClick={() => setSelectedForm("repeatedUser")}
              >
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

            {selectedForm === "leadGeneration" && <LeadForm />}
            {selectedForm === "newUser" && (
              <NewUserForm onFormSubmit={handleFormSubmit} onClose={() => setSelectedForm(null)} />
            )}
            {selectedForm === "repeatedUser" && <RepeatedUserForm />}

            {themeSettings && <ThemeSettings />}

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Userdash;
