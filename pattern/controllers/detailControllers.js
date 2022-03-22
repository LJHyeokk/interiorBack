import { detailDataService } from '../services/detailServices';

const detailData = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    const result = await detailDataService(id, user_id);

    res
      .status(201)
      .send({ message: 'SUCCESS', data: result, isAdmin: result.isAdmin });
  } catch (err) {
    res.status(err.status || 500).send({ message: 'FAIL', err: err.message });
  }
};

export { detailData };
