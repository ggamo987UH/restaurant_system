const createRealEstateQuery = `
  CREATE TABLE IF NOT EXISTS real_estate
    (
       zpid                BIGINT PRIMARY KEY,
       bathrooms           SMALLINT,
       bedrooms            SMALLINT,
       city                VARCHAR(35),
       country             VARCHAR(35),
       currency            VARCHAR(6),
       date_price_changed  BIGINT,
       date_sold           BIGINT,
       days_on_zillow      INT,
       detail_url          VARCHAR(300),
       grouping_name       VARCHAR(50),
       home_status         VARCHAR(50),
       home_status_for_hdp VARCHAR(50),
       home_type           VARCHAR(25),
       img_src             VARCHAR(300),
       living_area         INT,
       lot_area_unit       VARCHAR(15),
       lot_area_value      DECIMAL,
       price               INT,
       price_change        INT,
       price_reduction     VARCHAR(70),
       rent_zestimate      INT,
       state               VARCHAR(25),
       street_address      VARCHAR(120),
       tax_assessed_value  INT,
       time_on_zillow      BIGINT,
       zestimate           INT,
       zipcode             INT
    )`;

export default createRealEstateQuery;
