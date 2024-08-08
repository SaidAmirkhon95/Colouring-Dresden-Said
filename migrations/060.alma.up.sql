ALTER TABLE buildings ADD COLUMN IF NOT EXISTS number_persons smallint; -- Number of people in this household
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS reference_period smallint; -- Referenz Period (Year)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS electricity_usage float; -- in kWh
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS gas_usage float; -- in kWh
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS living_area float; -- Size of the appartment/ the house in m^2
