import React, { Fragment } from 'react';

import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import UPRNsDataEntry from '../data-components/uprns-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import { PatternDataEntry } from '../data-components/pattern-data-entry';

import { CategoryViewProps } from './category-view-props';

const locationNumberPattern = "[1-9]\\d*[a-z]?(-([1-9]\\d*))?"; ///[1-9]\d*[a-z]?(-([1-9]\d*))?/;

function generate_osm_link(osm_id, osm_type) {
    return "https://www.openstreetmap.org/"+ osm_type + "/" + osm_id.padStart(9, "0");
  }

const LocationView: React.FunctionComponent<CategoryViewProps> = (props) => (
    
    <Fragment>
        <DataEntry
            title={dataFields.location_name.title}
            slug="location_name"
            value={props.building.location_name}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            tooltip={dataFields.location_name.tooltip}
            placeholder="https://..."
            isUrl={true}
            />
        <Verification
            slug="location_name"
            allow_verify={props.user !== undefined && props.building.location_name !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("location_name")}
            user_verified_as={props.user_verified.location_name}
            verified_count={props.building.verified.location_name}
            />


        
        <PatternDataEntry
            title={dataFields.location_number.title}
            slug="location_number"
            value={props.building.location_number}
            pattern={locationNumberPattern}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            tooltip={dataFields.location_number.tooltip}
            disabled={true}
            />
{/*         <Verification
            slug="location_number"
            allow_verify={props.user !== undefined && props.building.location_number !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("location_number")}
            user_verified_as={props.user_verified.location_number}
            verified_count={props.building.verified.location_number}
            /> */}

        <DataEntry
            title={dataFields.location_street.title}
            slug="location_street"
            value={props.building.location_street}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            maxLength={30}
            disabled={true}
            />
{/*         <Verification
            slug="location_street"
            allow_verify={props.user !== undefined && props.building.location_street !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("location_street")}
            user_verified_as={props.user_verified.location_street}
            verified_count={props.building.verified.location_street}
            /> */}

{/*         <DataEntry
            title={dataFields.location_line_two.title}
            slug="location_line_two"
            value={props.building.location_line_two}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            maxLength={30}
            disabled={true}
            />
        <Verification
            slug="location_line_two"
            allow_verify={props.user !== undefined && props.building.location_line_two !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("location_line_two")}
            user_verified_as={props.user_verified.location_line_two}
            verified_count={props.building.verified.location_line_two}
            /> */}
        <DataEntry
            title={dataFields.location_town.title}
            slug="location_town"
            value={props.building.location_town}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            disabled={true}
            
            />
{/*         <Verification
            slug="location_town"
            allow_verify={props.user !== undefined && props.building.location_town !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("location_town")}
            user_verified_as={props.user_verified.location_town}
            verified_count={props.building.verified.location_town}
            /> */}
        <DataEntry
            title={dataFields.location_postcode.title}
            slug="location_postcode"
            value={props.building.location_postcode}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            maxLength={8}
            valueTransform={x=>x.toUpperCase()}
            disabled={true}
            
            />
{/*         <Verification
            slug="location_postcode"
            allow_verify={props.user !== undefined && props.building.location_postcode !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("location_postcode")}
            user_verified_as={props.user_verified.location_postcode}
            verified_count={props.building.verified.location_postcode}
            /> */}
        <DataEntry
            title={dataFields.ref_toid.title}
            slug="ref_toid"
            value={props.building.ref_toid}
            mode={props.mode}
            copy={props.copy}
            tooltip={dataFields.ref_toid.tooltip}
            onChange={props.onChange}
            disabled={true}
            
            />
{/*         <UPRNsDataEntry
            title={dataFields.uprns.title}
            slug="ref_uprns"
            value={props.building.uprns}
            tooltip={dataFields.uprns.tooltip}
            /> */}
        <DataEntry
            title={dataFields.ref_osm_id.title}
            slug="ref_osm_id"
            value={props.building.ref_osm_id}
            mode={props.mode}
            copy={props.copy}
            tooltip={dataFields.ref_osm_id.tooltip}
            maxLength={20}
            onChange={props.onChange}
            disabled={true}
            />
{/*         <Verification
            slug="ref_osm_id"
            allow_verify={props.user !== undefined && props.building.ref_osm_id !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("ref_osm_id")}
            user_verified_as={props.user_verified.ref_osm_id}
            verified_count={props.building.verified.ref_osm_id}
            /> */}

        <DataEntry
            title={dataFields.ref_osm_type.title}
            slug="ref_osm_type"
            value={props.building.ref_osm_type}
            mode={props.mode}
            copy={props.copy}
            tooltip={dataFields.ref_osm_type.tooltip}
            maxLength={20}
            onChange={props.onChange}
            disabled={true}
            />
{/*         <Verification
            slug="ref_osm_type"
            allow_verify={props.user !== undefined && props.building.ref_osm_type !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("ref_osm_type")}
            user_verified_as={props.user_verified.ref_osm_type}
            verified_count={props.building.verified.ref_osm_type}
            /> */}


        {/* hide or show this link zu OSM . org  by condition */}

        {(props.building.ref_osm_id !== null) ?


        <>

            <p>
                <b>gehe zu OSM: </b> 
            </p>
            <p>
                <a href={generate_osm_link(props.building.ref_osm_id, props.building.ref_osm_type)} target="_blank">{generate_osm_link(props.building.ref_osm_id, props.building.ref_osm_type)}</a>
            </p>



            </>
            : 
                <></>
            }




        <DataEntry
            title={dataFields.ref_land_parcel.title}
            slug="ref_land_parcel"
            value={props.building.ref_land_parcel}
            mode={props.mode}
            copy={props.copy}
            tooltip={dataFields.ref_land_parcel.tooltip}
            maxLength={20}
            onChange={props.onChange}
            disabled={true}
            />
{/*         <Verification
            slug="ref_land_parcel"
            allow_verify={props.user !== undefined && props.building.ref_land_parcel !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("ref_land_parcel")}
            user_verified_as={props.user_verified.ref_land_parcel}
            verified_count={props.building.verified.ref_land_parcel}
            /> */}


        <DataEntry
            title={dataFields.ref_wikidata.title}
            slug="ref_wikidata"
            value={props.building.ref_wikidata}
            mode={props.mode}
            copy={props.copy}
            tooltip={dataFields.ref_wikidata.tooltip}
            maxLength={20}
            onChange={props.onChange}

            />
        <Verification
            slug="ref_wikidata"
            allow_verify={props.user !== undefined && props.building.ref_wikidata !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("ref_wikidata")}
            user_verified_as={props.user_verified.ref_wikidata}
            verified_count={props.building.verified.ref_wikidata}
            />


        <DataEntry
            title={dataFields.ref_wikipedia.title}
            slug="ref_wikipedia"
            value={props.building.ref_wikipedia}
            mode={props.mode}
            copy={props.copy}
            tooltip={dataFields.ref_wikipedia.tooltip}
            maxLength={256}
            onChange={props.onChange}

            />
        <Verification
            slug="ref_wikipedia"
            allow_verify={props.user !== undefined && props.building.ref_wikipedia !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("ref_wikipedia")}
            user_verified_as={props.user_verified.ref_wikipedia}
            verified_count={props.building.verified.ref_wikipedia}
            />



        <NumericDataEntry
            title={dataFields.location_latitude.title}
            slug="location_latitude"
            value={props.building.location_latitude}
            mode={props.mode}
            copy={props.copy}
            step={0.00001}
            min={-90}
            max={90}
            placeholder="geogr. Breitengrad, z.B. 51.049259"
            onChange={props.onChange}
            disabled={true}
            />
{/*         <Verification
            slug="location_latitude"
            allow_verify={props.user !== undefined && props.building.location_latitude !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("location_latitude")}
            user_verified_as={props.user_verified.location_latitude}
            verified_count={props.building.verified.location_latitude}
            /> */}
        <NumericDataEntry
            title={dataFields.location_longitude.title}
            slug="location_longitude"
            value={props.building.location_longitude}
            mode={props.mode}
            copy={props.copy}
            step={0.00001}
            min={-180}
            max={180}
            placeholder="geogr. Längengrad, z.B. 13.73836"
            onChange={props.onChange}
            disabled={true}
            />
{/*         <Verification
            slug="location_longitude"
            allow_verify={props.user !== undefined && props.building.location_longitude !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("location_longitude")}
            user_verified_as={props.user_verified.location_longitude}
            verified_count={props.building.verified.location_longitude}
            /> */}
    </Fragment>
);
const LocationContainer = withCopyEdit(LocationView);

export default LocationContainer;
