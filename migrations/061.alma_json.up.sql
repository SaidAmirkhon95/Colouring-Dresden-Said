--ALTER TABLE buildings ALTER COLUMN number_persons jsonb; 
--ALTER TABLE buildings ALTER COLUMN reference_period jsonb; 
--ALTER TABLE buildings ALTER COLUMN electricity_usage jsonb; 
--ALTER TABLE buildings ALTER COLUMN gas_usage jsonb; 
--ALTER TABLE buildings ALTER COLUMN living_area jsonb; 
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS agreement_dsgv_sust boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS agreement_sience_sust boolean;