TO RUN:
npm install
npm run dev

CREATE PRISMA SCHEMA:
prisma pull
npx prisma generate

WHEN PRISMA RELATIONS NOT WORK:
Create a relationship in one Model, then:
npx prisma format   =>  will create a relationship from other Model
