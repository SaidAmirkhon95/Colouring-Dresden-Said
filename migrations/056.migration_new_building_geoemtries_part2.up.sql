-- Workflow for semi-automated migration from old building dataset to new building dataset

-- usable db tables

-- existing (old) data which should be updated:

-- geometries
-- buildings
-- building_properties
-- building_user_attributes
-- building_verification
-- logs

-- temp db tables, containing data for migration

-- temp_geometries
-- temp_buildings
-- temp_building_properties
-- temp_bld_b_to_a  --> contains older version of mapping table, before updating manually    
-- mapping table --> contains current version of mapping table, after updating manually in GIS

-- ---------------------------------------------

-- copy some old tables into temp tables to preserve its data
DROP TABLE IF EXISTS public.temp_old_geometries;
CREATE TABLE public.temp_old_geometries
AS SELECT * FROM public.geometries;

DROP TABLE IF EXISTS public.temp_old_building_properties;
CREATE TABLE public.temp_old_building_properties
AS SELECT * FROM public.building_properties;

DROP TABLE IF EXISTS public.temp_old_buildings;
CREATE TABLE public.temp_old_buildings
AS SELECT * FROM public.buildings;

DROP TABLE IF EXISTS public.temp_old_building_user_attributes;
CREATE TABLE public.temp_old_building_user_attributes
AS SELECT * FROM public.building_user_attributes;

DROP TABLE IF EXISTS public.temp_old_building_verification;
CREATE TABLE public.temp_old_building_verification
AS SELECT * FROM public.building_verification;

DROP TABLE IF EXISTS public.temp_old_logs;
CREATE TABLE public.temp_old_logs
AS SELECT * FROM public.logs;

-- ---------------------------------------------
-- Drop geometric indexes

-- Spatial index over geometries
DROP INDEX IF EXISTS geometries_idx;

-- Source ID index over geometries
DROP INDEX IF EXISTS geometries_source_idx;

-- Index over building geometry_id (expect to look up building by geometry_id for map tiles)
DROP INDEX IF EXISTS building_geometry_idx;

-- ---------------------------------------------
-- Drop building indexes
DROP INDEX IF EXISTS uprn_building_idx;
DROP INDEX IF EXISTS uprn_uprn_idx;
DROP INDEX IF EXISTS uprn_parent_idx;
DROP INDEX IF EXISTS building_toid_idx;

-- ---------------------------------------------
-- delete all tables 
-- only delete rows from tables, to preserve data structure with columns and data types etc.
-- because of foreign keys --> in one commit
--START TRANSACTION;
--The statement below allows non-deferrable constraints to be deferred until transaction committed. If you don't want to change FK definitions.
--SET CONSTRAINTS ALL DEFERRED;
-- set some specific FKey constraints DEFERRABLE, but change it in the end!
--SET CONSTRAINTS logs_building_id_fkey DEFERRED;

-- remove foreign key temporarly to avoid cycle references between buildings and logs table

ALTER TABLE public.buildings DROP CONSTRAINT IF EXISTS buildings_revision_id_fkey;

DELETE FROM public.building_properties;
DELETE FROM public.building_user_attributes;
DELETE FROM public.building_verification;
DELETE FROM public.logs;
DELETE FROM public.buildings;
DELETE FROM public.geometries;



--COMMIT TRANSACTION;

-- ---------------------------------------------
-- copy the new data for geometries etc. into target tables

-- important: care about data types of columns!!!
-- check column names and CRS of geometries table... as output from python scripts before. it is sometimes confusing what the output is.
INSERT INTO public.geometries (geometry_id, source_id, geometry_geom)
SELECT geometry_id, source_id, ST_Transform(geometry, 3857) AS geometry_geom 
FROM public.temp_geometries
ORDER BY geometry_id ASC;

-- using join to include source_id/ re_toid as well
INSERT INTO public.buildings (building_id, ref_toid, geometry_id)
SELECT bld.building_id, gm.source_id, gm.geometry_id 
FROM public.temp_buildings bld JOIN public.temp_geometries gm
ON bld.building_id = gm.geometry_id
ORDER BY bld.building_id ASC;

-- take care: everything is based on one-to-one relation between geometry and buildings. so both ids are equal

