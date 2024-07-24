/**
 * This file defines all the valid tileset names that can be obtained from the tilserver.
 * Adjust the values here if modifying the list of styles in the tileserver.
 */

export type BuildingMapTileset = 'date_year' |
    'facade_year' |
    'size_height' |
    'size_storeys_core' |
    'size_storeys_attic' |
    'size_storeys_basement' |
    'size_floor_area_ground' |
    'construction_core_material' |
    'location' |
    'is_domestic' |
    'use_building_origin' |
    'use_building_current' |
    'basement_type' |
    'basement_percentage' |
    'basement_use' |
    'ground_storey_use' |
    'upper_storeys_use' |
    'use_number_residential_units' |
    'use_number_businesses' |
    'building_status' |
    'last_renovation' |
    'construction_system_type' |
    'size_roof_shape' |
    'building_owner' |
    'likes' |
    'typology_likes' |
    'community_local_significance_total' |
    'community_expected_planning_application_total' |
    'community_in_public_ownership' |
    'planning_applications_status_all' |
    'planning_applications_status_recent' |
    'planning_applications_status_very_recent' |
    'planning_combined' |
    'sust_dec' |
    'building_attachment_form' |
    'landuse' |
    'dynamics_demolished_count' |
    'team' |
    'architectural_style' |
    'thermal_stress_objective_count' |
    'thermal_stress_subjective_count' |
    'rain_flood_historic_incidents_count' |
    'facade_window_percentage' |
    'roof_colour' |
    'facade_colour' |
    'terrain_connection_yesno' | 
    'number_mapped_building_features'|
    'number_persons'|
    'reference_period'|
    'electricity_usage'|
    'gas_usage'|
    'living_area'|
    'agreement_dsgv_sust'|
    'agreement_sust_sust'|
    'sust_average_consumption';

export type SpecialMapTileset = 'base_light' | 'base_night' | 'base_night_outlines' | 'highlight' | 'number_labels' | 'base_boroughs';

export type MapTileset = BuildingMapTileset | SpecialMapTileset;
