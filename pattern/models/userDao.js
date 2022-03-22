import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 이메일 불러오기
const getUserByEmail = async (email) => {
  const user = await prisma.$queryRaw`
      SELECT id, name, password FROM users WHERE name = ${email}
    `;
  return user;
};

const checkIsAdmin = async (user_id) => {
  const [data] = await prisma.$queryRaw`
    SELECT 
      is_admin
    FROM
      users
    WHERE
      id = ${user_id}
  `;

  return data;
};

export { getUserByEmail, checkIsAdmin };
