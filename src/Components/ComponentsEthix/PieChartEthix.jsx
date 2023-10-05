import React, { useEffect, useRef, useContext } from 'react';
import { Chart } from 'chart.js/auto';
import { DataContext } from '../../Data/DataContextProvider.js';
import '../../Css/DatePicker.css';

const PieChartEthix = () => {
  const canvasRef = useRef(null);
  const { loading, error, data } = useContext(DataContext);
  const chartRef = useRef(null); 

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(`Error! ${error.message}`);
      return;
    }

    const calculateTotalHoldersEth = () => {
      const ethixHoldersEthCount = data.query11Data?.ethixHolders?.length ?? 0;
      return ethixHoldersEthCount;
    };

    const calculateTotalHoldersCelo = () => {
      const ethixHoldersCeloCount = data.query12Data?.ethixHolders?.length ?? 0;
      return ethixHoldersCeloCount;
    };

    const totalEthixHoldersEth = calculateTotalHoldersEth();
    const totalEthixHoldersCelo = calculateTotalHoldersCelo();

    const ctx = canvasRef.current.getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Eth', 'Celo'],
          datasets: [
            {
              label: 'Total',
              data: [totalEthixHoldersEth, totalEthixHoldersCelo],
              backgroundColor: ['#062F4F', '#87F96E'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [loading, error, data]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PieChartEthix;

