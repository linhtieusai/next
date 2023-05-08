'use client'

import {  useEffect } from 'react';
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
// import { FaArrowLeft } from "react-icons/fa";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import  GoogleSignIn  from '../GoogleSignin';

const ApplyButton = ({jobId, isModalOpening, closeModalCallBack}) => {
  const [isModalOpen, setIsModalOpen] = useState(isModalOpening);
  const [isSecondStep, setIsSecondStep] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  const [pdfFile, setPdfFile] = useState<File | "">("")
  const { data: session } = useSession();
  const [resumeSubmitting, setResumeSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resume, setResume] = useState(null);

  useEffect(() => {
    setIsModalOpen(isModalOpening);
  }, [isModalOpening]);

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const handleGoogleSignIn = async (credential) => {
    setIsSecondStep(true);
  };

  const handleBackClick = () => {
    closeModalCallBack();
    setIsSecondStep(false);
  };

  const handleFirstStepSubmit = () => {
    setIsSecondStep(true);
  };

  function resetForm() {
    setName("");
    setEmail("");
    setTel("");
  }


  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        const resumeData = reader.result;
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        const matchedEmail = resumeData.match(emailRegex);
        console.log(resumeData);
        if (matchedEmail && matchedEmail.length > 0) {

          setEmail(matchedEmail[0]);
        }

        setResume(resumeData);
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsDataURL(file);
    }
  }
  // const handleFileUpload = (event) =>{

  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setResume(reader.result);
  //     setPdfFile(event?.target?.files?.[0] ?? "");
  //   };
  //   reader.readAsDataURL(file);
  // }

  const handleFormSubmit = async (e) => {
    setResumeSubmitting(true);

    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("tel", tel);

    formData.append("resume", pdfFile ?? "");
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
          closeModalCallBack();
          setSubmitSuccess(false);
          resetForm();

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
        closeModalCallBack();

      }, 30000);
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={handleBackClick} showCloseButton>
          {!isSecondStep && !session ? (
            <>
              <h2 className="mb-4 text-lg font-medium">Apply for this job</h2>
              <p className="mb-4 text-sm text-gray-600">
                You can submit your resume without registering
              </p>
              <div className="flex min-w-1/3 flex-col items-center">
                <div className="flex flex-col items-center justify-center">
                  <button
                    className="w-64 py-2 mr-2 text-white bg-green-700 rounded-full shadow-lg hover:bg-green-600"
                    onClick={handleFirstStepSubmit}
                    >
                    Choose Resume
                  </button>
                </div>
                <hr className="w-full my-4"/>
                <div className="flex flex-col items-center justify-center">
                  <span className="mb-4 font-bold text-gray-500">OR SIGN IN WITH SOCIAL</span>
                  <p className="mb-4 text-sm text-gray-600">
                    Signin to save view history and job applications.
                  </p>
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
              <div className='flex-row sm:flex'>
                <div className='flex-row'>
                  <div className="mb-4">
                    <label htmlFor="pdf" className="block text-gray-700 text-sm">
                      Choose Resume (PDF only)
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  {resume && <embed src={resume} className='w-full min-w-[400px] h-[50vh]' />}
                </div>
                <div className='flex-row w-full sm:w-2/3 p-4'>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700">
                        Email
                      </label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                    </div>
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
                              className="px-4 py-2 mr-2 text-gray-700 border border-gray-400 rounded-full hover:bg-gray-200"
                              onClick={handleBackClick}
                            >
                              Cancel
                            </button>
                            <button
                                type="submit"
                                className={`flex px-4 py-2 items-center text-white bg-green-600 rounded-full shadow-lg 
                                ${resumeSubmitting ? '' : 'hover:bg-green-500'}
                                ${resumeSubmitting ? "bg-gray-200 cursor-not-allowed" : "bg-green-500"}`}
                                disabled={resumeSubmitting}
                              >
                              {resumeSubmitting && 
                              <>
                                <svg className="h-4 w-4 animate-spin mr-4" viewBox="3 3 18 18">
                                    <path
                                      className="fill-green-800"
                                      d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
                                    <path
                                      className="fill-blue-100"
                                      d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                                  </svg>
                              </>
                              }
                              {resumeSubmitting ? "Submitting..." : "Submit Resume"}
                              
                            </button>
                            </>
                        )}
                      
                      {submitSuccess && (
                          <div className={`z-50 top-0 left-0 w-full flex items-center justify-center`}>
                          <div className="p-8 text-white bg-green-600 rounded-lg shadow-lg">
                            <div className="text-xl font-bold">Your resume has been successfully submitted!</div>
                          </div>
                          </div>
                        )}
                    </div>
                </div>

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