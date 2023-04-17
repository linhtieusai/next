'use client'

import {  useEffect } from 'react';
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
// import { FaArrowLeft } from "react-icons/fa";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import  GoogleSignIn  from '../GoogleSignin';

const ApplyButton = ({jobId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondStep, setIsSecondStep] = useState(false);
  const [name, setName] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const { data: session } = useSession();
  const [resumeSubmitting, setResumeSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  console.log(jobId);
  

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const handleGoogleSignIn = async (credential) => {
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
    setResumeSubmitting(true);

    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("resume", pdfFile);
    formData.append('jobId', jobId );

    try {
      const response = await fetch("/api/submit-resume", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      if (response.status === 201) {
        setResumeSubmitting(false);
        setSubmitSuccess(true);
        setIsApplied(true);
        
        setTimeout(() => {
          setIsModalOpen(false);
          setIsSecondStep(false);
        }, 3000);
        
        
      } else {
        const data = await response.json();
        throw(data.message);
      }
    } catch (error) {
      setResumeSubmitting(false);
      setErrorMessage("Error: " + error ?? "An error occurred. Please try again later.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  return (
    <>
    <div className="sticky bottom-0 w-full p-4 bg-gray-100 border-t border-gray-200 ">
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600" onClick={handleApplyClick} disabled={isApplied}>{isApplied ? "Applied" : "Apply"}</button>
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
                </div>
              </div>
            </>
          ) : (
            <>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
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
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    onChange={(e) => setPdfFile(e?.target?.files?.[0])}
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  {errorMessage && (
                      <div className="w-full p-2 mb-4 overflow-y-auto text-white bg-red-500 rounded-lg max-h-200">
                        {errorMessage}
                      </div>
                    )}
                </div>
                <div className="flex justify-end">
                   
                    {!submitSuccess  && (
                      <>
                        <button
                          type="button"
                          className="w-24 py-2 mr-2 text-gray-700 border border-gray-400 rounded-full hover:bg-gray-200"
                          onClick={handleBackClick}
                        >
                          Cancel
                        </button>
                        <button
                            type="submit"
                            className={`w-24 py-2 text-white rounded-full shadow-lg 
                            ${resumeSubmitting ? '' : 'hover:bg-blue-600'}
                            ${resumeSubmitting ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500"}`}
                            disabled={resumeSubmitting}
                          >
                          {resumeSubmitting ? "Submitting" : "Submit Resume"}
                          {resumeSubmitting && <span className="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        </button>
                        </>
                    )}
                  
                  {submitSuccess && (
                      <div className={`z-50 top-0 left-0 w-full flex items-center justify-center`}>
                      <div className="p-8 text-white bg-green-500 rounded-lg shadow-lg">
                        <div className="text-xl font-bold">Your resume has been successfully submitted!</div>
                      </div>
                      </div>
                    )}
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