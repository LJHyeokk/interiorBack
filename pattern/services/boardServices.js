import { deleteImg } from '../middleWare/imgUpload';

import {
  insertBoardDetailData,
  boardCountCheck,
  insertBoardImgUrl,
  selectImgUrl,
  deleteImgByBoardId,
  deleteBoardDetailData,
  updateBoardDetailData,
} from '../models/boardDao';

const createBoardService = async (allData, imgUrl) => {
  await insertBoardDetailData(allData);
  const count = await boardCountCheck();

  imgUrl.forEach((img, index) => {
    if (index === 0) {
      insertBoardImgUrl(img.location, img.key, count.id, true);
    } else {
      insertBoardImgUrl(img.location, img.key, count.id, false);
    }
  });

  return;
};

const deleteBoardService = async (boardId) => {
  const imgUrl = await selectImgUrl(boardId);

  imgUrl.forEach((item) => {
    deleteImg(item.s3key);
  });

  await deleteImgByBoardId(boardId);
  await deleteBoardDetailData(boardId);

  return;
};

const editBoardService = async (id, afterImgUrl, allData) => {
  const beforeImgUrl = await selectImgUrl(id);
  beforeImgUrl.forEach((item) => {
    deleteImg(item.s3key);
  });
  await deleteImgByBoardId(id);

  afterImgUrl.forEach((img, index) => {
    if (index === 0) {
      insertBoardImgUrl(img.location, img.key, id, true);
    } else {
      insertBoardImgUrl(img.location, img.key, id, false);
    }
  });

  await updateBoardDetailData(allData, id);

  return;
};

export { createBoardService, deleteBoardService, editBoardService };
