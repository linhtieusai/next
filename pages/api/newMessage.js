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
      const query = req.query;


      console.log(session);
      let { applicationId, jobId, file } = query;

      const form = new formidable.IncomingForm({
        keepExtensions: true
      });

      const formFields = await new Promise(function (resolve, reject) {
        form.parse(req, function (err, fields, files) {
        if (err) {
            reject(err);
            return;
        }

        // if(files ) {
        //   console.log('write files');
        //   const pdfFile = files.resume;
        //   var rawData = fs.readFileSync(pdfFile.filepath);

        //   fs.writeFileSync(`media/resume/${randomCharacter}.pdf`, rawData, function(err){
        //       if(err) console.log(err)
        //   });
        // }

          resolve({ fields});
        }); // form.parse
    });

    const { fields } = formFields;

      const createdMessage = await prisma.messages.create({
        data: {
          application_id: applicationId ? parseInt(applicationId) : null,
          job_id: jobId ? parseInt(jobId) : null,
          from_user_id: session.user.id,
          to_user_id: 0,
          is_seen: 0,
          content: fields.text,
        },
      });
      // console.log(createdMessage);
  
      res.status(201).json({
        success: 1,
        newMessage: createdMessage,
      });

  } catch (err) {
    res.status(500).json({message: err.message});

  } finally {
    await prisma.$disconnect()
  }

}
