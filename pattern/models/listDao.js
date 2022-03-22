import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const listData = async () => {
  const data = await prisma.$queryRaw`
    SELECT 
      board.id,
      title,
      miniDescription,
      images.url
    FROM
      board
    JOIN
      images ON board_id = board.id
    WHERE
      images.is_main = true
    ORDER BY
      id ASC;
  `;

  return data;
};

export { listData };
