import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';


export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    // const { page } = query;
    let { excludeJobId, search } = query;
    
    if(!session) {
      throw new Error ('Unauthorized');
    }

    let whereQuery = { 
      user_id: session.user.id,
    };

    // if(excludeJobId) {
    //   whereQuery.NOT = {
    //     id:
    //   }
    // }

    // let page= 0;

    //  let findQuery = {
    //   orderBy: {
    //     id: "desc"
    //   },
    //   take: 20,
    //   skip: (page - 1) * 10,
    //   where: whereQuery,
    //   include: includeQuery,
    // };
    let queryRaw = `
        SELECT * FROM candidates
        JOIN applications ON candidates.id = applications.candidate_id
        WHERE applications.job_id != ${excludeJobId}
        AND candidates.user_id = ${session.user.id}
    `;
    if(search) {
     queryRaw = `
        SELECT * FROM candidates
        JOIN applications ON candidates.id = applications.candidate_id
        WHERE applications.job_id != ${excludeJobId}
        AND candidates.user_id = ${session.user.id}
        AND (candidates.email LIKE '%${search}%' OR candidates.name LIKE '%${search}%')
    `;
    }


    const data = await prisma.$transaction([
      // count all
      prisma.candidates.count({
        where: {
          user_id: session.user.id,
        },
      }),
      prisma.$queryRawUnsafe(queryRaw),
    ]);

    res.status(201).json({
      candidates: data[1],
      totals: data[0] ?? 0,
    });

    console.log(statusCount);
  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
