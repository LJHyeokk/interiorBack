import express from 'express';
import routes from './pattern/routes/index';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
  })
);
app.use(cors());
app.use(express.json());
app.use(routes);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};

start();
