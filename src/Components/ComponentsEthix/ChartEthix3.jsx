import React, { useEffect, useContext, useRef, useState } from 'react';
import { DataContext } from '../../Data/DataContextProvider.js';
import { Chart } from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../Css/DatePicker.css'

const ChartEthix3= () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const { data } = useContext(DataContext);
  const { query5Data, query6Data } = data;

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const [selectedDate, setSelectedDate] = useState(yesterday);

  useEffect(() => {
    if (chartRef.current && query5Data && query6Data && !chart) {
      const ctx = chartRef.current.getContext('2d');

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [
            {
              label: 'ETH',
              data: [],
              backgroundColor: '#062F4F',
              borderColor: '#062F4F',
              borderWidth: 1,
            },
            {
              label: 'CELO',
              data: [],
              backgroundColor: '#87F96E',
              borderColor: '#87F96E',
              borderWidth: 1,
            },
            {
              label: 'ALL',
              data: [],
              backgroundColor: '#74D7DC',
              borderColor: '#74D7DC',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });

      setChart(newChartInstance);
      updateChartData();
    }
  }, [chart, query5Data, query6Data]);

  const updateChartData = () => {
    if (selectedDate && chart && chart.data) {
      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = selectedDate.getMonth();
      const selectedDay = selectedDate.getDate();

      const ethixHoldersData = query5Data.dayCountEthixHolders.filter((item) => {
        const itemDate = new Date(item.date * 1000);
        return (
          itemDate.getFullYear() === selectedYear &&
          itemDate.getMonth() === selectedMonth &&
          itemDate.getDate() === selectedDay
        );
      });

      const celoHoldersData = query6Data.dayCountEthixHolders.filter((item) => {
        const itemDate = new Date(item.date * 1000);
        return (
          itemDate.getFullYear() === selectedYear &&
          itemDate.getMonth() === selectedMonth &&
          itemDate.getDate() === selectedDay
        );
      });

      const ethCount = ethixHoldersData.length > 0 ? parseFloat(ethixHoldersData[0].count) : 0;
      const celoCount = celoHoldersData.length > 0 ? parseFloat(celoHoldersData[0].count) : 0;

      const ethixData = chart.data.datasets.find((dataset) => dataset.label === 'ETH');
      const celoData = chart.data.datasets.find((dataset) => dataset.label === 'CELO');
      const allData = chart.data.datasets.find((dataset) => dataset.label === 'ALL');

      ethixData.data = [ethCount];
      celoData.data = [celoCount];
      allData.data = [ethCount + celoCount];

      chart.data.labels = [
        selectedDate.toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }),
      ];
      chart.update();
    }
  };

  useEffect(() => {
    if (chart && chart.data) {
      updateChartData();
    }
  }, [selectedDate, chart, query5Data, query6Data]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div>
      <div className='datepicker-container'>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="Select a Date"
            todayButton="Today"
          />
        </div>
        <div className='chart-ethix'>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ChartEthix3;
