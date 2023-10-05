import React, { useEffect, useContext, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import { DataContext } from '../../Data/DataContextProvider.js';
import { Chart } from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../Css/DatePicker.css';

const PDFButton = ({ chartRef }) => {
  const handleGeneratePDF = () => {
    const canvas = chartRef.current;
    const dataURL = canvas.toDataURL('image/png');

    const pdf = new jsPDF('landscape', 'mm', 'a4');
    pdf.addImage(dataURL, 'PNG', 10, 10, 280, 150);
    pdf.save('chart.pdf');
  };

  return (
    <button className='download-pdf' onClick={handleGeneratePDF}>
      ↓ 
    </button>
  );
};

const ChartEthix1 = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const { data } = useContext(DataContext);
  const { query5Data, query6Data } = data;

  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);
  const [selectedDate, setSelectedDate] = useState(lastMonth);

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

  useEffect(() => {
    if (chart && chart.data) {
      updateChartData();
    }
  }, [selectedDate, chart]); 

  const updateChartData = () => {
    if (selectedDate && chart && chart.data) {
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();
  
      const lastEthixHoldersData = query5Data.dayCountEthixHolders
        .filter((item) => {
          const itemDate = new Date(item.date * 1000);
          return (
            itemDate.getMonth() === selectedMonth &&
            itemDate.getFullYear() === selectedYear
          );
        });
  
      const lastCeloHoldersData = query6Data.dayCountEthixHolders
        .filter((item) => {
          const itemDate = new Date(item.date * 1000);
          return (
            itemDate.getMonth() === selectedMonth &&
            itemDate.getFullYear() === selectedYear
          );
        });
  
      const lastEthixHolder = lastEthixHoldersData.length > 0 ? lastEthixHoldersData.pop() : null;
      const lastCeloHolder = lastCeloHoldersData.length > 0 ? lastCeloHoldersData.pop() : null;
  
      const ethixData = chart.data.datasets.find(
        (dataset) => dataset.label === 'ETH'
      );
      const celoData = chart.data.datasets.find(
        (dataset) => dataset.label === 'CELO'
      );
      const allData = chart.data.datasets.find((dataset) => dataset.label === 'ALL');
  
      const ethCount = lastEthixHolder ? parseFloat(lastEthixHolder.count) : 0;
      const celoCount = lastCeloHolder ? parseFloat(lastCeloHolder.count) : 0;
  
      ethixData.data = [ethCount];
      celoData.data = [celoCount];
      allData.data = [ethCount + celoCount];
  
      chart.data.labels = [selectedDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })];
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
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            placeholderText="Select a Month"
            todayButton="Today"
          />
        </div>
        <div className='chart-ethix'>
          <canvas ref={chartRef}></canvas>
        </div>
        <PDFButton chartRef={chartRef} />
      </div>
    </div>
  );
};

export default ChartEthix1;













