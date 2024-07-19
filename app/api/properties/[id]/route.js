import connectDB from "@/config/Database";
import Property from "@/models/Property";
import { getsessionUser } from "@/utils/getSessionUser";
//GET /api/properties/:id
export const GET = async (request,{params}) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    if(!property) return new Response('property non found',{status:404})
    return new Response(JSON.stringify(property));
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};


//DELETE /api/properties/:id
export const DELETE = async (request,{params}) => {
  try {
    await connectDB();
    const propertyId = params.id
    const sessionUser = await getsessionUser()
    if(!sessionUser || !sessionUser.userId){
      return new Responce('userId is required',{status:401})
    }
    
    const {userId} = sessionUser;

    
    const property = await Property.findById(propertyId);


    if(!property) return new Response('property non found',{status:404})
    
    console.log('property')
    if(property.owner.toString()!=userId){
      return new Responce("unauthorized", { status: 401 });
    }

    await property.deleteOne()

    return new Response('property deleted',{status:200});

  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};
