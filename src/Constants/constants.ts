import { HttpException, HttpStatus } from "@nestjs/common";

export const getJwtSecret=()=>{
    const secret_jwt = process.env.JWT_SECRET;
    if (!secret_jwt)
      throw new HttpException(
        "we can't find jwt secret key",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return secret_jwt
}