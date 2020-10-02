import { Transaction } from '../integrations/stitch/types';

export type MonthSummary = {
    month: string
    income: number
    expenses: number
};

export type IncomeExpenseSummary = MonthSummary[];

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function getMonthLabel(date: Date): string {
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function summarize(summary: IncomeExpenseSummary, transaction: Transaction): IncomeExpenseSummary {
    const transactionMonth = getMonthLabel(new Date(transaction.date));
    let monthSummary = summary.find(x => x.month === transactionMonth);
    if (!monthSummary) {
        monthSummary = {
            month: transactionMonth,
            expenses: 0,
            income: 0
        };
        summary.push(monthSummary);
    }

    const quantity = Number.parseFloat(transaction.amount.quantity);
    if (quantity < 0) {
        monthSummary.expenses -= quantity;
    } else {
        monthSummary.income += quantity;
    }
    return summary;
}

export function getIncomeAndExpenses(transactions: Transaction[] | undefined): IncomeExpenseSummary {
    const emptySummary: IncomeExpenseSummary = [];
    if (!transactions || transactions.length === 0) {
        return emptySummary;
    }
    return transactions
        .sort((a, b) => (a.date > b.date) ? 1 : -1)
        .reduce(summarize, emptySummary)
        .map(value => {
            // Apply 2 decimal rounding
            value.income = Math.round(value.income * 100) / 100;
            value.expenses = Math.round(value.expenses * 100) / 100;
            return value;
        });
}
