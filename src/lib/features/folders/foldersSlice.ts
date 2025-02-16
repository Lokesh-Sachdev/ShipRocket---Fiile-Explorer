// src/features/folders/foldersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Folder {
  id: string;
  name: string;
  position: { x: number; y: number };
}

interface FoldersState {
  folders: Folder[];
}

const initialState: FoldersState = {
  folders: [],
};

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.push(action.payload);
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload
      );
    },
    moveFolder: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const folder = state.folders.find((f) => f.id === action.payload.id);
      if (folder) {
        folder.position = { x: action.payload.x, y: action.payload.y };
      }
    },
    renameFolder: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const folder = state.folders.find((f) => f.id === action.payload.id);
      if (folder) {
        folder.name = action.payload.name;
      }
    },
  },
});

export const { addFolder, deleteFolder, moveFolder, renameFolder } =
  foldersSlice.actions;
export default foldersSlice.reducer;
