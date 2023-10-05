import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../../Data/DataContextProvider';
import '../../Css/Bonds.css'
import '../../Css/Box.css'

const Box4 = () => {
    const { query5Data } = useContext(DataContext);
    const [currentMonthBondHolders, setCurrentMonthBondHolders] = useState([]);
    const [previousMonthBondHolders, setPreviousMonthBondHolders] = useState([]);

    useEffect(() => {
        if (!query5Data) return;

        const { dayCountEthixHolders } = query5Data;
        const bondTotals = {};

        dayCountEthixHolders.forEach((holder) => {
            const date = new Date(holder.date); 
            const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

            if (bondTotals.hasOwnProperty(monthYear)) {
                bondTotals[monthYear] += holder.count;
            } else {
                bondTotals[monthYear] = holder.count;
            }
        });

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const currentYear = currentDate.getFullYear();

        const currentMonthKey = `${currentMonth}/${currentYear}`;
        const previousMonthKey = `${previousMonth}/${currentYear}`;

        const currentMonthBondHolders = dayCountEthixHolders.filter(
            (holder) => `${new Date(holder.date).getMonth() + 1}/${new Date(holder.date).getFullYear()}` === currentMonthKey
        );

        const previousMonthBondHolders = dayCountEthixHolders.filter(
            (holder) => `${new Date(holder.date).getMonth() + 1}/${new Date(holder.date).getFullYear()}` === previousMonthKey
        );

        setCurrentMonthBondHolders(currentMonthBondHolders);
        setPreviousMonthBondHolders(previousMonthBondHolders);
    }, [query5Data]);

    return (
        <div className='box'>
            <h5 className='titlebox'>ETH:</h5>
            <div className='boxdata'>
                <h1 className='currentbhbox'>{currentMonthBondHolders.length}</h1>
                <h2 className='previousbhbox'>Vs last month {previousMonthBondHolders.length}</h2>
            </div>
        </div>
    );
};

export default Box4;

