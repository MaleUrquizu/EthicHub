import React, { useContext, useEffect, useRef } from 'react';
import { DataContext } from '../../Data/DataContextProvider';
import { Chart } from 'chart.js/auto';
import '../../Css/Bonds.css';


const Chart1 = () => {
  const { loading, error, data } = useContext(DataContext);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!loading && !error && data) {
      const { bondHolders: bondHolders3 } = data.query3Data;
      const { bondHolders: bondHolders4 } = data.query4Data;

      const bondTotals3 = calculateBondTotals(bondHolders3);
      const bondTotals4 = calculateBondTotals(bondHolders4);

      const allMonths = [...new Set([...Object.keys(bondTotals3), ...Object.keys(bondTotals4)])];
      allMonths.sort((a, b) => {
        const [monthA, yearA] = a.split('/');
        const [monthB, yearB] = b.split('/');
        const dateA = new Date(yearA, monthA - 1);
        const dateB = new Date(yearB, monthB - 1);
        return dateA - dateB;
      }); 

      const getMonthName = (month) => {
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        return monthNames[month - 1];
      };

      const monthYearLabels = allMonths.map((monthYear) => {
        const [month, year] = monthYear.split('/');
        const monthName = getMonthName(parseInt(month));
        return `${monthName} ${year}`;
      });
      
      const totals3 = fillMissingMonths(bondTotals3, allMonths);
      const totals4 = fillMissingMonths(bondTotals4, allMonths);

      const ctx = chartRef.current.getContext('2d');

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: monthYearLabels,
          datasets: [
            {
              label: 'Total ETH Bonds',
              data: totals3,
              backgroundColor: '#87F96E',
              barPercentage: 1.2,
            },
            {
              label: 'Total CELO Bonds',
              data: totals4,
              backgroundColor: '#062F4F',
              barPercentage: 1.2, 
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Bonds',
              },
            },
          },
        },
      });

      chartInstanceRef.current = newChartInstance;
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [loading, error, data]);

  const calculateBondTotals = (bondHolders) => {
    const bondTotals = {};

    bondHolders.forEach((bondHolder) => {
      bondHolder.bonds.forEach((bond) => {
        const mintingDate = new Date(bond.mintingDate * 1000); 
        const monthYear = `${mintingDate.getMonth() + 1}/${mintingDate.getFullYear()}`;
        if (bondTotals.hasOwnProperty(monthYear)) {
          bondTotals[monthYear] += 1; 
        } else {
          bondTotals[monthYear] = 1; 
        }
      });
    });

    return bondTotals;
  };

  const fillMissingMonths = (bondTotals, allMonths) => {
    const totals = [];

    allMonths.forEach((month) => {
      if (bondTotals.hasOwnProperty(month)) {
        totals.push(bondTotals[month]);
      } else {
        totals.push(0);
      }
    });

    return totals;
  };

  return (
    <div className="chart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Chart1;