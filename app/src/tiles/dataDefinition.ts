import { strictParseInt } from "../parse";

import { DataConfig } from "./types";
//import { useAuth } from '../frontend/auth-context'; <-- this is a tsx-syntax an can not be used here
//const { isLoading, user, userError, logout, generateApiKey, deleteAccount } = useAuth();


const LAYER_QUERIES = {
    base_light: `
        SELECT
            geometry_id
        FROM
            buildings`,
    base_night: `
        SELECT
            geometry_id
        FROM
            buildings`,
    base_night_outlines: `
        SELECT
            geometry_id
        FROM
            buildings`,
    base_boroughs: `
        SELECT
            geometry_id,
            name
        FROM
            external_data_borough_boundary`,
    number_labels: `
        SELECT
            geometry_id,
            location_number
        FROM
            buildings`,
    highlight: `
        SELECT
            geometry_id
        FROM
            buildings
        WHERE building_id = !@highlight!`,
    date_year: `
        SELECT
            geometry_id,
            date_year
        FROM
            buildings
        WHERE date_year IS NOT NULL`,
    size_storeys: `
        SELECT
            geometry_id,
            (
                coalesce(size_storeys_attic, 0) +
                coalesce(size_storeys_core, 0)
            ) AS size_storeys
        FROM
            buildings
        WHERE
            size_storeys_attic IS NOT NULL OR size_storeys_core IS NOT NULL`,
    size_height: `
        SELECT
            geometry_id,
            size_height_apex AS size_height
        FROM
            buildings
        WHERE
            size_height_apex IS NOT NULL`,
    construction_core_material: `
        SELECT
            geometry_id,
            construction_core_material::text AS construction_core_material
        FROM
            buildings
        WHERE
            construction_core_material IS NOT NULL`,
    location: `
        SELECT blds_with_data.* 
        FROM (
            SELECT
                    geometry_id,
                    (
                        case when location_name IS NULL then 0 else 1 end +
                        case when location_number IS NULL then 0 else 1 end +
                        case when location_street IS NULL then 0 else 1 end +
                        case when location_line_two IS NULL then 0 else 1 end +
                        case when location_town IS NULL then 0 else 1 end +
                        case when location_postcode IS NULL then 0 else 1 end +
                        case when location_latitude IS NULL then 0 else 1 end +
                        case when location_longitude IS NULL then 0 else 1 end +
                        case when ref_toid IS NULL then 0 else 1 end +
                        case when ref_osm_id IS NULL then 0 else 1 end
                    ) AS location_info_count
                FROM
                    buildings
            ) AS blds_with_data
        WHERE blds_with_data.location_info_count > 0`,
    team: `
        SELECT blds_with_data.* 
        FROM (
            SELECT
                    geometry_id,
                    (
                        case when has_extension IS NULL then 0 else 1 end +
                        case when extension_year IS NULL then 0 else 1 end +
                        case when developer_type IS NULL then 0 else 1 end +
                        case when developer_name IS NULL then 0 else 1 end +
                        case when developer_source_link IS NULL then 0 else 1 end +
                        case when designers IS NULL then 0 else 1 end +
                        case when designers_source_link IS NULL then 0 else 1 end +
                        case when lead_designer_type IS NULL then 0 else 1 end +
                        case when designer_awards IS NULL then 0 else 1 end +
                        case when awards_source_link IS NULL then 0 else 1 end +
                        case when builder IS NULL then 0 else 1 end +
                        case when builder_source_link IS NULL then 0 else 1 end +
                        case when other_team IS NULL then 0 else 1 end +
                        case when other_team_source_link IS NULL then 0 else 1 end +
                        case when date_year IS NULL then 0 else 1 end
                    ) AS team_info_count
                FROM
                    buildings
            ) AS blds_with_data
        WHERE blds_with_data.team_info_count > 0`,
    is_domestic: `
        SELECT
            geometry_id,
            is_domestic
        FROM
            buildings
        WHERE
            is_domestic IS NOT NULL`,
    likes: `
        SELECT
            geometry_id,
            likes_total AS likes
        FROM
            buildings
        WHERE
            is_domestic <> 'yes'
            AND
            likes_total > 0`,
    typology_likes: `
        SELECT
            geometry_id,
            community_type_worth_keeping_total AS likes
        FROM
            buildings
        WHERE
            community_type_worth_keeping_total > 0`,
    community_local_significance_total: `
        SELECT
            geometry_id,
            community_local_significance_total
        FROM
            buildings
        WHERE
            community_local_significance_total > 0
    `,
    community_expected_planning_application_total: `
        SELECT
            geometry_id,
            community_expected_planning_application_total
        FROM
            buildings
        WHERE
        community_expected_planning_application_total > 0
    `,
    community_in_public_ownership: `
        SELECT
            geometry_id,
            CASE
                WHEN community_public_ownership = 'Not in public/community ownership' THEN false
                ELSE true
            END AS in_public_ownership
        FROM
            buildings
        WHERE
            community_public_ownership IS NOT NULL
    `,
    planning_applications_status_all: `SELECT 
        buildings.geometry_id, building_properties.uprn, building_properties.building_id, planning_data.status AS status, planning_data.uprn
        FROM building_properties
        INNER JOIN planning_data ON building_properties.uprn = planning_data.uprn
        INNER JOIN buildings ON building_properties.building_id = buildings.building_id`,
    planning_applications_status_recent: `SELECT 
        buildings.geometry_id, building_properties.uprn, building_properties.building_id, planning_data.status AS status, planning_data.uprn, 
        planning_data.days_since_decision_date_cached AS days_since_decision_date,
        planning_data.days_since_registration_cached AS days_since_registered_with_local_authority_date
        FROM building_properties
        INNER JOIN planning_data ON building_properties.uprn = planning_data.uprn
        INNER JOIN buildings ON building_properties.building_id = buildings.building_id`,
    planning_applications_status_very_recent: `SELECT 
        buildings.geometry_id, building_properties.uprn, building_properties.building_id, planning_data.status AS status, planning_data.uprn, 
        planning_data.days_since_decision_date_cached AS days_since_decision_date,
        planning_data.days_since_registration_cached AS days_since_registered_with_local_authority_date
        FROM building_properties
        INNER JOIN planning_data ON building_properties.uprn = planning_data.uprn
        INNER JOIN buildings ON building_properties.building_id = buildings.building_id`,
    planning_combined: `
        SELECT
            geometry_id,
            (
                CASE
                    WHEN planning_list_grade = 'I' THEN 'Grade I Listed'
                    WHEN planning_list_grade = 'II*' THEN 'Grade II* Listed'
                    WHEN planning_list_grade = 'II' THEN 'Grade II Listed'
                    WHEN planning_local_list_url <> '' THEN 'Locally Listed'
                    WHEN planning_heritage_at_risk_url <> '' THEN 'Heritage at Risk'
                    WHEN planning_world_list_id IS NOT NULL THEN 'In World Heritage Site'
                    WHEN planning_in_apa_url <> '' THEN 'In Archaeological Priority Area'
                    ELSE 'None'
                END
            ) AS listing_type,
            planning_in_conservation_area_url <> '' AS planning_in_conservation_area
        FROM buildings
        WHERE
            planning_list_grade IS NOT NULL
            OR planning_in_conservation_area_url <> ''
            OR planning_local_list_url <> ''
            OR planning_world_list_id IS NOT NULL
            OR planning_heritage_at_risk_url <> ''
            OR planning_in_apa_url <> ''
            `,
    conservation_area: `
        SELECT
            geometry_id
        FROM
            buildings
        WHERE
            planning_in_conservation_area_url = true`,

//Energy-Feature Start
    sust_average_consumption_m2: `
        SELECT
            geometry_id,
            (electricity_usage::numeric + gas_usage::numeric) / (living_area::numeric) AS sust_average_consumption_m2
        FROM
            buildings
        WHERE
            electricity_usage IS NOT NULL
            AND gas_usage IS NOT NULL
            AND living_area IS NOT NULL`,
    energy_qm: `
        SELECT 
            blocknr,
            energy_qm
        FROM
            city_districts
        WHERE
            energy_qm IS NOT NULL`,
    gas_qm: `
        SELECT 
            blocknr,
            gas_qm
        FROM
            city_districts
        WHERE
            gas_qm IS NOT NULL`,
    elect_qm: `
        SELECT 
            blocknr,
            elect_qm
        FROM
            city_districts
        WHERE
            elect_qm IS NOT NULL`,
    count_contributors: `
        SELECT 
            blocknr,
            count_contributors
        FROM
            city_districts`,
//Energy-Feature End

    building_attachment_form: `
        SELECT
            geometry_id,
            building_attachment_form::text AS building_attachment_form
        FROM
            buildings
        WHERE
            building_attachment_form IS NOT NULL`,
    landuse: `
        SELECT
            geometry_id,
            current_landuse_order,
            current_landuse_group[1] as current_landuse_group,
            current_landuse_verified
        FROM
            buildings
        WHERE
            current_landuse_order IS NOT NULL`,
    dynamics_demolished_count: `
        SELECT
            geometry_id,
            jsonb_array_length(demolished_buildings) as demolished_buildings_count,
            dynamics_has_demolished_buildings
        FROM
            buildings
        WHERE jsonb_array_length(demolished_buildings) > 0 OR dynamics_has_demolished_buildings = FALSE`,

    use_building_origin: `
        SELECT
            geometry_id,
            use_building_origin
        FROM
            buildings
        WHERE
            use_building_origin IS NOT NULL`,

    use_building_current: `
        SELECT
            geometry_id,
            use_building_current
        FROM
            buildings
        WHERE
            use_building_current IS NOT NULL`,

    basement_type: `
        SELECT
            geometry_id,
            basement_type
        FROM
            buildings
        WHERE
            basement_type IS NOT NULL`,

    basement_percentage: `
        SELECT
            geometry_id,
            basement_percentage
        FROM
            buildings
        WHERE
            basement_percentage IS NOT NULL`,

    basement_use: `
        SELECT
            geometry_id,
            basement_use
        FROM
            buildings
        WHERE
            basement_use IS NOT NULL`,

    ground_storey_use: `
        SELECT
            geometry_id,
            ground_storey_use
        FROM
            buildings
        WHERE
            ground_storey_use IS NOT NULL`,

    upper_storeys_use: `
        SELECT
            geometry_id,
            upper_storeys_use
        FROM
            buildings
        WHERE
            upper_storeys_use IS NOT NULL`,

    use_number_residential_units: `
        SELECT
            geometry_id,
            use_number_residential_units
        FROM
            buildings
        WHERE
            use_number_residential_units IS NOT NULL`,

    use_number_businesses: `
        SELECT
            geometry_id,
            use_number_businesses
        FROM
            buildings
        WHERE
            use_number_businesses IS NOT NULL`,

    building_status: `
        SELECT
            geometry_id,
            building_status
        FROM
            buildings
        WHERE
            building_status IS NOT NULL`,

    last_renovation: `
        SELECT
            geometry_id,
            last_renovation
        FROM
            buildings
        WHERE
            last_renovation IS NOT NULL`,

    construction_system_type: `
        SELECT
            geometry_id,
            construction_system_type
        FROM
            buildings
        WHERE
            construction_system_type IS NOT NULL`,


    size_roof_shape: `
        SELECT
            geometry_id,
            size_roof_shape
        FROM
            buildings
        WHERE
            size_roof_shape IS NOT NULL`,

    building_owner: `
        SELECT
            geometry_id,
            building_owner
        FROM
            buildings
        WHERE
            building_owner IS NOT NULL`,


    architectural_style: `
        SELECT
            geometry_id,
            architectural_style
        FROM
            buildings
        WHERE
        architectural_style IS NOT NULL`,



    facade_year: `
        SELECT
            geometry_id,
            facade_year
        FROM
            buildings
        WHERE
            facade_year IS NOT NULL`,

    size_storeys_core: `
        SELECT
            geometry_id,
            size_storeys_core
        FROM
            buildings
        WHERE
            size_storeys_core IS NOT NULL`,


    size_storeys_attic: `
        SELECT
            geometry_id,
            size_storeys_attic
        FROM
            buildings
        WHERE
            size_storeys_attic IS NOT NULL`,



    size_storeys_basement: `
        SELECT
            geometry_id,
            size_storeys_basement
        FROM
            buildings
        WHERE
            size_storeys_basement IS NOT NULL`,


    size_floor_area_ground: `
        SELECT
            geometry_id,
            size_floor_area_ground
        FROM
            buildings
        WHERE
            size_floor_area_ground IS NOT NULL`,




    thermal_stress_objective_count: `
        SELECT
            geometry_id,
            jsonb_array_length(thermal_stress_objective) as thermal_stress_objective_count
        FROM
            buildings`,

    thermal_stress_subjective_count: `
        SELECT
            geometry_id,
            jsonb_array_length(thermal_stress_subjective) as thermal_stress_subjective_count
        FROM
            buildings`,

    rain_flood_historic_incidents_count: `
        SELECT
            geometry_id,
            jsonb_array_length(rain_flood_historic_incidents) as rain_flood_historic_incidents_count
        FROM
            buildings`,


    facade_window_percentage: `
        SELECT
            geometry_id,
            facade_window_percentage
        FROM
            buildings
        WHERE
        facade_window_percentage IS NOT NULL`,


    roof_colour: `
        SELECT
            geometry_id,
            roof_colour
        FROM
            buildings
        WHERE
        roof_colour IS NOT NULL`,

    facade_colour: `
        SELECT
            geometry_id,
            facade_colour
        FROM
            buildings
        WHERE
        facade_colour IS NOT NULL`,




    terrain_connection_yesno: `
        SELECT
            geometry_id,
            terrain_connection_yesno
        FROM
            buildings
        WHERE
        terrain_connection_yesno IS NOT NULL`,



    number_mapped_building_features: `
    SELECT blds_with_data.* 
    FROM (
        SELECT
                geometry_id,
                (
                    case when location_name IS NULL then 0 else 1 end +
                    case when ref_wikidata IS NULL then 0 else 1 end +
                    case when ref_wikipedia IS NULL then 0 else 1 end +
                    case when is_domestic IS NULL then 0 else 1 end +
                    case when use_building_origin IS NULL then 0 else 1 end +
                    case when use_building_current IS NULL then 0 else 1 end +
                    case when basement_type IS NULL then 0 else 1 end +
                    case when basement_percentage IS NULL then 0 else 1 end +
                    case when basement_use IS NULL then 0 else 1 end +
                    case when ground_storey_use IS NULL then 0 else 1 end +
                    case when upper_storeys_use IS NULL then 0 else 1 end +
                    case when use_number_residential_units IS NULL then 0 else 1 end +
                    case when use_number_businesses IS NULL then 0 else 1 end +
                    case when building_attachment_form IS NULL then 0 else 1 end +
                    case when size_roof_shape IS NULL then 0 else 1 end +
                    case when building_owner IS NULL then 0 else 1 end +
                    case when size_storeys_core IS NULL then 0 else 1 end +
                    case when size_storeys_attic IS NULL then 0 else 1 end +
                    case when size_storeys_basement IS NULL then 0 else 1 end +
                    case when construction_system_type IS NULL then 0 else 1 end +
                    case when construction_core_material IS NULL then 0 else 1 end +
                    case when construction_roof_covering IS NULL then 0 else 1 end +
                    case when building_status IS NULL then 0 else 1 end +
                    case when last_renovation IS NULL then 0 else 1 end +
                    case when architectural_style IS NULL then 0 else 1 end +
                    case when date_year IS NULL then 0 else 1 end +
                    case when facade_year IS NULL then 0 else 1 end +
                    case when roof_colour IS NULL then 0 else 1 end +
                    case when roof_colour_type IS NULL then 0 else 1 end +
                    case when facade_colour IS NULL then 0 else 1 end +
                    case when facade_window_percentage IS NULL then 0 else 1 end +
                    case when direction_of_windows IS NULL then 0 else 1 end +
                    case when thermal_stress_objective IS NULL then 0 else 1 end +
                    case when thermal_stress_subjective IS NULL then 0 else 1 end +
                    case when heat_adaption_measure IS NULL then 0 else 1 end +
                    case when terrain_connection_yesno IS NULL then 0 else 1 end +
                    case when terrain_connection_difference IS NULL then 0 else 1 end +
                    case when rain_flood_historic_incidents IS NULL then 0 else 1 end +
                    case when rain_flood_preventive_measures2 IS NULL then 0 else 1 end +
                    case when rain_flood_preventive_measures3 IS NULL then 0 else 1 end +
                    case when rain_flood_preventive_measures1 IS NULL then 0 else 1 end 
                ) AS mapped_features_count
            FROM
                buildings
        ) AS blds_with_data
    WHERE blds_with_data.mapped_features_count >= 0`,

};

