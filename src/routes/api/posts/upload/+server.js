
import cloudinary from 'cloudinary';
import { CLOUD_NAME, API_KEY, API_SECRET } from '$env/static/private';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

export const POST = async ({locals, request }) => {
  const formData = await request.formData();
  const files = formData.getAll('files'); // Get all files
  console.log(files)
  let uploadedFiles = [];

  function getResourceType(mimeType) {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType === 'application/pdf') return 'raw';
    return 'auto'; 
  }

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { resource_type: getResourceType(file.type) }, // Call the function here
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        uploadStream.end(buffer); 
      });

      uploadedFiles.push(result.secure_url); 
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return new Response(
    JSON.stringify({ uploadedFiles }), // Return all the URLs
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};