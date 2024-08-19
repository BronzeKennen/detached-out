
import { getUsers } from '/database.js' 
export const GET = () => {

    const users = getUsers();
    return new Response(JSON.stringify({
        body: users
    }, {status:200}));

}
//will add post request to change bios etc