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
    const session = await getSession();
    //   if (!session) {
    //     res.status(401).json({ message: 'Unauthorized' });
    //     return;
    //   }

      const form = new formidable.IncomingForm({
        keepExtensions: true
      });

      // form.parse(req, function(err, fields, files){
      //   const pdfFile = files.resume;
      //   var rawData = fs.readFileSync(pdfFile.filepath);
      //   fs.writeFileSync(`media/resume/${pdfFile.originalFilename}`, rawData, function(err){
      //       if(err) console.log(err)
      //   });
      // });

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


    
        // if(session) {
        //     // Check if the user has already submitted the job
        //     const existingJob = await prisma.userApplies.findUnique({
        //         where: { userId_jobId: { userId: session.user.id, jobId } },
        //     });
        //     if (existingJob) {
        //         res.status(409).json({ message: 'Job Already Submitted' });
        //         return;
        //     }
        // }

         // Save the job submission to the database
         const userJob = await prisma.applications.create({
          data: {
            user_id: session && session.user ? { connect: { id: session.user.id } } : undefined,
            job_id: jobId,
            name: formFields.name,
            email: formFields.email,
            tel: formFields.tel,

            status: 1,
          },
      });
    
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
