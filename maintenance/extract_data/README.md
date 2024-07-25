# Colouring Dresden Datenextrakt

Dieses Datenextrakt beinhaltet den Datenstand des CitizenScience Forschungsprojektes "Colouring Dresden"
(https://colouring.dresden.ioer.info/).

Colouring Dresden ist eine CitizenScience Plattform um Merkmale des Dresdner Gebäudebestands erfassen zu können.

Die hier bereitgestellten Daten sind offene Daten und stehen unter der Open Data Commons Open Database Lizenz
(ODbL, http://opendatacommons.org/licenses/odbl/) by Colouring Dresden Mitwirkenden.

Es steht Ihnen frei, die Daten zu kopieren, zu teilen und anzupassen, 
solange Sie Colouring Dresden und Mitwirkende nennen. 
Die Daten dürfen nur unter der selben Lizenz verbreitet werden.


## Inhalt

Dieses Extrakt besteht aus drei Dateien:

- README.txt
- building_attributes.csv
- edit_history.csv


## Gebäudemerkmale / Building Attributes 

Dies ist die wichtigste Datentabelle und enthält fast alle im Projekt Colouring Dresden erfassten Gebäudemerkmale. Abgesehen von
`building_id`, `revision_id` und `ref_toid` sind alle weiteren Felder optional.

- `building_id`: Eindeutiger Gebäude-Identifikator (ID) von Colouring Dresden
- `revision_id`: Eindeutiger Revisions-Identifikator (ID) für Colouring Dresden, referenziert auf die Bearbeitungshistorie.
- `ref_toid`: Referenz auf Identifikator des Datensatzes der Gebäudegeometrien TOID
- `ref_osm_id`: Referenz auf OpenStreetMap Identifikator (osm_id)
- `location_name`: Name des Gebäudes (Link zu weiteren Informationen)
- `location_number`: Hausnummer
- `location_street`: Straße
- `location_line_two`: weitere Adresszeile
- `location_town`: Stadt
- `location_postcode`: Postleitzahl
- `location_latitude`: geogr. Breitengrad (im WGS84) des Gebäudeschwerpunktes (Centroid)
- `location_longitude`: geogr. Längengrad (im WGS84) des Gebäudeschwerpunktes (Centroid)
- `is_domestic`: Wohngebäude?
- `use_building_origin`: Originale Gebäudehauptnutzung
- `use_building_origin_text`: Ergänzung zur originalen Gebäudehauptnutzung
- `use_building_current`: Aktuelle Gebäudehauptnutzung
- `use_building_current_text`: Ergänzung zur aktuellen Gebäudehauptnutzung
- `basement_type`: Art der Unterkellerung
- `basement_percentage`: Anteil Unterkellerung (in Prozent)
- `basement_use`: Aktuelle Nutzung des Kellers
- `basement_use_source`: Datenquelle aktuelle Nutzung Keller
- `ground_storey_use`: Aktuelle Nutzung des Erdgeschosses
- `ground_storey_use_source`: Datenquelle aktuelle Nutzung Erdgeschoss
- `upper_storeys_use`: Aktuelle Nutzung 1. Etage und höher
- `upper_storeys_use_source`: Datenquelle aktuelle Nutzung 1. Etage und höher
- `use_number_residential_units`: Anzahl Wohneinheiten im Gebäude
- `use_number_businesses`: Anzahl Gewerbe im Gebäude
- `building_attachment_form`: Morphologischer Bautyp/ Nachbarschaft
- `size_roof_shape`: Dachform
- `size_roof_shape_source`: Datenquelle Dachform
- `building_owner`: Eigentumsform des Gebäudes
- `building_owner_source`: Datenquelle Eigentumsform des Gebäudes
- `size_storeys_core`: Anzahl Hauptgeschosse
- `size_storeys_attic`: Anzahl Dachgeschosse
- `size_storeys_basement`: Anzahl Kellergeschosse
- `size_height_apex`: Firsthöhe (in Metern)
- `size_floor_area_ground`: Grundfläche (in Quadratmetern)
- `size_floor_area_total`: Summe Geschossfläche (in Quadratmetern)
- `size_width_frontage`: Breite der Fassade/ der Gebäudefront (in Metern)
- `construction_system_type`: Hauptkonstruktion
- `construction_system_type_source`: Datenquelle Hauptkonstruktion
- `construction_core_material`: Primärer Baustoff
- `construction_secondary_materials`: Sekundärer Baustoff
- `construction_roof_covering`: Vorherrschende Dachbedeckung
- `building_status`: Aktueller Gebäudezustand
- `building_status_source`: Datenquelle aktueller Gebäudezustand
- `last_renovation`: Jahr der letzten Sanierung
- `last_renovation_source`: Datenquelle Jahr der letzten Sanierung
- `architectural_style`: Baustil und äußeres Erscheinungsbild
- `architectural_style_source`: Datenquelle Baustil und äußeres Erscheinungsbild
- `date_year`: Baujahr (ggf. beste Schätzung)
- `date_lower`: Baujahr (frühest mögliches Jahr)
- `date_upper`: Baujahr (spätest mögliches Jahr)
- `date_source`: Datenquelle der Information
- `facade_year`: Baujahr der Fassade
- `community_type_worth_keeping_total`: Glauben Sie, dass dieser Gebäudetyp einen Beitrag zur Stadt leistet?
- `likes_total`: Likes total
- `number_persons`: Haushaltsgröße
- `reference_period`: Bezugsjahr der Stromrechnung
- `electricity_usage`: Stromverbrauch
- `gas_usage`: Gaßverbrauch
- `living_area`: Wohnfläche
- `agreement_dsgv_sust`: Datenschutzbestimmungen akzeptiert
- `agreement_science_sust`: Weitere Nutzung der Daten akzeptiert

## Bearbeitungshistorie / Edit History

Jede Veränderung im Datenbestand von Colouring Dresden wird transparent gespeichert. So ist es möglich zu erforschen,
wie sich der Datensatz über die Zeit entwickelt hat.

Die Bearbeitungshistorie wird automatisch bei neuen Eingaben angelegt und umfasst die folgenden Felder:


- `revision_id`: eindeutiger Identifikator für die Bearbeitung, refernziert durch Gebäudeattribute
- `revision_timestamp`: Datum und Uhrzeit der Bearbeitung
- `building_id`: eindeutige Gebäude-Identifikator von Colouring Dresden
- `forward_patch`: enthält die gemachten Änderungen, formatiert als JSON Zeichenkette: keys sind die Gebäudemerkmale/ Spalten, values beinhalten die erfassten Werte für das Gebäudemerkmal.
- `reverse_patch`: speichert den Zustand der nun veränderten Gebäudemerkmale in ihrem Zustand vor der Bearbeitung.
- `user`: Benutzername


