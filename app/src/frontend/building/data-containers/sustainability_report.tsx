import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
}

export const SustReport: FC<SustReportProps> = ({
    ownElectricity,
    ownGas,
    averageElectricity,
    averageGas,
    count_contributors,
    count_district,
    name_district,
    place_district_ranking,

}) => {
    const totalOwnEnergy = ownGas + ownElectricity;
    const totalAverageEnergy = averageGas + averageElectricity;
    const data = [
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
    return (

        <article>
            <section className="main-col">
                <h1 className="h2">
                    Ihr Vergleich mit der Nachbarschaft
                </h1>
                <p>
                    {(totalOwnEnergy) < (totalAverageEnergy) ? (
                        <b>
                            Ihr Prokopf-Energieverbrauch beträgt {ownGas + ownElectricity} kWh und liegt damit unter dem Durchschnitt in Ihrer unmittelbaren Nachbarschaft von {averageElectricity + averageGas} kWh.
                        </b>
                    ) : (
                        <b>
                            Ihr Prokopf-Energieverbrauch beträgt {ownGas + ownElectricity} kWh und liegt damit über dem Durchschnitt in Ihrer unmittelbaren Nachbarschaft von {averageElectricity + averageGas} kWh.
                        </b>
                    )}
                </p>
                <div>
                    <BarChart width={500} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Ihr_Verbrauch" fill="#8884d8" />
                        <Bar dataKey="Durchschnitt" fill="#d2d4d2" />
                    </BarChart>
                </div>
                <p>
                    <a href="https://www.co2online.de/energie-sparen/" target="_blank">Hier</a> <b> Energiespartipps erhalten</b>
                </p>
                <p>
                    <b> In Ihrer Nachbarschaft haben {count_contributors} Haushalte teilgenommen. </b>
                </p>

            </section>
        </article>
    );
}


