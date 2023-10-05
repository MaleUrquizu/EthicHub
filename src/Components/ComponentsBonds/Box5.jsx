import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../../Data/DataContextProvider';
import '../../Css/Bonds.css';
import '../../Css/Box.css'

const Box5 = () => {
    const { loading, error, data } = useContext(DataContext);
    const [currentMonthBondHolders, setCurrentMonthBondHolders] = useState([]);
    const [previousMonthBondHolders, setPreviousMonthBondHolders] = useState([]);

    useEffect(() => {
        if (loading) return;
        if (error) {
            console.error(`Error! ${error.message}`);
            return;
        }

        const { bondHolders } = data.query4Data;
        const bondTotals = {};

        bondHolders.forEach((bondHolder) => {
            bondHolder.bonds.forEach((bond) => {
                const mintingDate = new Date(bond.mintingDate * 1000); 
                const monthYear = `${mintingDate.getMonth() + 1}/${mintingDate.getFullYear()}`;

                if (bondTotals.hasOwnProperty(monthYear)) {
                    bondTotals[monthYear] += 1; 
                } else {
                    bondTotals[monthYear] = 1; 
                }
            });
        });

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const currentYear = currentDate.getFullYear();

        const currentMonthKey = `${currentMonth}/${currentYear}`;
        const previousMonthKey = `${previousMonth}/${currentYear}`;

        const currentMonthBondHolders = bondHolders.filter((bondHolder) =>
            bondHolder.bonds.some((bond) => {
                const mintingDate = new Date(bond.mintingDate * 1000);
                const monthYear = `${mintingDate.getMonth() + 1}/${mintingDate.getFullYear()}`;
                return monthYear === currentMonthKey;
            })
        );

        const previousMonthBondHolders = bondHolders.filter((bondHolder) =>
            bondHolder.bonds.some((bond) => {
                const mintingDate = new Date(bond.mintingDate * 1000);
                const monthYear = `${mintingDate.getMonth() + 1}/${mintingDate.getFullYear()}`;
                return monthYear === previousMonthKey;
            })
        );

        setCurrentMonthBondHolders(currentMonthBondHolders);
        setPreviousMonthBondHolders(previousMonthBondHolders);
    }, [loading, error, data]);

    return (
        <div className='box'>
            <h5 className='titlebox'>CELO: </h5>
            <div className='boxdata'>
                <h2 className='currentbhbox'>{currentMonthBondHolders.length}</h2>
                <h2 className='previousbhbox'>Vs last month {previousMonthBondHolders.length}</h2>
            </div>
        </div>
    );
};

export default Box5;