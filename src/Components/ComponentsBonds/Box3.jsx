import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../../Data/DataContextProvider';
import '../../Css/Box.css'
import Big from 'big.js';

const Box3 = () => {
  const { loading, error, data } = useContext(DataContext);
  const [totalInterestEth, setTotalInterestEth] = useState(Big(0));
  const [totalInterestCelo, setTotalInterestCelo] = useState(Big(0));

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(`Error! ${error.message}`);
      return;
    }

    const bondsEth = data.query1Data.bonds;
    const bondsCelo = data.query2Data.bonds;

    let totalInterestEth = Big(0);
    let totalInterestCelo = Big(0);

    bondsEth.forEach((bond) => {
      const maturityInSeconds = Number(bond.maturity);
      const interestPerSecond = Number(bond.interest);

      const interest = Big(maturityInSeconds)
        .mul(interestPerSecond)
        .div("1e18");

      totalInterestEth = totalInterestEth.plus(interest);
    });

    bondsCelo.forEach((bond) => {
      const maturityInSeconds = Number(bond.maturity);
      const interestPerSecond = Number(bond.interest);

      const interest = Big(maturityInSeconds)
        .mul(interestPerSecond)
        .div("1e18");

      totalInterestCelo = totalInterestCelo.plus(interest);
    });

    setTotalInterestEth(totalInterestEth);
    setTotalInterestCelo(totalInterestCelo);
  }, [loading, error, data]);

  return (
    <div className='boxliquidity'>
      <div className="boxmature">
        <h5 className='titletomature'>INTEREST</h5>
        <h6 className='titletomature'>All time</h6>
        <div className='month'>
          <h3 className='h3s1'>ETH: {totalInterestEth.toFixed(3)} DAI</h3>
          <h3 className='h3s2'>CELO: {totalInterestCelo.toFixed(3)} cUSD</h3>
        </div>
      </div>
    </div>
  );
};

export default Box3;