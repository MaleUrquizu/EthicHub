import Chart1 from "../Components/ComponentsBonds/Chart1";
import Chart2 from "../Components/ComponentsBonds/Chart2";
import Chart5 from "../Components/ComponentsBonds/PieChart";
import Box1 from "../Components/ComponentsBonds/Box1";
import Box2 from "../Components/ComponentsBonds/Box2";
import Box3 from "../Components/ComponentsBonds/Box3";
import Box4 from "../Components/ComponentsBonds/Box4";
import Box5 from "../Components/ComponentsBonds/Box5";
import '../Css/Bonds.css'
import ShowDetailsPieChart from "../Components/ComponentsBonds/ShowDetailsPieChart";
import ShowDetailsChart1 from "../Components/ComponentsBonds/ShowDetailsChart1";

const Bonds = () => {
  return (
    <div>
      <div className="bliquidity">
        <h3 className="bl">Bond Liquidity</h3>
        <div className="box1y2">
        <Box1 />
        <Box2 />
        <Box3 />
      </div>
      </div>
      <div className="bondholders">
        <h3 className="bh">Bond Holders</h3>
        <div className="box1y2">
          <Box4 />
          <Box5 />
        </div>
      </div>

      <div className="container">
        <div className="bonds-minted">
          <h3>Bonds minted by month</h3>
          <Chart1 />
        </div>
        <div className="detail-ethix">
              <ShowDetailsChart1 />
        </div>
        <div className="container2">
          <div className="deposited-principal">
            <h3>Total deposited by bond size</h3>
              <Chart2 />
          </div>
          <div className="bond-holders">
            <h3>Bond holders total</h3>
            <Chart5 />
          </div>
        </div>
        <div className="detail-ethix">
           <ShowDetailsPieChart/>
        </div>
        </div>
      </div> 
  );
};

export default Bonds;


