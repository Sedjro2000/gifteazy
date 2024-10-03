import { NextResponse } from "next/server";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import  prisma  from "@/lib/prisma";

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: Request) => {
  const form = new formidable.IncomingForm();

  // Parse le formulaire
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) {
        return reject(err);
      }
      resolve({ fields, files });
    });
  });

  const { storeName, address, phoneNumber, taxIdentificationNumber, userId } = fields;

  // Upload du fichier PDF sur Cloudinary
  const idDocumentFile = files.idDocument[0];
  const uploadResult = await cloudinary.uploader.upload(idDocumentFile.filepath, {
    resource_type: "raw", // Indique que c'est un fichier non-image
  });

  const newMerchant = await prisma.merchant.create({
    data: {
      storeName,
      address,
      phoneNumber,
      taxIdentificationNumber,
      userId,
      idDocumentUrl: uploadResult.secure_url, // Stocke l'URL du fichier PDF
    },
  });

  return NextResponse.json(newMerchant);
};
