
import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../../Data/DataContextProvider.js';
import '../../Css/Bonds.css';


const ShowDetailsPieChart = () => {
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

    }, [loading, error, stakeHoldersEth, stakeHoldersCelo]);

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getUTCFullYear();
        const month = currentDate.getUTCMonth();
        const day = currentDate.getUTCDate();
        const hours = currentDate.getUTCHours();
        const minutes = currentDate.getUTCMinutes();
        const seconds = currentDate.getUTCSeconds();

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthName = months[month];

        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = weekdays[currentDate.getUTCDay()];

        const formattedDate = `${dayOfWeek}, ${day} ${monthName} ${year} ${hours}:${minutes}:${seconds} GMT`;

        return {
            currentDate,
            year,
            month: monthName,
            day,
            hours,
            minutes,
            seconds,
            dayOfWeek,
            formattedDate,
        };
    };

    const currentDateDetails = getCurrentDate();

    const activeHoldersThismonth = showEth ? stakeHoldersEth : stakeHoldersCelo;

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

                    <div className='stakeinfo-cards'>
                        <h3 className='stake-cards'>{currentDateDetails.formattedDate}</h3>
                        <h3 className='stake-cards'>Total Holders {showEth ? 'Eth' : 'Celo'} {activeHoldersThismonth.length} holders </h3>
                    </div>

                    <thead>
                        <tr>
                            <th className='staketb-head'>Rank</th>
                            <th className='staketb-head'>Address</th>
                            <th className='staketb-head'>Quantity</th>
                            <th className='staketb-head'>Stake Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {activeHoldersThismonth.map((stakeEthixHolders, index) => {
                            const allTypes = stakeEthixHolders.type.join(', ');
                            return (

                                <tr key={index}>
                                    <td className='staketb-body'>{index + 1}</td>
                                    <td className='staketb-body'>{stakeEthixHolders.id}</td>
                                    <td className='staketb-body'>{stakeEthixHolders.totalAmount}</td>
                                    <td className='staketb-body'>{allTypes}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                </div>
            )}

        </div>
    );
};

export default ShowDetailsPieChart;