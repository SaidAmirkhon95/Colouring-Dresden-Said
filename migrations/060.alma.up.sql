ALTER TABLE buildings ADD COLUMN IF NOT EXISTS number_persons smallint; -- Number of people in this household
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS reference_period smallint; -- Referenz Period (Year)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS electricity_usage float; -- in kWh
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS gas_usage float; -- in kWh
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS living_area float; -- Size of the appartment/ the house in m^2
--ALTER TABLE buildings ALTER COLUMN number_persons jsonb; 
--ALTER TABLE buildings ALTER COLUMN reference_period jsonb; 
--ALTER TABLE buildings ALTER COLUMN electricity_usage jsonb; 
--ALTER TABLE buildings ALTER COLUMN gas_usage jsonb; 
--ALTER TABLE buildings ALTER COLUMN living_area jsonb; 