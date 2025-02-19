import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadSingle(file: Express.Multer.File) {
    const circle = Buffer.from(file.buffer).toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + circle;

    return await cloudinary.uploader.upload(dataURI, {
      folder: process.env.CLOUDINARY_UPLOAD_FOLDER,
    });
  }

  async uploadSingleDisk(path: string) {
    return await cloudinary.uploader.upload(path, {
      folder: process.env.CLOUDINARY_UPLOAD_FOLDER,
    });
  }
}

export default new CloudinaryService();
