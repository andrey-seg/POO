import { randomUUID } from "node:crypto";

export function GenerateCustomId(instance: object): string{
    const className = instance.constructor.name.toLowerCase();
    return `${className}-${randomUUID()}`;
}