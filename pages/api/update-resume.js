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

        // res.status(201).json({});
      }

      res.status(201).json({});

  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
