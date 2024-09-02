import {deletePreviousJob} from "../../../../../setters.js"

export const DELETE = async ({url}) => {
    const id = url.searchParams.get('expId') 

    const res = deletePreviousJob(id)
    if(res) {
        return new Response({status: 200, message:'Success'});
    } else {
        return new Response({status: 500, message:'An error has occured'});

    }


    
}