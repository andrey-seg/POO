export interface I_Repository<T>{

    findById(id: string): Promise<T | null>;
    findAll(): Promise<T>;
    save(id: string): Promise<T>;
    delete(is: string): Promise<boolean>;
}