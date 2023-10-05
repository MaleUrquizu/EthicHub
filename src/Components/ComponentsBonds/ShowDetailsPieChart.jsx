import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../../Data/DataContextProvider';
import '../../Css/Bonds.css';

const ShowDetailsPieChart = () => {
    const { loading, error, data } = useContext(DataContext);
    const bondHoldersEth = data.query3Data?.bondHolders || [];
    const bondHoldersCelo = data.query4Data?.bondHolders || [];
    const [addPrincipalTotalEth, setaddPrincipalTotalEth] = useState(0);
    const [addPrincipalTotalCelo, setaddPrincipalTotalCelo] = useState(0);
    const [showEth, setShowEth] = useState(true);
    const [showDetail, setShowDetail] = useState(false);
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
        const addPrincipalTotalEth = calculateaddPrincipalTotal(bondHoldersEth);
        const addPrincipalTotalCelo = calculateaddPrincipalTotal(bondHoldersCelo);
        setaddPrincipalTotalEth(addPrincipalTotalEth);
        setaddPrincipalTotalCelo(addPrincipalTotalCelo);
    }, [loading, error, bondHoldersEth, bondHoldersCelo]);
    const calculateaddPrincipalTotal = (bondHolders) => {
        let addPrincipalTotal = 0;
        bondHolders.forEach((bondHolder) => {
            bondHolder.bonds.forEach((bond) => {
                addPrincipalTotal += parseFloat(bond.principal);
            });
        });
        return addPrincipalTotal;
    };
    const calculateaddPrincipalPorBondHolder = (bondHolder) => {
        let addPrincipalBondHolder = 0;
        bondHolder.bonds.forEach((bond) => {
            addPrincipalBondHolder += parseFloat(bond.principal);
        });
        return addPrincipalBondHolder;
    };
    const toggleView = () => {
        setShowEth(!showEth);
        setActiveCurrency(!showEth ? 'ETH' : 'CELO');
    };
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
    const activeBondHolders = showEth ? bondHoldersEth : bondHoldersCelo;
    const addPrincipalTotal = showEth ? addPrincipalTotalEth : addPrincipalTotalCelo;
    return (
        <>
            <div>
                <div className='btshow'>
                    <button className="butonshow1" onClick={toggleDetail}>
                        {showDetail ? 'Close' : 'Show details'}
                    </button>
                </div>
                 {showDetail && (
                    <div className="detailbh">                               
                        <div className="el-switch" style={{overflowX:'hidden'}}>
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
                                                 
                        <div className='container-tarjetas'>
                         <div className='total-bondholders'><h3>Total Bondholders: {activeBondHolders.length}</h3></div>
                         <div className='principal-invested'><h3>Principal invested: {addPrincipalTotal.toFixed(3)} {showEth ? '(DAI)' : '(cUSD)'}</h3></div>
                         </div> 
                        
                            <thead>
                                <tr>
                                    <th className='total-bh'>Rank</th>
                                    <th className='total-bh'>ID</th>
                                    <th className='total-bh'>Total Bonds</th>
                                    <th className='total-bh'>Total bonds Active</th>
                                    <th className='total-bh'>Total bonds Redeemed</th>
                                    <th className='total-bh'>Total principal invested{showEth ? '(dai)' : '(cUSD)'}</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {activeBondHolders.map((bondHolder, index) => (
                                    <tr key={index}>
                                        <td className='totalbh-body'>{index + 1}</td>
                                        <td className='totalbh-body'>{bondHolder.id}</td>
                                        <td className='totalbh-body'>{bondHolder.totalBonds}</td>
                                        <td className='totalbh-body'>{bondHolder.totalActive}</td>
                                        <td className='totalbh-body'>{bondHolder.totalRedeemed}</td>
                                        <td className='totalbh-body'>{calculateaddPrincipalPorBondHolder(bondHolder).toFixed(3)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        
                    </div>
                )}
            </div>
        </>
    );
};
 export default ShowDetailsPieChart;