let GEOMETRY_FIELD = 'geometry_geom';


function getBuildingLayerNames() {
    return Object.keys(LAYER_QUERIES);
}

function getAllLayerNames() {
    return ['highlight', ...getBuildingLayerNames()];
}

function getDataConfig(tileset: string): DataConfig {
    const table = LAYER_QUERIES[tileset];

    if (table == undefined) {
        throw new Error('Invalid tileset requested');
    }

    if (tileset == 'base_boroughs') {
        const query = `(
            SELECT
            d.*,
            g.geometry_geom
        FROM (
            ${table}
        ) AS d
        JOIN
            geometries AS g
        ON d.geometry_id = g.geometry_id
        JOIN
            external_data_borough_boundary AS b
        ON d.geometry_id = b.geometry_id
    ) AS data
        `;
        //console.log('base_boroughs: \n', query)
        return {
            geometry_field: GEOMETRY_FIELD,
            table: query
        };
    }

    if (tileset == 'energy_qm' || tileset == 'gas_qm' ||  tileset == 'elect_qm' ||  tileset == 'count_contributors') { // For the district layer, get the geometry from city_districts
        const query = `(
             SELECT
                d.*,
                g.geometry_3857 AS "geometry_geom"
            FROM(
                ${table}
            ) AS d
            JOIN
                city_districts AS g
            ON d.blocknr = g.blocknr		
        ) AS data`;
        
        return {
            geometry_field: GEOMETRY_FIELD,
            table: query
        };
    }

    const query = `(
        SELECT
            d.*,
            g.geometry_geom
        FROM (
            ${table}
        ) AS d
        JOIN
            geometries AS g
        ON d.geometry_id = g.geometry_id
        JOIN
            buildings AS b
        ON d.geometry_id = b.geometry_id
        WHERE
            b.latest_demolish_date IS NULL
    ) AS data`;
    //console.log('normale Query: \n', query)
    return {
        geometry_field: GEOMETRY_FIELD,
        table: query
    };
}

function getLayerVariables(tileset: string, dataParams: any): object {
    if (tileset == 'highlight') {
        let { highlight, base } = dataParams;

        highlight = strictParseInt(highlight);
        base = base || 'default';

        if (isNaN(highlight) || base.match(/^\w+$/) == undefined) {
            throw new Error('Bad parameters for highlight layer');
        }

        return {
            highlight,
            base_data_layer: base
        };
    }

    return {};
}

export {
    getBuildingLayerNames,
    getAllLayerNames,
    getDataConfig,
    getLayerVariables
};
