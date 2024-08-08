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

ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS mean_energy_consumption_electricity float DEFAULT 0.0;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS mean_energy_consumption_gas float DEFAULT 0.0;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS mean_energy_consumption_total float DEFAULT 0.0;
ALTER TABLE city_districts ADD COLUMN IF NOT EXISTS count_contributors int DEFAULT 0;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS  district_id INT;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS point_location geometry;

UPDATE buildings
SET point_location =     ST_MakePoint(buildings.location_longitude, buildings.location_latitude);

COPY "city_districts" FROM '/home/alma/colouring-dresden/app/public/Stadtteile.csv' DELIMITER ';' CSV HEADER;

ALTER TABLE buildings
ADD CONSTRAINT fk_district_id
FOREIGN KEY (district_id)
REFERENCES city_districts(blocknr);


----- Stadtteile ins
-- Stadtteil zuodnen
CREATE OR REPLACE FUNCTION assign_district() RETURNS TRIGGER AS $$
BEGIN
    IF ( NEW.district_id IS NULL AND NEW.district_id IS DISTINCT FROM ( --- Wird nur ausgeführt, wenn noch kein Stadtteil zugewiesen ist
        SELECT blocknr
        FROM city_districts
        WHERE ST_Contains(city_districts.shape, ST_SetSRID(ST_MakePoint(NEW.location_longitude, NEW.location_latitude), 4326)) ---ST_SetSRID: Rechnet die Gebäudekoordinaten ins Koordiantensystem der Stadtteile um
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

-- Zu den im Energie-Feature bearbeiteten Häusern den Bezirk hinzufügen (nach und nach)

CREATE OR REPLACE FUNCTION update_district_energy() RETURNS TRIGGER AS $$
DECLARE
    total_electricity FLOAT;
    total_gas FLOAT;
    total_contributors INT;
BEGIN
    -- Berechnung der neuen Gesamtenergie und Anzahl der Gebäude im Stadtteil
    SELECT SUM(electricity_usage),
           SUM(gas_usage),
           COUNT(*)
    INTO total_electricity, total_gas, total_contributors
    FROM buildings
    WHERE district_id = NEW.district_id;

    -- Update der Stadtteil-Statistiken
    UPDATE city_districts
    SET mean_energy_consumption_electricity = total_electricity / total_contributors,
        mean_energy_consumption_gas = total_gas / total_contributors,
        mean_energy_consumption_total = (total_electricity+total_gas) / total_contributors,
        count_contributors = total_contributors
    WHERE blocknr = NEW.district_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_district_energy_trigger
AFTER INSERT OR UPDATE ON buildings
FOR EACH ROW
EXECUTE FUNCTION update_district_energy();

-----------New Column with geometry in the right coordinate system
-- Neue Spalte hinzufügen
ALTER TABLE city_districts 
ADD COLUMN geometry_3857 geometry;

-- Neue Spalte mit den transformierten Geometrien aktualisieren
UPDATE city_districts 
SET geometry_3857 = ST_SetSRID(shape, 3857);
