-- Workflow for semi-automated migration from old building dataset to new building dataset
-- Part 1

-- after: importing pre-processed new building geometry data into database
-- before: manually adapted mapping table in QGIS


-- aim: do some analysis and create mapping table as first draft for further edits in QGIS


-- create table for first mapping of building Ids (the final version will be named 'mapping_table' later)
DROP TABLE IF EXISTS public.temp_bld_b_to_a;
CREATE TABLE IF NOT EXISTS public.temp_bld_b_to_a (
    id_a INTEGER NOT NULL,
	id_b INTEGER NOT NULL
);

-- also db tables for transformed geometries into WGS84 / epsg: 4326
--DROP TABLE IF EXISTS public.temp_geometries_4326;
--CREATE TABLE IF NOT EXISTS public.temp_geometries_4326
--AS SELECT geometry_id, source_id, ST_Transform(geometry, 4326) AS "geometry" 
--FROM public.temp_geometries;

--DROP TABLE IF EXISTS public.geometries_4326;
--CREATE TABLE IF NOT EXISTS public.geometries_4326
--AS SELECT geometry_id, source_id, ST_Transform(geometry_geom, 4326) AS geometry_geom 
--FROM public.geometries;

-- spatial index 
DROP INDEX IF EXISTS temp_geometries_geom_idx;
CREATE INDEX temp_geometries_geom_idx
  ON public.temp_geometries
  USING GIST (geometry);
  
--DROP INDEX IF EXISTS temp_geometries_4326_geom_idx;
--CREATE INDEX temp_geometries_4326_geom_idx
--  ON public.temp_geometries_4326
--  USING GIST (geometry);
    
--DROP INDEX IF EXISTS geometries_4326_geom_idx;
--CREATE INDEX geometries_4326_geom_idx
--  ON public.geometries_4326
--  USING GIST (geometry_geom);

-- insert building IDs for mapping dataset a to b and also b to a by using spatial join
-- use PointOnSurface instead of Centroid
-- SRS is 3857... could it be better to transform into 4326 ?
INSERT INTO public.temp_bld_b_to_a
SELECT 
    a.geometry_id AS id_a,
    b.geometry_id AS id_b
FROM public.geometries AS a
JOIN public.temp_geometries AS b
ON ST_Contains (a.geometry_geom, ST_PointOnSurface(b.geometry))
ORDER BY b.geometry_id ASC;





-- DROP all not needed INDEX and TABLE !
-- except the new table 'temp_bld_b_to_a', which should be kept
DROP INDEX IF EXISTS temp_geometries_geom_idx;
--DROP INDEX IF EXISTS temp_geometries_4326_geom_idx;
--DROP INDEX IF EXISTS geometries_4326_geom_idx;

--DROP TABLE IF EXISTS public.temp_geometries_4326;
--DROP TABLE IF EXISTS public.geometries_4326;