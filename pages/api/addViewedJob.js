import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    let { jobId } = query;
    
    jobId = parseInt(jobId);

    if(!session.user) {
      throw new Error ('Unauthorized');
    }

    await prisma.viewed_jobs.create({
      data: {
        user_id: session.user.id,
        job_id: jobId,
      },
    });

    res.status(200).json({});
  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
