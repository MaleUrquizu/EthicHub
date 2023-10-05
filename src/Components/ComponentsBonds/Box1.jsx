import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../../Data/DataContextProvider.js';
import '../../Css/Bonds.css'
import Big from 'big.js';

const Box1 = () => {
    const { loading, error, data } = useContext(DataContext);
    const [workingCapitalEth, setWorkingCapitalEth] = useState(Big(0)); 
    const [workingCapitalCelo, setWorkingCapitalCelo] = useState(Big(0));

    useEffect(() => {
        if (loading) return;
        if (error) {
            console.error(`Error! ${error.message}`);
            return;
        }

        const bondsEth = data.query1Data.bonds;
        const bondsCelo = data.query2Data.bonds;

        const workingCapitalEth = bondsEth.reduce((total, bond) => {
            if (bond.redeemDate === null) {
              return total.plus(bond.principal);
            }
            return total;
          }, Big(0));
          setWorkingCapitalEth(workingCapitalEth);

       
        const workingCapitalCelo = bondsCelo.reduce((total, bond) => {
            if (bond.redeemDate === null) {
              return total.plus(bond.principal);
            }
            return total;
          }, Big(0));
          setWorkingCapitalCelo(workingCapitalCelo);
    }, [loading, error, data]);


    return (
        <div className='boxliquidity'>
            <div className="boxmature">
                <h5 className='titletomature'>WORKING CAPITAL</h5>
                <h6 className='titletomature'>Current month</h6>
                <div className='month'>
                    <h3 className='h3s1'>ETH: {workingCapitalEth.toFixed(3)} DAI</h3> 
                    <h3 className='h3s2'>CELO: {workingCapitalCelo.toFixed(3)} cUSD</h3>
                </div> 
            </div>
        </div>
    );
};

export default Box1;