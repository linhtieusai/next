'use client'

import {  useEffect } from 'react';
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
// import { FaArrowLeft } from "react-icons/fa";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import  GoogleSignIn  from '../GoogleSignin';



const ApplyButton = ({jobId, presubmitInfo, isModalOpening, closeModalCallBack}) => {

  const [isModalOpen, setIsModalOpen] = useState(isModalOpening);
  
  const [isSelectCandidateOpen, setIsSelectCandidateOpen] = useState(false);
  const [isSecondStep, setIsSecondStep] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [candidateId, setCandidateId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  const [pdfFile, setPdfFile] = useState<File | "">("")
  const { data: session } = useSession();
  const [resumeSubmitting, setResumeSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeUploading, setResumeUploading] = useState(false);
  const [hashedResumeName, setHashedResumeName] = useState("");
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [latestCandidateList, setLatestCandidateList] = useState<any[]>(false);

  useEffect(() => {
    setIsModalOpen(isModalOpening);
  }, [isModalOpening]);

  useEffect(() => {
    if(isSelectCandidateOpen) {
      
    }
  }, [isSelectCandidateOpen]);

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const handleGoogleSignIn = async (credential) => {
    setIsSecondStep(true);
  };

  const selectFromDraft = (draftApplication) => {
    setResumeUrl(`/api/viewResume?id=${draftApplication.candidate.hashed_resume_name}`);
    setFormFromApplicationData(draftApplication);
  }

  const setFormFromApplicationData = (application) => {
    setApplicationId(application.id);
    setName(application.candidate.name);
    setEmail(application.candidate.email);
    setTel(application.candidate.tel);
  }

  const handleBackClick = () => {
    console.log("BackClick");
    closeModalCallBack();
    setIsSecondStep(false);

    console.log(timer);
    clearTimeout(timer);
  };

  const handleCandidateSelectBack = () => {
    setIsSelectCandidateOpen(false);
  }

  const handleCandidateSelectButton = () => {
    setIsSelectCandidateOpen(true);
  }

  const  handleFirstStepSubmit = async (event) => {

    if(!isSecondStep) {
      setIsSecondStep(true);
    }
    setResumeUploading(true);
    clearTimeout(timer);
    setSubmitSuccess(false);

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const resumeUrl = reader.result as string;
      setResumeUrl(resumeUrl);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("resume", event.target.files[0] ?? "");
    if(isSecondStep) {
      formData.append("hashedResumeName", hashedResumeName);
    }

    formData.append("jobId", jobId);

    try {
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      if (response.status === 201) {
        //setResumeUrl(response.hashedResumeName);
        setResumeUploading(false);
        const data = await response.json();
        console.log(data);
        setHashedResumeName(data.hashedResumeName);
        setApplicationId(data.applicationId);
        setCandidateId(data.candidateId);
        setErrorMessage("");

      } else {
        const data = await response.json();
        throw(data.message);
      }
    } catch (error) {
      setResumeUploading(false);
      setErrorMessage("Error: " + error ?? "An error occurred. Please try again later.");
      // setresumeUploading(false);
      // setCsvErrorMessage("Error: " + error ?? "An error occurred. Please try again later.");
      // setTimeout(() => {
      //   setErrorMessage("");
      //   closeModalCallBack();

      // }, 3000);
    }
  };

  function resetForm() {
    setName("");
    setEmail("");
    setTel("");
  }

  const handleFileUpload = (event) =>{
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const resumeUrl = reader.result as string
      // setResume(resumeUrl);
      setPdfFile(event?.target?.files?.[0] ?? "");
    };
    reader.readAsDataURL(file);
  }

  const handleInputBlur = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("tel", tel);

    formData.append("hashedResumeName", hashedResumeName);
    formData.append('jobId', jobId );
    formData.append('applicationId', applicationId );
    formData.append('candidateId', candidateId );


    try {
      const response = await fetch("/api/update-resume", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      if (response.status === 201) {
        // setResumeSubmitting(false);
        // setSubmitSuccess(true);
        // setIsApplied(true);
        // resetForm();

        // const timer = setTimeout(() => {
        //     setIsModalOpen(false);
        //     setIsSecondStep(false);
        //     closeModalCallBack();
        //     setSubmitSuccess(false);
        //   }, 10000);

        //   setTimer(timer);

      } else {
        // const data = await response.json();
        // throw(data.message);
      }
    } catch (error) {
      // setResumeSubmitting(false);
      
      // setErrorMessage("Error: " + error ?? "An error occurred. Please try again later.");
      // const timer = setTimeout(() => {
      //   setErrorMessage("");
      //   closeModalCallBack();

      // }, 10000);

      // setTimer(timer);
    }
  }

  const handleFormSubmit = async (e) => {
    setResumeSubmitting(true);

    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("tel", tel);

    formData.append("hashedResumeName", hashedResumeName);
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
        resetForm();

        const timer = setTimeout(() => {
            setIsModalOpen(false);
            setIsSecondStep(false);
            closeModalCallBack();
            setSubmitSuccess(false);
          }, 10000);

          setTimer(timer);

      } else {
        const data = await response.json();
        throw(data.message);
      }
    } catch (error) {
      setResumeSubmitting(false);
      
      setErrorMessage("Error: " + error ?? "An error occurred. Please try again later.");
      const timer = setTimeout(() => {
        setErrorMessage("");
        closeModalCallBack();

      }, 10000);

      setTimer(timer);
    }
  };

  // useEffect(() => {
  //     if(!isModalOpen) {

  //     }
  // }, [isModelOpen]);

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
              <div className="flex min-w-1/3 flex-col items-center text-sm">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full px-5 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                Click to <span className="font-semibold">upload</span> Resume
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">PDF Only (Max 10MB)</p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" accept=".pdf"
                             onChange={handleFirstStepSubmit}/>
                      </label>
                  </div> 
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
              <div className='flex-row sm:flex overflow-auto max-h-[90vh]'>
                <div className='flex-row'>
                  <div className="flex-col items-center justify-center w-full mb-2 mr-2">
                      <label htmlFor="dropzone-file" className="mb-5 flex flex-col items-center justify-center w-full px-5 border-2 border-gray-300 border-dashed rounded-lg 
                      cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100
                       dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex items-center justify-center py-2 space-x-2">
                              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                              </svg>
                              <div>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  {resumeUrl ? (
                                    <>
                                      Choose <span className="font-semibold">other candidate</span>
                                    </>
                                  ) : (
                                    <>
                                    Click to <span className="font-semibold">upload</span> Resume
                                    </>
                                  )}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PDF Only (Max 10MB)</p>
                              </div>
                              
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" accept=".pdf" onChange={handleFirstStepSubmit}/>
                      </label>
                      {presubmitInfo.draftApplication && (
                        <label className=" mb-5 flex flex-col items-center justify-center w-full px-5 border-2 border-gray-300 border-dashed rounded-lg 
                          cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100
                          dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" onClick={() => selectFromDraft(presubmitInfo.draftApplication)}>
                          <div className="flex items-center justify-center py-2 space-x-2">
                              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                              </svg>
                              <div>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  continue pending candidate:
                                </p>
                                {presubmitInfo.draftApplication.name && (
                                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400">{presubmitInfo.draftApplication.name}</p>
                                )}
                              </div>
                              
                          </div>
                      </label>
                      )}
                      {presubmitInfo.latestApplication && (
                      <label className="flex flex-col items-center justify-center w-full px-5 border-2 border-gray-300 border-dashed rounded-lg 
                      cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100
                       dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" onClick={handleCandidateSelectButton}>
                          <div className="flex items-center justify-center py-2 space-x-2">
                              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                              </svg>
                              <div>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  Select from your candidate:
                                </p>
                              </div>
                          </div>
                      </label>
                      )}
                  </div> 
                </div>
                {resumeUrl && (
                  <iframe src={resumeUrl} frame-title="resume pdf" scrolling="no" className='max-w-[600px] min-w-[400px] h-[50vh] overflow-hidden'></iframe>
                )}
                <div className=' flex-row w-full text-sm sm:w-2/3 p-4'>
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
                          onBlur={handleInputBlur}
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
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700">
                        Time available
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
                      <label htmlFor="name" className="block text-gray-700">
                        Expected Salary
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
                      <label htmlFor="name" className="block text-gray-700">
                        Note
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
                    <div className="flex justify-end sticky bottom-0 left-0">
                        {!submitSuccess  && (
                          <>
                            <button
                              type="button"
                              className="px-4 py-2 mr-2 text-gray-700 border bg-white border-gray-400 rounded-full hover:text-red-500 hover:border-red-500"
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

                    {(resumeUploading || !presubmitInfo) && (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                          <div className="absolute top-0 left-0 z-10 w-full h-full bg-black opacity-20"></div>
                          <div className="z-20">
                            <svg
                              className="w-8 h-8 mx-auto text-white animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      )}
                </div>

              </div>
              </form>
              </>
            )}
          </Modal>
        )}
      {isSelectCandidateOpen && (
        <Modal zIndex={6} onClose={handleCandidateSelectBack} showCloseButton>
          <div className="flex">
            {latestCandidateList && (
              <>
              ddsdsd
              </>
            )}
            {true && (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                          <div className="absolute top-0 left-0 z-10 w-full h-full bg-black opacity-20"></div>
                          <div className="z-20">
                            <svg
                              className="w-8 h-8 mx-auto text-white animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                  )}
            </div>
          
          </Modal>
        )}
      </>
      );
    };

    export default ApplyButton;