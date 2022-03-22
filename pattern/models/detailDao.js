import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const detailData = async (id) => {
  const data = await prisma.$queryRaw`
    SELECT 
      board.id,
      title,
      name,
      size,
      location,
      type,
      status,
      date,
      description,
      miniDescription,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('url', images.url, 'is_main', is_main))
        FROM images
        JOIN board ON board.id =  board_id
        WHERE board.id = ${id}
      ) AS img
    FROM
      board
    WHERE
      board.id = ${id};
  `;

  return data;
};

export { detailData };
