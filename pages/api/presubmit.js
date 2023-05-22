import { getSession } from 'next-auth/react';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import prisma from '../../lib/prisma';
import { sendMail } from '../../lib/mail';

import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const query = req.query;
    let { jobId } = query;

    jobId = parseInt(jobId);

    if(!session.user) {
      throw new Error ('Unauthorized');
    }

    const presubmitData = await prisma.$transaction([
      prisma.applications.findFirst({
        where: {
          job_id: jobId,
          is_submitted: 0,
          user_id: session.user.id
        },
        include: {
          candidate: true
        },
      }),
      // select pagination
      prisma.applications.findMany({
        orderBy: {
          id: "desc"
        },
        take: 5,
        where: {
          user_id: session.user.id,
          NOT: {
            job_id: jobId
          },
          is_submitted: 1,
        },
        include: {
          candidate: true
        },
      }),
    ]);

    res.status(201).json({
      draftApplication: presubmitData[0] ?? "",
      latestApplication: presubmitData[1] ?? "",
    });

  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    await prisma.$disconnect()
  }

}
