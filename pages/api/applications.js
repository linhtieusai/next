import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';


export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    const { page } = query;
    let { status, applicationId, excludeJobId } = query;

    if(!status) {
      status = 0;
    }

    if(!session) {
      throw new Error ('Unauthorized');
    }

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
      is_submitted: 1
    };

    if(applicationId) {
      applicationId = parseInt(applicationId);
      whereQuery.NOT = {
        id: applicationId
      };
    }

    if(excludeJobId) {
      excludeJobId = parseInt(excludeJobId);
      whereQuery.NOT = {
        job_id: excludeJobId
      };
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

    const data = await prisma.$transaction([
      // count all
      prisma.applications.count({
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
          // additional condition here
        },
        include: includeQuery
      });
      data.push(additionalData);
    }

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
      specificApplication: applicationId ? data[4] : ""
    });


    console.log(statusCount);
  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
