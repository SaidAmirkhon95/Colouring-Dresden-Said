--translating all existing SQL enumerations, because there are in english language --> database error with german values

ALTER TYPE sust_breeam_rating RENAME VALUE 'Outstanding' TO 'Herausragend';
ALTER TYPE sust_breeam_rating RENAME VALUE 'Excellent' TO 'Exzellent';
ALTER TYPE sust_breeam_rating RENAME VALUE 'Very good' TO 'Sehr gut';
ALTER TYPE sust_breeam_rating RENAME VALUE 'Good' TO 'Gut';
ALTER TYPE sust_breeam_rating RENAME VALUE 'Pass' TO 'Ausreichend';
ALTER TYPE sust_breeam_rating RENAME VALUE 'Unclassified' TO 'nicht klassifiziert';

ALTER TYPE building_attachment_form RENAME VALUE 'Detached' TO 'freistehend';
ALTER TYPE building_attachment_form RENAME VALUE 'Semi-Detached' TO 'Doppelhaushälfte';
ALTER TYPE building_attachment_form RENAME VALUE 'End-Terrace' TO 'Häuserreihe (Ende)';
ALTER TYPE building_attachment_form RENAME VALUE 'Mid-Terrace' TO 'Häuserreihe (innerhalb)';

ALTER TYPE construction_materials RENAME VALUE 'Wood' TO 'Holz';
ALTER TYPE construction_materials RENAME VALUE 'Stone' TO 'Stein';
ALTER TYPE construction_materials RENAME VALUE 'Brick' TO 'Ziegel';
ALTER TYPE construction_materials RENAME VALUE 'Steel' TO 'Stahl';
ALTER TYPE construction_materials RENAME VALUE 'Reinforced Concrete' TO 'Stahlbeton';
ALTER TYPE construction_materials RENAME VALUE 'Other Metal' TO 'anderes Metall';
ALTER TYPE construction_materials RENAME VALUE 'Other Natural Material' TO 'anderes natürliches Material';
ALTER TYPE construction_materials RENAME VALUE 'Other Man-Made Material' TO 'anderes künstliches Material';

ALTER TYPE roof_covering RENAME VALUE 'Slate' TO 'Schiefer';
ALTER TYPE roof_covering RENAME VALUE 'Clay Tile' TO 'Lehmziegel';
ALTER TYPE roof_covering RENAME VALUE 'Wood' TO 'Holz';
ALTER TYPE roof_covering RENAME VALUE 'Asphalt' TO 'Asphalt';
ALTER TYPE roof_covering RENAME VALUE 'Iron or Steel' TO 'Eisen oder Stahl';
ALTER TYPE roof_covering RENAME VALUE 'Other Metal' TO 'anderes Metall';
ALTER TYPE roof_covering RENAME VALUE 'Other Natural Material' TO 'anderes natürliches Material';
ALTER TYPE roof_covering RENAME VALUE 'Other Man-Made Material' TO 'anderes künstliches Material';