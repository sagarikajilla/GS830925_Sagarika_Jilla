// src/pages/PlanningPage.tsx
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, ColDef, ColGroupDef } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './PlanningPage.css';

// Register required AG Grid module
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Interface for calendar weeks
interface CalendarWeek {
  week: string;         // Field name (e.g., "W01")
  weekLabel: string;    // Display label (e.g., "Week 01")
  month: string;        // Month code (e.g., "M02")
  monthLabel: string;   // Display month (e.g., "Feb")
}

// Sample calendar weeks array
const calendarWeeks: CalendarWeek[] = [
  { week: "W01", weekLabel: "Week 01", month: "M01", monthLabel: "Feb" },
  { week: "W02", weekLabel: "Week 02", month: "M01", monthLabel: "Feb" },
  { week: "W03", weekLabel: "Week 03", month: "M01", monthLabel: "Feb" },
  { week: "W04", weekLabel: "Week 04", month: "M01", monthLabel: "Feb" },
  { week: "W05", weekLabel: "Week 05", month: "M02", monthLabel: "Mar" },
  { week: "W06", weekLabel: "Week 06", month: "M02", monthLabel: "Mar" },
  { week: "W07", weekLabel: "Week 07", month: "M02", monthLabel: "Mar" },
  { week: "W08", weekLabel: "Week 08", month: "M02", monthLabel: "Mar" },
  { week: "W09", weekLabel: "Week 09", month: "M02", monthLabel: "Mar" },
  { week: "W10", weekLabel: "Week 10", month: "M03", monthLabel: "Apr" },
  { week: "W11", weekLabel: "Week 11", month: "M03", monthLabel: "Apr" },
  { week: "W12", weekLabel: "Week 12", month: "M03", monthLabel: "Apr" },
  { week: "W13", weekLabel: "Week 13", month: "M03", monthLabel: "Apr" },
  { week: "W14", weekLabel: "Week 14", month: "M04", monthLabel: "May" },
  { week: "W15", weekLabel: "Week 15", month: "M04", monthLabel: "May" },
  { week: "W16", weekLabel: "Week 16", month: "M04", monthLabel: "May" },
  { week: "W17", weekLabel: "Week 17", month: "M04", monthLabel: "May" },
  { week: "W18", weekLabel: "Week 18", month: "M05", monthLabel: "Jun" },
  { week: "W19", weekLabel: "Week 19", month: "M05", monthLabel: "Jun" },
  { week: "W20", weekLabel: "Week 20", month: "M05", monthLabel: "Jun" },
  { week: "W21", weekLabel: "Week 21", month: "M05", monthLabel: "Jun" },
  { week: "W22", weekLabel: "Week 22", month: "M05", monthLabel: "Jun" },
  { week: "W23", weekLabel: "Week 23", month: "M06", monthLabel: "Jul" },
  { week: "W24", weekLabel: "Week 24", month: "M06", monthLabel: "Jul" },
  { week: "W25", weekLabel: "Week 25", month: "M06", monthLabel: "Jul" },
  { week: "W26", weekLabel: "Week 26", month: "M06", monthLabel: "Jul" },
  { week: "W27", weekLabel: "Week 27", month: "M07", monthLabel: "Aug" },
  { week: "W28", weekLabel: "Week 28", month: "M07", monthLabel: "Aug" },
  { week: "W29", weekLabel: "Week 29", month: "M07", monthLabel: "Aug" },
  { week: "W30", weekLabel: "Week 30", month: "M07", monthLabel: "Aug" },
  { week: "W31", weekLabel: "Week 31", month: "M08", monthLabel: "Sep" },
  { week: "W32", weekLabel: "Week 32", month: "M08", monthLabel: "Sep" },
  { week: "W33", weekLabel: "Week 33", month: "M08", monthLabel: "Sep" },
  { week: "W34", weekLabel: "Week 34", month: "M08", monthLabel: "Sep" },
  { week: "W35", weekLabel: "Week 35", month: "M08", monthLabel: "Sep" },
  { week: "W36", weekLabel: "Week 36", month: "M09", monthLabel: "Oct" },
  { week: "W37", weekLabel: "Week 37", month: "M09", monthLabel: "Oct" },
  { week: "W38", weekLabel: "Week 38", month: "M09", monthLabel: "Oct" },
  { week: "W39", weekLabel: "Week 39", month: "M09", monthLabel: "Oct" },
  { week: "W40", weekLabel: "Week 40", month: "M10", monthLabel: "Nov" },
  { week: "W41", weekLabel: "Week 41", month: "M10", monthLabel: "Nov" },
  { week: "W42", weekLabel: "Week 42", month: "M10", monthLabel: "Nov" },
  { week: "W43", weekLabel: "Week 43", month: "M10", monthLabel: "Nov" },
  { week: "W44", weekLabel: "Week 44", month: "M11", monthLabel: "Dec" },
  { week: "W45", weekLabel: "Week 45", month: "M11", monthLabel: "Dec" },
  { week: "W46", weekLabel: "Week 46", month: "M11", monthLabel: "Dec" },
  { week: "W47", weekLabel: "Week 47", month: "M11", monthLabel: "Dec" },
  { week: "W48", weekLabel: "Week 48", month: "M11", monthLabel: "Dec" },
  { week: "W49", weekLabel: "Week 49", month: "M12", monthLabel: "Jan" },
  { week: "W50", weekLabel: "Week 50", month: "M12", monthLabel: "Jan" },
  { week: "W51", weekLabel: "Week 51", month: "M12", monthLabel: "Jan" },
  { week: "W52", weekLabel: "Week 52", month: "M12", monthLabel: "Jan" }
];

