'use client'

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
// import { FaArrowLeft } from "react-icons/fa";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import  GoogleSignIn  from '../GoogleSignin';

const ApplyButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondStep, setIsSecondStep] = useState(false);
  const [name, setName] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  
  console.log("is Modal Open");
  console.log(isModalOpen);

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const handleGoogleSignIn = async (credential) => {

    try {
      const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ credential })
      });

      if (res.ok) {
          const user = await res.json();
          // do something with the user object, such as storing it in session storage
      } else {
          throw new Error('Failed to authenticate with Google');
      }
  } catch (error) {
      console.error(error);
  }
   
    setIsSecondStep(true);
  };

  const handleBackClick = () => {
    setIsModalOpen(false);
    setIsSecondStep(false);
  };

  const handleFirstStepSubmit = () => {
    setIsSecondStep(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("pdf", pdfFile);

    try {
      const response = await fetch("/api/submit-resume", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      if (response.ok) {
        alert("Submit Resume Success");
        setIsModalOpen(false);
        setIsSecondStep(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="sticky bottom-0 w-full p-4 bg-gray-100 border-t border-gray-200 ">
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600" onClick={handleApplyClick}>Apply</button>
        <button className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-600" onClick={() => window.history.back()}>Back</button>
      </div>
    </div>
      {isModalOpen && (
        <Modal onClose={handleBackClick} showCloseButton>
          {!isSecondStep && !session ? (
            <>
              <h2 className="mb-4 text-lg font-medium">Apply for this job</h2>
              <p className="mb-4 text-gray-600">
                You can submit your resume without registering or log in to your
                account to apply.
              </p>
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center justify-center">
                  <button
                    className="w-64 py-2 mr-2 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600"
                    onClick={handleFirstStepSubmit}
                    >
                    Submit Resume without Register
                  </button>
                </div>
                <hr className="w-full my-4"/>
                <div className="flex flex-col items-center justify-center">
                  <span className="mb-4 font-bold text-gray-500">OR SIGN IN WITH SOCIAL</span>
                  <GoogleSignIn onSuccess={handleGoogleSignIn} />
                  <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google Logo"
                      className="w-5 h-5"
                    />
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
            <form onSubmit={handleFormSubmit}>
              <h2 className="mb-4 text-lg font-medium">
                Submit your resume with your account
              </h2>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="pdf" className="block text-gray-700">
                    Resume (PDF only)
                  </label>
                  <input
                    type="file"
                    id="pdf"
                    name="pdf"
                    accept=".pdf"
                    onChange={(e) => setPdfFile(e?.target?.files?.[0])}
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="w-24 py-2 mr-2 text-gray-700 border border-gray-400 rounded-full hover:bg-gray-200"
                    onClick={handleBackClick}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-24 py-2 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600"
                  >
                    Submit Resume
                  </button>
                </div>
              </form>
              </>
            )}
          </Modal>
        )}
      </>
      );
    };

    export default ApplyButton;