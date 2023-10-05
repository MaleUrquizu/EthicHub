import React, { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../Data/DataContextProvider.js';
import { Chart } from 'chart.js';

import hondurasImage from '../../img/honduras.png';
import brazilImage from '../../img/brazil.png';
import ecuadorImage from '../../img/ecuador.png'
import mexicoImage from '../../img/mexico.png';
import peruImage from '../../img/peru.png';

const ChartStake2 = () => {
  const { data } = useContext(DataContext);
  const { query7Data, query8Data } = data;

  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null); 

  useEffect(() => {
    if (query7Data && query8Data) {
      const ethData = query7Data.factoryEthixes[0];
      const celoData = query8Data.factoryEthixes[0];

      const chartLabels = [
        'Total Staked',
        'General',
        'Honduras',
        'Brazil',
        'Mexico',
        'Mexico (Cori)',
        'Ecuador',
        'Peru',
      ];

      const ethValues = [
        ethData.totalStaked,
        ethData.totalStakedGeneral,
        ethData.totalStakedHonduras,
        ethData.totalStakedBrasil,
        ethData.totalStakedMexico,
        ethData.totalStakedMexico2,
        ethData.totalStakedEcuador,
        ethData.totalStakedPeru,
      ];

      const celoValues = [
        celoData.totalStaked,
        celoData.totalStakedGeneral,
        celoData.totalStakedHonduras,
        celoData.totalStakedBrasil,
        celoData.totalStakedMexico,
        celoData.totalStakedMexico2,
        celoData.totalStakedEcuador,
        celoData.totalStakedPeru,
      ];

      const chartConfig = {
        type: 'bar', 
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: 'ETH',
              data: ethValues,
              backgroundColor: '#062F4F',
              borderColor: '#062F4F',
              borderWidth: 1,
            },
            {
              label: 'CELO',
              data: celoValues,
              backgroundColor: '#87F96E',
              borderColor: '#87F96E',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      setChartData(chartConfig);
    }
  }, [query7Data, query8Data]);

  useEffect(() => {
    if (chartData) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      const ctx = document.getElementById('myChart').getContext('2d');
      chartRef.current = new Chart(ctx, chartData);
    }
  }, [chartData]);

  return (
    <div className='chartflags'>
      {query7Data.loading || query8Data.loading ? (
        <p>Loading...</p>
      ) : query7Data.error || query8Data.error ? (
        <p>Error fetching data</p>
      ) : (
        <canvas id="myChart" width="400" height="200"></canvas>
      )}

    <div className='flag-icons'>  
    <img className='honduras-flag' src={hondurasImage} alt="Honduras" />
    <img className='brazil-flag' src={brazilImage} alt="Brazil" />
    <img className='mexico-flag' src={mexicoImage} alt="Mexico" />
    <img className='mexico-flagcori' src={mexicoImage} alt="Mexico (Cori)" />
    <img className='ecuador-flag' src={ecuadorImage} alt="Ecuador" />
    <img className='peru-flag' src={peruImage} alt="Peru" />

          </div>

    </div>
  );
};

export default ChartStake2;