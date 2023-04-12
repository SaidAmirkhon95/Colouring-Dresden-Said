

--ALTER TYPE construction_materials RENAME VALUE 'Stone' TO 'Stein';


--ALTER TYPE construction_materials RENAME VALUE 'Other Metal' TO 'anderes Metall';
--ALTER TYPE construction_materials RENAME VALUE 'Other Natural Material' TO 'anderes natürliches Material';
--ALTER TYPE construction_materials RENAME VALUE 'Other Man-Made Material' TO 'anderes künstliches Material';

ALTER TYPE construction_materials ADD VALUE IF NOT EXISTS 'anderes Baumaterial';
ALTER TYPE construction_materials ADD VALUE IF NOT EXISTS 'andere Mauersteine: Kalksandstein';
ALTER TYPE construction_materials ADD VALUE IF NOT EXISTS 'andere Mauersteine: Porenbeton';
ALTER TYPE construction_materials ADD VALUE IF NOT EXISTS 'andere Mauersteine: Bruchstein';