import { Category } from './categories-config';
import { BuildingMapTileset } from './tileserver-config';

export type LegendElement = {
    color: string;
    border?: string;
    text: string;
} | {
    subtitle: string;
};

export interface LegendConfig {
    title: string;
    description?: string;
    disclaimer?: string;
    elements: LegendElement[];
}

export interface CategoryMapDefinition {
    mapStyle: BuildingMapTileset;
    legend: LegendConfig;
}

export const defaultMapCategory = Category.Age;

export const categoryMapsConfig: {[key in Category]: CategoryMapDefinition[]} = {
    [Category.Age]: [
        {
            mapStyle: 'date_year',
            legend: {
                title: 'Baujahr',
                elements: [
                    { color: '#fff9b8', text: '>2020' },
                    { color: '#fae269', text: '2000-2019' },
                    { color: '#fbaf27', text: '1980-1999' },
                    { color: '#e6711d', text: '1960-1979' },
                    { color: '#cc1212', text: '1940-1959' },
                    { color: '#8f0303', text: '1920-1939' },
                    { color: '#8f5385', text: '1900-1919' },
                    { color: '#c3e1eb', text: '1880-1899' },
                    { color: '#6a9dba', text: '1860-1879' },
                    { color: '#3b74a3', text: '1840-1859' },
                    { color: '#95ded8', text: '1820-1839' },
                    { color: '#68aba5', text: '1800-1819' },
                    { color: '#acc98f', text: '1750-1799' },
                    { color: '#6d8a51', text: '1700-1749' },
                    { color: '#d0c291', text: '<1700' },
                ]
            },
        },

        {
            mapStyle: 'architectural_style',
            legend: {
                title: 'Baustil & äuß. Erscheinungsbild',
                elements: [
                    { color: '#fff9b8', text: 'Nachkriegsmoderne: vorgefertigter Plattenbau' },
                    { color: '#fae269', text: 'Nachkriegsmoderne: handwerklich-konventionell gefertigt' },
                    { color: '#fbaf27', text: 'Nationale Tradition' },
                    { color: '#e6711d', text: 'Weiße Moderne' },
                    { color: '#cc1212', text: 'Neue Sachlichkeit' },
                    { color: '#8f0303', text: 'Expressionismus' },
                    { color: '#8f5385', text: 'Jugendstil' },
                    { color: '#c3e1eb', text: 'Reformarchitektur' },
                    { color: '#6a9dba', text: 'Historismus' },
                    { color: '#3b74a3', text: 'Klassizismus' },
                    { color: '#95ded8', text: 'Barock' },
                    { color: '#68aba5', text: 'Renaissance' },
                    { color: '#acc98f', text: 'Gotik' },
                    { color: '#6d8a51', text: 'Romanik' },
                    { color: '#d0c291', text: 'Antike' },
                ]
            },
        },

        {
            mapStyle: 'facade_year',
            legend: {
                title: 'Baujahr der Fassade',
                elements: [
                    { color: '#fff9b8', text: '>2020' },
                    { color: '#fae269', text: '2000-2019' },
                    { color: '#fbaf27', text: '1980-1999' },
                    { color: '#e6711d', text: '1960-1979' },
                    { color: '#cc1212', text: '1940-1959' },
                    { color: '#8f0303', text: '1920-1939' },
                    { color: '#8f5385', text: '1900-1919' },
                    { color: '#c3e1eb', text: '1880-1899' },
                    { color: '#6a9dba', text: '1860-1879' },
                    { color: '#3b74a3', text: '1840-1859' },
                    { color: '#95ded8', text: '1820-1839' },
                    { color: '#68aba5', text: '1800-1819' },
                    { color: '#acc98f', text: '1750-1799' },
                    { color: '#6d8a51', text: '1700-1749' },
                    { color: '#d0c291', text: '<1700' },
                ]
            },
        }
    ],

    [Category.Size]: [
        {
            mapStyle: 'size_storeys_core',
            legend: {
                title: 'Anzahl Hauptgeschosse',
                elements: [
                    { color: '#bd0026', text: '10+'},
                    { color: '#e31a1c', text: '5-9'},
                    { color: '#fc4e2a', text: '4'},
                    { color: '#fd8d3c', text: '3'},
                    { color: '#feb24c', text: '2'},
                    { color: '#fed976', text: '1'},
                    { color: '#ffe8a9', text: '0'}
                ]
            },
        },
        {
            mapStyle: 'size_storeys_attic',
            legend: {
                title: 'Anzahl Dachgeschosse',
                elements: [
                    { color: '#bd0026', text: '4+'},
                    { color: '#fc4e2a', text: '3'},
                    { color: '#feb24c', text: '2'},
                    { color: '#fed976', text: '1'},
                    { color: '#ffe8a9', text: '0'}
                ]
            },
        },
        {
            mapStyle: 'size_storeys_basement',
            legend: {
                title: 'Anzahl Kellergeschosse',
                elements: [
                    { color: '#bd0026', text: '4+'},
                    { color: '#fc4e2a', text: '3'},
                    { color: '#feb24c', text: '2'},
                    { color: '#fed976', text: '1'},
                    { color: '#ffe8a9', text: '0'}
                ]
            },
        },
        {
            mapStyle: 'size_height',
            legend: {
                title: 'Firsthöhe (in Metern)',
                elements: [
                    { color: '#f7f4f9', text: '0-5.55'},
                    { color: '#e7e1ef', text: '5.55-7.73'},
                    { color: '#d4b9da', text: '7.73-11.38'},
                    { color: '#c994c7', text: '11.38-18.45'},
                    { color: '#df65b0', text: '18.45-35.05'},
                    { color: '#e7298a', text: '35.05-89.30'},
                    { color: '#ce1256', text: '89.30-152'},
                    { color: '#980043', text: '≥152'}
                ]
            },
        },
        {
            mapStyle: 'size_floor_area_ground',
            legend: {
                title: 'Grundfläche (in Quadratmetern)',
                elements: [
                    { color: '#bd0026', text: '500+'},
                    { color: '#fc4e2a', text: '250-499'},
                    { color: '#feb24c', text: '100-249'},
                    { color: '#fed976', text: '50-99'},
                    { color: '#ffe8a9', text: '0-49'}
                ]
            },
        }

    ],
    [Category.Team]: [
        {
            mapStyle: undefined,
            legend: {
                title: 'Team',
                elements: []
            },
        }   
        
        
        
        
/*         {
        mapStyle: 'team',
        legend: {
            title: 'Team',
            description: '% der Daten erfasst',
            elements: [
                { color: '#994d00', text: '≥80%' },
                { color: '#e67300', text: '60–80%' },
                { color: '#ff9933', text: '40–60%' },
                { color: '#ffbf80', text: '20–40%' },
                { color: '#ffe6cc', text: '<20%' }
            ]
        },
    } */
    ],
    [Category.Construction]: [

        {
            mapStyle: 'construction_system_type',
            legend: {
                title: 'Hauptkonstruktion',
                elements: [
                    { color: '#d6c9bd', text: 'Massivbauweise: Mauerwerk' },
                    { color: '#e8af94', text: 'Massivbauweise: Ortbeton/monolithische Bauweise' },
                    { color: '#dccca5', text: 'Massivbauweise: Plattenbau' },
                    { color: '#f1e2d2', text: 'Skelettbauweise: Stahlkonstruktion' },
                    { color: '#d5b2b2', text: 'Skelettbauweise: Stahlbetonkonstruktion' },
                    { color: '#bca2aa', text: 'Holzkonstruktion: Fachwerk' },
                    { color: '#cae5c3', text: 'Holzkonstruktion: Holzrahmen' },
                    { color: '#fffef5', text: 'Holzkonstruktion: Blockbau' },
                    { color: '#f0cff5', text: 'Holzkonstruktion: Holzfertigteilbau' },
                    { color: '#c6858d', text: 'Gemischte Bauweisen' },

                ]
            }
        }, 




        {
            mapStyle: 'construction_core_material',
            legend: {
                title: 'Primärer Baustoff',
                elements: [
                    { color: "#f5d96b", text: "Ziegel" },
                    { color: "#96613b", text: "andere Mauersteine: Kalksandstein" },
                    { color: "#cae5c3", text: "andere Mauersteine: Porenbeton" },
                    { color: "#f0cff5", text: "andere Mauersteine: Bruchstein" },
                    { color: "#fca89d", text: "Stahlbeton" },
                    { color: "#beffe8", text: "Stahl" },
                    { color: "#b5a859", text: "Holz" },
                    { color: "#5c8970", text: "anderes Baumaterial" }

                ]
            },
        },


        {
            mapStyle: 'building_status',
            legend: {
                title: 'Aktueller Gebäudezustand',
                elements: [
                    { color: '#cccccc', text: 'Ruine' },
                    { color: '#ffffff', text: 'Investruine' },
                    { color: '#f5f58f', text: 'unsaniert' },
                    { color: '#fa667d', text: 'teil-/ vollsaniert' },
                    { color: '#e5050d', text: 'Neubau (nach 1990)' },
                    { color: '#252aa6', text: 'aktuell in Sanierung' },
                    { color: '#7025a6', text: 'aktuell im Aufbau' },
                    { color: '#45cce3', text: 'aktuell im Abriss' },
                    { color: '#898944', text: 'bereits abgerissen' },

                ]
            }
        }, 


        {
            mapStyle: 'last_renovation',
            legend: {
                title: 'Jahr der letzten Sanierung',
                elements: [
                    { color: '#fff9b8', text: '>2020' },
                    { color: '#fae269', text: '2000-2019' },
                    { color: '#fbaf27', text: '1980-1999' },
                    { color: '#e6711d', text: '1960-1979' },
                    { color: '#cc1212', text: '1940-1959' },
                    { color: '#8f0303', text: '1920-1939' },
                    { color: '#8f5385', text: '1900-1919' },
                    { color: '#c3e1eb', text: '1880-1899' },
                    { color: '#6a9dba', text: '1860-1879' },
                    { color: '#3b74a3', text: '1840-1859' },
                    { color: '#95ded8', text: '1820-1839' },
                    { color: '#68aba5', text: '1800-1819' },
                    { color: '#acc98f', text: '1750-1799' },
                    { color: '#6d8a51', text: '1700-1749' },
                    { color: '#d0c291', text: '<1700' },
                ]
            },
        },





    ],



    [Category.Location]: [
        {
            mapStyle: 'number_mapped_building_features',
            legend: {
                title: 'Stand der Erfassung',
                description: 'Anzahl erfasster Gebäudemerkmale',
                elements: [
                    { color: '#003300', text: '≥41 Merkmale' },
                    { color: '#FFFFFF', text: '0 Merkmale' }
                        ]
                    },
            },        
        {
        mapStyle: 'location',
        legend: {
            title: 'Standort',
            description: '% der Daten erfasst',
            elements: [
                { color: '#084081', text: '≥80%' },
                { color: '#0868ac', text: '60–80%' },
                { color: '#43a2ca', text: '40–60%' },
                { color: '#7bccc4', text: '20–40%' },
                { color: '#bae4bc', text: '<20%' }
                    ]
                },
        }
    ],
    [Category.Community]: [
        /*
        {
            mapStyle: 'likes',
            legend: {
                title: 'Like Me',
                elements: [
                    { color: '#bd0026', text: '👍👍👍👍 100+' },
                    { color: '#e31a1c', text: '👍👍👍 50–99' },
                    { color: '#fc4e2a', text: '👍👍 20–49' },
                    { color: '#fd8d3c', text: '👍👍 10–19' },
                    { color: '#feb24c', text: '👍 3–9' },
                    { color: '#fed976', text: '👍 2' },
                    { color: '#ffe8a9', text: '👍 1'}
                ]
            }
        },
        */
        {
            mapStyle: undefined,
            legend: {
                title: 'Community',
                elements: []
            },
        }   
/*         {
            mapStyle: 'typology_likes',
            legend: {
                title: 'Likes für Gebäudetyp',
                elements: [
                    { color: '#bd0026', text: '👍👍👍👍 100+' },
                    { color: '#e31a1c', text: '👍👍👍 50–99' },
                    { color: '#fc4e2a', text: '👍👍 20–49' },
                    { color: '#fd8d3c', text: '👍👍 10–19' },
                    { color: '#feb24c', text: '👍 3–9' },
                    { color: '#fed976', text: '👍 2' },
                    { color: '#ffe8a9', text: '👍 1'}
                ]
            }
        },
        {
            mapStyle: 'community_local_significance_total',
            legend: {
                title: 'Lokales Interesse',
                description: 'Anzahl Menschen die der Meinung sind, dass das Gebäude von lokalem Interesse ist',
                elements: [
                    { color: '#bd0026', text: '100+' },
                    { color: '#e31a1c', text: '50–99' },
                    { color: '#fc4e2a', text: '20–49' },
                    { color: '#fd8d3c', text: '10–19' },
                    { color: '#feb24c', text: '3–9' },
                    { color: '#fed976', text: '2' },
                    { color: '#ffe8a9', text: '1'}
                ]
            }
        },
        {
            mapStyle: 'community_expected_planning_application_total',
            legend: {
                title: 'Erwartete Bauanträge',
                disclaimer: 'Sites identified by users as likely to be subject to planning application over the next six months',
                elements: [
                    { color: '#bd0026', text: '100+' },
                    { color: '#e31a1c', text: '50–99' },
                    { color: '#fc4e2a', text: '20–49' },
                    { color: '#fd8d3c', text: '10–19' },
                    { color: '#feb24c', text: '3–9' },
                    { color: '#fed976', text: '2' },
                    { color: '#ffe8a9', text: '1'}
                ]
            }
        },
        {
            mapStyle: 'community_in_public_ownership',
            legend: {
                title: 'Public Ownership',
                description: 'Is the building in some form of public/community ownership',
                elements: [
                    {color: '#1166ff', text: 'Yes'},
                    {color: '#ffaaa0', text: 'No'}
                ]
            }
        } */
    ],
    [Category.Planning]: [

        {
            mapStyle: undefined,
            legend: {
                title: 'Planung',
                elements: []
            },
        }

        
/*         {
            // this database commad allows to see statistics about decision dates per year
            // SELECT COUNT(*), date_part('year', decision_date) as year from planning_data WHERE decision_date IS NOT NULL GROUP BY year ORDER BY year ASC;
            // SELECT COUNT(*), date_part('year', registered_with_local_authority_date) as year from planning_data WHERE decision_date IS NOT NULL GROUP BY year ORDER BY year ASC;
            mapStyle: 'planning_applications_status_all',
            legend: {
                title: 'All planning applications available from GLA (official data)',
                disclaimer: 'The map shows official data available from the GLA Planning London Datahub. What you are looking at is mainly applications from 2019 onwards.',
                elements: [
                    { color: '#a040a0', text: 'Submitted, awaiting decision' },
                    { color: '#fff200', text: 'Appeal In Progress' },
                    { color: '#16cf15', text: 'Approved' },
                    { color: '#e31d23', text: 'Rejected' },
                    { color: '#7a84a0', text: 'Withdrawn' },
                    { color: '#eacad0', text: 'Other' },
                ]
            }
        },
        {
            mapStyle: 'planning_applications_status_recent',
            legend: {
                title: 'The last 12 months - planning applications submissions/decisions (official data)',
                disclaimer: 'The map shows applications where the submission or decision data falls within the last 12 months.',
                elements: [
                    { color: '#a040a0', text: 'Submitted, awaiting decision' },
                    { color: '#fff200', text: 'Appeal In Progress' },
                    { color: '#16cf15', text: 'Approved' },
                    { color: '#e31d23', text: 'Rejected' },
                    { color: '#7a84a0', text: 'Withdrawn' },
                    { color: '#eacad0', text: 'Other' },
                ]
            }
        },
        {
            mapStyle: 'planning_applications_status_very_recent',
            legend: {
                title: 'Last 30 days - planning applications submissions/decisions (official data)',
                disclaimer: 'The map shows applications where the submission or decision data falls within last 30 days.',
                elements: [
                    { color: '#a040a0', text: 'Submitted, awaiting decision' },
                    { color: '#fff200', text: 'Appeal In Progress' },
                    { color: '#16cf15', text: 'Approved' },
                    { color: '#e31d23', text: 'Rejected' },
                    { color: '#7a84a0', text: 'Withdrawn' },
                    { color: '#eacad0', text: 'Other' },
                ]
            }
        },
        {
            mapStyle: 'community_expected_planning_application_total',
            legend: {
                title: 'Erwartete Bauanträge',
                disclaimer: 'Von den Citizen Scientists identifizierte Standorte, für die in den nächsten sechs Monaten wahrscheinlich ein Bauantrag gestellt wird',
                elements: [
                    { color: '#bd0026', text: '100+' },
                    { color: '#e31a1c', text: '50–99' },
                    { color: '#fc4e2a', text: '20–49' },
                    { color: '#fd8d3c', text: '10–19' },
                    { color: '#feb24c', text: '3–9' },
                    { color: '#fed976', text: '2' },
                    { color: '#ffe8a9', text: '1'}
                ]
            }
        },
        {
            mapStyle: 'planning_combined',
            legend: {
                title: 'Designation/protection (official and crowdsourced data)',
                disclaimer: 'All data relating to designated buildings should be checked against the National Heritage List for England and local authority websites. Designation data is currently incomplete. We are aiming for 100% coverage by December 2023.',
                elements: [
                    { color: '#95beba', text: 'In Conservation Area'},
                    { color: '#c72e08', text: 'Grade I Listed'},
                    { color: '#e75b42', text: 'Grade II* Listed'},
                    { color: '#ffbea1', text: 'Grade II Listed'},
                    { color: '#85ffd4', text: 'Heritage at Risk'},
                    { color: '#858ed4', text: 'Locally Listed'},
                    { color: '#858eff', text: 'In World Heritage Site'},
                    { color: '#8500d4', text: 'In Archaeological Priority Area'},
                ]
            },
        } */


    ],
    [Category.Sustainability]: [
        
        {
            mapStyle: undefined,
            legend: {
                title: 'Energie',
                elements: []
            },
        }        
        
        
/*         {
            mapStyle: 'sust_dec',
            legend: {
                title: 'Energie',
                description: 'DEC Rating',
                elements: [
                    { color: "#007f3d", text: 'A' },
                    { color: "#2c9f29", text: 'B' },
                    { color: "#9dcb3c", text: 'C' },
                    { color: "#fff200", text: 'D' },
                    { color: "#f7af1d", text: 'E' },
                    { color: "#ed6823", text: 'F' },
                    { color: "#e31d23", text: 'G' },
                ]
            },
        } */
    ],
    [Category.Type]: [
        {
            mapStyle: 'building_attachment_form',
            legend: {
                title: 'Morphologischer Bautyp/ Nachbarschaft',
                elements: [
                    { color: "#f2a2b9", text: "freistehend" },
                    { color: "#ab8fb0", text: "Doppelhaushälfte" },
                    { color: "#3891d1", text: "Häuserreihe (Ende)" },
                    { color: "#043b63", text: "Häuserreihe (innerhalb)" }
                ]
            },
        },


        {
            mapStyle: 'size_roof_shape',
            legend: {
                title: 'Dachform',
                elements: [
                    { color: '#252aa6', text: 'Flachdach' },
                    { color: '#ae4d2a', text: 'Pultdach' },
                    { color: '#6c6f8e', text: 'Satteldach' },
                    { color: '#46555b', text: 'Mansarddach' },
                    { color: '#cd7e26', text: 'Walmdach' },
                    { color: '#ffadfc', text: 'Krüppelwalmdach' },
                    { color: '#dbbb9b', text: 'Gewölbte Dächer (Tonnen-, Halbtonnen-, Segmentbogendächer)' },
                    { color: '#898944', text: 'Zeltdach' },
                    { color: '#133bfc', text: 'Graben- bzw. Schmetterlingsdach' },
                    { color: '#b3de69', text: 'Sheddach' },
                    { color: '#dfeefc', text: 'Schalen- und Membrandächer' },

                ]
            }
        }, 

        {
            mapStyle: 'building_owner',
            legend: {
                title: 'Eigentumsform des Gebäudes',
                elements: [
                    { color: '#252aa6', text: 'öffentl. Eigentümer - Bund' },
                    { color: '#ae4d2a', text: 'öffentl. Eigentümer - BIMA (Bundesanstalt für Immobilienaufgaben)' },
                    { color: '#6c6f8e', text: 'öffentl. Eigentümer - Bundesland' },
                    { color: '#46555b', text: 'öffentl. Eigentümer - Kommune/ Stadt' },
                    { color: '#cd7e26', text: 'öffentl. Eigentümer - kommunale Wohnungsgesellschaft' },
                    { color: '#ffadfc', text: 'öffentl. Eigentümer - städtische(r) Betrieb/ Gesellschaften' },
                    { color: '#dbbb9b', text: 'Wohnungsgenossenschaften' },
                    { color: '#898944', text: 'private Wohnungsunternehmen' },
                    { color: '#133bfc', text: 'sonstige private Unternehmen (ohne Wohnungsunternehmen)' },
                    { color: '#b3de69', text: 'Deutsche Bahn AG' },
                    { color: '#dfeefc', text: 'Kirchliches Eigentum, Stiftungen, gemeinwohlorientierte Eigentümer' },

                ]
            }
        }, 



],
    [Category.LandUse]: [
        {
            mapStyle: 'is_domestic',
            legend: {
                title: 'Wohngebäude?',
                elements: [
                    { color: '#f7ec25', text: 'Wohngebäude' },
                    { color: '#fc9b2a', text: 'gemischte Nutzung' },
                    { color: '#ff2121', text: 'Nichtwohngebäude' },
                ]
            }
        }, 


        {
            mapStyle: 'use_building_origin',
            legend: {
                title: 'Originale Gebäudehauptnutzung',
                elements: [
                    { color: '#252aa6', text: 'Ein- und Zweifamilienhäuser' },
                    { color: '#7025a6', text: 'Mehrfamilienhäuser' },
                    { color: '#ff8c00', text: 'Wohnheime' },
                    { color: '#fa667d', text: 'Kindergärten und -tagesstätten' },
                    { color: '#ffbfbf', text: 'Lehrgebäude (Schulen, Hörsalgebäude, VHS etc.)' },
                    { color: '#6c6f8e', text: 'Heime (Pflege-, Kranken-, Genesungs-, Erholungsheime etc.)' },
                    { color: '#898944', text: 'Bereitschafts- und Kasernengebäude, JVA' },
                    { color: '#f5f58f', text: 'Kranken-, Ärztehäuser, Kliniken' },
                    { color: '#46555b', text: 'Handelsgebäude' },
                    { color: '#ffadfc', text: 'Hotel, Gastronomie, Pension, Gasthaus' },
                    { color: '#b3de69', text: 'Landwirtschaftliche Betriebsgebäude' },
                    { color: '#133bfc', text: 'Produktionsstätten, Fabrik- und Werkstattgebäude' },
                    { color: '#dbbb9b', text: 'Lagergebäude' },
                    { color: '#95a984', text: 'Verkehrsgebäude' },
                    { color: '#cd7e26', text: 'Kultur-, Veranstaltungsbauten' },
                    { color: '#45cce3', text: 'Religiöse Versammlungsstätten' },
                    { color: '#dfeefc', text: 'Sporteinrichtungen' },
                    { color: '#ae4d2a', text: 'Büro- und Verwaltungsgebäude' },
                    { color: '#5ce1e6', text: 'Ver- und Entsorgungsbauwerke' },
                    { color: '#008000', text: 'Kleingartenanlage' },
                    { color: '#cccccc', text: 'Sonstige Nichtwohngebäude' },
                ]
            }
        }, 

        {
            mapStyle: 'use_building_current',
            legend: {
                title: 'Aktuelle Gebäudehauptnutzung',
                elements: [
                    { color: '#252aa6', text: 'Ein- und Zweifamilienhäuser' },
                    { color: '#7025a6', text: 'Mehrfamilienhäuser' },
                    { color: '#ff8c00', text: 'Wohnheime' },
                    { color: '#fa667d', text: 'Kindergärten und -tagesstätten' },
                    { color: '#ffbfbf', text: 'Lehrgebäude (Schulen, Hörsalgebäude, VHS etc.)' },
                    { color: '#6c6f8e', text: 'Heime (Pflege-, Kranken-, Genesungs-, Erholungsheime etc.)' },
                    { color: '#898944', text: 'Bereitschafts- und Kasernengebäude, JVA' },
                    { color: '#f5f58f', text: 'Kranken-, Ärztehäuser, Kliniken' },
                    { color: '#46555b', text: 'Handelsgebäude' },
                    { color: '#ffadfc', text: 'Hotel, Gastronomie, Pension, Gasthaus' },
                    { color: '#b3de69', text: 'Landwirtschaftliche Betriebsgebäude' },
                    { color: '#133bfc', text: 'Produktionsstätten, Fabrik- und Werkstattgebäude' },
                    { color: '#dbbb9b', text: 'Lagergebäude' },
                    { color: '#95a984', text: 'Verkehrsgebäude' },
                    { color: '#cd7e26', text: 'Kultur-, Veranstaltungsbauten' },
                    { color: '#45cce3', text: 'Religiöse Versammlungsstätten' },
                    { color: '#dfeefc', text: 'Sporteinrichtungen' },
                    { color: '#ae4d2a', text: 'Büro- und Verwaltungsgebäude' },
                    { color: '#5ce1e6', text: 'Ver- und Entsorgungsbauwerke' },
                    { color: '#cccccc', text: 'Sonstige Nichtwohngebäude' },
                    { color: '#008000', text: 'Kleingartenanlage' },
                    { color: '#ffffff', text: 'Leerstand' },
                ]
            }
        }, 




        {
            mapStyle: 'basement_type',
            legend: {
                title: 'Art der Unterkellerung',
                elements: [
                    { color: '#f5f58f', text: 'nicht unterkellert' },
                    { color: '#fa667d', text: 'teilunterkellert' },
                    { color: '#e5050d', text: 'vollunterkellert' },
                    { color: '#7025a6', text: 'vollunterkellert + Tiefgarage' },
                ]
            }
        }, 


        {
            mapStyle: 'basement_percentage',
            legend: {
                title: 'Anteil Unterkellerung (in %)',
                disclaimer: 'bezogen auf die Grundfläche des Gebäudes',
                elements: [
                    { color: '#bd0026', text: '100+' },
                    { color: '#e31a1c', text: '75-99' },
                    { color: '#fc4e2a', text: '50-74' },
                    { color: '#fd8d3c', text: '25-49' },
                    { color: '#feb24c', text: '1-24' },
                    { color: '#fed976', text: '0' },
                ]
            }
        }, 




        {
            mapStyle: 'basement_use',
            legend: {
                title: 'Aktuelle Nutzung des Kellers',
                elements: [
                    { color: '#f5f58f', text: 'übliche Kellernutzung' },
                    { color: '#e5050d', text: 'Wohnen, Arbeit, Freizeit' },
                    { color: '#7025a6', text: 'Garage' },
                    { color: '#cccccc', text: 'sonstige Nutzung' },
                    { color: '#ffffff', text: 'Leerstand' },
                ]
            }
        }, 


        {
            mapStyle: 'ground_storey_use',
            legend: {
                title: 'Aktuelle Nutzung des Erdgeschosses',
                elements: [
                    { color: '#252aa6', text: 'Wohnen' },
                    { color: '#ae4d2a', text: 'Büro und Verwaltung' },
                    { color: '#6c6f8e', text: 'Praxis' },
                    { color: '#46555b', text: 'Laden, Handel' },
                    { color: '#cd7e26', text: 'Kultur' },
                    { color: '#ffadfc', text: 'Gastgewerbe (Gaststätte, Pension, Hotel, Imbiss)' },
                    { color: '#dbbb9b', text: 'Lager' },
                    { color: '#898944', text: 'Werkstatt' },
                    { color: '#133bfc', text: 'Produzierendes Gewerbe' },
                    { color: '#b3de69', text: 'Landwirtschaftliche Nutzung' },
                    { color: '#dfeefc', text: 'Sporteinrichtung (Fitness etc.)' },
                    { color: '#45cce3', text: 'Religiöse Nutzung' },
                    { color: '#5ce1e6', text: 'Garage' },
                    { color: '#f5f58f', text: 'Gesundheit (Ärztehaus, Klinik, Apotheke)' },
                    { color: '#95a984', text: 'Verkehr' },
                    { color: '#008000', text: 'Kleingartenanlage' },
                    { color: '#cccccc', text: 'Sonstiges' },
                    { color: '#ffffff', text: 'Leerstand' },
                ]
            }
        }, 




        {
            mapStyle: 'upper_storeys_use',
            legend: {
                title: 'Aktuelle Nutzung 1. Etage und höher',
                elements: [
                    { color: '#252aa6', text: 'Wohnen' },
                    { color: '#ae4d2a', text: 'Büro und Verwaltung' },
                    { color: '#6c6f8e', text: 'Praxis' },
                    { color: '#46555b', text: 'Laden, Handel' },
                    { color: '#cd7e26', text: 'Kultur' },
                    { color: '#ffadfc', text: 'Gastgewerbe (Gaststätte, Pension, Hotel, Imbiss)' },
                    { color: '#dbbb9b', text: 'Lager' },
                    { color: '#898944', text: 'Werkstatt' },
                    { color: '#133bfc', text: 'Produzierendes Gewerbe' },
                    { color: '#b3de69', text: 'Landwirtschaftliche Nutzung' },
                    { color: '#dfeefc', text: 'Sporteinrichtung (Fitness etc.)' },
                    { color: '#45cce3', text: 'Religiöse Nutzung' },
                    { color: '#5ce1e6', text: 'Garage' },
                    { color: '#f5f58f', text: 'Gesundheit (Ärztehaus, Klinik, Apotheke)' },
                    { color: '#95a984', text: 'Verkehr' },
                    { color: '#cccccc', text: 'Sonstiges' },
                    { color: '#ffffff', text: 'Leerstand' },
                ]
            }
        }, 



        {
            mapStyle: 'use_number_residential_units',
            legend: {
                title: 'Anzahl Wohneinheiten im Gebäude',
                elements: [
                    { color: '#7025a6', text: '50+' },
                    { color: '#bd0026', text: '20-49' },
                    { color: '#e31a1c', text: '10-19' },
                    { color: '#fc4e2a', text: '5-9' },
                    { color: '#fd8d3c', text: '3-4' },
                    { color: '#feb24c', text: '2' },
                    { color: '#fed976', text: '1' },
                    { color: '#ffe8a9', text: '0' },

                ]
            }
        }, 
        
        
        {
            mapStyle: 'use_number_businesses',
            legend: {
                title: 'Anzahl Gewerbe im Gebäude',
                elements: [
                    { color: '#bd0026', text: '20+' },
                    { color: '#e31a1c', text: '10-19' },
                    { color: '#fc4e2a', text: '5-9' },
                    { color: '#fd8d3c', text: '3-4' },
                    { color: '#feb24c', text: '2' },
                    { color: '#fed976', text: '1' },
                    { color: '#ffe8a9', text: '0' },
                ]
            }
        }, 









/* 
        {
            mapStyle: 'landuse',
            legend: {
                title: 'Land Use',
                elements: [
                    { color: '#e5050d', text: 'Mixed Use' },
                    { subtitle: 'Single use:'},
                    { color: '#252aa6', text: 'Residential (unverified)' },
                    { color: '#7025a6', text: 'Residential (verified)' },
                    { color: '#ff8c00', text: 'Retail' },
                    { color: '#f5f58f', text: 'Industry & Business' },
                    { color: '#fa667d', text: 'Community Services' },
                    { color: '#ffbfbf', text: 'Recreation & Leisure' },
                    { color: '#b3de69', text: 'Transport' },
                    { color: '#cccccc', text: 'Utilities & Infrastructure' },
                    { color: '#898944', text: 'Defence' },
                    { color: '#73ccd1', text: 'Agriculture' },
                    { color: '#45cce3', text: 'Minerals' },
                    { color: '#ffffff', text: 'Vacant & Derelict' },
                    { color: '#6c6f8e', text: 'Unclassified, presumed non-residential' }
                ]
            },
        } */
    ],
    [Category.Streetscape]: [
        
        {
            mapStyle: undefined,
            legend: {
                title: 'Straßenraum',
                elements: []
            },
        }


    ],
    [Category.Resilience]: [


        {
            mapStyle: 'facade_window_percentage',
            legend: {
                title: 'Anteil Fenster an Fasade',
                /* description: 'Demolished buildings on the same site', */
                elements: [
                    { color: '#e31a1c', text: '80-100%' },
                    { color: '#fc4e2a', text: '60-80%' },
                    { color: '#fd8d3c', text: '40-60%' },
                    { color: '#feb24c', text: '20-40%' },
                    { color: '#fed976', text: '0-20%' },
                ]
            }
        },
        {
            mapStyle: 'roof_colour',
            legend: {
                title: 'Dachfarbe',
                /* description: 'Demolished buildings on the same site', */
                elements: [
                    { color: '#000000', text: 'schwarz' },
                    { color: '#808080', text: 'dunkelgrau' },
                    { color: '#cccccc', text: 'hellgrau' },
                    { color: '#805500', text: 'dunkelbraun' },
                    { color: '#e69900', text: 'hellbraun' },
                    { color: '#009933', text: 'grün' },
                    { color: '#00cc99', text: 'türkis' },
                    { color: '#0000ff', text: 'blau' },
                    { color: '#ff0000', text: 'rot' },
                    { color: '#ffff00', text: 'gelb' },
                    { color: '#ffe6cc', text: 'beige' },
                    { color: '#ffffff', text: 'weiß' },
                    { color: '#ff00ff', text: 'andere Farbe' },
                    { color: '#33cccc', text: 'Solaranlage' },
                    { color: '#99ddff', text: 'Vollverglasung' },
                    { color: '#b3ffcc', text: 'Dachbegrünung: extensiv' },
                    { color: '#4dff88', text: 'Dachbegrünung: intensiv' },
                ]
            }
        },

        {
            mapStyle: 'facade_colour',
            legend: {
                title: 'Fassadenfarbe',
                /* description: 'Demolished buildings on the same site', */
                elements: [
                    { color: '#000000', text: 'schwarz' },
                    { color: '#808080', text: 'dunkelgrau' },
                    { color: '#cccccc', text: 'hellgrau' },
                    { color: '#805500', text: 'dunkelbraun' },
                    { color: '#e69900', text: 'hellbraun' },
                    { color: '#009933', text: 'grün' },
                    { color: '#00cc99', text: 'türkis' },
                    { color: '#0000ff', text: 'blau' },
                    { color: '#9933ff', text: 'lila' },
                    { color: '#ff0000', text: 'rot' },
                    { color: '#ff9933', text: 'orange' },
                    { color: '#ffff00', text: 'gelb' },
                    { color: '#ffe6cc', text: 'beige' },
                    { color: '#ffffff', text: 'weiß' },
                    { color: '#ff00ff', text: 'andere Farbe' },
                    { color: '#33cccc', text: 'Solaranlage' },
                    { color: '#99ddff', text: 'Vollverglasung' },
                    { color: '#b3ffcc', text: 'Fassadenbegrünung' },
                ]
            }
        },




        {
            mapStyle: 'thermal_stress_objective_count',
            legend: {
                title: 'Obj. Temperatur (Anzahl)',
                description: 'Anzahl erfasster Messungen', 
                elements: [
                    {
                        text: '7+',
                        color: '#bd0026',
                    }, {
                        text: '6',
                        color: '#e31a1c',
                    }, {
                        text: '5',
                        color: '#fc4e2a',
                    }, {
                        text: '4',
                        color: '#fd8d3c',
                    }, {
                        text: '3',
                        color: '#feb24c',
                    }, {
                        text: '2',
                        color: '#fed976',
                    }, {
                        text: '1',
                        color: '#ffe8a9',
                    }, {
                        text: '0',
                        color: '#0C7BDC'
                    }
                ]
            }
        },
        {
            mapStyle: 'thermal_stress_subjective_count',
            legend: {
                title: 'Subj. Temperatur (Anzahl)',
                description: 'Anzahl erfasster Messungen', 
                elements: [
                    {
                        text: '7+',
                        color: '#bd0026',
                    }, {
                        text: '6',
                        color: '#e31a1c',
                    }, {
                        text: '5',
                        color: '#fc4e2a',
                    }, {
                        text: '4',
                        color: '#fd8d3c',
                    }, {
                        text: '3',
                        color: '#feb24c',
                    }, {
                        text: '2',
                        color: '#fed976',
                    }, {
                        text: '1',
                        color: '#ffe8a9',
                    }, {
                        text: '0',
                        color: '#0C7BDC'
                    }
                ]
            }
        },


        {
            mapStyle: 'terrain_connection_yesno',
            legend: {
                title: 'Geländeanbindung',
                description: 'Ist der Boden des Erdgeschosses höher als das umliegende Gelände?',
                elements: [
                    { color: '#f5f58f', text: 'höher' },
                    { color: '#e5050d', text: 'gleich' },
                    { color: '#7025a6', text: 'niedriger' },
                ]
            }
        },




        {
            mapStyle: 'rain_flood_historic_incidents_count',
            legend: {
                title: 'Historische Ereignisse (Anzahl)',
                /* description: 'Demolished buildings on the same site', */
                elements: [
                    {
                        text: '7+',
                        color: '#bd0026',
                    }, {
                        text: '6',
                        color: '#e31a1c',
                    }, {
                        text: '5',
                        color: '#fc4e2a',
                    }, {
                        text: '4',
                        color: '#fd8d3c',
                    }, {
                        text: '3',
                        color: '#feb24c',
                    }, {
                        text: '2',
                        color: '#fed976',
                    }, {
                        text: '1',
                        color: '#ffe8a9',
                    }, {
                        text: '0',
                        color: '#0C7BDC'
                    }
                ]
            }
        },



    ]
    
};
