import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';


export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    const { page } = query;

    if(!session) {
      throw new Error ('Unauthorized');
    }

    const includeQuery = {
      job: true
    };

    let whereQuery = { 
      user_id: session.user.id,
      deleted_at: null
    };

     let findQuery = {
      orderBy: {
        id: "desc"
      },
      take: 10,
      skip: (page - 1) * 10,
      where: whereQuery,
      include: includeQuery,
    };

    const data = await prisma.$transaction([
      // count all
      prisma.viewed_jobs.count({
        where: {
          user_id: session.user.id,
          deleted_at: null
        },
      }),
      // select pagination
      prisma.viewed_jobs.findMany(findQuery),
    ]);

    for (const job of data[1]) {
      job.id=job.job_id;
    }

    res.status(201).json({
      jobs: data[1],
      totalPages: data[0] ? Math.ceil(data[0] / 10) : 0,
      page: page,
      // specificApplication: applicationId ? data[4] : ""
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
