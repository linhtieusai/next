import { getSession } from 'next-auth/react';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';

import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
      const session = await getSession({ req });

      const form = new formidable.IncomingForm({
        keepExtensions: true
      });

      const formFields = await new Promise(function (resolve, reject) {
          form.parse(req, function (err, fields, files) {
          if (err) {
              reject(err);
              return;
          }
            resolve(fields);
          }); // form.parse
      });
  
      let jobId = parseInt(formFields.jobId);
      let candidateId = parseInt(formFields.candidateId);
      // let applicationId = parseInt(formFields.applicationId);
      //updating candidate
      if(candidateId) {
        const candidateUpdate = await prisma.candidates.update({
          where: {
            id: candidateId
          },
          data: {
            name: formFields.name,
            email: formFields.email,
            tel: formFields.tel,
          },
        });

        res.status(201).json({});
      }

      const isCandidateSubmitted = await prisma.applications.findFirst({
        where: {
          job_id: jobId,
          candidate: {
            email: formFields.email
          }
        }
      })

      if(isCandidateSubmitted) {
        throw new Error ('Candidate submitted');
      }
      // Save the candidates
      const candidate = await prisma.candidates.findFirstOrThrow({
          where: {
            user_id: session && session.user ? session.user.id : undefined,
            hashed_resume_name: formFields.hashedResumeName,
          },
      });
        // Save the candidates
      const candidateUpdate = await prisma.candidates.update({
          where: {
            id: candidate.id
          },
          data: {
            name: formFields.name,
            email: formFields.email,
            tel: formFields.tel,
          },
      });

      console.log(candidateUpdate);

      // Save the applications
      const application = await prisma.applications.create({
          data: {
            name: formFields.name,
            email: formFields.email,
            tel: formFields.tel,
            user_id: session && session.user ? session.user.id : undefined,
            job_id: jobId,
            candidate_id: candidate.id,
            status: 1,
            is_submitted: 1,
          },
      });

      console.log(application);


      const applicationLog = await prisma.application_logs.create({
          data: {
            name: formFields.name,
            email: formFields.email,
            tel: formFields.tel,
            user_id: session && session.user ? session.user.id : undefined,
            job_id: jobId,
            status: 1,
            application_id: application.id
          },
      });
    

      console.log(applicationLog);

        // Send email to admin
        // await sendMail({
        //   to: process.env.ADMIN_EMAIL,
        //   subject: 'New Job Submission',
        //   text: `User ${session.user.email} submitted job ${jobId}.`,
        // });
    
        // // Send success email to user
        // await sendMail({
        //   to: session.user.email,
        //   subject: 'Job Submission Success',
        //   text: `You have successfully submitted job ${jobId}.`,
        // });
    
      res.status(201).json({});

  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
