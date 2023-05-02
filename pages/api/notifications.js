import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';

import { NextRequest, NextResponse } from "next/server";

export default async function handler(req, res) {
  try {
    const session = await getSession();

    const notifications = await prisma.notifications.findMany({
      where: { user_id: 1 },
      include: {
        job: {
          select: {
            title: true,
            source_site: true,
            source_id: true

          }
        },
      },
    });

    console.log(notifications);

    res.status(201).json({
      data: notifications,
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