INSERT INTO public.building_properties (building_property_id, building_id)
SELECT building_property_id, building_id 
FROM public.temp_building_properties
ORDER BY building_property_id ASC;


--in the beginning, all default 0 values for number of storeys should be changed into Null...
--because this is not equal
-- 0 means, it has 0 storeys and will be visualized in mapstyle
-- null value means, it was not set. And it will be not shown in the map with null value

UPDATE public.buildings
SET size_storeys_core = NULL
WHERE size_storeys_core = 0;

UPDATE public.buildings
SET size_storeys_attic = NULL
WHERE size_storeys_attic = 0;

UPDATE public.buildings
SET size_storeys_basement = NULL
WHERE size_storeys_basement = 0;
-- ---------------------------------------------
-- insert old data which should be preserved, based on mapping table

-- important: it is only allowd to map/ assign one already mapped building to one building in new dataset!
-- so only one-to-one relation could occure --> this is easier than one-to-many relations 

START TRANSACTION;
--The statement below allows non-deferrable constraints to be deferred until transaction committed. If you don't want to change FK definitions.
SET CONSTRAINTS ALL DEFERRED;
-- update rows for 'buildings' table
-- following columns will not updated here, because the new data is already added:
-- building_id
-- ref_toid
-- geometry_id

-- revision_id contains ID of last edit in logs table
UPDATE public.buildings dest 
SET location_name = src.location_name,
location_number = src.location_number,
location_street = src.location_street,
location_line_two = src.location_line_two,
location_town = src.location_town,
location_postcode = src.location_postcode,
location_latitude = src.location_latitude,
location_longitude = src.location_longitude,
date_year = src.date_year,
date_lower = src.date_lower,
date_upper = src.date_upper,
date_source = src.date_source,
date_source_detail = src.date_source_detail,
facade_year = src.facade_year,
facade_upper = src.facade_upper,
facade_lower = src.facade_lower,
facade_source = src.facade_source,
facade_source_detail = src.facade_source_detail,
size_storeys_attic = src.size_storeys_attic,
size_storeys_core = src.size_storeys_core,
size_storeys_basement = src.size_storeys_basement,
size_height_apex = src.size_height_apex,
size_floor_area_ground = src.size_floor_area_ground,
size_floor_area_total = src.size_floor_area_total,
size_width_frontage = src.size_width_frontage,
likes_total = src.likes_total,
planning_portal_link = src.planning_portal_link,
planning_conservation_area_name = src.planning_conservation_area_name,
planning_list_date = src.planning_list_date,
planning_list_amend_date = src.planning_list_amend_date,
planning_conservation_area_delegation_date = src.planning_conservation_area_delegation_date,
planning_conservation_area_update_date = src.planning_conservation_area_update_date,
planning_conservation_area_update_type = src.planning_conservation_area_update_type,
planning_in_list = src.planning_in_list,
planning_list_id = src.planning_list_id,
planning_list_cat = src.planning_list_cat,
planning_list_grade = src.planning_list_grade,
planning_world_list_id = src.planning_world_list_id,
planning_glher_url = src.planning_glher_url,
planning_local_list_url = src.planning_local_list_url,
planning_historic_area_assessment_url = src.planning_historic_area_assessment_url,
date_link = src.date_link,
sust_breeam_rating = src.sust_breeam_rating,
sust_breeam_date = src.sust_breeam_date,
sust_dec_date = src.sust_dec_date,
sust_dec = src.sust_dec,
sust_aggregate_estimate_epc = src.sust_aggregate_estimate_epc,
sust_retrofit_date = src.sust_retrofit_date,
sust_embodied_carbon = src.sust_embodied_carbon,
sust_life_expectancy = src.sust_life_expectancy,
sust_lifespan_average = src.sust_lifespan_average,
building_attachment_form = src.building_attachment_form,
date_change_building_use = src.date_change_building_use,
current_landuse_order = src.current_landuse_order,
current_landuse_group = src.current_landuse_group,
current_landuse_class = src.current_landuse_class,
construction_core_material = src.construction_core_material,
construction_secondary_materials = src.construction_secondary_materials,
construction_roof_covering = src.construction_roof_covering,
demolished_buildings = src.demolished_buildings,
dynamics_has_demolished_buildings = src.dynamics_has_demolished_buildings,
community_local_significance_total = src.community_local_significance_total,
community_activities = src.community_activities,
community_public_ownership = src.community_public_ownership,
community_public_ownership_sources = src.community_public_ownership_sources,
community_activities_current = src.community_activities_current,
community_activities_always = src.community_activities_always,
latest_demolish_date = src.latest_demolish_date,
current_landuse_source = src.current_landuse_source,
current_landuse_source_detail = src.current_landuse_source_detail,
current_landuse_link = src.current_landuse_link,
current_landuse_verified = src.current_landuse_verified,
has_extension = src.has_extension,
extension_year = src.extension_year,
developer_type = src.developer_type,
developer_name = src.developer_name,
developer_source_link = src.developer_source_link,
designers = src.designers,
designers_source_link = src.designers_source_link,
lead_designer_type = src.lead_designer_type,
designer_awards = src.designer_awards,
awards_source_link = src.awards_source_link,
builder = src.builder,
builder_source_link = src.builder_source_link,
other_team = src.other_team,
other_team_source_link = src.other_team_source_link,
community_expected_planning_application_total = src.community_expected_planning_application_total,
landowner = src.landowner,
landowner_source_link = src.landowner_source_link,
planning_in_conservation_area_url = src.planning_in_conservation_area_url,
planning_in_conservation_area_id = src.planning_in_conservation_area_id,
planning_in_apa_url = src.planning_in_apa_url,
planning_heritage_at_risk_url = src.planning_heritage_at_risk_url,
planning_crowdsourced_site_completion_status = src.planning_crowdsourced_site_completion_status,
planning_crowdsourced_site_completion_year = src.planning_crowdsourced_site_completion_year,
planning_crowdsourced_planning_id = src.planning_crowdsourced_planning_id,
is_domestic = src.is_domestic,
community_type_worth_keeping_total = src.community_type_worth_keeping_total,
use_building_origin = src.use_building_origin,
use_building_origin_text = src.use_building_origin_text,
use_building_current = src.use_building_current,
use_building_current_text = src.use_building_current_text,
basement_type = src.basement_type,
basement_percentage = src.basement_percentage,
basement_use = src.basement_use,
ground_storey_use = src.ground_storey_use,
upper_storeys_use = src.upper_storeys_use,
use_number_residential_units = src.use_number_residential_units,
use_number_businesses = src.use_number_businesses,
building_status = src.building_status,
last_renovation = src.last_renovation,
construction_system_type = src.construction_system_type,
size_roof_shape = src.size_roof_shape,
building_owner = src.building_owner,
basement_use_source = src.basement_use_source,
ground_storey_use_source = src.ground_storey_use_source,
upper_storeys_use_source = src.upper_storeys_use_source,
building_status_source = src.building_status_source,
last_renovation_source = src.last_renovation_source,
construction_system_type_source = src.construction_system_type_source,
size_roof_shape_source = src.size_roof_shape_source,
building_owner_source = src.building_owner_source,
architectural_style = src.architectural_style,
architectural_style_source = src.architectural_style_source
FROM public.temp_old_buildings src, public.mapping_table tbl
WHERE dest.building_id = tbl.id_b AND tbl.id_a = src.building_id;




