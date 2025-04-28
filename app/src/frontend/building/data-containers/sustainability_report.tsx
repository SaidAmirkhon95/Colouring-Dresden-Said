import React, { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, Cell, LabelList, ResponsiveContainer } from 'recharts';
import './sust_report.css';
import {
    EmailIcon, EmailShareButton,
    FacebookMessengerIcon, FacebookShareButton,
    TelegramIcon, TelegramShareButton, 
    WhatsappIcon, WhatsappShareButton,
    TwitterShareButton, TwitterIcon,
    LinkedinShareButton, LinkedinIcon
} from "react-share"; //Fix share func
import { useRadiusModus } from "../../radiusModusContext";


//Please install recharts!
interface SustReportProps {
    selectedBuildingId: number;
    ownGas: number;
    ownElectricity: number;
    living_area: number;
    averageGas: number;
    averageElectricity: number;
    count_contributors: number;
    count_district: number;
    name_district: string;
    place_district_ranking: number;
    username?: string;
    co2effect_min: number;
    co2effect_max: number;
    destination_near: string;
    destination_far: string;
    buildings?: any[]; // Array of buildings within selected radius
}

export const SustReport: FC<SustReportProps> = ({
    ownElectricity,
    ownGas,
    living_area,
    averageElectricity,
    averageGas,
    count_contributors,
    co2effect_min,
    co2effect_max,
    count_district,
    name_district,
    place_district_ranking,
    selectedBuildingId,
    buildings,
}) => {
    const { radiusDrawn, radiusEnergyData, districtEnergyData, isRadiusModus } = useRadiusModus();
    const shareUrl = 'https://colouring.dresden.ioer.de/view/sustainability';
    const shareUrl_current_window = window.location.href;
    const title = 'Check out this awesome website!';
    const ownE_m2 = Math.round(ownElectricity*100 / living_area)/100;
    const ownG_m2 = Math.round(ownGas*100/ living_area)/100;
    const totalOwnEnergy = ownGas + ownElectricity;
    const totalOwnEnergy_m2 = Math.round(totalOwnEnergy*100 / living_area)/100;
    const shouldUseRadius = radiusDrawn && isRadiusModus;
    const usedAverageElectricity = shouldUseRadius
        ? radiusEnergyData?.averageElectricity ?? 20
        : districtEnergyData?.averageElectricity ?? 0;
    const usedAverageGas = shouldUseRadius
        ? radiusEnergyData?.averageGas ?? 50
        : districtEnergyData?.averageGas ?? 0;
    const totalAverageEnergy = usedAverageElectricity + usedAverageGas;
    const tolerance = 500; // ±500 kWh
    const isAboveAverage = totalOwnEnergy_m2 > totalAverageEnergy + tolerance;
    const isBelowAverage = totalOwnEnergy_m2 < totalAverageEnergy - tolerance;
    const isWithinTolerance = !isAboveAverage && !isBelowAverage;
    const energyUse_s = [
        {
            name: 'Haushaltsstrom',
            Ihr_Verbrauch: ownE_m2,
            Durchschnitt: usedAverageElectricity,
            fillColor: ownE_m2 > usedAverageElectricity + tolerance 
            ? '#ff6161' // rot: über Durchschnitt + Toleranz
            : ownE_m2 < usedAverageElectricity - tolerance 
            ? '#8bc800' // grün: unter Durchschnitt - Toleranz
            : '#ffd700', // gelb: im Toleranzbereich
        },
    ];
    const energyUse_g = [
        {
            name: 'Heizenergieverbrauch',
            Ihr_Verbrauch: ownG_m2,
            Durchschnitt: usedAverageGas,
            Note: 'Vergleich mit Umkreis',
            fillColor: ownG_m2 > usedAverageGas + tolerance
            ? '#ff6161'
            : ownG_m2 < usedAverageGas - tolerance
            ? '#8bc800'
            : '#ffd700',
        }
    ];
    const co2gas =
        3679
        ;
    const co2stom_eco = 119;
    const co2strom_convent = 1859;
    const co2_impact = [
        { art: 'Erneuerbare Energie', gas: co2gas, strom: co2stom_eco },
        { art: 'Konventionelle Energie', gas: co2gas, strom: co2strom_convent },
    ];

    // Calculate total energy consumption in the selected radius
    const buildingsEnergyData = buildings.map((building) => ({
        electricity: building.electricity, // Replace with actual building data fields
        gas: building.gas, // Replace with actual building data fields
    }));

    const totalRadiusEnergy = buildingsEnergyData.reduce((acc, building) => {
        acc.electricity += building.electricity;
        acc.gas += building.gas;
        return acc;
    }, { electricity: 0, gas: 0 });

    const averageRadiusEnergy = {
        electricity: totalRadiusEnergy.electricity / buildings.length,
        gas: totalRadiusEnergy.gas / buildings.length,
    };

    // Sample district data for comparison
    const districtData = [
        { Bezirk: 'Innere Altstadt', Contributors: 13, Durchschnittsverbrauch: 80 }, //Energie pro m2
        { Bezirk: 'Wilsdruffer Vorstadt', Contributors: 9, Durchschnittsverbrauch: 110 },
        { Bezirk: 'Johannstadt', Contributors: 4, Durchschnittsverbrauch: 145 },
        { Bezirk: 'Innere Neustadt', Contributors: 3, Durchschnittsverbrauch: 75 },
    ];


    //für eine bessere Lesbarkeit der Legende
    const renderLegend = (value: string) => <span style={{ color: 'black' }}>{value}</span>;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const { radiusDrawn, isRadiusModus } = useRadiusModus();
            const additionalNote = radiusDrawn && isRadiusModus ? 'Vergleich nach Umkreis' : 'Vergleich nach Stadtviertel';
    
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '2px' }}>
                    <p><strong>{label}</strong></p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}: {entry.value} kWh/m²
                        </p>
                    ))}
                    <p>{additionalNote}</p>
                </div>
            );
        }
    
        return null;
    };    

    return (
        <article>
            <section>
                <h1>
                    Ihr Energieverbrauch im Vergleich (Umkreis/Stadtviertel)
                </h1>
                <h4>Ihr Verbrauch pro Quadratmeter:</h4>
                <p>
                    {isWithinTolerance ? (
                        <img className="smiley" src={require('../../../../public/images/smiley_neutral.png')} alt="Smiley neutral" />
                    ) : isBelowAverage ? (
                        <img className="smiley" src={require('../../../../public/images/smiley_happy.png')} alt="Smiley glücklich" />
                    ) : (
                        <img className="smiley" src={require('../../../../public/images/smiley_frowning.png')} alt="Smiley traurig" />
                    )}
                    In Ihrem Haushalt wurde pro Quadratmeter {totalOwnEnergy_m2} kWh Energie verbraucht.
                    Sie liegen damit {isAboveAverage ? 'über' : isBelowAverage ? 'unter' : 'im Toleranzbereich von'} dem Durchschnitt von {totalAverageEnergy} kWh/m² in Ihrer
                    {shouldUseRadius ? ' Umgebung (gezeichneter Radius)' : ' Nachbarschaft (Bezirk)'}.
                </p>
                <div className='withTitle'>
                    <h4>Vergleich des Verbrauchs pro Quadratmeter mit der Nachbarschaft</h4>
                    <div className="chart">
                        <div className="chartSideBySide">
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={energyUse_s}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis>
                                        <Label
                                            value="Verbrauch in kWh/m²"
                                            angle={-90}
                                            position="insideLeft"
                                            style={{ textAnchor: 'middle' }}
                                        />
                                    </YAxis>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="Ihr_Verbrauch" name="Ihr Wert">
                                        {energyUse_s.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fillColor} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="Durchschnitt" fill="#aaaaaa" name="Durchschnitt" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="chartSideBySide">
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={energyUse_g}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis>
                                        <Label
                                            value="Verbrauch in kWh/m²"
                                            angle={-90}
                                            position="insideLeft"
                                            style={{ textAnchor: 'middle' }}
                                        />
                                    </YAxis>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="Ihr_Verbrauch" name="Ihr Wert">
                                        {energyUse_g.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fillColor} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="Durchschnitt" fill="#aaaaaa" name="Durchschnitt" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <img className="legend" src={require('../../../../public/images/Legende_option2.png')} alt="Legende der ersten beiden Diagramme: Grün bzw rot steht für Ihre Werte, grau für den Durchschnitt der Nachbarschaft" />
                    <p className='anmerkung'>*Wenn Ihr Verbrauch unter dem Durchschnittlichen Verbrauch der Nachbarschaft liegt, ist Ihr Verbrauch in rot dargestellt, wenn Ihr Verbrauch unterdurchschnittlich ist dann ist er grün gekennzeichnet. </p>
                </div>

                <p>
                    <h4>CO2-Emissionen:</h4>
                    <details>
                        <summary>Der Verbrauch Ihres gesamten Haushalts verursacht in etwa {Math.round(co2effect_min / 10) * 10} bis {Math.round(co2effect_max / 10) * 10} Kg CO2. </summary>
                        <div className='withTitle'>
                            <h4>Die CO2-Emissionen je nach Art der Stromgewinnung</h4>
                            <div className="chart">
                                <BarChart width={500} height={250} data={co2_impact} layout="vertical">
                                    <XAxis type="number" />
                                    <YAxis dataKey="art" type="category" tickMargin={100} />
                                    <Tooltip />
                                    <Legend formatter={renderLegend} />
                                    <Bar dataKey="gas" fill="#ab8fb0" stackId="a" name="CO2 Emissionen durch Gas-Verbrauch in kg">
                                        <LabelList dataKey="gas" position="inside" fill="black" />
                                    </Bar>
                                    <Bar dataKey="strom" fill="#ffe14c" stackId="a" name="CO2 Emissionen durch Strom-Verbrauch in kg">
                                        <LabelList dataKey="strom" position="inside" fill="black" />
                                    </Bar>
                                </BarChart>
                            </div>
                        </div>
                        <p>
                        <img className="big_icon" src={require('../../../../public/images/save_energy.png')} alt="Symbol fürs Energiesparen" />
                            <a href="https://www.co2online.de/energie-sparen/" target="_blank" rel="noopener noreferrer">Hier Energiespartipps erhalten</a> 
                        </p>
                    </details>
                </p>

                <p>
                    <h4>Vergleich der Stadtteile:</h4>
                    <details>
                        <summary>In Ihrer Nachbarschaft haben {count_contributors} Haushalte teilgenommen. </summary>
                        <div className='withTitle'>
                            <h4>Das Stadtteilranking
                            <img className="big_icon" src={require('../../../../public/images/Ranking_pokal.png')} alt="Symbol für einen Wettbewerb" />
                            </h4>
                            <div className="chart">
                                <div className="chartSideBySide">
                                    <BarChart width={500} height={250} data={districtData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <YAxis dataKey="Bezirk" type="category" tickMargin={100} />
                                        <XAxis type="number" />
                                        <Tooltip />
                                        <Legend formatter={renderLegend} />
                                        <Bar dataKey="Durchschnittsverbrauch" fill="#6bb1e3" name="Durchschnittlicher Verbrauch in kWh/m² pro Jahr"  >
                                            <LabelList dataKey="Bezirk" position="insideLeft" fill='black' />
                                        </Bar>
                                    </BarChart>

                                </div>
                                <div className='chartSideBySide'>

                                    <BarChart width={500} height={250} data={districtData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <YAxis dataKey="Bezirk" type="category" tickMargin={100} />
                                        <XAxis type="number" />
                                        <Tooltip />
                                        <Legend formatter={renderLegend} />
                                        <Bar dataKey="Contributors" fill="#6bb1e3" name="Anzahl der Contributors" >
                                            <LabelList dataKey="Bezirk" position="insideLeft" fill='black' />
                                        </Bar>
                                    </BarChart>

                                </div>

                            </div>
                        </div>
                    </details>
                </p>
                <p>
                    <img 
                        className="share_img" 
                        src={require('../../../../public/images/share_icon.png')} 
                        alt="Symbol fürs Teilen der Website" 
                    />
                    <a href={shareUrl}>Hier können Sie Ihre Nachbar*innen einladen auch mitzumachen. </a>
                    
                    <div className="share-buttons">
                        {/* Twitter Share */}
                        <TwitterShareButton url={shareUrl} title={title}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>

                        {/* Facebook Share */}
                        <FacebookShareButton url={shareUrl} hashtag="#Sustainability">
                            <FacebookMessengerIcon size={32} round />
                        </FacebookShareButton>

                        {/* WhatsApp Share */}
                        <WhatsappShareButton url={shareUrl} title={title} separator=" - ">
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>

                        {/* Telegram Share */}
                        <TelegramShareButton url={shareUrl} title={title}>
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>

                        {/* LinkedIn Share */}
                        <LinkedinShareButton url={shareUrl} title={title}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>

                        <EmailShareButton 
                          url={shareUrl} 
                          subject="Check out this awesome website!" 
                          body={`Hi there,\n\nI found this great resource and thought of sharing it with you: ${shareUrl}\n\nTake a look!`}
                        >
                          <EmailIcon size={32} round />
                        </EmailShareButton>
                    </div>
                </p>
                <p>
                    <details className="rightSided">
                        <summary>Quellen und weitere Informationen </summary>
                        <p>Berechnungen: ... </p>
                        <p>Quellen: <a href='#'>Links</a>  </p>
                    </details>
                </p>
            </section>
        </article>
    );
}
