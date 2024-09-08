

export async function load ({request,locals}) {
    const id = locals.user?.id;
    return {id}    
}