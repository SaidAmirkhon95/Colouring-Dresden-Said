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