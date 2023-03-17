import jsonwebtoken from 'jsonwebtoken';
import { JWT_EXPIRE_DAY } from '../configs/constants';

interface JwtData {
  role: string;
  email: string;
}

const jwtSign = (data: object, secret: string): string => {
  return jsonwebtoken.sign(data, secret, {
    expiresIn: JWT_EXPIRE_DAY + "d",
  });
};

export const jwtEncode = (data: JwtData, secret: string): string => {
  const jwt = jwtSign(data, secret);

  const secondSecret = jwt.split(".")[2];
  const secondData = `${jwt.split(".")[1]}.${jwt.split(".")[0]}`;

  const secondDataEncoded = jwtSign({ data: secondData }, secondSecret);

  return `${secondSecret}.${secondDataEncoded}`;
};

export const jwtDecode = async (token: string, secret: string) => {
  try {
    const secondSecret = token.split(".")[0];
    const secondDataEncoded = `${token.split(".")[1]}.${token.split(".")[2]}.${token.split(".")[3]
      }`;
    const secondDataDecoded = jsonwebtoken.verify(
      secondDataEncoded,
      secondSecret
    ) as jsonwebtoken.JwtPayload;

    const secondData = secondDataDecoded.data;

    const dataEncoded = `${secondData.split(".")[1]}.${secondData.split(".")[0]
      }.${secondSecret}`;

    const dataDecoded = jsonwebtoken.verify(dataEncoded, secret);
    return dataDecoded as JwtData;
  } catch (error) {
    console.log(error);
    return null;
  }
};