import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './sust_report.css';
//import '../../pages/welcome.css'
//import emo_genius from '../../../../public/images/sustanability_images/smileys_5_genius.png';

//Please install recharts!
interface SustReportProps {
    ownGas: number;
    ownElectricity: number;
    //location: [number, number];
    averageGas: number;
    averageElectricity: number;
    count_contributors: number;
    count_district: number;
    name_district: string;
    place_district_ranking: number;
    username?: string;
    co2effect_min:  number;
    co2effect_max:  number;
    destination_near: string;
    destination_far: string;
}

export const SustReport: FC<SustReportProps> = ({
    ownElectricity,
    ownGas,
    averageElectricity,
    averageGas,
    count_contributors,
    co2effect_min,
    co2effect_max,
    destination_near,
    destination_far,
    count_district,
    name_district,
    place_district_ranking,

}) => {
    const totalOwnEnergy = ownGas + ownElectricity;
    const totalAverageEnergy = averageGas + averageElectricity;
    const energyUse = [
        {
            name: 'Gas',
            Ihr_Verbrauch: ownGas,
            Durchschnitt: averageGas,
        },
        {
            name: 'Strom',
            Ihr_Verbrauch: ownElectricity,
            Durchschnitt: averageElectricity,
        }
    ];
    const co2_impact = [
        {art: 'Erneuerbare Energie', value: co2effect_min},
        {art: 'Konventionelle Energie', value: co2effect_max},
    ];
    const districtData = [
        { Bezirk: 'Prohlis', Contributors: 7, Durchschnittsverbrauch: 7000 },
        { Bezirk: 'Altstadt', Contributors: 9, Durchschnittsverbrauch: 20000 },
        { Bezirk: 'Neustadt', Contributors: 23, Durchschnittsverbrauch: 16000 },
        { Bezirk: 'Plauen', Contributors: 18, Durchschnittsverbrauch: 14000 },
    ].sort((a, b) => b.Contributors - a.Contributors); //Von klein zu groß sortieren
    return (

        <article>
            <section>

                <h1 >
                    Ihr Vergleich mit der Nachbarschaft
                </h1>
                
                <p>
                    {(totalOwnEnergy) < (totalAverageEnergy) ? (
                        <b>
                            {//<img src={emo_genius} alt="Sehr glücklicher Smiley" style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                            }
                            Ihr Prokopf-Energieverbrauch beträgt {ownGas + ownElectricity} kWh und liegt damit unter dem Durchschnitt in Ihrer unmittelbaren Nachbarschaft von {averageElectricity + averageGas} kWh.
                        </b>
                    ) : (
                        <b>
                            Ihr Prokopf-Energieverbrauch beträgt {ownGas + ownElectricity} kWh und liegt damit über dem Durchschnitt in Ihrer unmittelbaren Nachbarschaft von {averageElectricity + averageGas} kWh.
                        </b>)}

                </p>
                <div className="chart">
                    <BarChart width={500} height={300} data={energyUse}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Ihr_Verbrauch" fill="#8884d8" name="Ihr Verbrauch in kWh" />
                        <Bar dataKey="Durchschnitt" fill="#d2d4d2" name="Durchschnittlicher Verbrauch ihres Umfeldes in kWh" />
                    </BarChart>
                </div>

                <p>
                    <details>
                        <summary><b> Ihr Verbrauch verursacht {co2effect_min} bis {co2effect_max} Kg CO2. </b></summary>
                        
                            <div className="chart">
                                <BarChart width={500} height={300} data={co2_impact} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis  dataKey="value" />
                                    <XAxis  dataKey="art" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="art" fill="#8884d8" name="Energiegewinnungsart" />
                                    <Bar dataKey="value" fill="#d2d4d2" name="Verursachte Kg CO2" />
                                </BarChart>
                            </div>
                        <a href="https://www.co2online.de/energie-sparen/" target="_blank">Hier </a> <b> Energiespartipps erhalten</b>
                    </details>
                </p>

                <p>
                    <details>
                        <summary><b> In Ihrer Nachbarschaft haben {count_contributors} Haushalte teilgenommen. </b></summary>
                        <div className="chart_container">
                            <div className="chart">
                                <BarChart width={500} height={300} data={districtData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis dataKey="Bezirk" type="category" />
                                    <XAxis type="number" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Contributors" fill="#8884d8" name="Anzahl der Datenspenden" />
                                </BarChart>
                            </div>
                            <div className="chart">
                                <BarChart width={500} height={300} data={districtData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis dataKey="Bezirk" type="category" />
                                    <XAxis type="number" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Durchschnittsverbrauch" fill="#d2d4d2" name="Durchschnittsverbrauch einer Person in kWh" />
                                </BarChart>
                            </div>
                        </div>
                    </details>
                </p>

                <p>
                    <a className="rightSided" href="#"> Quellen und weitere Informationen  </a>
                </p>

            </section>
        </article>
    );
}


