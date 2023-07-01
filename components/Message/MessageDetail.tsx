'use client';

import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSearchParams, usePathname  } from 'next/navigation';
import { Suspense } from "react";
import { ApplicationStatus } from '../../lib/const';
import Link from "next/link";
import Image from 'next/image';
import { useSession, signIn } from "next-auth/react";

function ConversationDetail({ conversationContents, selectedConversation, handleBackButton }) {

  function getColorClassName(status) {
    let colorClassName;

    switch (ApplicationStatus.STATUS_COLOR[status]) {
      case 'green':
        colorClassName = "text-green-700";
        break;
      case 'red':
        colorClassName = "text-red-700";
        break;
      default:
        // Handle the case when x is neither 1 nor 2
        colorClassName = `text-${ApplicationStatus.STATUS_COLOR[status]}-700`;
        break;
    }

    return colorClassName;
  }

  const { data: session } = useSession();

  const [text, setText] = useState('');
  const handleKeyPress = async (event, selectedConversation) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      console.log(selectedConversation);

      let apiEndpoint;
      if(selectedConversation.is_job) {
        apiEndpoint = `http://localhost:3000/api/newMessage?jobId=${selectedConversation.job_id}`;
      }
  
      if(selectedConversation.is_application) {
        apiEndpoint = `http://localhost:3000/api/newMessage?applicationId=${selectedConversation.application_id}`;
      }

      // Call your API here using the 'text' state value
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log(data);

      } else {
        // const data = await response.json();
        // throw(data.message);
      }
      // Clear the text area content
      setText('');
    }
  };

  return (
    <>
      {/* <div className="p-4 lg:w-2/3"> */}
        {selectedConversation ? (
          <>
          <div className="flex flex-col h-full text-sm justify-between p-2 overflow-auto border rounded">
            <div className="flex flex-col">
              <p className='ml-3 text-green-800 text-md'>
                {selectedConversation.job_title}
              </p>
            </div>
            <div className='flex flex-col content-end grow'>
                {conversationContents && conversationContents.map((message, index)  => (
                  <>
                      {message.from_user_id === 0 ? (
                        <div className='flex items-center max-w-[50%]'>
                          <Image src={`/company_logo/${selectedConversation.source_site}/${selectedConversation.source_id}.jpg`} alt="me" width="55" height="55" className="object-cover mr-3 rounded-full"/>

                          <p className='bg-gray-100 p-2 px-4 rounded-lg'>
                          {message.content}
                          </p>
                        </div>
                      ) : (
                        <div className='flex flex-row-reverse '>
                          <span className='bg-blue-100 p-2 px-4 rounded-lg max-w-[50%]'>
                          {message.content}
                          </span>
                        </div>
                      )}
                      
                  </>
                ))}
            </div>
            <div className="flex flex-col">
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50
                rounded-lg border border-gray-300 focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Write your content..."
               value={text}
               onChange={(event) => setText(event.target.value)}
               onKeyPress={(event) => handleKeyPress(event, selectedConversation)}
            >

               </textarea>
            </div>
          </div>
          </>
        ) : (
          <p>Please select a conversation</p>
        )}
      {/* </div> */}
    </>
  );
}

export default ConversationDetail;