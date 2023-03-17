export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
export const JWT_EXPIRE_DAY = process.env.JWT_EXPIRE_DAY || 30;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
export const AWS_S3_BUCKET_MEAL = process.env.AWS_S3_BUCKET_MEAL || "";
export const AWS_REGION = process.env.AWS_REGION || "";
export const S3_URL = "https://s3-" + AWS_REGION + ".amazonaws.com/";

/* Image */
export const IMAGE_MAX_SIZE = 10000000;
export const IMAGE_EXTENTION_ACCEPTED = ['.jpg', '.jpeg', '.png'];