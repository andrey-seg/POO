export function GenerateCustomId(instance: object): string{

    const className = (instance as any).constructor.name.toLowerCase();
    return `${className} = ${crypto.randomUUID()}`;
}