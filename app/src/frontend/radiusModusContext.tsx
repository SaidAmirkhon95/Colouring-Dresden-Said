/* import React, { createContext, useContext, useState, ReactNode } from "react";

interface RadiusModusContextType {
  isRadiusModus: boolean;
  setIsRadiusModus: (value: boolean) => void;
}

const RadiusModusContext = createContext<RadiusModusContextType | undefined>(undefined);

export const RadiusModusProvider = ({ children }: { children: ReactNode }) => {
  const [isRadiusModus, setIsRadiusModus] = useState(false);

  return (
    <RadiusModusContext.Provider value={{ isRadiusModus, setIsRadiusModus }}>
      {children}
    </RadiusModusContext.Provider>
  );
};

export const useRadiusModus = () => {
  const context = useContext(RadiusModusContext);
  if (!context) {
    throw new Error("useRadiusModus must be used within a RadiusModusProvider");
  }
  return context;
};
 */

import React, { createContext, useContext, useState, ReactNode } from "react";

interface RadiusEnergyData {
  averageElectricity: number;
  averageGas: number;
}

interface DistrictEnergyData {
  averageElectricity: number;
  averageGas: number;
  name?: string; // optional: name of the district
  contributors?: number;
}

interface RadiusModusContextType {
  isRadiusModus: boolean;
  setIsRadiusModus: (value: boolean) => void;
  radiusEnergyData: RadiusEnergyData | null;
  setRadiusEnergyData: (data: RadiusEnergyData | null) => void;
  radiusDrawn: boolean;
  setRadiusDrawn: (value: boolean) => void;
  districtEnergyData: DistrictEnergyData | null;
  setDistrictEnergyData: (data: DistrictEnergyData | null) => void;
}

const RadiusModusContext = createContext<RadiusModusContextType | undefined>(undefined);

export const RadiusModusProvider = ({ children }: { children: ReactNode }) => {
  const [isRadiusModus, setIsRadiusModus] = useState(false);
  const [radiusEnergyData, setRadiusEnergyData] = useState<RadiusEnergyData | null>(null);
  const [radiusDrawn, setRadiusDrawn] = useState(false);
  const [districtEnergyData, setDistrictEnergyData] = useState<DistrictEnergyData | null>(null);

  return (
    <RadiusModusContext.Provider
      value={{
        isRadiusModus,
        setIsRadiusModus,
        radiusEnergyData,
        setRadiusEnergyData,
        radiusDrawn,
        setRadiusDrawn,
        districtEnergyData,
        setDistrictEnergyData,
      }}
    >
      {children}
    </RadiusModusContext.Provider>
  );
};

export const useRadiusModus = () => {
  const context = useContext(RadiusModusContext);
  if (!context) {
    throw new Error("useRadiusModus must be used within a RadiusModusProvider");
  }
  return context;
};
