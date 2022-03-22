import {
  createBoardService,
  deleteBoardService,
  editBoardService,
} from '../services/boardServices';

const createBoard = async (req, res) => {
  try {
    const allData = JSON.parse(req.body.data);
    const imgUrl = req.files;

    await createBoardService(allData, imgUrl);

    res.status(201).send({ message: 'CREATE SUCCESS' });
  } catch (err) {
    res
      .status(err.status || 500)
      .send({ message: 'CREATE FAIL', err: err.message });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const boardId = req.headers.boardid;

    await deleteBoardService(+boardId);

    res.status(204).send({ message: 'SUCCESS DELETE' });
  } catch (err) {
    res
      .status(err.status || 500)
      .send({ message: 'DELETE FAIL', err: err.message });
  }
};

const editBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const afterImgUrl = req.files;
    const allData = JSON.parse(req.body.data);

    await editBoardService(+id, afterImgUrl, allData);

    res.status(201).send({ message: 'SUCCESS EDIT' });
  } catch (err) {
    res
      .status(err.status || 500)
      .send({ message: 'DELETE FAIL', err: err.message });
  }
};

export { createBoard, deleteBoard, editBoard };
