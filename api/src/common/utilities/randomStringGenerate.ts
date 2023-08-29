export default function randomString (length:number=16, chars:string='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'):string {
    let result = '';
    for (let i = length; i > 0; --i){
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}