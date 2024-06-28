import React from 'react';
import { TransactionsTable } from '../components/Transactions/TransactionsTable';
import { useAuth } from "../hooks/AuthContext"
import { AddTransactions } from '../components/Transactions/AddTransactions';

export const TransactionsPage: React.FC = () => {
    const { userDetails } = useAuth();

    return (
        <div>
            {userDetails?.isAdmin && <AddTransactions/>}
            <TransactionsTable/>
        </div>
    );
};