// Formatter functions
const currencyFormatter = (params: any): string => {
  if (typeof params.value !== 'number') return '$0.00';
  return `$${params.value.toFixed(2)}`;
};

const percentageFormatter = (params: any): string => {
  if (typeof params.value !== 'number' || !params.value) return '0%';
  return `${(params.value * 100).toFixed(0)}%`;
};

const PlanningPage: React.FC = () => {
  // Retrieve planning data, SKUs, and Stores from Redux
  const planning = useSelector((state: RootState) => state.planning.records);
  const skus = useSelector((state: RootState) => state.skus.skus);
  const stores = useSelector((state: RootState) => state.stores.stores);

  // Generate row data by creating a cross join of Stores and SKUs.
  const rowData = useMemo(() => {
    const rows: any[] = [];
    stores.forEach(store => {
      skus.forEach(sku => {
        // Convert SKU price and cost from strings (e.g., "$114.99") to numbers.
        const price = parseFloat(sku.price.replace('$', '')) || 0;
        const cost = parseFloat(sku.cost.replace('$', '')) || 0;
        const row: any = {
          store: store.label,  // or store.id if desired
          sku: sku.id,
          price,
          cost,
        };
        // For each calendar week, check if a planning record exists; if not, default to 0.
        calendarWeeks.forEach(week => {
          const record = planning.find(
            p => p.store === store.id && p.sku === sku.id && p.week === week.week
          );
          row[week.week] = record ? record.salesUnits : 0;
        });
        rows.push(row);
      });
    });
    return rows;
  }, [stores, skus, planning]);

  // Fixed columns: Store and SKU
  const fixedColumns: ColDef[] = [
    { headerName: 'Store', field: 'store', pinned: 'left', width: 150 },
    { headerName: 'SKU', field: 'sku', pinned: 'left', width: 100 },
  ];

  // Group calendar weeks by month
  const monthGroups = useMemo(() => {
    const groups: Record<string, CalendarWeek[]> = {};
    calendarWeeks.forEach(week => {
      if (!groups[week.monthLabel]) {
        groups[week.monthLabel] = [];
      }
      groups[week.monthLabel].push(week);
    });
    return groups;
  }, []);

  // Build calendar columns: each month becomes a column group
  const calendarColumns: ColGroupDef[] = useMemo(() => {
    const groups: ColGroupDef[] = [];
    for (const month in monthGroups) {
      const weeks = monthGroups[month];
      const weekGroupCols: ColDef[] = weeks.map(week => ({
        headerName: week.weekLabel,
        children: [
          {
            headerName: "Sales Units",
            field: week.week,
            editable: true,
            width: 100,
            cellEditor: 'agTextCellEditor',
            valueParser: (params: any) => Number(params.newValue),
          },
          {
            headerName: "Sales Dollars",
            valueGetter: (params: any) => {
              const units = params.data[week.week];
              return units * params.data.price;
            },
            valueFormatter: currencyFormatter,
            width: 120,
          },
          {
            headerName: "GM Dollars",
            valueGetter: (params: any) => {
              const units = params.data[week.week];
              const sales = units * params.data.price;
              const cost = units * params.data.cost;
              return sales - cost;
            },
            valueFormatter: currencyFormatter,
            width: 120,
          },
          {
            headerName: "GM %",
            valueGetter: (params: any) => {
              const units = params.data[week.week];
              const sales = units * params.data.price;
              const gm = sales - (units * params.data.cost);
              return sales ? gm / sales : 0;
            },
            valueFormatter: percentageFormatter,
            cellClassRules: {
              'green-cell': (params: any) => params.value >= 0.4,
              'yellow-cell': (params: any) => params.value >= 0.1 && params.value < 0.4,
              'orange-cell': (params: any) => params.value >= 0.05 && params.value < 0.1,
              'red-cell': (params: any) => params.value <= 0.05,
            },
            width: 100,
          },
        ],
      }));
      groups.push({
        headerName: month,
        children: weekGroupCols,
      });
    }
    return groups;
  }, [monthGroups]);

  // Combine fixed columns with calendar columns
  const columnDefs: (ColDef | ColGroupDef)[] = useMemo(() => {
    return [...fixedColumns, ...calendarColumns];
  }, [fixedColumns, calendarColumns]);

  return (
    <div className="planning-page">
      <h2>Planning</h2>
      <div className="ag-theme-alpine planning-grid">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
          }}
          rowModelType="clientSide"
        />
      </div>
    </div>
  );
};

export default PlanningPage;
