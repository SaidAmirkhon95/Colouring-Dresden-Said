ALTER TABLE buildings ADD COLUMN IF NOT EXISTS use_building_origin varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS use_building_origin_text varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS use_building_current varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS use_building_current_text varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS basement_type varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS basement_percentage smallint;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS basement_use varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ground_storey_use varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS upper_storeys_use varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS use_number_residential_units smallint;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS use_number_businesses smallint;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS building_status varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS last_renovation smallint;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_system_type varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS size_roof_shape varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS building_owner varchar;
--in the future for MultiDataEntry usage... also text[] could be relevant data type



-- sources
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS basement_use_source varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ground_storey_use_source varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS upper_storeys_use_source varchar;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS building_status_source varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS last_renovation_source varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_system_type_source varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS size_roof_shape_source varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS building_owner_source varchar;



-- verification

-- no additial columns are required for verification

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS architectural_style varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS architectural_style_source varchar;




ALTER TABLE buildings ADD COLUMN IF NOT EXISTS thermal_stress_objective jsonb;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS thermal_stress_subjective jsonb;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS facade_window_percentage varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS direction_of_windows jsonb;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS heat_adaption_measure jsonb;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS roof_colour varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS roof_colour_type varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS facade_colour varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS terrain_connection_yesno varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS terrain_connection_difference smallint;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS rain_flood_preventive_measures1 jsonb;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS rain_flood_preventive_measures2 jsonb;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS rain_flood_preventive_measures3 jsonb;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS rain_flood_historic_incidents jsonb;



ALTER TABLE buildings ADD COLUMN IF NOT EXISTS heat_adaption_measure_source varchar;
/* ALTER TABLE buildings ADD COLUMN IF NOT EXISTS roof_features_source varchar; */

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS terrain_connection_difference_source varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS rain_flood_preventive_measures_source varchar;
