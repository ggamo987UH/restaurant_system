import { useEffect, useState } from "react";
import axios from "axios";

import Table from "../components/Table/Table";

const COLUMNS = ["Aircraft Model", "Takeoff Time", "landing Time"];

const Analyst = () => {
  const [analystData, setAnalystData] = useState([
    { model: "ATR 72", "Takeoff Time": "12:00 A.M", "landing Time": "1:00 PM" },
    { model: "ATR 42", "Takeoff Time": "12:00 A.M", "landing Time": "1:00 PM" },
  ]);

  // EXAMPLE HOW TO GET REQUEST API CALL
  //const getRealEstateAnalyst = async () => {
  //const res = await axios.get('http://172.18.0.4:5000/api/v1/realEstates/analyst');
  //setAnalystData(res.data.data['realEstates']);
  //};

  //useEffect(()=> {
  //getRealEstateAnalyst();
  //},[])

  return (
    <>
      <Table COLUMNS={COLUMNS} data={analystData} />
      <div>dsffdfsfdssdfsddas</div>
    </>
  );
};

export default Analyst;
