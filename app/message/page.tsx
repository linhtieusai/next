
"use client"


import Image from 'next/image'
import styles from './page.module.css'
import Login from '../../components/Login'
import Script from 'next/script'
import MessageDetail  from '../../components/Message/MessageDetail'

import { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react'
// import MessageDetailSkeleton from '../../ui/rendering-message-detail-skeleton'
import JobListSkeleton from '../../ui/rendering-job-list-skeleton'
import JobDetailSkeleton from '../../ui/rendering-job-detail-skeleton'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Pagination from '../../components/Job/Pagination'
// import { MessageStatus } from '../../lib/const'

import MessageItem from '../../components/Message/MessageItem';


// localhost:3000

import { PrismaClient } from "@prisma/client";

async function getFirstPage(page) {
  const messages = await fetch(`http://localhost:3000/api/messages?page=${page}&itemsPerPage=10`, { cache: 'no-store' });
  return await messages.json();

  // const prisma = new PrismaClient();
  // const messages = await prisma.message.findMany({take: 10, skip: (page-1) * 10});

  // await prisma.$disconnect()
  // return await messages;
  

}

// import dynamic from 'next/dynamic'

// const ApplyScreen = dynamic(() => import('../../components/MessageDetail/ApplyScreen'), {
//   loading: () => <p>Loading...</p>,
// })



export default function SearchPage({ searchParams }) {


  const [selectedConversation, setSelectedConversation] = useState<any>(false);
  const [isModalOpening, setIsModalOpening] = useState(false);

  const [messageData, setMessageData] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>();

  const [showMessageList, setShowMessageList] = useState(true); 

  let page = searchParams.page;
  if(!page) page = 1;
  
  const messageListRef = useRef(null);

  const [ totalPages, setTotalPages ] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [isMoving, setIsMoving] = useState(false);

  const [isLoadingConversation, setIsLoadingConversation] = useState(false);

  const [conversations, setConversations] = useState<any[]>();
  const [conversationContents, setConversationContents] = useState<any[]>([]);

  const [statusCount, setStatusCount] = useState({});
  const [specificConversation, setSpecificConversation] = useState<any>(false);
  const [specificConversationMessage, setSpecificConversationMessage] = useState<any>(false);


  const pathname = usePathname();
  const isActive = (status = "0") => {
    console.log("status is");

    console.log(status);
    let filteredStatus = searchParams.status;
    if(!filteredStatus) filteredStatus = "0";
    console.log(filteredStatus);
    console.log(status);
    return filteredStatus === status ? 'bg-gray-100' : 'bg-white';
  };

  const pageChangeCallback = () => {
    setIsMoving(true);
  }
  const handleMessageItemClick = (conversation) => {
    let apiUrl;
    if(conversation.job_id) {
      apiUrl = `http://localhost:3000/api/messageContent?jobId=${conversation.job_id}`;
    }

    if(conversation.application_id) {
      apiUrl = `http://localhost:3000/api/messageContent?applicationId=${conversation.application_id}`;
    }

    setSelectedConversation(conversation);
    setShowMessageList(false);

    fetch(apiUrl)
      .then(response => response.json())
      .then(data =>  {
          setConversationContents(data.conversationContents);

          // if(page == 1 && data.specificConversation) {
          //   setSpecificConversation(data.specificConversation);
          //   setSpecificConversationMessage(data.specificConversationMessage);
          //   handleMessageItemClick(data.specificConversation);
          // } else {
          //   setSpecificConversation(false);
          // }
        }).catch(error => {
          console.error(error)
        });

    // if(page > 0) {
    //   fetch(apiUrl)
    //   .then(response => response.json())
    //   .then(data =>  {
    //       setConversations(data.conversations);

    //       if(page == 1 && data.specificConversation) {
    //         setSpecificConversation(data.specificConversation);
    //         setSpecificConversationMessage(data.specificConversationMessage);
    //         handleMessageItemClick(data.specificConversation);
    //       } else {
    //         setSpecificConversation(false);
    //       }
    //     }).catch(error => {
    //       console.error(error)
    //     });
    // }

   
  }

  const path = usePathname();
  const router = useRouter();
  
  function handleBackButton() {
    setSelectedConversation(null);
    setShowMessageList(true);
  }

  const callBackMethod = (totalPages, currentPage, statusCount) => {
    setTotalPages(totalPages);
    setCurrentPage(currentPage);
    setStatusCount(statusCount);
  }

  const closeModalCallBack = () => {
    setIsModalOpening(false);

  }

  const currentPath = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page)
    let apiUrl = `http://localhost:3000/api/message?${params.toString()}`;

    if(page > 0) {
      fetch(apiUrl)
      .then(response => response.json())
      .then(data =>  {
          setConversations(data.conversations);

          if(page == 1 && data.specificConversation) {
            setSpecificConversation(data.specificConversation);
            setSpecificConversationMessage(data.specificConversationMessage);
            handleMessageItemClick(data.specificConversation);

            setSelectedConversation(data.specificConversation);
            setConversationContents(data.specificConversationContents);
          } else {
            setSpecificConversation(false);
          }
        }).catch(error => {
          console.error(error)
        });
    }
    
  }, [page, searchParams]);

  return (
<>
  <div className="flex px-5 py-10">
     <div className="flex items-center justify-start flex-1 ">
          <div className="hidden sm:flex items-center w-1/3 ">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" name="name" placeholder="Search Email / Name"
                  className="w-full py-2 border-b-2 border-gray-400 outline-none focus:border-green-600" />
          </div>
      </div>
  </div>

<div className="flex flex-col flex-1 md:flex-row">
      <div className={`relative h-[calc(100vh_-_250px)] sm:h-[calc(100vh_-_200px)]  px-4 sm:px-4 md:w-1/3 flex-col  overflow-auto ${selectedConversation ? "hidden md:flex" : "w-full"}`}>
        <div ref={messageListRef}>
        {specificConversation &&
            <MessageItem key={`xxx`} conversation={specificConversation}
            handleOnClick={handleMessageItemClick} isSelected={selectedConversation && selectedConversation.id === specificConversation.id}/>
        }
        {conversations ? 
          <>
          {conversations.length ? conversations.map((conversation, index) => {
              // if (specificConversation && message.id === specificConversation.id) {
              //   return null; // Skip this message
              // }

              return (
                <MessageItem
                  key={index}
                  conversation={conversation}
                  handleOnClick={handleMessageItemClick}
                  isSelected={selectedConversation && selectedConversation.id === conversation.id}
                />
              );
            }) : (
              <>
                <p>Không có dữ liệu.</p>
              </>
            )}
     
          </>
          : <JobListSkeleton />
          }
        </div>
        <div className="sticky bottom-0 z-3 bg-white flex items-center justify-center w-full py-2 md:py-4">
          {totalPages > 1 && currentPage && (
            <Pagination pageChangeCallback={() => {}} data={ {totalPages: totalPages, page: currentPage }}  />
          )}
        </div>
      </div>
      
      <div className="sm:p-4 md:w-2/3">
      {!showMessageList &&  (
          <>
          <MessageDetail conversationContents={conversationContents} selectedConversation={selectedConversation} handleBackButton={handleBackButton} />
          {/* <ApplyScreen messageId={selectedConversation?.id} isModalOpening={isModalOpening} closeModalCallBack={closeModalCallBack}/> */}
          <div className="sticky bottom-0 left-0 z-10 w-full p-4 bg-gray-100 border-t border-gray-200 sm:hidden">
            <div className="flex items-center justify-between">
              <div className='flex'></div>
              {/* <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600" onClick={handleApplyButtonClick}>Apply</button> */}
              <button className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-600" onClick={handleBackButton}>Back</button>
            </div>
          </div>
          </>
      )}
      </div>
  </div>

  </>
  )
}