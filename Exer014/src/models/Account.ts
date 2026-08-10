import { AccountType } from "../enums/AccontType";
import { TransactionType } from "../enums/TransactionType";
import { Transaction } from "./Transaction";

export class Account{
    private __id: string;
    private __owner: string;
    private __balance: number;
    private __type: AccountType;
    private __transactions: Transaction[];

    constructor(id: string, owner: string, balance: number, type: AccountType){
        this.__id = id;
        this.__owner = owner;
        this.__balance = balance;
        this.__type = type;
        this.__transactions = [];
    };

    deposit(amount: number, description: string): void{
        if(amount <= 0){
            throw new Error(`Invalid deposit invalid`);
        };

        const newTransaction = new Transaction(
            `txn-${this.__transactions.length + 1}`,
            TransactionType.DEPOSIT,
            amount,
            new Date().toISOString(),
            description
        );

        this.__balance += amount; 
        this.__transactions.push(newTransaction);
    };

    withdraw(amount: number, description: string): void{
        if(amount <= 0 || amount > this.__balance){
            throw new Error(`Invalid withdraw value`);
        };

        const newWithdraw = new Transaction(
            `txn-${this.__transactions.length + 1}`,
            TransactionType.WITHDRAWWAL,
            amount,
            new Date().toISOString(),
            description
        );

        this.__balance -= amount;
        this.__transactions.push(newWithdraw);
    };

    getStatement(): Transaction[]{
        return this.__transactions;
    };

    toString(){
        return `ID => ${this.__id} | Owner => ${this.__owner} | Balance => ${this.__balance} | Type => ${this.__type} | Transactions => ${this.__transactions}`;
    };

    getId(){
        return this.__id;
    };

    getOwner(){
        return this.__owner;
    };

    getBalance(){
        return this.__balance;
    };

    getType(){
        return this.__type;
    };

    getTransactions(){
        return this.__transactions;
    };
};