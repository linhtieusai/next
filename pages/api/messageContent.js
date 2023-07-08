import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    let { page, applicationId, jobId, search } = query;

    if(!page) {
      page = 1;
    }
    //page = parseInt(page);
    if(!session) {
      throw new Error ('Unauthorized');
    }

    const whereQuery = { 
      OR: [
        {
          from_user_id: session.user.id
        },
        {
          to_user_id: session.user.id
        }
      ],
      application_id: applicationId ? parseInt(applicationId) : null,
      job_id: jobId ? parseInt(jobId) : null,
    }
    const data = await prisma.$transaction([
       // select pagination
      prisma.messages.findMany({
        take: 10, 
        skip: (page - 1) * 10,
        orderBy: [
          {
            id: 'desc',
          },
        ],
        where: whereQuery
      }),
      // count all
      prisma.messages.count({
        where: whereQuery
      }),
    ]);

    res.status(201).json({
      contents: data[0],
      total: data[1].conversation_count,
      page: page,
    });

  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
