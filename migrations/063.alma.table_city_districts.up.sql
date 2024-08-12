----------- Tabel matching to the Data in cvs form
CREATE TABLE city_districts 
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS blocknr int PRIMARY KEY; 
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS bez text;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS bez_lang text;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS flaeche_km2 float;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS sst text;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS sst_klar text;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS historie text;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS shape geometry;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS aend text;

COPY "city_districts" FROM '/home/alma/colouring-dresden/app/public/Stadtteile.csv' DELIMITER ';' CSV HEADER;

---- Mean consumption per person or per m²
--ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS elect_pers float DEFAULT 0.0;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS elect_qm float DEFAULT 0.0;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS gas_qm float DEFAULT 0.0;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS energy_qm float DEFAULT 0.0;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS count_contributors int DEFAULT 0;

-----------New Column with geometry in the right coordinate system
ALTER TABLE city_districts ADD COLUMN geometry_3857 geometry;
UPDATE city_districts SET geometry_3857 = ST_SetSRID(shape, 3857);

-------------Alter Buildings Table
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS  district_id INT;  --ALTER TABLE buildings ADD COLUMN IF NOT EXISTS point_location geometry;
ALTER TABLE buildings ADD CONSTRAINT fk_district_id FOREIGN KEY (district_id) REFERENCES city_districts(blocknr);
--ALTER TABLE buildings ADD COLUMN IF NOT EXISTS  elect_pers_norm FLOAT; -- New column in Buildings which shows the energy usage per person

-------------------------Stadtteile zur Buildingstabelle 
CREATE OR REPLACE FUNCTION assign_district() RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.district_id IS DISTINCT FROM (
        SELECT blocknr
        FROM city_districts
        WHERE ST_Contains(city_districts.shape, ST_SetSRID(ST_MakePoint(NEW.location_longitude, NEW.location_latitude), 4326))
    )) THEN
        UPDATE buildings
        SET district_id = (
            SELECT blocknr
            FROM city_districts
            WHERE ST_Contains(city_districts.shape, ST_SetSRID(ST_MakePoint(NEW.location_longitude, NEW.location_latitude), 4326))
        )
        WHERE building_id = NEW.building_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_district
AFTER INSERT OR UPDATE ON buildings
FOR EACH ROW
EXECUTE FUNCTION assign_district();


------- Zu den im Energie-Feature bearbeiteten Häusern den Bezirk hinzufügen
CREATE OR REPLACE FUNCTION update_district_energy() RETURNS TRIGGER AS $$
DECLARE
    total_electricity FLOAT;
    total_gas FLOAT;
    total_contributors INT;
    total_qm FLOAT; --Total squaremeters
BEGIN
    -- Berechnung der neuen Gesamtenergie und Anzahl der Gebäude im Stadtteil
    SELECT SUM(electricity_usage::numeric),
           SUM(gas_usage::numeric),
           COUNT(*),
           SUM(living_area::numeric)
    INTO total_electricity, total_gas, total_contributors, total_qm
    FROM buildings
    WHERE district_id = NEW.district_id AND living_area::numeric != 0.0;

    -- Update der Stadtteil-Statistiken
    UPDATE city_districts
    SET elect_qm = total_electricity / total_qm,
        gas_qm = total_gas / total_qm,
        energy_qm = (total_electricity+total_gas) / total_qm,
        count_contributors = total_contributors
    WHERE blocknr = NEW.district_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_district_energy_trigger
AFTER INSERT OR UPDATE ON buildings
FOR EACH ROW
EXECUTE FUNCTION update_district_energy();
