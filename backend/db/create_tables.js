import pool from "./pool";
import createRealEstateQuery from "../models/real_estate.model";
import createZillowUrlParameterQuery from "../models/zillow_url_parameter.model";

pool.on("connect", () => {
  console.log("connected to the Database");
});

// CREATE TABLE QUERY
const createTables = (creatTableQuery) => {
  pool
    .query(creatTableQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

export const createAllTables = () => {
  const createTablesQueryArr = [
    createRealEstateQuery,
    createZillowUrlParameterQuery,
  ];
  let queryStr = "";
  createTablesQueryArr.forEach((createTablesQuery) => {
    queryStr += createTablesQuery + ";";
  });
  createTables(queryStr);
};

createAllTables();

require("make-runnable");
