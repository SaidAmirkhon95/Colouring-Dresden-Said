-- copy ref_toid / id from geometry source dataset to buidlings table
UPDATE public.buildings dest 
SET ref_toid=src.source_id 
FROM public.geometries src 
WHERE dest.geometry_id = src.geometry_id;

