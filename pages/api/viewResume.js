import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    const { id } = query;
    

    if(!session) {
      throw new Error ('Unauthorized');
    }

    const application = await prisma.applications.findFirstOrThrow({
      where: {
        candidate: {
          hashed_resume_name: id,
        },
      },
      select: {
        candidate: {
          select: {
            name: true,
          },
        },
      },
    });
    
    const fileName = `${id}.pdf`;
    const filePath = path.join(process.cwd(), 'media', 'resume', fileName);

   // Read the PDF file
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      // Set the response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename=${application.candidate.name}.pdf`);
      
      // Write the PDF file to the response
      res.write(data);
      
      // End the response
      res.end();
    }
  });

    // if(session) {
    //     // Check if the user has already submitted the job
    //     const notifications = await prisma.notifications.findMany({
    //         where: { userId: { userId: session.user.id } },
    //     });

    //     res.status(201).json({
    //       data: notifications,
    //     });
    // } else {
    //   res.status(201).json({
    //   });
    // }
  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
