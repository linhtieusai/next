import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    let { applicationId, jobId, text, file } = query;

    if(!session) {
      throw new Error ('Unauthorized');
    }

    await prisma.messages.create({
      data: {
        application_id: applicationId ?? null,
        job_id: jobId ?? null,
        from_user_id: session.user.id,
        to_user_id: 0,
        is_seen: 0,
        content: text,
      },
    })

    res.status(201).json({
      success: 1,
    });

  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
