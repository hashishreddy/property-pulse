import connectDB from "@/config/Database";
import Property from "@/models/Property"
import { getsessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/Cloudinary";


//GET /api/properties
export const GET = async (request) =>{
    try {
        await connectDB();
        const properties = await Property.find({})
        return new Response(JSON.stringify(properties))
    } catch (error) {
        console.log(error)
        return new Response("something went wrong", { status: 500 });
    }
}

export const POST = async (request)=>{
    try {
        await connectDB()
        const sessionUser = await getsessionUser();
        if (!sessionUser || !sessionUser.user) {
           return new Response("login is required", { status: 401 });
         }
        const {userId} = sessionUser
        
        const formData = await request.formData()
        console.log(userId)

        const amenities = formData.getAll('amenities')
        const images = formData
          .getAll("images")
          .filter((image) => image.name !== "");

        const propertyData = {
          type: formData.get("type"),
          name: formData.get("name"),
          description: formData.get("description"),
          location: {
            street: formData.get("location.street"),
            city: formData.get("location.city"),
            state: formData.get("location.state"),
            zipcode: formData.get("location.zipcode"),
          },
          beds: formData.get("beds"),
          baths: formData.get("baths"),
          square_feet: formData.get("square_feet"),
          amenities,
          rates: {
            weekly: formData.get("rates.weekly"),
            monthly: formData.get("rates.monthly"),
            nightly: formData.get("rates.nightly"),
          },
          seller_info: {
            name: formData.get("seller_info.name"),
            email: formData.get("seller_info.email"),
            phone: formData.get("seller_info.phone"),
          },
          owner: userId,
        //   images,
        };

        const imageUploadPromises = []
        for(const image of images){
          const imageBuffer = await image.arrayBuffer();
          const imageArray = Array.from(new Uint8Array(imageBuffer));
          const imageData = Buffer.from(imageArray);

          // Convert the image data to base64
          const imageBase64 = imageData.toString("base64");

          const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${imageBase64}`,
            {
              folder: "propertypulse",
            }
          );
          imageUploadPromises.push(result.secure_url);

          // Wait for all images to upload
          const uploadedImages = await Promise.all(imageUploadPromises);
          // Add uploaded images to the propertyData object
          propertyData.images = uploadedImages;
        }


        console.log(propertyData)
        
        const newProperty = new Property(propertyData)
        await newProperty.save()

        return Response.redirect(`${process.env.NEXT_PUBLIC_DOMIN}/properties`);
        // return new Response(JSON.stringify({message:'sucesss'}),{status:200})
    } catch (error) {
        console.log(error)
        return new Response("not added", { status: 500 });
    }
}