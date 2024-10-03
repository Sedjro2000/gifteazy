import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary';


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(req: NextRequest) {
  try {
    
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'Image non fournie' }, { status: 400 });
    }

  
    const uploadResult = await cloudinary.v2.uploader.upload(image, {
      folder: 'product_images',  
    });

    
    return NextResponse.json({
      message: 'Image téléchargée avec succès',
      imageUrl: uploadResult.secure_url,  
    });
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload de l\'image' },
      { status: 500 }
    );
  }
}
