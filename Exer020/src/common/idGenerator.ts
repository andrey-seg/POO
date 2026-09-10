export function generateCustomId(prefix: string = ''): string {

    const timeStamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000000000);
    return `${prefix}${timeStamp}-${randomNum}`;
}