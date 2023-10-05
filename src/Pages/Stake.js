import React from "react";
import ChartStake1 from "../Components/ComponentsStake/ChartStake1";
import ChartStake1B from "../Components/ComponentsStake/ChartStake1B";
import ChartStake1C from "../Components/ComponentsStake/ChartStake1C";
import ChartStake1D from "../Components/ComponentsStake/ChartStake1D";
import PieChartStake from "../Components/ComponentsStake/PieChartStake";
import ChartStake2 from "../Components/ComponentsStake/ChartStake2";
import ImageStake from "../Components/ComponentsStake/ImageStake";
import ShowDetailsChartsStake from "../Components/ComponentsStake/ShowDetailsChartsStake";
import ShowDetailsPieChart from "../Components/ComponentsStake/ShowDetailsPieChart";
import "../Css/Stake.css"; 

const Stake = () => {
  return (
    <div>
    <div className="stake-container">
    <h3 className="title">Stake Holders per month </h3>
      <div className="stake-row1">
        <div className="chart-container">
          <ChartStake1 />
        </div>
        <div className="chart-container">
          <ChartStake1B />
        </div>
      </div>
      <h3 className="title">Stake Holders per day </h3>
      <div className="stake-row1">
        <div className="chart-container">
          <ChartStake1C />
        </div>
        <div className="chart-container">
        <ChartStake1D />
        </div>
      </div>
      <div className="detail-ethix">
        <ShowDetailsChartsStake />
      </div>
      <div className="stake-row2">
        <div className="image-container">
          <ImageStake />
        </div>
        <div className="chart-container-total">
        <h3 className="title">Stake holders total</h3>
          <PieChartStake />
        </div>
      </div>
      <div className="detail-ethix">
      <ShowDetailsPieChart />
      </div>
      </div>
      <div className="stake-row3">
        <div className="chart-container-combined">
        <h3 className="title">Total staked per contract</h3>
          <ChartStake2 />
        </div>
      </div>
      </div>
  );
};

export default Stake;

