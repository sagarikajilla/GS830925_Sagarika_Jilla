import { createSlice } from '@reduxjs/toolkit';

export interface PlanningRecord {
  store: string;
  sku: string;
  week: string;
  salesUnits: number;
}

interface PlanningState {
  records: PlanningRecord[];
}

const initialState: PlanningState = {
  records: [
    { store: 'ST035', sku: 'SK00158', week: 'W01', salesUnits: 58 },
    { store: 'ST035', sku: 'SK00158', week: 'W07', salesUnits: 107 },
    { store: 'ST035', sku: 'SK00158', week: 'W09', salesUnits: 0 },
    { store: 'ST035', sku: 'SK00158', week: 'W11', salesUnits: 92 },
    { store: 'ST035', sku: 'SK00158', week: 'W13', salesUnits: 122 },
    { store: 'ST035', sku: 'SK00158', week: 'W15', salesUnits: 38 },
    { store: 'ST035', sku: 'SK00158', week: 'W23', salesUnits: 88 },
    { store: 'ST035', sku: 'SK00158', week: 'W31', salesUnits: 45 },
    { store: 'ST035', sku: 'SK00158', week: 'W35', salesUnits: 197 },
    { store: 'ST035', sku: 'SK00158', week: 'W50', salesUnits: 133 },
    { store: 'ST035', sku: 'SK00269', week: 'W05', salesUnits: 107 },
    { store: 'ST035', sku: 'SK00269', week: 'W06', salesUnits: 104 },
    { store: 'ST035', sku: 'SK00269', week: 'W09', salesUnits: 32 },
    { store: 'ST035', sku: 'SK00269', week: 'W18', salesUnits: 174 },
    { store: 'ST035', sku: 'SK00269', week: 'W23', salesUnits: 174 },
    { store: 'ST035', sku: 'SK00269', week: 'W27', salesUnits: 37 },
    { store: 'ST035', sku: 'SK00269', week: 'W28', salesUnits: 95 },
    { store: 'ST035', sku: 'SK00269', week: 'W29', salesUnits: 161 },
    { store: 'ST035', sku: 'SK00269', week: 'W30', salesUnits: 175 },
    { store: 'ST035', sku: 'SK00269', week: 'W32', salesUnits: 200 },
    { store: 'ST035', sku: 'SK00269', week: 'W33', salesUnits: 120 },
    { store: 'ST035', sku: 'SK00300', week: 'W14', salesUnits: 135 },
    { store: 'ST035', sku: 'SK00300', week: 'W15', salesUnits: 42 },
  ],
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {},
});

export default planningSlice.reducer;
