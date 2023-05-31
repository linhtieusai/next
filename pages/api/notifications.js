import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    let { start } = query;

    start = parseInt(start);

    const data = await prisma.$transaction([
      // count all
      prisma.notifications.count({
        where: {
          user_id: session.user.id,
        },
      }),
      prisma.notifications.findMany({
        take: 10,
        skip: start,
        orderBy: {
          id: 'desc',
        },
        where: { user_id: session.user.id },
        include: {
          job: {
            select: {
              title: true,
              source_site: true,
              source_id: true
            }
          },
          application: {
            select: {
              id: true,
              name: true,
              status: true,
            }
          }
        },
      })
    ]);

    // const notifications = await prisma.notifications.findMany({
    //   take: 10,
    //   skip: start,
    //   orderBy: {
    //     id: 'desc',
    //   },
    //   where: { user_id: session.user.id },
    //   include: {
    //     job: {
    //       select: {
    //         title: true,
    //         source_site: true,
    //         source_id: true
    //       }
    //     },
    //     application: {
    //       select: {
    //         id: true,
    //         name: true,
    //         status: true,
    //       }
    //     }
    //   },
    // });

    // console.log(notifications);

    res.status(201).json({
      hasMore: data[0] - start > 10,
      notifications: data[1],
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
