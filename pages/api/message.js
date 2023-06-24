import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    let { page, loadContent, applicationId, jobId, search } = query;

    if(!session) {
      throw new Error ('Unauthorized');
    }

    console.log (session.user);

    if(!page) {
      page = 1;
    }
    
    let whereQuery = `
      (m.from_user_id = 0 AND m.to_user_id = ${session.user.id})
      OR (m.from_user_id = ${session.user.id} AND m.to_user_id = 0) 
    `;
    
    if(applicationId) {
      whereQuery = `
        (
          (m.from_user_id = 0 AND m.to_user_id = ${session.user.id})
            OR
          (m.from_user_id = ${session.user.id} AND m.to_user_id = 0)
        ) AND m.application_id <> ${applicationId}
      `;
    }

    if(jobId) {
      whereQuery = `
        (
          (m.from_user_id = 0 AND m.to_user_id = ${session.user.id})
            OR
          (m.from_user_id = ${session.user.id} AND m.to_user_id = 0)
        ) AND m.application_id <> ${jobId}
      `;
    }

    let queryRaw = `
        SELECT
          m.id,
          m.job_id,
          m.application_id,
          MAX(m.created_at) AS last_message_date,
          MAX(m.content) AS last_message_content,
          COALESCE(j.title, aj.title) AS job_title,
          COALESCE(j.source_site, aj.source_site) AS source_site,
          COALESCE(j.source_id, aj.source_id) AS source_id,
          COALESCE(j.company_name, aj.company_name) AS company_name,

          c.email AS candidate_email,
          a.status as application_status
        FROM
          messages m
        LEFT JOIN applications a ON m.application_id = a.id
        LEFT JOIN job j ON m.job_id = j.id
        LEFT JOIN applications app ON m.application_id = app.id
        LEFT JOIN job aj ON app.job_id = aj.id
        LEFT JOIN candidates c ON a.candidate_id = c.id
        WHERE
            ${whereQuery}
        GROUP BY
          m.job_id,
          m.application_id
        ORDER BY
          last_message_date DESC
    `;

    let countQuery = `
      SELECT COUNT(*) AS conversation_count
      FROM (${queryRaw})
      AS conversation_query;
    `;
    
    const data = await prisma.$transaction([
      prisma.$queryRawUnsafe(queryRaw),
      prisma.$queryRawUnsafe(countQuery),
    ]);



    //WHEN GET SPECIFIC Conversation
    let querySpecificData = `

    `;

    let queryLoadMessageSpecificData = `

    `;

    if(applicationId || jobId) {
      const specificData = await prisma.$transaction([
        prisma.$queryRawUnsafe(querySpecificData),
        prisma.$queryRawUnsafe(queryLoadMessageSpecificData),
      ]);
    }
    //End

    console.log(data);

    res.status(201).json({
      conversations: data[0],
      total: data[1].conversation_count,
      page: page,
      // specificApplication: applicationId ? data[4] : ""
    });

  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
