import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';

import { NextRequest, NextResponse } from "next/server";

export default async function handler(req, res) {
  try {
    const session = await getSession();
    const query = req.query;
    const { page } = query;

    console.log(session);

    const applications = await prisma.applications.findMany({
      take: 10,
      skip: (page - 1) * 10,
      where: { user_id: 2 },
      // include: {
      //   job: {
      //     select: {
      //       title: true,
      //       source_site: true,
      //       source_id: true

      //     }
      //   },
      // },
    });

    res.status(201).json({
      data: applications,
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
