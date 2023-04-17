import { getSession } from 'next-auth/react';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getSession();
//   if (!session) {
//     res.status(401).json({ message: 'Unauthorized' });
//     return;
//   }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    console.log(fields);

    // Save the PDF file
    const pdfFile = files.pdf;
    const filePath = path.join(process.cwd(), 'public', 'uploads', pdfFile.name);
    fs.renameSync(pdfFile.path, filePath);

    if(session) {
        // Check if the user has already submitted the job
        const existingJob = await prisma.userApplies.findUnique({
            where: { userId_jobId: { userId: session.user.id, jobId } },
        });
        if (existingJob) {
            res.status(409).json({ message: 'Job Already Submitted' });
            return;
        }

        // Save the job submission to the database
        const userJob = await prisma.userApplies.create({
            data: {
            userId: session.user.id,
            jobId,
            pdfUrl: `/uploads/${pdfFile.name}`,
            },
        });
    }

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

    res.status(201).json({  });
  });
}
