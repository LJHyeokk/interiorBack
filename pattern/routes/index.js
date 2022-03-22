import express from 'express';
import { upload } from '../middleWare/imgUpload';
import {
  createBoard,
  deleteBoard,
  editBoard,
} from '../controllers/boardControllers';
import { listData } from '../controllers/listControllers';
import { detailData } from '../controllers/detailControllers';
import { signIn } from '../controllers/userControllers';
import { authentication, realAuthentication } from '../middleWare/auth';

const router = express.Router();

router.post('/upload', realAuthentication, upload.array('images'), createBoard);
router.delete('/uploadDelete/:id', realAuthentication, deleteBoard);
router.put(
  '/uploadEdit/:id',
  realAuthentication,
  upload.array('images'),
  editBoard
);
router.get('/list', authentication, listData);
router.get('/detail/:id', authentication, detailData);
router.post('/login', signIn);

export default router;