-- update rows for 'building_properties' table
-- ??? --> it is not necessary, no additional data which should be copied

-- update rows for 'building_user_attributes' table
-- here only those rows should be inserted, no existing rows updated

-- PKey is based on building_id and user_id
INSERT INTO public.building_user_attributes (building_id, 
											 user_id, 
											 community_like, 
											 community_type_worth_keeping, 
											 community_type_worth_keeping_reasons,
											 community_local_significance,
											 community_expected_planning_application)
SELECT tbl.id_b AS building_id,
	tbl_old.user_id,
	tbl_old.community_like,
	tbl_old.community_type_worth_keeping,
	tbl_old.community_type_worth_keeping_reasons,
	tbl_old.community_local_significance,
	tbl_old.community_expected_planning_application
FROM public.temp_old_building_user_attributes tbl_old INNER JOIN mapping_table tbl
ON tbl_old.building_id = tbl.id_a;


-- update rows for 'building_verification' table
-- here only those rows should be inserted, no existing rows updated

-- PKey is verification_id
-- is defined as follows: verification_id integer NOT NULL DEFAULT nextval('building_verification_verification_id_seq'::regclass),
ALTER SEQUENCE building_verification_verification_id_seq RESTART WITH 1;

-- verification_id will not be inserted, but set automatically by sequence
INSERT INTO public.building_verification (verification_timestamp, 
											 building_id, 
											 user_id, 
											 "attribute",
											 verified_value)
