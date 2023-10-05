
import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../../Data/DataContextProvider';
import '../../Css/Bonds.css';
import Big from "big.js";

const ShowDetailsChart1 = () => {
    const { loading, error, data } = useContext(DataContext);
    const bondsEth = data.query1Data?.bonds || [];
    const bondsCelo = data.query2Data?.bonds || [];
    const [showDetail, setShowDetail] = useState(false);
    const [showEth, setShowEth] = useState(true);
    const [showAllBonds, setShowAllBonds] = useState(false);
    const [showRedeemedBonds, setShowRedeemedBonds] = useState(false);
    const [showMaturedBonds, setShowMaturedBonds] = useState(false);
    const [showActiveBonds, setShowActiveBonds] = useState(false);
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

    }, [loading, error, bondsEth, bondsCelo]);

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

    const activeAllBonds = showEth ? bondsEth : bondsCelo;

    const secondsToMonths = (seconds) => {
        const secondsInAMonth = 2592000;
        return Math.round(seconds / secondsInAMonth);
    };

    const countBondsWithRedeemDate = () => {
        let count = 0;
        activeAllBonds.forEach((bond) => {
            if (bond.redeemDate !== null && bond.redeemDate !== '') {
                count++;
            }
        });
        return count;
    };

    const calculateTotalActive = () => {
        return activeAllBonds.length - countBondsWithRedeemDate();
    };

    const calculateTotalPrincipal = () => {
        let total = 0;
        activeAllBonds.forEach((bond) => {
            total += parseFloat(bond.principal);
        });
        return total;
    };

    const calculateTotalWithdrawn = () => {
        let total = 0;
        activeAllBonds.forEach((bond) => {
            if (bond.withdrawn) {
                total += parseFloat(bond.withdrawn);
            }
        });
        return total;
    };

    const calculateTotalYield = () => {
        const totalYield = activeAllBonds.reduce((acc, bond) => {
            const interest = Big(bond.maturity).mul(bond.interest).div("1e18");
            const yieldValor = Big(interest).mul(Big(bond.principal)).mul("0.01");
            return acc.plus(yieldValor);
        }, Big(0));
        return totalYield.toFixed(4);
    };

    const toggleAllBonds = () => {
        setShowAllBonds(!showAllBonds);
        setShowRedeemedBonds(false);
        setShowMaturedBonds(false);
        setShowActiveBonds(false);
    };

    const toggleRedeemedBonds = () => {
        setShowRedeemedBonds(!showRedeemedBonds);
        setShowAllBonds(false);
        setShowMaturedBonds(false);
        setShowActiveBonds(false);
    };

    const toggleMaturedBonds = () => {
        setShowMaturedBonds(!showMaturedBonds);
        setShowAllBonds(false);
        setShowRedeemedBonds(false);
        setShowActiveBonds(false);
    };

    const toggleActiveBonds = () => {
        setShowActiveBonds(!showActiveBonds);
        setShowAllBonds(false);
        setShowRedeemedBonds(false);
        setShowMaturedBonds(false);
    };

    const redeemedBonds = activeAllBonds.filter(bonds => bonds.redeemDate !== null && bonds.redeemDate !== '');

    const maturedAndActiveBonds = activeAllBonds.filter((bonds) =>
        new Date(bonds.maturityDate * 1000) <= new Date() &&
        (bonds.redeemDate === null || bonds.redeemDate === '')
    );

    const detailActiveBonds = activeAllBonds.filter((bond) => !bond.redeemDate);

    const calculateTotalPrincipalActive = () => {
        let total = 0;
        detailActiveBonds.forEach((bond) => {
            total += parseFloat(bond.principal);
        });
        return total.toFixed(4);
    };

    const calculateTotalPrincipalMatured = () => {
        let total = 0;
        maturedAndActiveBonds.forEach((bond) => {
            total += parseFloat(bond.principal);
        });
        return total.toFixed(4);
    };

    const calculateTotalYieldMatured = () => {
        const totalYield = maturedAndActiveBonds.reduce((acc, bond) => {
            const interest = Big(bond.maturity).mul(bond.interest).div("1e18");
            const yieldValor = Big(interest).mul(Big(bond.principal)).mul("0.01");
            return acc.plus(yieldValor);
        }, Big(0));
        return totalYield.toFixed(4);
    };

    return (
        <div>
            <div className='btshow'>
                <button className="butonshow1" onClick={toggleDetail}>
                    {showDetail ? 'Hide detail' : 'Show details'}
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
                    <div className='general-minted'>
                        <h3 className="minted-info">TOTAL MINTED {activeAllBonds.length}</h3>
                        <h3 className="minted-info">TOTAL ACTIVE {calculateTotalActive()}</h3>
                        <h3 className="minted-info"> TOTAL REDEEMED {countBondsWithRedeemDate()}</h3>
                    </div>
                    <div className='general-btn'>
                        <div className='btshow'>
                            <button className="butonshow2" onClick={toggleAllBonds}>
                                {showAllBonds ? 'Hide All Bonds' : 'Show All Bonds'}
                            </button>
                        </div>
                        <div className='btshow'>
                            <button className="butonshow2" onClick={toggleActiveBonds}>
                                {showActiveBonds ? 'Hide Active Bonds' : 'Show Active Bonds'}
                            </button>
                        </div>
                        <div className='btshow'>
                            <button className="butonshow2" onClick={toggleMaturedBonds}>
                                {showMaturedBonds ? 'Hide Matured Bonds' : 'Show Matured Bonds'}
                            </button>
                        </div>
                        <div className='btshow'>
                            <button className="butonshow2" onClick={toggleRedeemedBonds}>
                                {showRedeemedBonds ? 'Hide Redeemed Bonds' : 'Show Redeemed Bonds'}
                            </button>
                        </div>
                    </div>
                    {showAllBonds && (
                        <div>
                            <div className='general-allbonds'>
                                <h3 className='allbonds-btns'>Total Principal Invested: {calculateTotalPrincipal().toFixed(3)} {showEth ? '(DAI)' : '(cUSD)'}</h3>
                                <h3 className='allbonds-btns'> Total Yield Generated: {calculateTotalYield()} {showEth ? '(DAI)' : '(cUSD)'}</h3>
                                <h3 className='allbonds-btns'>Total Principal Withdrawn: {calculateTotalWithdrawn().toFixed(3)} {showEth ? '(DAI)' : '(cUSD)'}</h3>
                            </div>
                            <thead className='head-table'>
                                <tr>
                                    <th className='bh-table'>Token ID</th>
                                    <th className='bh-table'>Type</th>
                                    <th className='bh-table'>Maturity</th>
                                    <th className='bh-table'>APR</th>
                                    <th className='bh-table'>Principal {showEth ? '(DAI)' : '(cUSD)'}:</th>
                                    <th className='bh-table'>Yield {showEth ? '(DAI)' : '(cUSD)'}:</th>
                                    <th className='bh-table'>Withdrawn {showEth ? '(DAI)' : '(cUSD)'}:</th>
                                    <th className='bh-table'>Minting date</th>
                                    <th className='bh-table'>Maturity date</th>
                                    <th className='bh-table'>Redeem date</th>
                                </tr>
                            </thead>
                            {activeAllBonds.map((bonds, index) => {
                                const months = secondsToMonths(bonds.maturity);
                                const mintingDate = new Date(bonds.mintingDate * 1000).toDateString();
                                const maturityDate = new Date(bonds.maturityDate * 1000).toDateString();
                                const withdrawn = bonds.withdrawn ? (bonds.withdrawn).toString() : "-";
                                const redeemDate = bonds.redeemDate ? new Date(bonds.redeemDate * 1000).toDateString() : "-";
                                const interest = Big(bonds.maturity).mul(bonds.interest).div("1e18");
                                const interestAnual = () => {
                                    const porcentaje = interest.toFixed(1);
                                    if (porcentaje === "9.0") {
                                        return "9.0";
                                    } else if (porcentaje === "3.5") {
                                        return (Big(porcentaje).mul("2")).toString();
                                    } else if (porcentaje === "1.5") {
                                        return (Big(porcentaje).mul("4")).toString();
                                    } else {
                                        return "N/A";
                                    }
                                };
                                const yieldValor = Big(interest).mul(Big(bonds.principal)).mul("0.01");
                                return (
                                    <tbody className='b-table'>
                                        <td className='body-table'>{bonds.id}</td>
                                        <td className='body-table'>{bonds.size}</td>
                                        <td className='body-table'>{months} months</td>
                                        <td className='body-table'>{interestAnual()}%</td>
                                        <td className='body-table'>{bonds.principal}</td>
                                        <td className='body-table'>{yieldValor.toFixed(3)}</td>
                                        <td className='body-table'>{withdrawn}</td>
                                        <td className='body-table'>{maturityDate}</td>
                                        <td className='body-table'>{mintingDate}</td>
                                        <td className='body-table'>{redeemDate}</td>
                                    </tbody>
                                )
                            })}
                        </div>
                    )}
                    {showActiveBonds && (
                        <div>
                            <h3 className='allbonds-card'> Total Principal Active {calculateTotalPrincipalActive()}{showEth ? '(DAI)' : '(cUSD)'}</h3>
                            <thead className='abhead-table'>
                                <th className='ab-table'>Nº:</th>
                                <th className='ab-table'>Token Id:</th>
                                <th className='ab-table'>Type:</th>
                                <th className='ab-table'>Maturity</th>
                                <th className='ab-table'>APR</th>
                                <th className='ab-table'>Principal {showEth ? '(DAI)' : '(cUSD)'}:</th>
                                <th className='ab-table'>Yield {showEth ? '(DAI)' : '(cUSD)'}:</th>
                                <th className='ab-table'>Maturity date:</th>
                            </thead>
                            {detailActiveBonds.map((bonds, index) => {
                                const maturityDate = new Date(bonds.maturityDate * 1000).toDateString();
                                const months = secondsToMonths(bonds.maturity);
                                const interest = Big(bonds.maturity).mul(bonds.interest).div("1e18");
                                const interestAnual = () => {
                                    const porcentaje = interest.toFixed(1);
                                    if (porcentaje === "9.0") {
                                        return "9.0";
                                    } else if (porcentaje === "3.5") {
                                        return (Big(porcentaje).mul("2")).toString();
                                    } else if (porcentaje === "1.5") {
                                        return (Big(porcentaje).mul("4")).toString();
                                    } else {
                                        return "N/A";
                                    }
                                };
                                const yieldValor = Big(interest).mul(Big(bonds.principal)).mul("0.01");
                                return (
                                    <tbody className='abtable' key={index}>
                                        <td className='ab-bodytable'>{index + 1}</td>
                                        <td className='ab-bodytable'>{bonds.id}</td>
                                        <td className='ab-bodytable'>{bonds.size}</td>
                                        <td className='ab-bodytable'>{months} months</td>
                                        <td className='ab-bodytable'>{interestAnual()}%</td>
                                        <td className='ab-bodytable'>{bonds.principal}</td>
                                        <td className='ab-bodytable'>{yieldValor.toFixed()}</td>
                                        <td className='ab-bodytable'>{maturityDate}</td>
                                    </tbody>
                                )
                            })}
                        </div>
                    )}
                    {showMaturedBonds && (
                        <div>
                            <div className='maturecard-container'>
                                <h3 className='mature-card'> Total Principal Matured {calculateTotalPrincipalMatured()}{showEth ? '(DAI)' : '(cUSD)'}</h3>
                                <h3 className='mature-card'> Total Yield Matured {calculateTotalYieldMatured()}{showEth ? '(DAI)' : '(cUSD)'}</h3>
                            </div>
                            <thead className='matured-table'>
                                <th className='mat-table'>Nº:</th>
                                <th className='mat-table'>Token Id:</th>
                                <th className='mat-table'>Type:</th>
                                <th className='mat-table'>Maturity</th>
                                <th className='mat-table'>APR</th>
                                <th className='mat-table'>Principal {showEth ? '(DAI)' : '(cUSD)'}:</th>
                                <th className='mat-table'>Yield {showEth ? '(DAI)' : '(cUSD)'}:</th>
                                <th className='mat-table'>Maturity date:</th>
                            </thead>
                            {maturedAndActiveBonds.map((bonds, index) => {
                                const maturityDate = new Date(bonds.maturityDate * 1000).toDateString();
                                const months = secondsToMonths(bonds.maturity);
                                const interest = Big(bonds.maturity).mul(bonds.interest).div("1e18");
                                const interestAnual = () => {
                                    const porcentaje = interest.toFixed(1);
                                    if (porcentaje === "9.0") {
                                        return "9.0";
                                    } else if (porcentaje === "3.5") {
                                        return (Big(porcentaje).mul("2")).toString();
                                    } else if (porcentaje === "1.5") {
                                        return (Big(porcentaje).mul("4")).toString();
                                    } else {
                                        return "N/A";
                                    }
                                };
                                const yieldValor = Big(interest).mul(Big(bonds.principal)).mul("0.01");
                                return (
                                    <tbody className='mat-body' key={index}>
                                        <td className='mat-bodytable'>{index + 1}</td>
                                        <td className='mat-bodytable'>{bonds.id}</td>
                                        <td className='mat-bodytable'>{bonds.size}</td>
                                        <td className='mat-bodytable'>{months} months</td>
                                        <td className='mat-bodytable'>{interestAnual()}%</td>
                                        <td className='mat-bodytable'>{bonds.principal}</td>
                                        <td className='mat-bodytable'>{yieldValor.toFixed()}</td>
                                        <td className='mat-bodytable'>{maturityDate}</td>
                                    </tbody>
                                )
                            })}
                        </div>
                    )}
                    {showRedeemedBonds && (
                        <div>
                            <h3 className='redeem-card'>Total Principal Withdrawn: {calculateTotalWithdrawn().toFixed(3)} {showEth ? '(DAI)' : '(cUSD)'}</h3>
                            <thead className='red-table'>
                                <th className='redeem-table'>Nº:</th>
                                <th className='redeem-table'>Token Id:</th>
                                <th className='redeem-table'>Type</th>
                                <th className='redeem-table'>Maturity:</th>
                                <th className='redeem-table'>APR:</th>
                                <th className='redeem-table'>Principal {showEth ? '(DAI)' : '(cUSD)'}:</th>
                                <th className='redeem-table'>Yield {showEth ? '(DAI)' : '(cUSD)'}:</th>
                                <th className='redeem-table'>Withdrawn {showEth ? '(DAI)' : '(cUSD)'}:</th>
                                <th className='redeem-table'>Redeem date:</th>
                            </thead>
                            {redeemedBonds.map((bonds, index) => {
                                const months = secondsToMonths(bonds.maturity);
                                const interest = Big(bonds.maturity).mul(bonds.interest).div("1e18");
                                const interestAnual = () => {
                                    const porcentaje = interest.toFixed(1);
                                    if (porcentaje === "9.0") {
                                        return "9.0";
                                    } else if (porcentaje === "3.5") {
                                        return (Big(porcentaje).mul("2")).toString();
                                    } else if (porcentaje === "1.5") {
                                        return (Big(porcentaje).mul("4")).toString();
                                    } else {
                                        return "N/A";
                                    }
                                };
                                const yieldValor = Big(interest).mul(Big(bonds.principal)).mul("0.01");
                                const redeemDate = bonds.redeemDate ? new Date(bonds.redeemDate * 1000).toDateString() : "-";
                                const withdrawn = bonds.withdrawn ? (bonds.withdrawn).toString() : "-";
                                return (
                                    <tbody className='red-body' key={index}>
                                        <td className='redeem-bt'>{index + 1}</td>
                                        <td className='redeem-bt'>{bonds.id}</td>
                                        <td className='redeem-bt'>{bonds.size}</td>
                                        <td className='redeem-bt'>{months} months</td>
                                        <td className='redeem-bt'>{interestAnual()}%</td>
                                        <td className='redeem-bt'>{bonds.principal}</td>
                                        <td className='redeem-bt'>{yieldValor.toFixed()}</td>
                                        <td className='redeem-bt'>{withdrawn}</td>
                                        <td className='redeem-bt'>{redeemDate}</td>
                                    </tbody>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShowDetailsChart1;


