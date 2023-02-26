-- Building attachment, ENUM: Detached, Semi-detached, End-Terrace, Mid-Terrace
CREATE TYPE building_attachment_form
AS ENUM ('freistehend',
    'Doppelhaushälfte',
    'Häuserreihe (Ende)',
    'Häuserreihe (innerhalb)');

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS building_attachment_form building_attachment_form;

-- [Disabled for launch] Date of change of use
-- This needs to pair with demolition
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS date_change_building_use smallint;
