import { AccountType } from "../enums/AccontType";
import { I_ApiResponse } from "../intrefaces/ApiResponse";
import { Account } from "../models/Account";
import { Transaction } from "../models/Transaction";

export class BankService{
    //no cusntructor neded
    private __accountsList: Account[] = [];

    createAccont(owner: string, type: AccountType): I_ApiResponse<Account>{
        const newAccount = new Account(
            `Txs-${this.__accountsList.length + 1}`,
            owner,
            0,
            type,
        );

        this.__accountsList.push(newAccount);
        return { success: true, data: newAccount };
    };

    deposit(accountID: string, amount: number, description: string): I_ApiResponse<Account>{
        const account = this.__accountsList.find(a => a.getId() === accountID);
        
        if(!account){
            return { success: false, error: `Account not fond` };
        };

        try{
            account.deposit(amount, description);
            return { success: true, data: account };
        }catch(error){
            return { success: false, error: (error as Error).message };
        };
    };

    withdraw(accountID: string, amount: number, description: string): I_ApiResponse<Account>{
        const account = this.__accountsList.find(a => a.getId() === accountID);

        if(!account){
            return { success: false, error: `Account not fond` };
        };

        try{
            account.withdraw(amount, description);
            return { success: true, data: account }
        }catch(error){
            return { success: false, error: (error as Error).message};
        };
    };

    transfer(fromId: string, toId: string, amount: number): I_ApiResponse<Account>{
        const fromAccount = this.__accountsList.find(a => a.getId() === fromId);
        const toAccount = this.__accountsList.find(a => a.getId() === toId);

        if(!fromAccount || !toAccount){
            return { success: false, error: `Account not found`};
        };

        try{
        fromAccount.withdraw(amount, `Transfer to ${toId}`);
        toAccount.deposit(amount, `Transfer from ${fromId}`);
        return { success: true, data: fromAccount }
        }catch(error){
            return { success: false, error: (error as Error).message };
        };
    };

    getStatement(accountID: string): I_ApiResponse<Transaction[]>{
        const account = this.__accountsList.find(a => a.getId() === accountID);

        if(!account){
            return { success: false, error: `Account not found` };
        };

        try{
        return { success: true, data: account.getStatement() };
        }catch(error){
            return { success: false, error: (error as Error).message };
        };
    };
}