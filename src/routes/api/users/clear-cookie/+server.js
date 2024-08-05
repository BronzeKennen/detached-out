export async function GET() {
    return new Response(
        JSON.stringify({message: 'Cookie Cleared'}),
        {
            status:200,
            headers: {
                'Set-Cookie': 'accessToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
            }
        }
    )
}