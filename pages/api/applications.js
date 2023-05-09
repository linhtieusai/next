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

    console.log(session);

    const applications = await prisma.applications.findMany({
      take: 10,
      skip: (page - 1) * 10,
      where: { user_id: session?.user?.id },
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
    });

    res.status(201).json({
      applications: applications,
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
