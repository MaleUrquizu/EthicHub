import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../../Data/DataContextProvider.js';
import '../../Css/Bonds.css';
import Big from "big.js";
import { startOfMonth, endOfMonth, subMonths, isAfter, isBefore } from 'date-fns';


const ShowDetailsChartsStake = () => {
    const { loading, error, data } = useContext(DataContext);
    const stakeHoldersEth = data.query9Data?.stakeEthixHolders || [];
    const stakeHoldersCelo = data.query10Data?.stakeEthixHolders || [];
    const [showDetail, setShowDetail] = useState(false);
    const [showEth, setShowEth] = useState(true);
    const [activeCurrency, setActiveCurrency] = useState('CELO');

    const handleCurrencyChange = (currency) => {
        setActiveCurrency(currency);
        setShowEth(currency === 'ETH');
    };

    useEffect(() => {
        if (loading) return;
        if (error) {
            console.error(`Error! ${error.message}`);
            return;
        }

    }, [loading, error, stakeHoldersEth, stakeHoldersCelo, showEth]);

    const getCurrentHolders = () => {
        return showEth ? stakeHoldersEth : stakeHoldersCelo;
    };

    const currentHoldersStake = getCurrentHolders();

    const getStakeholdersJoinedThisMonth = () => {
        const currentDate = new Date();
        const firstDayOfThisMonth = startOfMonth(currentDate);
        const lastDayOfThisMonth = endOfMonth(currentDate);
        const stakeholders = getCurrentHolders();
        return stakeholders.filter(stakeholder => {
            const stakeholderDate = new Date(stakeholder.dateJoined * 1000); // Convert seconds to milliseconds
            return isAfter(stakeholderDate, firstDayOfThisMonth) && isBefore(stakeholderDate, lastDayOfThisMonth);
        });
    };


    const getThisMonthHoldersEth = getStakeholdersJoinedThisMonth(stakeHoldersEth).length
    const getThisMonthHoldersCelo = getStakeholdersJoinedThisMonth(stakeHoldersCelo).length

    const newHoldersStake = showEth ? getThisMonthHoldersEth : getThisMonthHoldersCelo;

    const newStakeHoldersDataEth = getStakeholdersJoinedThisMonth(stakeHoldersEth)
    const newStakeHoldersDataCelo = getStakeholdersJoinedThisMonth(stakeHoldersCelo)
    const newHoldersStakeData = showEth ? newStakeHoldersDataEth : newStakeHoldersDataCelo;

    const calculateTotalAmount = () => {
        const totalAmount = newHoldersStakeData.reduce((accumulator, stakeholder) => {
            const amount = parseFloat(stakeholder.totalAmount);
            return accumulator + amount;
        }, 0);

        return totalAmount;
    };

    const totalAmountStakeEthixHoldersEth = calculateTotalAmount(newStakeHoldersDataEth);
    const totalAmountStakeEthixHoldersCelo = calculateTotalAmount(newStakeHoldersDataCelo);
    const totalAmountStake = showEth ? totalAmountStakeEthixHoldersEth : totalAmountStakeEthixHoldersCelo;

    const getStakeholdersLastMonth = () => {
        const currentDate = new Date();
        const firstDayOfLastMonth = startOfMonth(subMonths(currentDate, 1));
        const lastDayOfLastMonth = endOfMonth(subMonths(currentDate, 1));
        const stakeholders = getCurrentHolders();
        return stakeholders.filter(stakeholder => {
            const stakeholderDate = new Date(stakeholder.dateJoined * 1000);
            return isBefore(stakeholderDate, lastDayOfLastMonth);
        });
    };

    const lastMonthHoldersEth = getStakeholdersLastMonth(stakeHoldersEth).length;
    const lastMonthHoldersCelo = getStakeholdersLastMonth(stakeHoldersCelo).length;
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
        setActiveCurrency(!showEth ? 'ETH' : 'CELO');
    };

    return (
        <div>

            <div className='btshow'>
                <button className="butonshow1" onClick={toggleDetail}>
                    {showDetail ? 'Close' : 'Show details'}
                </button>
            </div>

            {showDetail && (
                <div className="detailbh">
                    <div className="el-switch" style={{ overflowX: 'hidden' }}>
                        <button className="buton-hideshow" onClick={toggleDetail}>
                            {showDetail ? 'Close' : 'Show details'}
                        </button>
                        <span className={activeCurrency === 'ETH' ? 'active' : ''}
                            onClick={() => handleCurrencyChange('ETH')}>ETH</span>
                        <input type="checkbox" id="switch" />
                        <label for="switch" onClick={toggleView}>
                            {showEth ? 'ETH' : 'CELO'}
                        </label>
                        <span className={activeCurrency === 'CELO' ? 'active' : ''}
                            onClick={() => handleCurrencyChange('CELO')}>CELO</span>
                    </div>

                    <div className='infocard-stk'>
                        <h3 className='infocards-stake'>{previousMonthDateDetails.formattedDate} {lastMonthHoldersStake} holders</h3>
                        <h3 className='infocards-stake'>{currentDateDetails.formattedDate} {currentHoldersStake.length} holders</h3>
                        <h3 className='infocards-stake'>+{newHoldersStake} holders </h3>
                    </div>

                    <div>

                        <div className='infocard2-stk'>
                            <h3 className='infocards-stake'> Total addresses joined - {newHoldersStake} </h3>
                            <h3 className='infocards-stake'> {totalAmountStake} stk ethix</h3>
                        </div>

                        <thead  className='stake-table'>
                            <tr>
                                <th className='stake-headt'>Address</th>
                                <th className='stake-headt'>Stake Ethix</th>
                            </tr>
                        </thead>
                            
                        {newHoldersStakeData.map((stakeEthixHolders, index) => {

                            return (
                                <div>
                                    <tbody className='stake-table' key={index}>
                                        <td className='stake-bodyt'>{stakeEthixHolders.id}</td>
                                        <td className='stake-bodyt'>{stakeEthixHolders.totalAmount} stk ethix</td>
                                    </tbody>
                                </div>
                            )
                        })}

                    </div>

                </div>
            )}

        </div>
    );
};

export default ShowDetailsChartsStake;










