const createZillowUrlParameter = `
  CREATE TABLE IF NOT EXISTS zillow_url_parameter
    (
       region_id INT PRIMARY KEY,
       region_type INT,
       zipcode INT,
       west FLOAT(20),
       east FLOAT(20),
       north FLOAT(20),
       south FLOAT(20)
    )`;

export default createZillowUrlParameter;
