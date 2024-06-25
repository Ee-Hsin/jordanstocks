import React from 'react';
import { TransactionsTable } from '../components/Transactions/TransactionsTable';
import { useAuth } from "../hooks/AuthContext"
import { UpdateTransactions } from '../components/Transactions/UpdateTransactions';

export const TransactionsPage: React.FC = () => {
    const { userDetails } = useAuth();

    return (
        <div>
            {userDetails?.isAdmin && <UpdateTransactions/>}
            <TransactionsTable/>
        </div>
    );
};