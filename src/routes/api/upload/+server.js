import { json } from '@sveltejs/kit';
import cloudinary from 'cloudinary';
import { CLOUD_NAME,API_KEY,API_SECRET } from '$env/static/private';
import { changeProfilePicture, getUserById } from '../../../../database.js';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

export const POST = async({locals,request}) => {
    const id = locals.user?.id;
    const data = await request.formData();
    const image = data.get('image')

    if(!image) {
        return new Response({error:'No image uploaded'},{status:400})
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
        const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
            if (error) return reject(error);
            resolve(result);
            }
        );
    
        uploadStream.end(buffer)
        });

        const res = changeProfilePicture(id,result.secure_url)
        if(res) {
           return new Response(JSON.stringify({message:'success',url:result.secure_url}),{status:200})
        } else {
            return new Response(JSON.stringify({error:error.message}),{status:500})
        }

    } catch (error) {
        console.log(error)
        return new Response({error:error.message},{status:500})
    }
}