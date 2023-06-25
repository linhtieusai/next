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
        ) AND NOT m.application_id <=> ${applicationId}
      `;
    }

    if(jobId) {
      whereQuery = `
        (
          (m.from_user_id = 0 AND m.to_user_id = ${session.user.id})
            OR
          (m.from_user_id = ${session.user.id} AND m.to_user_id = 0)
        ) AND NOT m.job_id <=> ${jobId}
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
          c.name AS candidate_name,
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

    let countConversationQuery = `
      SELECT COUNT(*) AS conversation_count
      FROM (${queryRaw})
      AS conversation_query;
    `;
    
    let prismaTransaction = [
      prisma.$queryRawUnsafe(queryRaw),
      prisma.$queryRawUnsafe(countConversationQuery),
    ];


      //WHEN GET SPECIFIC Conversation
      if(applicationId || jobId) {
        var querySpecificData ;
        var queryLoadMessageSpecificData;

        if(applicationId) {
            querySpecificData = `
              SELECT
                title as job_title, source_id, source_site,
                c.email as candidate_email,
                c.name as candidate_name,
                status 
              FROM
                applications a
              LEFT JOIN job j ON app.job_id = j.id
              LEFT JOIN candidates c ON a.candidate_id = c.id
              WHERE a.user_id = ${session.user.id} AND a.id = ${applicationId}
            `;
        
            queryLoadMessageSpecificData = `
              SELECT
                content,
                created_at AS sent_time
              FROM
                messages
              WHERE
                application_id = ${applicationId} 
                AND (messages.from_user_id = ${session.user.id} or messages.to_user_id = ${session.user.id})
      
              LIMIT 20;
            `;
        } else {
          querySpecificData = `
              SELECT
                title AS job_title, 
                company_name, 
                source_id, source_site
                FROM job
                WHERE id = ${jobId}
            `;
        
            queryLoadMessageSpecificData = `
                SELECT
                content,
                created_at AS sent_time,
                from_user_id, to_user_id
              FROM
                messages
              WHERE
                job_id = ${jobId} AND (messages.from_user_id = ${session.user.id} or messages.to_user_id = ${session.user.id})

              LIMIT 20;
            `;
        }

        prismaTransaction = [
          prisma.$queryRawUnsafe(queryRaw),
          prisma.$queryRawUnsafe(countConversationQuery),
          prisma.$queryRawUnsafe(querySpecificData),
          prisma.$queryRawUnsafe(queryLoadMessageSpecificData),
        ];
      }
      
  
    const data = await prisma.$transaction(prismaTransaction);
    console.log(data);

    if(data[3] && data[3].length) {
      data[2][0].last_message_content = data[3][data[3].length-1].content;
      data[2][0].last_message_date = data[3][data[3].length-1].sent_time;
    }

    res.status(201).json({
      conversations: data[0],
      total: data[1].conversation_count,
      page: page,
      specificConversation: data[2] ? data[2][0] : null,
      specificConversationContents: data[3] ?? null,
    });

  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }
}
