export async function load({locals,request}) {
    const cookies = request.headers.get('cookie') || '';
    const response = await fetch(`http://localhost:5173/api/users/`, {

        method: 'GET',
        headers: {
            'cookie': cookies // Pass the token in Authorization header
        }
    })
    if(response.ok) {
        let workExperience = await response.json();
        console.log(workExperience)
        return{workExperience}
        
    } else {
        console.log('ITS A BOMB');
    }
}