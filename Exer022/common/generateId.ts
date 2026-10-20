export function GenerateCustomId<T>(instance: T): string{

    const className = (instance as any).constructor.name.toLowerCase();
    const timeStamp = Date.now();
    const randomNum = Math.floor(Math.random() * 100000000);
    return `${className} - ${timeStamp} - ${randomNum}`;
}