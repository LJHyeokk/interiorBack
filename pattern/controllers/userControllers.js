import { signInService } from '../services/userServices';

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const REQUIRED_KEYS = { email, password };

    for (let key in REQUIRED_KEYS) {
      if (!REQUIRED_KEYS[key]) {
        return res.status(400).send({ message: `KEY_ERROR` });
      }
    }

    const token = await signInService(email, password);
    res.status(200).send({ message: 'LOGIN_SUCCESS', token: token });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).send({ message: err.message });
  }
};

export { signIn };
