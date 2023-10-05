import React, { useEffect, useRef, useContext, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { DataContext } from '../../Data/DataContextProvider';
import '../../Css/Bonds.css';
import Big from 'big.js';
import smallImage from '../../img/small.png'
import mediumImage from '../../img/medium.png';
import largeImage from '../../img/large.png';


const Chart2 = () => {
  const canvasRef = useRef(null);
  const { loading, error, data } = useContext(DataContext);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(`Error! ${error.message}`);
      return;
    }

    const bonds1 = data.query1Data.bonds;
    const bondCounts1 = {
      '3 Months-Small': { count: 0, principal: new Big(0) },
      '6 Months-Medium': { count: 0, principal: new Big(0) },
      '12 Months-Large': { count: 0, principal: new Big(0) },
    };

    bonds1.forEach((bond) => {
      const seconds = bond.maturity;
      const months = secondsToMonths(seconds);
      if (months === 3) {
        bondCounts1['3 Months-Small'].count++;
        bondCounts1['3 Months-Small'].principal = bondCounts1['3 Months-Small'].principal.plus(new Big(bond.principal));
      } else if (months === 6) {
        bondCounts1['6 Months-Medium'].count++;
        bondCounts1['6 Months-Medium'].principal = bondCounts1['6 Months-Medium'].principal.plus(new Big(bond.principal));
      } else if (months === 12) {
        bondCounts1['12 Months-Large'].count++;
        bondCounts1['12 Months-Large'].principal = bondCounts1['12 Months-Large'].principal.plus(new Big(bond.principal));
      }
    });

    const bonds2 = data.query2Data.bonds;
    const bondCounts2 = {
      '3 Months-Small': { count: 0, principal: new Big(0) },
      '6 Months-Medium': { count: 0, principal: new Big(0) },
      '12 Months-Large': { count: 0, principal: new Big(0) },
    };

    bonds2.forEach((bond) => {
      const seconds = bond.maturity;
      const months = secondsToMonths(seconds);
      if (months === 3) {
        bondCounts2['3 Months-Small'].count++;
        bondCounts2['3 Months-Small'].principal = bondCounts2['3 Months-Small'].principal.plus(new Big(bond.principal));
      } else if (months === 6) {
        bondCounts2['6 Months-Medium'].count++;
        bondCounts2['6 Months-Medium'].principal = bondCounts2['6 Months-Medium'].principal.plus(new Big(bond.principal));
      } else if (months === 12) {
        bondCounts2['12 Months-Large'].count++;
        bondCounts2['12 Months-Large'].principal = bondCounts2['12 Months-Large'].principal.plus(new Big(bond.principal));
      }
    });

    const labels = Object.keys(bondCounts1);

    const moneyDataPoints1 = Object.values(bondCounts1).map((item) =>
      item.principal.toFixed(4)
    );
    const moneyDataPoints2 = Object.values(bondCounts2).map((item) =>
      item.principal.toFixed(4)
    );

    const totalPrincipalEth = Object.values(bondCounts1).reduce((total, item) =>
      total.plus(item.principal)
      , new Big(0));

    const totalPrincipalCelo = Object.values(bondCounts2).reduce((total, item) =>
      total.plus(item.principal)
      , new Big(0));

    const ctx = canvasRef.current.getContext('2d');

    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.map((label) => `${label}`),
        datasets: [
          {
            label: 'ETH-TOTAL PRINCIPAL: ' + new Big(totalPrincipalEth).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' DAI',
            data: moneyDataPoints1,
            backgroundColor: 'rgba(135, 249, 110, 1)',
            borderWidth: 1,
            barPercentage: 1,
          },
          {
            label: 'CELO-TOTAL PRINCIPAL: ' + new Big(totalPrincipalCelo).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' cUSD',
            data: moneyDataPoints2,
            backgroundColor: 'rgb(6, 47, 79)',
            borderWidth: 1,
            barPercentage: 1, 
          },
        ],
      },
      options: {
        indexAxis: 'x',
        layout: {
          padding: 15,
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: '',
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold',
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'DAI / cUSD',
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold',
              },
              stepSize: 10000,
              callback: function (value, index, values) {
                return value.toLocaleString();
              },
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const datasetLabel = context.dataset.label;
                const value = context.dataset.data[context.dataIndex];
                const formattedValue = new Big(value).toFixed(4);
                const [integerPart, decimalPart] = formattedValue.split('.');
                const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                
                let labelSuffix = '';
                if (datasetLabel.includes('ETH')) {
                  labelSuffix = ` (${bondCounts1[context.label].count} Bonds)`;
                } else if (datasetLabel.includes('CELO')) {
                  labelSuffix = ` (${bondCounts2[context.label].count} Bonds)`;
                }
                
                return formattedIntegerPart + ',' + decimalPart + labelSuffix;
              },
            },
            
          },
        },
      },
    });

    setChart(newChart);
  
  }, [loading, error, data]);

  const secondsToMonths = (seconds) => {
    const secondsInAMonth = 2592000;
    return Math.round(seconds / secondsInAMonth);
  };

  return (
    <div className="chart-principal">
      <canvas ref={canvasRef} />
      <div className='img'>
        <img className='img1' src={smallImage} alt="Small" />
        <img className='img2' src={mediumImage} alt="Medium" />
        <img className='img3' src={largeImage} alt="Large" />
      </div>
    </div>
  );
};

export default Chart2;