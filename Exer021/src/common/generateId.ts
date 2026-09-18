export function generateCustomId<T>(instance: T): string{
    const className = (instance as any).constructor.name.toLowerCase();
    const timeStamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000000000);
    return `${className}-${timeStamp}-${randomNum}`;
}

//Esta classe deve ser utilizada para gerar o ID de TODAS as classes a serem implementadas.