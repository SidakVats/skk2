import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

const FileUploader = ({ addImageFromProductVault }) => {
  const [files, setFiles] = useState([]);
  const { currentColor } = useStateContext();

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    const updatedFiles = await Promise.all(
      selectedFiles.map(async (file) => {
        // Resize each file individually
        const resizedFile = await resizeImage(file);

        return {
          file: resizedFile,
          sizeError: resizedFile.size > 2 * 1024 * 1024, // Check size after resizing
        };
      })
    );

    setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const maxWidth = 800; // Adjust as needed
          const maxHeight = 600; // Adjust as needed

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            resolve(
              new File([blob], file.name, {
                type: "image/jpeg", // Change the type if needed
                lastModified: Date.now(),
              })
            );
          }, "image/jpeg");
        };
      };

      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleAddImageFromVault = () => {
    if (typeof addImageFromProductVault === "function") {
      addImageFromProductVault();
    } else {
      console.error("addImageFromProductVault is not a function.");
      // Handle this scenario gracefully, such as showing a message or logging an error
    }
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium mt-8 leading-6 text-gray-900"
      ></label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          <div className="mt-4 flex text-sm leading-6 text-gray-600 ">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span style={{ color: currentColor }}>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                multiple
              />
            </label>
            <p className="pl-1 mx-3">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600 mt-1">
            PNG, JPG up to 2MB
          </p>
          <button
            className="mt-4 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
            onClick={handleAddImageFromVault}
          >
            Add Image from Product Vault
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((fileObj, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg border border-gray-300 shadow-sm p-4 flex items-center justify-between"
          >
            <span className="text-sm font-semibold">{fileObj.file.name}</span>
            <button
              className="ml-4 text-red-600 hover:text-red-800"
              onClick={() => handleRemoveFile(index)}
            >
              Remove
            </button>
            {fileObj.sizeError && (
              <p className="text-red-600 text-xs">
                File size exceeds 2MB limit.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
