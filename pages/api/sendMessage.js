import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';


export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    let { page, status, applicationId, search } = query;

    if(!status) {
      status = 0;
    }

    if(!session) {
      throw new Error ('Unauthorized');
    }

    if(!page) {
      page = 1;
    }
 
    // let whereCandidate;
    // whereCandidate = {
    //   select: {
    //     hashed_resume_name: true,
    //   }
    // };
    // if(search) {
    //   whereCandidate = {
    //     select: {
    //       hashed_resume_name: true,
    //     },
    //     where: {
    //       OR: [
    //         {
    //           email: {
    //             contains: search,
    //           },
    //         },
    //         { 
    //           name: { 
    //             contains: search 
    //           } 
    //         },
    //       ],
    //     }
    //   };

    // } else {

    //   whereCandidate = {
    //     select: {
    //       hashed_resume_name: true,
    //     }
    //   };
    // }
    // whereCandidate = {
    //   select: {
    //     hashed_resume_name: true,
    //   }
    // };
    
 
    const includeQuery = {
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
    };

    let whereQuery = { 
      user_id: session.user.id,
      status: status != 0 ? parseInt(status) : undefined,
      is_submitted: 1,
    };

    if(search) {
      whereQuery.candidate = {
          OR: [
            {
              email: {
                contains: search,
              },
            },
            { 
              name: { 
                contains: search 
              } 
            },
          ],
      }
    }

     let findQuery = {
      orderBy: {
        id: "desc"
      },
      take: 10,
      skip: (page - 1) * 10,
      where: whereQuery,
      include: includeQuery,
    };

    if(applicationId) {
      applicationId = parseInt(applicationId);
      whereQuery.NOT = {
        id: applicationId
      };
    }

    const data = await prisma.$transaction([
      // count all
      prisma.messages.count({
        where: {
          user_id: session.user.id,
          status: status != 0 ? parseInt(status) : undefined,
          is_submitted: 1
        },
      }),
      // select pagination
      prisma.applications.findMany(findQuery),
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
          is_submitted: 1
        },
      }),
    ]);

    if(applicationId) {
      applicationId = parseInt(applicationId);
      const additionalData = await prisma.applications.findFirstOrThrow({
        where: {
          user_id: session.user.id,
          id: applicationId
        },
        include: includeQuery
      });

      data.push(additionalData);
    }

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
      specificApplication: applicationId ? data[4] : ""
    });


    console.log(statusCount);
  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