SELECT tbl_old.verification_timestamp,
	tbl.id_b AS building_id,
	tbl_old.user_id,
	tbl_old.attribute,
	tbl_old.verified_value
FROM public.temp_old_building_verification tbl_old INNER JOIN mapping_table tbl
ON tbl_old.building_id = tbl.id_a
ORDER BY tbl_old.verification_timestamp ASC;



-- update rows for 'logs' table
-- here only those rows should be inserted, no existing rows updated

-- PKey is log_id
-- is defined as follows: log_id bigint NOT NULL DEFAULT nextval('logs_log_id_seq'::regclass),
ALTER SEQUENCE logs_log_id_seq RESTART WITH 1;


-- log_id will not be inserted, but set automatically by sequence
INSERT INTO public.logs (log_timestamp, 
							 forward_patch, 
							 reverse_patch, 
							 user_id,
							 building_id)
SELECT tbl_old.log_timestamp,
	tbl_old.forward_patch,
	tbl_old.reverse_patch,
	tbl_old.user_id,
	tbl.id_b AS building_id
FROM public.temp_old_logs tbl_old INNER JOIN mapping_table tbl
ON tbl_old.building_id = tbl.id_a
ORDER BY tbl_old.log_timestamp ASC;


-- add revision_id based on MAX log_id by building_id into 'buildings' table

-- TO DO, maybe with SUBSELECT ... MAX() LIMIT 1
-- source is here the current logs db table, because it got already the new data 
UPDATE public.buildings dest 
SET revision_id = src.max_id
FROM (
    SELECT MAX(log_id) AS "max_id",
    building_id
    FROM public.logs
    GROUP BY building_id) AS src
WHERE dest.building_id = src.building_id;


-- add foreign key again.. this SQL code was copied from pgadmin to get equal foreign key
ALTER TABLE IF EXISTS public.buildings
    ADD CONSTRAINT buildings_revision_id_fkey FOREIGN KEY (revision_id)
    REFERENCES public.logs (log_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

COMMIT;


-- ---------------------------------------------
-- create (spatial) index , compare Colouring Cities SQL migrations
-- up: spatial index
-- Create indexes after bulk loading geometries and building records

-- Spatial index over geometries
CREATE INDEX IF NOT EXISTS geometries_idx ON geometries USING GIST ( geometry_geom );

-- Source ID index over geometries
CREATE INDEX IF NOT EXISTS geometries_source_idx ON geometries ( source_id );

-- Index over building geometry_id (expect to look up building by geometry_id for map tiles)
CREATE INDEX IF NOT EXISTS building_geometry_idx ON buildings ( geometry_id );
-- Create building indexes after bulk loading

-- Building index over UPRNs (given a building, find UPRNs)
CREATE INDEX IF NOT EXISTS uprn_building_idx ON building_properties ( building_id );

-- UPRN index (given a UPRN, find buildings or parents)
-- CREATE INDEX IF NOT EXISTS uprn_uprn_idx ON building_properties ( uprn );

-- Parent index over UPRNs (given a UPRN, find children)
-- CREATE INDEX IF NOT EXISTS uprn_parent_idx ON building_properties ( parent_uprn );

-- TOID index over buildings
CREATE INDEX IF NOT EXISTS building_toid_idx ON buildings ( ref_toid );


-- ---------------------------------------------
-- remove temp tables from database 

-- DROP TABLE public.temp_...

-- ---------------------------------------------
-- miscellaneous:

-- SELECT * FROM public.logs LIMIT 10;
-- SELECT * FROM public.logs WHERE building_id=155876;

-- CREATE TABLE public.mapping_table AS SELECT * FROM public.temp_bld_b_to_a;


