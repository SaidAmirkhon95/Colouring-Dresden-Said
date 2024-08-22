import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { Category } from './categories-config';


/**
 * This interface is used only in code which uses dataFields, not in the dataFields definition itself
 * Cannot make dataFields an indexed type ({[key: string]: DataFieldDefinition}),
 * because then we wouldn't have type-checking for whether a given key exists on dataFields,
 * e.g. dataFields.foo_bar would not be highlighted as an error.
 */
export interface DataFieldDefinition {
    /**
     * The primary category to which the field belongs.
     * 
     * A field could be displayed in several categories, but this value will be used
     * when a single category needs to be shown in the context of a field, e.g.
     * in the case of edit history or the copy-paste tool (multi-edit)
     *  */ 
    category: Category;

    /**
     * The human-readable title of the field to be displayed as label.
     */
    title: string;

    /**
     * Text to be displayed in the hint tooltip next to the input field.
     * 
     * This supports a simple Markdown-like syntax for embedding clickable URLs in the hint
     * for example "see [here](http://example.com/info.html) for more information"
     */
    tooltip?: string;

    /**
     * If the defined type is an array, this describes the fields of each array item.
     * The nested fields don't currently need a category field to be defined.
     */
    items?: { [key: string]: Omit<DataFieldDefinition, 'category'> };


    /**
     * If the defined type is a dictionary, this describes the types of the dictionary's fields
     */
    fields?: { [key: string]: Omit<DataFieldDefinition, 'category'>}

    /**
     * The example is used to determine the runtime type in which the attribute data is stored (e.g. number, string, object)
     * This gives the programmer auto-complete of all available building attributes when implementing a category view.
     * 
     * E.g. if the field is a text value, an empty string ("") is the simplest example.
     * 
     * Making it semantically correct is useful but not necessary.
     * E.g. for building attachment form, you could use "Detached" as example
     * 
     * This field is later processed by AttributesBasedOnExample
     */
    example: any;

    /**
     * Whether the field is a field that has an independent value for each user.
     * For example, user building likes are one of such fields.
     * By default this is false - fields are treated as not user-specific.
     */
    perUser?: boolean;
}

export const buildingUserFields = {
    community_like: {
        perUser: true,
        category: Category.Community,
        title: "Mögen Sie dieses Gebäude und denken Sie, dass es einen Beitrag zur Stadt leistet?",
        example: true,
    },
    community_type_worth_keeping: {
        perUser: true,
        category: Category.Community,
        title: "Glauben Sie, dass dieser **Gebäudetyp** einen Beitrag zur Stadt leistet?",
        example: true,
    },
    community_type_worth_keeping_reasons: {
        perUser: true,
        category: Category.Community,
        title: 'Bitte wählen Sie unter den folgenden Antworten aus (Mehrfachauswahl möglich)',
        fields: {
            external_design: {
                title: "Weil die äußere Gestaltung zum Straßenbild beiträgt"
            },
            internal_design: {
                title: 'Weil die innere Gestaltung des Gebäudes gut durchdacht ist'
            },
            adaptable: {
                title: 'Weil das Gebäude leicht angepasst und wiederverwendet werden kann'
            },
            using_outside_space: {
                title: 'Weil das Gebäude einen Außenbereich umfasst'
            },
            durable: {
                title: 'Weil die Bauweise und die Materialien langlebig sein dürften'
            },
            other: {
                title: 'Andere Gründe'
            }
        },
        example: {
            external_design: true,
            internal_design: true,
            adaptable: false,
            using_outside_space: true,
            durable: true,
            other: false
        }
    },
    
    community_local_significance: {
        perUser: true,
        category: Category.Community,
        title: "Sind Sie der Meinung, dass dieses Gebäude als Gebäude von besonderem lokalen Interesse erfasst werden sollte?",
        example: true
    },
    community_expected_planning_application: {
        perUser: true,
        category: Category.Community,
        title: "Glauben Sie, dass dieses Gebäude in den nächsten sechs Monaten Gegenstand eines Bauantrags sein könnte, der dessen Abriss beinhaltet?",
        example: true
    }
};


