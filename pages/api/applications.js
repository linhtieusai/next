import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';


export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    const { page, status } = query;
    

    if(!session) {
      throw new Error ('Unauthorized');
    }

    // console.log(session);

    // const applications = await prisma.applications.findMany({
    //   take: 10,
    //   skip: (page - 1) * 10,
    //   where: { user_id: session?.user?.id },
    //   include: {
    //     job: {
    //       select: {
    //         title: true,
    //         source_site: true,
    //         source_id: true

    //       }
    //     },
    //     candidate: {
    //       select: {
    //         hashed_resume_name: true,
    //       }
    //     }
    //   },
    // });

    console.log(page);

    const data = await prisma.$transaction([
      prisma.applications.count({
        where: {
          user_id: session.user.id,
          status: status ? parseInt(status) : undefined,
        },
      }),
      prisma.applications.findMany({
        take: 10,
        skip: (page - 1) * 10,
        where: { 
          user_id: session.user.id,
          status: status ? parseInt(status) : undefined,
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
          }
        },
      }),
      prisma.applications.groupBy({
        by: ['status'],
        where: { 
          user_id: session.user.id,
        },
        _count: {
          status: true,
        },
      })
    ]);

    console.log(data[2]);
    const statusCount = {};
    data[2].forEach((item) => {
      const { status, _count } = item;
      statusCount[status] = _count.status;
    });

    res.status(201).json({
      applications: data[1],
      totalPages: data[0] ? Math.ceil(data[0] / 10) : 0,
      page: page,
      statusCount: statusCount,
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
