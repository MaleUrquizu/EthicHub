//THIS CODE ISN'T WORKING NOR IMPORTED IN PAGE

import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../../Data/DataContextProvider.js';
import '../../Css/Bonds.css';
import Big from "big.js";
import { startOfMonth, endOfMonth, subMonths, isAfter, isBefore } from 'date-fns';


const ShowDetailsEthixChart = () => {
    const { loading, error, data } = useContext(DataContext);
    const dataHoldersEth = data.query11Data?.ethixHolders || [];
    const dataHoldersCelo = data.query12Data?.ethixHolders || [];
    const [showDetail, setShowDetail] = useState(false);
    const [showEth, setShowEth] = useState(true);


    useEffect(() => {
        if (loading) return;
        if (error) {
        console.error(`Error! ${error.message}`);
        return;
        }

    },[loading, error, dataHoldersEth, dataHoldersCelo]);

    const totalEthHolders = dataHoldersEth.length;
    const totalCeloHolders = dataHoldersCelo.length;
    const activeHolders = showEth ? totalEthHolders : totalCeloHolders;
    const activeHoldersData = showEth ? dataHoldersEth : dataHoldersCelo;
    
    const getCurrentHolders = () => {
        return showEth ? dataHoldersEth : dataHoldersCelo;
    };

    const getEthixHoldersLastMonth = () => {
        const currentDate = new Date();
        const firstDayOfLastMonth = startOfMonth(subMonths(currentDate, 1));
        const lastDayOfLastMonth = endOfMonth(subMonths(currentDate, 1));
        const ethixholders = getCurrentHolders();
        return ethixholders.filter(ethixholder => {
            const ethixholderDate = new Date(ethixholder.dateJoined * 1000); 
            return isBefore(ethixholderDate, lastDayOfLastMonth);
        });
    };

    const lastMonthHoldersEth = getEthixHoldersLastMonth(dataHoldersEth).length;
    const lastMonthHoldersCelo = getEthixHoldersLastMonth(dataHoldersCelo).length;
    const lastMonthHoldersStake = showEth ? lastMonthHoldersEth : lastMonthHoldersCelo;

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getUTCFullYear();
        const month = currentDate.getUTCMonth();
        
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthName = months[month];

        const formattedDate = `${monthName} ${year}:`;

        return {
            currentDate,
            year,
            month: monthName,
            formattedDate,
            };
    };

    const currentDateDetails = getCurrentDate();

    const getPreviousMonthDate = () => {
        const currentDate = new Date();
        const previousMonthDate = subMonths(currentDate, 1);
        const year = previousMonthDate.getUTCFullYear();
        const month = previousMonthDate.getUTCMonth();
        
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthName = months[month];

        const formattedDate = `${monthName} ${year}:`;

        return {
            year,
            month: monthName,
            formattedDate,
        };
    };

    const previousMonthDateDetails = getPreviousMonthDate();

    const moveToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    
    const toggleDetail = () => {
        setShowDetail(!showDetail);
        moveToTop();
    };

    const toggleView = () => {
        setShowEth(!showEth);
    };

    return(
        <div>

            <div className='btshow'>
                <button className="butonshow1" onClick={toggleDetail}>
                {showDetail ? 'Hide detail' : 'Show details'}
                </button>
            </div>

            {showDetail && (
                <div className="detailbh">

                    <button className="butonshow2" onClick={toggleDetail}>
                        {showDetail ? 'Hide detail' : 'Show details'}
                    </button>

                    <div className='btshow'>
                        <button className="" onClick={toggleView}>
                            {showEth ? 'Show Celo' : 'Show Ethereum'}
                        </button>
                    </div>

                    <div>
                        <h1>{previousMonthDateDetails.formattedDate} </h1>
                        <h1>{currentDateDetails.formattedDate} {activeHolders} holders </h1>
                        <h1>   </h1>

                    </div>

                </div>
            )}

        </div>
    );
};

export default ShowDetailsEthixChart;




