import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "../configs/constants";

export class S3Manager {
  client: S3Client;
  constructor() {
    this.client = new S3Client({
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
      region: AWS_REGION,
    });
  }

  async uploadImage(Bucket: string, Key: string, Body: Buffer) {
    try {
      const s3Params = new PutObjectCommand({
        Bucket,
        Key,
        Body,
        ContentType: "image/jpeg",
      });
      await this.client.send(s3Params);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
