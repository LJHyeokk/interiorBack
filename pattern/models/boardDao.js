import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertBoardDetailData = async (allData) => {
  await prisma.$queryRaw`
    INSERT INTO
      board(
        title,
        name,
        size,
        location,
        type,
        status,
        date,
        description,
        miniDescription
      )
    VALUES
      (
        ${allData.title},
        ${allData.name},
        ${allData.size},
        ${allData.location},
        ${allData.type},
        ${allData.status},
        ${allData.date},
        ${allData.description},
        ${allData.miniDescription}
      );
  `;
};

const boardCountCheck = async () => {
  const [count] = await prisma.$queryRaw`
    SELECT MAX(id) as id FROM board;
  `;

  return count;
};

const insertBoardImgUrl = async (imgUrl, key, count, isMain) => {
  await prisma.$queryRaw`
    INSERT INTO
      images(
        is_main,
        url,
        s3key,
        board_id
      )
      VALUES
      (
        ${isMain},
        ${imgUrl},
        ${key},
        ${count}
      );
  `;
};

const deleteBoardDetailData = async (boardId) => {
  await prisma.$queryRaw`
    DELETE FROM board WHERE id = ${boardId}
  `;
};

const selectImgUrl = async (boardId) => {
  return await prisma.$queryRaw`
    SELECT
      s3key
    FROM
      images
    WHERE
      board_id = ${boardId};
  `;
};

const deleteImgByBoardId = async (boardId) => {
  await prisma.$queryRaw`
    DELETE FROM images WHERE board_id = ${boardId}
  `;
};

const updateBoardDetailData = async (allData, id) => {
  await prisma.$queryRaw`
    UPDATE
      board
    SET
      title = ${allData.title},
      name = ${allData.name},
      size = ${allData.size},
      location = ${allData.location},
      type = ${allData.type},
      status = ${allData.status},
      date = ${allData.date},
      description = ${allData.description},
      miniDescription = ${allData.miniDescription}
    WHERE
      id = ${id};
  `;
};

export {
  insertBoardDetailData,
  boardCountCheck,
  insertBoardImgUrl,
  deleteBoardDetailData,
  selectImgUrl,
  deleteImgByBoardId,
  updateBoardDetailData,
};
