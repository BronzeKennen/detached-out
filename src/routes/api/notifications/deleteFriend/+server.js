

import {deleteFriend} from "../../../../../database"

export const DELETE = async ({url}) => {
    const id = url.searchParams.get('friendshipId') 
    console.log(id)

    const res = deleteFriend(id)
    if(res) {
        return new Response({status: 200, message:'Success'});
    } else {
        return new Response({status: 500, message:'An error has occured'});

    }


    
}