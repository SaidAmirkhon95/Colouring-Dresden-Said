ALTER TABLE buildings
ALTER COLUMN number_persons
SET DATA TYPE jsonb
USING to_jsonb(number_persons);

-- Change reference_period to jsonb
ALTER TABLE buildings
ALTER COLUMN reference_period
SET DATA TYPE jsonb
USING to_jsonb(reference_period);

-- Change electricity_usage to jsonb
ALTER TABLE buildings
ALTER COLUMN electricity_usage
SET DATA TYPE jsonb
USING to_jsonb(electricity_usage);

-- Change gas_usage to jsonb
ALTER TABLE buildings
ALTER COLUMN gas_usage
SET DATA TYPE jsonb
USING to_jsonb(gas_usage);

-- Change living_area to jsonb
ALTER TABLE buildings
ALTER COLUMN living_area
SET DATA TYPE jsonb
USING to_jsonb(living_area);

-- Change agreement_dsgv_sust to jsonb
ALTER TABLE buildings
ALTER COLUMN agreement_dsgv_sust
SET DATA TYPE jsonb
USING to_jsonb(agreement_dsgv_sust);

-- Change agreement_science_sust to jsonb
ALTER TABLE buildings
ALTER COLUMN agreement_science_sust
SET DATA TYPE jsonb
USING to_jsonb(agreement_science_sust);
        	