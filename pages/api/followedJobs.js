import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';


export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    const { page } = query;
    // let { status, applicationId } = query;

    // if(!status) {
    //   status = 0;
    // }

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
      prisma.saved_job.count({
        where: {
          user_id: session.user.id,
          deleted_at: null
        },
      }),
      // select pagination
      prisma.saved_job.findMany(findQuery),
    ]);

    // if(applicationId) {
    //   applicationId = parseInt(applicationId);
    //   const additionalData = await prisma.applications.findFirstOrThrow({
    //     where: {
    //       user_id: session.user.id,
    //       id: applicationId
    //     },
    //     include: includeQuery
    //   });

    //   data.push(additionalData);
    // }

    const statusCount = {};
    data[2].forEach((item) => {
      const { status, _count } = item;
      statusCount[status] = _count.status;
    });

    statusCount[0] = data[3] ?? 0;

    res.status(201).json({
      followedJobs: data[1],
      totalPages: data[0] ? Math.ceil(data[0] / 10) : 0,
      page: page,
      // specificApplication: applicationId ? data[4] : ""
    });


    console.log(statusCount);
  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
