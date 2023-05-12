import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';


export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    const { page } = query;
    let { status } = query;

    if(!status) {
      status = 0;
    }

    if(!session) {
      throw new Error ('Unauthorized');
    }

    const data = await prisma.$transaction([
      // count all
      prisma.applications.count({
        where: {
          user_id: session.user.id,
          status: status != 0 ? parseInt(status) : undefined,
        },
      }),
      // select pagination
      prisma.applications.findMany({
        orderBy: {
          id: 'desc',
        },
        take: 10,
        skip: (page - 1) * 10,
        where: { 
          user_id: session.user.id,
          status: status != 0 ? parseInt(status) : undefined,
       },
        include: {
          job: {
            select: {
              title: true,
              source_site: true,
              source_id: true
  
            }
          },
          candidate: {
            select: {
              hashed_resume_name: true,
            }
          },
          application_logs: {
            orderBy: {
              id: 'desc',
            },
            select: {
              created_at: true,
              status: true,
              message: true,
            }
          }
        },
      }),
      // count group by status
      prisma.applications.groupBy({
        by: ['status'],
        where: { 
          user_id: session.user.id,
        },
        _count: {
          status: true,
        },
      }),
      prisma.applications.count({
        where: {
          user_id: session.user.id,
        },
      }),
    ]);

    // console.log(data[2]);
    const statusCount = {};
    data[2].forEach((item) => {
      const { status, _count } = item;
      statusCount[status] = _count.status;
    });

    statusCount[0] = data[3] ?? 0;

    res.status(201).json({
      applications: data[1],
      totalPages: data[0] ? Math.ceil(data[0] / 10) : 0,
      page: page,
      statusCount: statusCount,
    });

    console.log(statusCount);
  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