export const dataFields = { /* eslint-disable @typescript-eslint/camelcase */
    location_name: {
        category: Category.Location,
        title: "Name des Gebäudes (Link zu weiteren Informationen)",
        tooltip: "Link zu einer Website mit weiteren Informationen über das Gebäude (für die meisten Gebäude nicht erforderlich).",
        example: "https://de.wikipedia.org/wiki/Neues_Rathaus_(Dresden)",
    },
    location_number: {
        category: Category.Location,
        title: "Hausnummer",
        example: '12b',
        tooltip: 'Hausnummern mit optionalen Kleinbuchstaben sind zulässig, z.B. 141 oder 12b'
    },
    location_street: {
        category: Category.Location,
        title: "Straße",
        example: "Dr.-Külz-Ring",
        tooltip: 'Name der Straße, in der sich das Gebäude befindet',
    },
    location_line_two: {
        category: Category.Location,
        title: "weitere Adresszeile",
        example: "",
        //tooltip: ,
    },
    location_town: {
        category: Category.Location,
        title: "Stadt",
        example: "Dresden",
        //tooltip: ,
    },
    location_postcode: {
        category: Category.Location,
        title: "Postleitzahl",
        example: "01067",
        //tooltip: ,
    },
    ref_toid: {
        category: Category.Location,
        title: "Building Footprint ID",
        tooltip: "Ordnance Survey Topography Layer ID (TOID) [<a href='https://www.ordnancesurvey.co.uk/business-government/products/open-toid'>link</a>]",
        example: "",
    },
    
    /**
     * UPRNs is not part of the buildings table, but the string fields 
     * are included here for completeness
     */
    uprns: {
        category: Category.Location,
        title: "Flurstückskennzeichen",
        tooltip: "Flurstückskennzeichen (wird automatisiert abgeleitet)",
        /* example: [{uprn: "", parent_uprn: "" }, {uprn: "", parent_uprn: "" }], */
        
    },

    planning_data: {
        category: Category.Location,
        title: "PLANNING DATA",
        tooltip: "PLANNING DATA",
        example: [{uprn: "", building_id: 1, data_source: ""},
                  {uprn: "", building_id: 1, data_source: "", status: "", status_before_aliasing: "", decision_date: "", description: "", planning_application_link: "", registered_with_local_authority_date: "", last_synced_date: "", data_source_link: "", address: ""},
                ],
    },


    ref_osm_id: {
        category: Category.Location,
        title: "OpenStreetMap ID",
        tooltip: "OpenStreetMap feature ID",
        example: "",
    },
    location_latitude: {
        category: Category.Location,
        title: "geogr. Breitengrad",
        example: 51.049259,
    },
    location_longitude: {
        category: Category.Location,
        title: "geogr. Längengrad",
        example: 13.73836,
    },

    current_landuse_group: {
        category: Category.LandUse,
        title: "Aktuelle Gebäudenutzung (Group)",
        tooltip: "Land use Groups as classified by [NLUD](https://www.gov.uk/government/statistics/national-land-use-database-land-use-and-land-cover-classification)",
        example: ["", ""],
    },
    current_landuse_order: {
        category: Category.LandUse,
        title: "Aktuelle Gebäudenutzung (Order)",
        tooltip: "Land use Order as classified by [NLUD](https://www.gov.uk/government/statistics/national-land-use-database-land-use-and-land-cover-classification)",
        example: "",
    },
    current_landuse_source: {
        category: Category.LandUse,
        title: "Datenquelle der Information",
        tooltip: "Datenquelle für die aktuelle Gebäudenutzung",
        example: "",
        items: [
            "Expertenwissen/ individuelles Wissen zum Gebäude",
            "Online Streetview Bilder",
            "Offene Planungsdokumente",
            "Offene Steuerdatensätze",
            "Offene Gebäudedatensätze",
            "Offene Adressdatensätze",
            "Andere"
        ],
    },
    current_landuse_source_detail: {
        category: Category.LandUse,
        title: "Details Datenquelle",
        tooltip: "Referenzen zur Datenquelle für die Gebäudenutzung (maximal 500 Zeichen)",
        example: "",
    },
    current_landuse_link: {
        category: Category.LandUse,
        title: "Datenquelle Link",
        tooltip: "Link zur aktuellen Gebäudenutzung",
        example: ["", "", ""],
    },
    current_landuse_verified: {
        category: Category.LandUse,
        title: 'Wurde die Gebäudenutzung manuell überprüft?',
        example: true,
    },
    building_attachment_form: {
        category: Category.Type,
        title: "Morphologischer Bautyp/ Nachbarschaft",
        tooltip: "Dieses Merkmal beschreibt die Lagebeziehung zu benachbarten Gebäuden. Mögliche Werte: freistehend, Doppelhaushälfte, Gebäudereihe (am Ende oder innerhalb)",
        example: "",
    },
    date_change_building_use: {
        category: Category.Type,
        title:"Wann änderte sich die Gebäudenutzung?",
        tooltip: "Dies ist das Datum, an dem das Gebäude nicht mehr für die Funktion genutzt wird, für die es gebaut wurde. Wenn es z. B. ein Lagerhaus war, das jetzt ein Büro ist, wäre dies das Datum, an dem es zu einem Bürohaus wurde.",
        example: 1920,
    },
    /**
     * original_building_use does not exist in database yet.
     * Slug needs to be adjusted if the db column will be named differently 
     */
    original_building_use: {
        category: Category.Type,
        title: "Originale Gebäudenutzung (bei Erbauung)",
        tooltip: "Wofür wurde das Gebäude ursprünglich genutzt, als es gebaut wurde? Wenn es z. B. ein Lagerhaus war, das jetzt ein Büro ist, wäre hier das Lagerhaus gemeint.",
        example: "",
    },

    size_roof_shape: {
        category: Category.Type,
        title: "Dachform",
        example: "",
        tooltip: "Welche Form weist das Dach des Gebäudes auf?",
        items: [
            "Flachdach",
            "Pultdach",
            "Satteldach",
            "Mansarddach",
            "Walmdach",
            "Krüppelwalmdach",
            "Gewölbte Dächer (Tonnen-, Halbtonnen-, Segmentbogendächer)",
            "Zeltdach",
            "Graben- bzw. Schmetterlingsdach",
            "Sheddach",
            "Schalen- und Membrandächer"
        ],
    },


    size_roof_shape_source: {
        category: Category.Type,
        title: "Datenquelle Dachform",
        tooltip: "Freitextfeld für Datenquelle",
        example: "",
    },





    date_year: {
        category: Category.Age,
        title: "Baujahr (ggf. beste Schätzung)",
        tooltip: "Das Jahr, in dem das Gebäude fertiggestellt worden ist (Fertigstellung).",
        example: 1924,
    },
    date_lower : {
        category: Category.Age,
        title: "Baujahr (frühest mögliches Jahr)",
        tooltip: "Das früheste Jahr, in dem das Gebäude fertiggestellt worden sein könnte.",
        example: 1900,
    },
    date_upper: {
        category: Category.Age,
        title: "Baujahr (spätest mögliches Jahr)",
        tooltip: "Das späteste Jahr, in dem das Gebäude fertiggestellt worden sein könnte.",
        example: 2000,
    },
    facade_year: {
        category: Category.Age,
        title: "Baujahr der Fassade",
        tooltip: "Wann wurde die Fassade des Gebäudes erbaut? (ggf. beste Schätzung)",
        example: 1900,
    },
    date_source: {
        category: Category.Age,
        title: "Datenquelle der Information",
        tooltip: "Datenquelle für das Baujahr des Gebäudes",
        items: [
            "Expertenwissen zum Gebäude",
            "Experteneinschätzung basierend auf Foto",
            "Kommunale Erhebung",
/*             "Pevsner Guides",
            "Victoria County History", */
            "lokale historische Veröffentlichung",
            "Andere Veröffentlichung",
            "Datenbank zum Denkmalschutz",
            "Andere Datenbank oder Verzeichnis",
            "Historische Karte",
            "Anderes Archivdokument",
            "Film/Video",
            "Andere Webseite",
            "Sonstige Datenquelle"
        ],
        example: "",
    },
    date_source_detail: {
        category: Category.Age,
        title: "Details Datenquelle",
        tooltip: "Referenzen zur Datenquelle für die Gebäudenutzung (maximal 500 Zeichen)",
        example: "",
    },
    date_link: {
        category: Category.Age,
        title: "Link zu Text oder Foto",
        tooltip: "URL als Referenz für das Baujahr",
        example: ["", "", ""],
    },

    size_storeys_core: {
        category: Category.Size,
        title: "Anzahl Hauptgeschosse",
        tooltip: "Wie viele Etagen liegen zwischen dem Straßenniveau und dem Beginn des Daches (Traufenhöhe)?",
        example: 10,
    },
    size_storeys_attic: {
        category: Category.Size,
        title: "Anzahl Dachgeschosse",
        tooltip: "Wie viele Etagen befinden sich im Dachbereich (zwischen Traufen- und Firsthöhe)?",
        example: 1,
    },
    size_storeys_basement: {
        category: Category.Size,
        title: "Anzahl Kellergeschosse",
        tooltip: "Wie viele Etagen befinden sich im Keller (unterhalb des Straßenniveaus)?",
        example: 1,
    },
    size_height_apex: {
        category: Category.Size,
        title: "Firsthöhe (in Metern)",
        example: 25.5,
        tooltip: 'Höhe vom Straßenniveau bis zum Dachfirst',
    },
    size_height_eaves: {
        category: Category.Size,
        title: "Traufenhöhe (in Metern)",
        example: 20.3,
        tooltip: 'Höhe vom Straßenniveau bis zur Traufe (Beginn des Daches)',
    },
    size_floor_area_ground: {
        category: Category.Size,
        title: "Grundfläche (in Quadratmetern)",
        example: 1245.6,
        //tooltip: ,
    },
    size_floor_area_total: {
        category: Category.Size,
        title: "Summe Geschossfläche (in Quadratmetern)",
        example: 2001.7,
        //tooltip: ,
    },
    size_width_frontage: {
        category: Category.Size,
        title: "Breite der Fassade/ der Gebäudefront (in Metern)",
        example: 12.2,
        //tooltip: ,
    },

    size_configuration: {
        category: Category.Size,
        title: "Configuration (semi/detached, end/terrace)",
        example: "",
        //tooltip: ,
    },

    size_plot_area_total: {
        category: Category.Streetscape,
        title: "Total area of plot (m²)",
        example: 123.02,
        //tooltip: ,
    },
    size_far_ratio: {
        category: Category.Streetscape,
        title: "FAR ratio (percentage of plot covered by building)",
        example: 0.1,
        //tooltip: ,
    },

    construction_core_material: {
        category: Category.Construction,
        title: "Primärer Baustoff",
        tooltip:"Das vorwiegend genutzte Baumaterial im Gebäude",
        example: "",
    },

    construction_secondary_materials: {
        category: Category.Construction,
        title: "Sekundärer Baustoff",
        tooltip:"Andere wichtige Baumaterialien",
        example: "",
    },

    construction_roof_covering: {
        category: Category.Construction,
        title: "Vorherrschende Dachbedeckung",
        tooltip:'Material des Daches',
        example: "",
    },

    sust_breeam_rating: {
        category: Category.Sustainability,
        title: "Official Environmental Quality Rating",
        tooltip: "Building Research Establishment Environmental Assessment Method (BREEAM) May not be present for many buildings",
        example: "",
    },
    sust_dec: {
        category: Category.Sustainability,
        title: "Non-domestic Building Energy Rating",
        tooltip: "Display Energy Certificate (DEC) Any public building should have (and display) a DEC. Showing how the energy use for that building compares to other buildings with same use",
        example: "G",
    },
    sust_aggregate_estimate_epc: {
        category: Category.Sustainability,
        title: "Domestic Building Energy Rating",
        tooltip: "Energy Performance Certificate (EPC) Any premises sold or rented is required to have an EPC to show how energy efficient it is. Only buildings rate grade E or higher maybe rented",
        example: "",
    },
    sust_retrofit_date: {
        category: Category.Sustainability,
        title: "Letzter bedeutsamer Umbau",
        tooltip: "Datum der letzten größeren Gebäuderenovierung",
        example: 2002,
    },
    sust_life_expectancy: {
        category: Category.Sustainability,
        title: "Erwartete Lebensdauer (Typologie)",
        example: 123,
        //tooltip: ,
    },

    historical_status: {
        category: Category.Age,
        title: "Historischer Status",
        tooltip: "Überdauern und Verlust des Gebäudes - nachverfolgt anhand historischer Karten",
    },

    edit_history: {
        category: Category.Planning,
        title: "PLANNING DATA",
        tooltip: "PLANNING DATA",
        example: [{}],
    },


    planning_portal_link: {
        category: Category.Planning,
        title: "Local authority planning application link",
        example: "",
        //tooltip: ,
    },
    planning_in_conservation_area_url: {
        category: Category.Planning,
        title: "Is the building in a conservation area?",
        example: "",
        //tooltip: ,
    },
    planning_crowdsourced_site_completion_status: {
        category: Category.Planning,
        title: "Has the work on this site been completed?",
        example: true,
        //tooltip: ,
    },
    planning_crowdsourced_site_completion_year: {
        category: Category.Planning,
        title: "Year of completion if known",
        example: 2022,
        //tooltip: ,
    },
    planning_crowdsourced_planning_id: {
        category: Category.Planning,
        title: "If you know of a planning application that has been recently submitted for this site, and is not listed in the blue box above, please enter its planning application ID below:",
        example: "1112/QWERTY",
        //tooltip: ,
    },
    planning_in_conservation_area_id: {
        category: Category.Planning,
        title: "Conservation Area identifier",
        example: "",
        //tooltip: ,
    },
    planning_conservation_area_name: {
        category: Category.Planning,
        title: "Conservation Area Name",
        example: "",
        //tooltip: ,
    },
    planning_list_id: {
        category: Category.Planning,
        title: "If the building is on a national heritage register, please add the ID:",
        example: "121436",
        tooltip: "e.g. National Heritage List for England (NHLE)",
    },
    planning_list_grade: {
        category: Category.Planning,
        title: "What is its rating?",
        example: "II",
        //tooltip: ,
    },
    planning_heritage_at_risk_url: {
        category: Category.Planning,
        title: "If the building is on a heritage at risk register, please add the ID:",
        example: "",
        //tooltip: ,
    },
    planning_world_list_id: {
        category: Category.Planning,
        title: "If the building is on a <a href=\"https://historicengland.org.uk/advice/hpg/has/whs/\" target=\"_blank\">World Heritage Site</a> please add the ID:",
        example: "488",
        //tooltip: ,
    },
    planning_glher_url: {
        category: Category.Planning,
        title: "Is it recorded on any historic environment records?",
        example: "",
        //tooltip: ,
    },
    planning_in_apa_url: {
        category: Category.Planning,
        title: "Is it in an area if archaeological priority?",
        example: "",
        //tooltip: ,
    },
    planning_local_list_url: {
        category: Category.Planning,
        title: "Is it a locally listed heritage asset?",
        example: "",
        //tooltip: ,
    },
    planning_historic_area_assessment_url: {
        category: Category.Planning,
        title: "Does it have any other kind of historic area assessment?",
        example: "",
        //tooltip: ,
    },
    planning_demolition_proposed: {
        category: Category.Planning,
        title: "Is the building proposed for demolition?",
        example: true,
        //tooltip: ,
    },

    is_domestic: {
        category: Category.Team,
        title: "Handelt es sich um ein Wohngebäude?",
        tooltip: "",
        example: "gemischte Nutzung"
    },
    likes_total: {
        category: Category.Community,
        title: "Gesamtanzahl an Likes",
        example: 100,
        tooltip: "Menschen, die das Gebäude mögen und der Meinung sind, dass es zur Stadt beiträgt.",
    },
    community_type_worth_keeping_total: {
        category: Category.Community,
        title: "Menschen, die der Meinung sind, dass diese Art von Gebäude zur Stadt beiträgt.",
        example: 100,
    },
    community_local_significance_total: {
        category: Category.Community,
        title: "Personen, die der Meinung sind, dass das Gebäude als Gebäude von lokalem Interesse erfasst werden sollte",
        example: 100,
    },

    community_expected_planning_application_total: {
        category: Category.Community,
        title: "Personen, die glauben, dass das Gebäude in naher Zukunft von einem Bauantrag betroffen sein wird",
        example: 100,
    },

    community_activities_current: {
        category: Category.Community,
        title: "Finden in dem Gebäude derzeit Aktivitäten statt, die der Gemeinschaft offenstehen?",
        tooltip: "z. B. Jugendclub, Kirche, Arztpraxis, Kneipe",
        example: true
    },
    community_activities: {
        category: Category.Community,
        title: "Wurde dieser Ort in der Vergangenheit bereits für Gemeinschaftsaktivitäten genutzt?",
        tooltip: "z. B. Jugendclub, Kirche, Arztpraxis, Kneipe",
        example: true
    },
    community_activities_always: {
        category: Category.Community,
        title: "Wurde das Gebäude schon immer für Gemeinschaftsaktivitäten genutzt?",
        tooltip: "z. B. Jugendclub, Kirche, Arztpraxis, Kneipe",
        example: true
    },
    // community_activities_dates: {
    //     category: Category.Community,
    //     title: "When was this building used for community activities?"
    // },


    community_public_ownership: {
        category: Category.Community,
        title: "Ist das Gebäude in öffentlichem/kommunalem Besitz?",
        example: "Nicht in öffentlichem/Gemeindeeigentum"
    },

    community_public_ownership_sources: {
        category: Category.Community,
        title: "Link Quelle zu Eigentum der Gemeinschaft",
        example: ["https://example.com"]
    },

    dynamics_has_demolished_buildings: {
        category: Category.Resilience,
        title: 'Wurden an dieser Stelle jemals weitere Gebäude errichtet?',
        example: true,
    },

/*     demolished_buildings: {
        category: Category.Resilience,
        title: 'Frühere (abgerissene) Gebäude an diesem Standort',
        items: {
            year_constructed: {
                title: 'Baujahr',
                example: { min: 1989, max: 1991 },
            },
            year_demolished: {
                title: 'Jahr des Abrisses',
                example: { min: 1993, max: 1994 },
            },
            lifespan: {
                title: 'Lebensdauer',
                example: "2-5",
            },
            overlap_present: {
                title: 'Wie viel Prozent dieses Gebäudes befand sich ungefähr innerhalb der derzeitigen Grundstücksgrenze?',
                tooltip: '',
                example: "25%"
            },
            links: {
                title: 'Links / Datenquellen',
                example: ["", ""]
            }
        },
        example: [
            {
                year_constructed: { min: 1989, max: 1991 },
                year_demolished: { min: 1993, max: 1994 },
                lifespan: "2-5", overlap_present: "50%", links: ["", ""]}
        ]
    }, */
    has_extension: {
        category: Category.Team,
        title: "Gibt es einen Anbau/ Erweiterung?",
        tooltip: "",
        example: false
    },
    extension_year: {
        category: Category.Team,
        title: "Baujahr Anbau/ Erweiterung (ggf. beste Schätzung)",
        tooltip: "Dieses Feld ist dasselbe wie Baujahr (Kategorie Alter)",
        tooltip_extension: "Dies sollte das Jahr sein, in dem der Anbau errichtet wurde, nicht das ursprüngliche Gebäude",
        example: 2020
    },
    developer_type: {
        category: Category.Team,
        title: "Art Auftraggeber/ Bauherr",
        example: "",
        items: [
            "Staat",
            "Wohltätigkeitsorganisation",
            "Gemeinschaft/Genossenschaft",
            "Andere gemeinnützige Einrichtung",
            "Privat (Einzelperson)",
            "Kommerziell (Unternehmen/ Immobilienfirma)",
            "Religiöse Einrichtung",
            "Sonstige"
        ]
    },
    developer_name: {
        category: Category.Team,
        title: "Wer waren die Auftraggeber (Personen)?",
        tooltip: "Freies Textfeld, z.B. Vorname Leerzeichen Nachname",
        example: ["", "", ""],
    },
    developer_source_link: {
        category: Category.Team,
        title: "Datenquelle Links zu Auftraggeber",
        tooltip: "URL Datenquelle Links zu Auftraggeber",
        example: ["", "", ""],
    },
    landowner: {
        category: Category.Team,
        title: "Eigentümer zur Zeit der Erbauung ",
        tooltip: "Freies Textfeld, z.B. Vorname Leerzeichen Nachname",
        example: ["", "", ""],
    },
    landowner_source_link: {
        category: Category.Team,
        title: "Datenquelle Links zu Eigentümer",
        tooltip: "URL Datenquelle Links zu Eigentümer",
        example: ["", "", ""],
    },
    designers: {
        category: Category.Team,
        title: "Architekten",
        tooltip: "Freies Textfeld, z.B. Vorname Leerzeichen Nachname",
        example: ["", "", ""],
    },
    designers_source_link: {
        category: Category.Team,
        title: "Datenquelle Links zu Architekten",
        tooltip: "URL Datenquelle Links zu Architekten",
        example: ["", "", ""],
    },
    lead_designer_type: {
        category: Category.Team,
        title: "Was trifft auf den/ die leitende/-n Architekten/-in am besten zu?",
        example: "",
        items: [
            "Eigentümer*in",
            "Spekulant*in",
            "Bauamt / Behörde",
            "Architekt*in / Architekturbüro",
            "Bauingenieur*in/ Ingenieurbüro",
            "Sonstige"
        ]
    },
    designer_awards: {
        category: Category.Team,
        title: "Hat das Planungsteam für dieses Gebäude irgendwelche Preise gewonnen?",
        tooltip: "",
        example: false
    },
    awards_source_link: {
        category: Category.Team,
        title: "Datenquelle Link zu Architekturpreis",
        tooltip: "URL Datenquelle Link zu Architekturpreis",
        example: ["", "", ""],
    },
    builder: {
        category: Category.Team,
        title: "Name der ausführenden Baufirma",
        example: ["", "", ""],
    },
    builder_source_link: {
        category: Category.Team,
        title: "Datenquelle Name der ausführenden Baufirma",
        example: ["", "", ""],
    },
    other_team: {
        category: Category.Team,
        title: "weitere wichtige am Bau beteiligte Personen",
        example: ["", "", ""],
    },
    other_team_source_link: {
        category: Category.Team,
        title: "Datenquelle weitere wichtige am Bau beteiligte Personen",
        example: ["", "", ""],
    },












    /* new building features added for Colouring Dresden */






    use_building_origin: {
        category: Category.LandUse,
        title: "Originale Gebäudehauptnutzung",
        tooltip: "Für welche Nutzung für das Gebäude ursprünglich gebaut?",
        example: "",
        items: [
            "Ein- und Zweifamilienhäuser",
            "Mehrfamilienhäuser",
            "Wohnheime",
            "Kindergärten und -tagesstätten",
            "Lehrgebäude (Schulen, Hörsalgebäude, VHS etc.)",
            "Heime (Pflege-, Kranken-, Genesungs-, Erholungsheime etc.)",
            "Bereitschafts- und Kasernengebäude, JVA",
            "Kranken-, Ärztehäuser, Kliniken",
            "Handelsgebäude",
            "Hotel, Gastronomie, Pension, Gasthaus",
            "Landwirtschaftliche Betriebsgebäude",
            "Produktionsstätten, Fabrik- und Werkstattgebäude",
            "Lagergebäude",
            "Verkehrsgebäude",
            "Kultur-, Veranstaltungsbauten",
            "Religiöse Versammlungsstätten",
            "Sporteinrichtungen",
            "Büro- und Verwaltungsgebäude",
            "Ver- und Entsorgungsbauwerke",
            "Kleingartenanlage",
            "Sonstige Nichtwohngebäude"
        ]
    },
    use_building_origin_text: {
        category: Category.LandUse,
        title: "Ergänzung zur originalen Gebäudehauptnutzung",
        tooltip: "Freitextfeld für weitere Ergänzungen",
        example: "",
    },



    use_building_current: {
        category: Category.LandUse,
        title: "Aktuelle Gebäudehauptnutzung",
        tooltip: "Wie wird das Gebäude aktuell hauptsächlich genutzt?",
        example: "",
        items: [
            "Ein- und Zweifamilienhäuser",
            "Mehrfamilienhäuser",
            "Wohnheime",
            "Kindergärten und -tagesstätten",
            "Lehrgebäude (Schulen, Hörsalgebäude, VHS etc.)",
            "Heime (Pflege-, Kranken-, Genesungs-, Erholungsheime etc.)",
            "Bereitschafts- und Kasernengebäude, JVA",
            "Kranken-, Ärztehäuser, Kliniken",
            "Handelsgebäude",
            "Hotel, Gastronomie, Pension, Gasthaus",
            "Landwirtschaftliche Betriebsgebäude",
            "Produktionsstätten, Fabrik- und Werkstattgebäude",
            "Lagergebäude",
            "Verkehrsgebäude",
            "Kultur-, Veranstaltungsbauten",
            "Religiöse Versammlungsstätten",
            "Sporteinrichtungen",
            "Büro- und Verwaltungsgebäude",
            "Ver- und Entsorgungsbauwerke",
            "Sonstige Nichtwohngebäude",
            "Kleingartenanlage",
            "Leerstand"
        ]
    },
    use_building_current_text: {
        category: Category.LandUse,
        title: "Ergänzung zur aktuellen Gebäudehauptnutzung",
        tooltip: "Freitextfeld für weitere Ergänzungen",
        example: "",
    },



    basement_type: {
        category: Category.LandUse,
        title: "Art der Unterkellerung",
        tooltip: "Welcher Typ von Unterkellerung ist vorhanden?",
        example: "",
        items: [
            "nicht unterkellert",
            "teilunterkellert",
            "vollunterkellert",
            "vollunterkellert + Tiefgarage"
        ]
    },
    basement_percentage: {
        category: Category.LandUse,
        title: "Anteil Unterkellerung (in Prozent)",
        tooltip: "Der Anteil der unterkellerten Fläche der Gebäudefläche (in Prozent)",
        example: 50

    },
    basement_use: {
        category: Category.LandUse,
        title: "Aktuelle Nutzung des Kellers",
        tooltip: "Wie wird der Keller aktuell hauptsächlich genutzt?",
        example: "",
        items: [
            "übliche Kellernutzung",
            "Wohnen, Arbeit, Freizeit",
            "Garage",
            "sonstige Nutzung",
            "Leerstand"
        ]
    },

    basement_use_source: {
        category: Category.LandUse,
        title: "Datenquelle aktuelle Nutzung Keller",
        tooltip: "Freitextfeld für Datenquelle",
        example: "",
    },

    ground_storey_use: {
        category: Category.LandUse,
        title: "Aktuelle Nutzung des Erdgeschosses",
        tooltip: "Wie wird das Erdgeschoss aktuell hauptsächlich genutzt?",
        example: "",
        items: [
            "Wohnen",
            "Büro und Verwaltung",
            "Praxis",
            "Laden, Handel",
            "Kultur",
            "Gastgewerbe (Gaststätte, Pension, Hotel, Imbiss)",
            "Lager",
            "Werkstatt",
            "Produzierendes Gewerbe",
            "Landwirtschaftliche Nutzung",
            "Sporteinrichtung (Fitness etc.)",
            "Religiöse Nutzung",
            "Garage",
            "Gesundheit (Ärztehaus, Klinik, Apotheke)",
            "Verkehr",
            "Kleingartenanlage",
            "Sonstiges",
            "Leerstand"
        ]
    },

    ground_storey_use_source: {
        category: Category.LandUse,
        title: "Datenquelle aktuelle Nutzung Erdgeschoss",
        tooltip: "Freitextfeld für Datenquelle",
        example: "",
    },

    upper_storeys_use: {
        category: Category.LandUse,
        title: "Aktuelle Nutzung 1. Etage und höher",
        tooltip: "Wie werden die Etagen über dem Erdgeschoss aktuell hauptsächlich genutzt?",
        example: "",
        items: [
            "Wohnen",
            "Büro und Verwaltung",
            "Praxis",
            "Laden, Handel",
            "Kultur",
            "Gastgewerbe (Gaststätte, Pension, Hotel, Imbiss)",
            "Lager",
            "Werkstatt",
            "Produzierendes Gewerbe",
            "Landwirtschaftliche Nutzung",
            "Sporteinrichtung (Fitness etc.)",
            "Religiöse Nutzung",
            "Garage",
            "Gesundheit (Ärztehaus, Klinik, Apotheke)",
            "Verkehr",
            "Sonstiges",
            "Leerstand"
        ]
    },

    upper_storeys_use_source: {
        category: Category.LandUse,
        title: "Datenquelle aktuelle Nutzung 1. Etage und höher",
        tooltip: "Freitextfeld für Datenquelle",
        example: "",
    },

    use_number_residential_units: {
        category: Category.LandUse,
        title: "Anzahl Wohneinheiten im Gebäude",
        tooltip: "Anzahl der Wohneinheiten im gesamten Gebäude (Klingelschilder zählen)",
        example: 12

    },

    use_number_businesses: {
        category: Category.LandUse,
        title: "Anzahl Gewerbe im Gebäude",
        tooltip: "Anzahl der Gewerbe/ Firmen im gesamten Gebäude (Klingelschilder zählen)",
        example: 2

    },


    /* construction */

    building_status: {
        category: Category.Construction,
        title: "Aktueller Gebäudezustand",
        tooltip: "In welchem Zustand befindet sich das Gebäude?",
        example: "",
        items: [
            "Ruine",
            "Investruine",
            "unsaniert",
            "teil-/ vollsaniert",
            "Neubau (nach 1990)",
            "aktuell in Sanierung",
            "aktuell im Aufbau",
            "aktuell im Abriss",
            "bereits abgerissen"
        ]
    },


    building_status_source: {
        category: Category.Construction,
        title: "Datenquelle aktueller Gebäudezustand",
        tooltip: "Freitextfeld für Datenquelle",
        example: "",
    },


    last_renovation: {
        category: Category.Construction,
        title: "Jahr der letzten Sanierung",
        tooltip: "In welchem Jahr wurde das Gebäude das letzte Mal saniert?",
        example: 2004

    },


    last_renovation_source: {
        category: Category.Construction,
        title: "Datenquelle Jahr der letzten Sanierung",
        tooltip: "Freitextfeld für Datenquelle",
        example: "",
    },


    construction_system_type: {
        category: Category.Construction,
        title: "Hauptkonstruktion",
        tooltip: "Bauweise des Gebäudes",
        example: "",
        items: [
            "Massivbauweise: Mauerwerk",
            "Massivbauweise: Ortbeton/monolithische Bauweise",
            "Massivbauweise: Plattenbau",
            "Skelettbauweise: Stahlkonstruktion",
            "Skelettbauweise: Stahlbetonkonstruktion",
            "Holzkonstruktion: Fachwerk",
            "Holzkonstruktion: Holzrahmen",
            "Holzkonstruktion: Blockbau",
            "Holzkonstruktion: Holzfertigteilbau",
            "Gemischte Bauweisen"
        ]
    },

    construction_system_type_source: {
        category: Category.Construction,
        title: "Datenquelle Hauptkonstruktion",
        tooltip: "Freitextfeld für Datenquelle",
        example: "",
    },

    /* typology --> in future: to planning */

    building_owner: {
        category: Category.Planning,
        title: "Eigentumsform des Gebäudes",
        tooltip: "Eigentumsform des Gebäudes",
        example: "",
        items: [
            "öffentl. Eigentümer - Bund",
            "öffentl. Eigentümer - BIMA (Bundesanstalt für Immobilienaufgaben)",
            "öffentl. Eigentümer - Bundesland",
            "öffentl. Eigentümer - Kommune/ Stadt",
            "öffentl. Eigentümer - kommunale Wohnungsgesellschaft",
            "öffentl. Eigentümer - städtische(r) Betrieb/ Gesellschaften",
            "Wohnungsgenossenschaften",
            "private Haushalte (natürliche Personen, Personengemeinschaften)",
            "private Wohnungsunternehmen",
            "sonstige private Unternehmen (ohne Wohnungsunternehmen)",            
            "Deutsche Bahn AG",
            "Kirchliches Eigentum, Stiftungen, gemeinwohlorientierte Eigentümer"
        ]
    },

    building_owner_source: {
        category: Category.Planning,
        title: "Datenquelle Eigentumsform des Gebäudes",
        tooltip: "Freitextfeld für Datenquelle",
        example: "",
    },

    architectural_style: {
        category: Category.Age,
        title: "Baustil und äußeres Erscheinungsbild",
        tooltip: "Welcher Baustil beschreibt das vorherrschende äußere Erscheinungsbild des Gebäudes am besten?",
        example: "",
        items: [
            "Antike",
            "Romanik",
            "Gotik",
            "Renaissance",
            "Barock",
            "Klassizismus",
            "Historismus",
            "Reformarchitektur",
            "Jugendstil",
            "Expressionismus",
            "Neue Sachlichkeit",
            "Weiße Moderne",
            "Nationale Tradition",
            "Nachkriegsmoderne: handwerklich-konventionell gefertigt",
            "Nachkriegsmoderne: vorgefertigter Plattenbau"
        ]
    },

    architectural_style_source: {
        category: Category.Age,
        title: "Datenquelle Baustil und äußeres Erscheinungsbild",
        tooltip: "Art der Datenquelle",
        example: "",
        items: [
            "Vor-Ort-Einschätzung",
            "Expert*innenwissen zum Gebäude",
            "Kartendienst und historische Karten",
            "Film/ Video/ Foto",
            "Publizierte Literatur",
            "Archivdokument",
            "Webseite",
            "Sonstige Datenquelle"
        ],
    },



    /* building features for resilience category */



    thermal_stress_objective: {
        category: Category.Resilience,
        title: 'Objektive Einschätzung der Hitzebelastung',
        items: {
            acquisition_type: {
                title: 'Erfassungsart',
                example: "Thermometer (Infrarot) Firma XXX Modell YYY",
                tooltip: "Wie wurde gemessen? Falls mit einem Thermometer gemessen wurde: mit welcher Art von Thermometer? Welches Modell?",
            },
            orientation: {
                title: 'Standort',
                example: "",
                tooltip: "Wo auf der angegebenen Etage wurde im Gebäude gemessen?",
                items: [
                    "nicht bekannt",
                    "mittig",
                    "Nord",
                    "Nordost",
                    "Ost",
                    "Südost",
                    "Süd",
                    "Südwest",
                    "West",
                    "Nordwest"
                ],
            },
            measured_temperature: {
                title: '°C',
                example: 26.6,
                tooltip: "gemessene Temperatur in Grad Celsius (maximal 1 Nachkommastelle)",
            },
            floor: {
                title: 'Etage',
                tooltip: "0 für Erdgeschoss",
                example: 2
            },
            date: {
                title: 'Datum',
                tooltip: "Datum des Eintrags",
                example: ""
                
            },
            time: {
                title: 'Zeit',
                tooltip: "Uhrzeit des Eintrags",
                example: ""
            },

        },
        example: [
            {
                acquisition_type: "Thermometer (Infrarot) Firma XXX Modell YYY",
                orientation: "",
                measured_temperature: 26.6,
                floor: 2,
                date: "",
                time: ""
            }
        ]
    },





    thermal_stress_subjective: {
        category: Category.Resilience,
        title: 'Subjektive Einschätzung der Hitzebelastung',
        items: {
            orientation: {
                title: 'Standort',
                example: "",
                tooltip: "Wo auf der angegebenen Etage wurde im Gebäude gemessen?",                
                items: [
                    "nicht bekannt",
                    "mittig",
                    "Nord",
                    "Nordost",
                    "Ost",
                    "Südost",
                    "Süd",
                    "Südwest",
                    "West",
                    "Nordwest"
                ],
            },
            perceived_temperature: {
                title: 'gefühlte Temp.',
                example: "",
                tooltip: "wahrgenommene/ subjektive Temperatur",   
                items: [
                    "sehr kalt",
                    "kalt",
                    "etwas kalt",
                    "neutral",
                    "etwas warm",
                    "warm",
                    "sehr warm"
                ],
            },
            floor: {
                title: 'Etage',
                tooltip: "0 für Erdgeschoss",
                example: 2
            },
            date: {
                title: 'Datum',
                tooltip: "Datum des Eintrags",
                example: ""
            },
            time: {
                title: 'Zeit',
                tooltip: "Uhrzeit des Eintrags",
                example: ""
            },

        },
        example: [
            {
                orientation: "",
                perceived_temperature: "",
                floor: 2,
                date: "",
                time: ""
            }
        ]
    },


    facade_window_percentage: {
        category: Category.Resilience,
        title: "Anteil Fenster an Fassade",
        tooltip: "Wie viel Fassadenfläche ist durch Fenster bedeckt (ungefähr)?",
        example: "",
        items: [
            "0-20%",
            "20-40%",
            "40-60%",
            "60-80%",
            "80-100%"
        ]
    },


    direction_of_windows: {
        /* perUser: true, */
        category: Category.Resilience,
        title: 'Zu welchen Himmelsrichtungen befinden sich Fenster? (Mehrfachauswahl möglich)',
        fields: {
            north: {
                title: 'Nord'
            },
            northeast: {
                title: 'Nordost'
            },
            east: {
                title: 'Ost'
            },
            southeast: {
                title: 'Südost'
            },
            south: {
                title: 'Süd'
            },
            southwest: {
                title: 'Südwest'
            },
            west: {
                title: 'West'
            },
            northwest: {
                title: 'Nordwest'
            },
        },
        example: {
            north: false,
            northeast: false,
            east: false,
            southeast: false,
            south: false,
            southwest: false,
            west: false,
            northwest: false
        }
    },
    
    heat_adaption_measure: {
        /* perUser: true, */
        category: Category.Resilience,
        title: 'Welche Anpassungsmaßnahmen wurden am Gebäude bereits umgesetzt? (Mehrfachauswahl möglich)',
        fields: {
            sun_protection_outside: {
                title: 'Außenliegender Sonnenschutz'
            },
            sun_protection_inside: {
                title: 'Innenliegender Sonnenschutz'
            },
            improvement_insulation: {
                title: 'Verbesserung der Dämmung (Dach bzw. oberste Geschossdecke)'
            },
            increase_heat_storage_capacity: {
                title: 'Erhöhung der Wärmespeicherfähigkeit'
            },
            installation_exhaust_air_system: {
                title: 'Einbau einer Abluftanlage'
            },
            extensive_roof_greening: {
                title: 'Extensive Dachbegrünung'
            },
            rooftop_pv_system: {
                title: 'Aufdach-Photovoltaikanlage'
            },
            facade_greening: {
                title: 'Fassadenbegrünung'
            },
            without_measure: {
                title: 'ohne Massnahme'
            },
        },
        example: {
            sun_protection_outside: false,
            sun_protection_inside: false,
            improvement_insulation: false,
            increase_heat_storage_capacity: false,
            installation_exhaust_air_system: false,
            extensive_roof_greening: false,
            rooftop_pv_system: false,
            facade_greening: false,
            without_measure: false
        }
    },

    roof_colour: {
        category: Category.Resilience,
        title: "Dachfarbe",
        tooltip: "Welche Farbe hat das Dach überwiegend?",
        example: "",
        items: [
            "schwarz",
            "dunkelgrau",
            "hellgrau",
            "dunkelbraun",
            "hellbraun",
            "grün",
            "türkis",
            "blau",
            "rot",
            "gelb",
            "beige",
            "weiß",
            "andere Farbe",
            "Solaranlage",
            "Vollverglasung",
            "Dachbegrünung: extensiv",
            "Dachbegrünung: intensiv"
        ]
    },


    roof_colour_type: {
        category: Category.Resilience,
        title: "Dachfarbe Oberfläche",
        tooltip: "Welche Beschaffenheit hat die Oberfläche des Daches?",
        example: "",
        items: [
            "matt",
            "glänzend",
            "unbekannt"
        ]
    },

    facade_colour: {
        category: Category.Resilience,
        title: "Fassadenfarbe",
        tooltip: "Welche Farbe hat die Fassade überwiegend?",
        example: "",
        items: [
            "schwarz",
            "dunkelgrau",
            "hellgrau",
            "dunkelbraun",
            "hellbraun",
            "grün",
            "türkis",
            "blau",
            "lila",
            "rot",
            "orange",
            "gelb",
            "beige",
            "weiß",
            "andere Farbe",
            "Solaranlage",
            "Vollverglasung",
            "Fassadenbegrünung"
        ]
    },

    terrain_connection_yesno: {
        category: Category.Resilience,
        title: "Ist der Boden des Erdgeschosses höher als das umliegende Gelände?",
        tooltip: "Beginnt das Erdgeschoss über dem umliegenden Gelände?",
        example: "",
        items: [
            "höher",
            "gleich",
            "niedriger"
        ]
    },

    terrain_connection_difference: {
        category: Category.Resilience,
        title: "Differenz zwischen Gelände und Erdgeschossboden (in Zentimetern)",
        tooltip: "Wie groß ist die Differenz zwischen der Höhe des umliegenden Geländes und dem Erdgeschossboden? (immer positive Distanz eintragen)",
        example: 1

    },

    rain_flood_preventive_measures1: {
        /* perUser: true, */
        category: Category.Resilience,
        /* title: 'Wurden bereits Vorsorgemaßnahmen getroffen? (Mehrfachauswahl möglich)', */
        title: 'Vorsorgemaßnahmen Strategie Ausweichen',
        fields: {
            option_01: {
                title: 'Verzicht auf Kellergeschoss (Neubau)'
            },
            option_02: {
                title: 'Anordnung der Hauptnutzungen über Hochwassermarke (Neubau)'
            },
            option_03: {
                title: 'Haushebung (Bestand)'
            },
        },
        example: {
            option_01: false,
            option_02: false,
            option_03: false
        }
    },


    rain_flood_preventive_measures2: {
        /* perUser: true, */
        category: Category.Resilience,
        /* title: 'Wurden bereits Vorsorgemaßnahmen getroffen? (Mehrfachauswahl möglich)', */
        title: 'Vorsorgemaßnahmen Strategie Widerstehen',
        fields: {
            option_01: {
                title: 'Wannenkonstruktion ggf. mit Barrieren vor Öffnungen'
            },
            option_02: {
                title: 'Barrieren vor Tür- und Fensteröffnungen'
            },
            option_03: {
                title: 'Hochwasserschutz vor Gebäudehülle'
            },
            option_04: {
                title: 'Verstärkung Tragkonstruktion'
            },
        },
        example: {
            option_01: false,
            option_02: false,
            option_03: false,
            option_04: false
        }
    },



    rain_flood_preventive_measures3: {
        /* perUser: true, */
        category: Category.Resilience,
        /* title: 'Wurden bereits Vorsorgemaßnahmen getroffen? (Mehrfachauswahl möglich)', */
        title: 'Vorsorgemaßnahmen Strategie Nachgeben',
        fields: {
            option_01: {
                title: 'Anpassung der Fußboden-, Wand- und Deckenkonstruktionen im Keller'
            },
            option_02: {
                title: 'Anpassung der Fußboden-, Wand- und Deckenkonstruktionen im Erdgeschoss'
            },
            option_03: {
                title: 'Anpassung des Heizungs- und Warmwassersystems'
            },
            option_04: {
                title: 'Anpassung der Hausanschlusselemente (Informationstechnik, Energieversorgung)'
            },
        },
        example: {
            option_01: false,
            option_02: false,
            option_03: false,
            option_04: false
        }
    },




    rain_flood_historic_incidents: {
        category: Category.Resilience,
        title: 'War das Gebäude bereits von folgenden Risiken betroffen?',
        items: {
            incident: {
                title: 'Ereignis',
                tooltip: 'Art des Ereignisses',
                example: "",
                items: [
                    "Starkregen",
                    "Hochwasser",
                    "hoher Grundwasserstand"
                ],
            },
            year: {
                title: 'Jahr',
                tooltip: 'Jahr des Ereignisses',
                example: 2002
            },
            height_from_terrain: {
                title: 'Höhe ab Gelände (in Zentimetern)',
                tooltip: 'Wie hoch stand das Wasser bezogen auf die Geländehöhe vor dem Gebäude?',
                example: 120
            },
            floors_affected: {
                title: 'betroffene Etagen',
                tooltip: 'Welche Etagen waren betroffen?',
                example: "",
                items: [
                    "nur Keller",
                    "bis Erdgeschoss",
                    "bis 1. Etage",
                    "darüber"
                ],
            },
        },
        example: [
            {
                incident: "",
                year: 2002,
                height_from_terrain: 120, 
                floors_affected: ""
            }
        ]
    },




    heat_adaption_measure_source: {
        category: Category.Resilience,
        title: "Datenquelle Anpassungsmassnahmen Hitze",
        tooltip: "Art der Datenquelle",
        example: "",
        items: [
            "Vor-Ort-Einschätzung",
            "Expert*innenwissen zum Gebäude",
            "Kartendienst und historische Karten",
            "Film/ Video/ Foto",
            "Publizierte Literatur",
            "Archivdokument",
            "Webseite",
            "Sonstige Datenquelle"
        ],
    },



    terrain_connection_difference_source: {
        category: Category.Resilience,
        title: "Art der Erhebung Differenz Erdgeschossboden zu Geländehöhe",
        tooltip: "Art der Erhebung",
        example: "",
        items: [
            "geschätzt",
            "gemessen"
        ],
    },

    rain_flood_preventive_measures_source: {
        category: Category.Resilience,
        title: "Datenquelle Vorsorgemaßnahmen Starkregen/Hochwasser",
        tooltip: "Art der Datenquelle",
        example: "",
        items: [
            "Vor-Ort-Einschätzung",
            "Expert*innenwissen zum Gebäude",
            "Kartendienst und historische Karten",
            "Film/ Video/ Foto",
            "Publizierte Literatur",
            "Archivdokument",
            "Webseite",
            "Sonstige Datenquelle"
        ],
    },


    ref_land_parcel: {
        category: Category.Location,
        title: "Flurstückskennzeichen",
        tooltip: "Flurstückskennzeichen",
        example: "",
    },

    ref_osm_type: {
        category: Category.Location,
        title: "OpenStreetMap Geometrietyp",
        tooltip: "OpenStreetMap Geometrietyp",
        example: "",
    },


    ref_wikidata: {
        category: Category.Location,
        title: "Wikidata ID",
        tooltip: "Wikidata ID (Beispiel: Q12345)",
        example: "",
    },


    ref_wikipedia: {
        category: Category.Location,
        title: "Link Wikipedia",
        tooltip: "Link Wikipedia",
        example: "",
    },
    number_persons: {
        category: Category.Sustainability,
        title: "Anzahl der im Haushalt lebenden Personen",
        example: 3,
    },
    
    reference_period: {
        category: Category.Sustainability,
        title: "Bezugsjahr",
        tooltip: "Tragen Sie immer das Jahr ein, in dem der Großteil des Abrechnungszeitraums liegt. Beginnt der Abrechnungszeitraum vor dem 30.06.23, tragen Sie 2023 ein. Beginnt er nach dem 01.07., tragen Sie 2024 ein.",
        example: 2023,
    },
    
    electricity_usage: {
        category: Category.Sustainability,
        title: "Stromverbrauch eines Jahres [in kWh]",
        tooltip: "Den Stromverbrauch finden Sie auf ihrer Energie-Abrechnung.",
        example: 3600,
    },
    
    gas_usage: {
        category: Category.Sustainability,
        title: "Gasverbrauch eines Jahres [in kWh]",
        tooltip: "Den Gasverbrauch finden Sie auf ihrer Energie-Abrechnung",
        example: 15300,
    },
    
    living_area: {
        category: Category.Sustainability,
        title: "Wohnfläche in Quadratmetern",
        example: 80.5,
    },
    agreement_dsgv_sust: {
        category: Category.Sustainability,
        title: "Ich stimme zu, dass meine Daten zwecks der Verschlüsselung, an BuildingTrust gesendet werden.",
        example: false,
        tooltip: "Nur mit Ihrer Zustimmung können Ihre Daten verarbeitet und eine personalisierte Auswertung erstellt werden."
    },
    agreement_science_sust: {
        category: Category.Sustainability,
        title: "(Optional) Ich stimme zu, dass meine Daten zu wissenschaftlichen Zwecken weitergenutzt werden können.",
        example: false,
    },

};

export const allFieldsConfig = {...dataFields, ...buildingUserFields};