import React from "react";
import FileUploader from "../components/FileUploader";

import { useStateContext } from "../contexts/ContextProvider";

const PopupForm = ({ onClose, formType }) => {
  const { currentColor } = useStateContext();
  return (
    <div className="bg-white mt-10 px-10 py-10 w-[93%] md:ms-10 rounded-3xl border-2 border-gray-200 mx-2">
      <p className="font-medium text-xl text-gray-500">
        Welcome.  Please enter your details.
      </p>
      <div className="mt-5">
        {formType === 'new' ? (
          <>
            <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
              <div>
                <label htmlFor="name" className="text-lg font-medium">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="name"
                  placeholder="Enter Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-lg font-medium">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="email"
                  placeholder="Enter Your Email"
                />
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
              <div>
                <label htmlFor="phone" className="text-lg font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="phone"
                  placeholder="Enter Your Phone"
                />
              </div>
              <div>
                <label htmlFor="address" className="text-lg font-medium">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="address"
                  placeholder="Enter Your Address"
                />
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
              <div>
                <label htmlFor="dob" className="text-lg font-medium">
                  D.O.B
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="dob"
                  placeholder="Enter Your D.O.B"
                />
              </div>
              <div>
                <label htmlFor="orderid" className="text-lg font-medium">
                  Order ID
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="orderid"
                  placeholder="Enter Your Order ID"
                />
              </div>
              
            </div>
            <div className="mt-8">
              <label htmlFor="description" className="text-lg font-medium">
                Description
              </label>
              <textarea
                id="description"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Type Your text Here.."
              />
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 justify-between items-center">
              <div>
                <label htmlFor="orderid" className="text-lg font-medium">
                  Order Id
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="orderid"
                  placeholder="Enter Your Order Id"
                />
              </div>
              
              <div>
                <label htmlFor="lastLogin" className="text-lg font-medium">
                  Last Login
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="lastLogin"
                  placeholder="Enter Last Login "
                />
              </div>
            </div>
            <div className="mt-8">
              <label htmlFor="description" className="text-lg font-medium">
                Description
              </label>
              <textarea
                id="description"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Type Your text Here.."
              />
            </div>
          </>
        )}

        <FileUploader />

        <div className="mt-8 flex items-center flex-col gap-y-4 md:me-8">
          <button className="w-32 md:w-60 items-center text-white text-lg font-bold py-3 rounded-xl active:scale-[0.98] transition-all active:duration-100 hover:scale-[1.01] ease-in-out" style={{ backgroundColor: currentColor }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;