import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SKUType {
  id: string;
  label: string;
  price: string; // e.g. "$114.99"
  cost: string;  // e.g. "$18.28"
}

interface SKUsState {
  skus: SKUType[];
}

const initialState: SKUsState = {
  skus: [
    { id: "SK00158", label: "Crew Neck Merino Wool Sweater", price: "$114.99", cost: "$18.28" },
  { id: "SK00269", label: "Faux Leather Leggings",  price: "$9.99", cost: "$8.45" },
  { id: "SK00300", label: "Fleece-Lined Parka",  price: "$199.99", cost: "$17.80" },
  { id: "SK00304", label: "Cotton Polo Shirt", price: "$139.99", cost: "$10.78" },
  { id: "SK00766", label: "Foldable Travel Hat",  price: "$44.99", cost: "$27.08" },
  { id: "SK00786", label: "Chic Quilted Wallet",  price: "$14.99", cost: "$4.02" },
  { id: "SK00960", label: "High-Slit Maxi Dress",  price: "$74.99", cost: "$47.47" },
  { id: "SK01183", label: "Turtleneck Cable Knit Sweater",  price: "$49.99", cost: "$22.60" },
  { id: "SK01189", label: "Retro-Inspired Sunglasses",  price: "$194.99", cost: "$115.63" },
  { id: "SK01193", label: "Stretch Denim Overalls",  price: "$129.99", cost: "$47.06" },
  ],
};

const skusSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKUType>) => {
      state.skus.push(action.payload);
    },
    updateSKU: (state, action: PayloadAction<SKUType>) => {
      state.skus = state.skus.map(sku =>
        sku.id === action.payload.id ? action.payload : sku
      );
    },
    removeSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter(sku => sku.id !== action.payload);
    },
    reorderSKU: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      const { oldIndex, newIndex } = action.payload;
      if (oldIndex < 0 || newIndex < 0 || oldIndex >= state.skus.length || newIndex >= state.skus.length) return;
      const updated = [...state.skus];
      const [removed] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, removed);
      state.skus = updated;
    },
  },
});

export const { addSKU, updateSKU, removeSKU, reorderSKU } = skusSlice.actions;
export default skusSlice.reducer;
