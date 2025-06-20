export default function generateUserId(){
    const newUserId = Math.floor(10000 + Math.random() * 90000).toString()
    return newUserId
}