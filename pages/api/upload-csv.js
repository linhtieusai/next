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

        const form = new formidable.IncomingForm({
          keepExtensions: true
        });
        
        const formFields = await new Promise(function (resolve, reject) {
          form.parse(req, function (err, fields, files) {
          if (err) {
              reject(err);
              return;
          }

          if(!fields.hashedResumeName) {
            var randomCharacter = Math.random().toString(36).substring(2, 8);
          } else {
            var randomCharacter = fields.hashedResumeName;
          }
    

          if(files ) {
            console.log('write files');
            const pdfFile = files.resume;
            var rawData = fs.readFileSync(pdfFile.filepath);
  
            fs.writeFileSync(`media/resume/${randomCharacter}.pdf`, rawData, function(err){
                if(err) console.log(err)
            });
          }

            resolve({ fields, randomCharacter});
          }); // form.parse
      });

      const { fields, randomCharacter } = formFields;
        // Save the candidates
        if(!fields.hashedResumeName) {
          const candidate = await prisma.candidates.create({
            data: {
              user_id: session && session.user ? session.user.id: undefined,
              hashed_resume_name: randomCharacter,
            },
          });

          console.log(fields);
          console.log(candidate);

          // const application = await prisma.applications.create({
          //   data: {
          //     user_id: session && session.user ? session.user.id: undefined,
          //     job_id: fields.jobId,
          //     candidate_id: candidate.id,
          //     status: 1,
          //   },
          // });

          // console.log(application);
          const application = await prisma.applications.create({
            data: {
              // name: formFields.name,
              // email: formFields.email,
              // tel: formFields.tel,
              user_id: (session && session.user) ? session.user.id : undefined,
              job_id: parseInt(fields.jobId),
              candidate_id: parseInt(candidate.id),
              status: 1,
              // is_submitted: 0,
            },
        });
        console.log(application);

        res.status(201).json({
          hashedResumeName: randomCharacter,
          applicationId: application.id,
          candidateId: candidate.id,
        });
        }
        
     

  } catch (err) {
    res.status(500).json({message: err.message});

  } finally {
    await prisma.$disconnect()
  }

}
