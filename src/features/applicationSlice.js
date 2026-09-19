import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: null,
  selectedDocumentType: null,
  formData: {},
  language: "English",
  tone: "Professional",
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedDocumentType = null;
      state.formData = {};
    },
    setSelectedDocumentType: (state, action) => {
      state.selectedDocumentType = action.payload;
      state.formData = {};
    },
    setFormField: (state, action) => {
      const { fieldId, value } = action.payload;
      state.formData[fieldId] = value;
    },
    // Added to resolve the export error
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setTone: (state, action) => {
      state.tone = action.payload;
    },
    resetToCategories: (state) => {
      state.selectedCategory = null;
      state.selectedDocumentType = null;
      state.formData = {};
    },
    resetToDocumentTypes: (state) => {
      state.selectedDocumentType = null;
      state.formData = {};
    },
    resetApplication: () => initialState,
  },
});

export const {
  setSelectedCategory,
  setSelectedDocumentType,
  setFormField,
  setFormData, // Exported here
  setLanguage,
  setTone,
  resetToCategories,
  resetToDocumentTypes,
  resetApplication,
} = applicationSlice.actions;

export default applicationSlice.reducer;