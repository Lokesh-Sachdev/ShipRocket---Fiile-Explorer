# [File Explorer Clone](https://pickrr-tech-file-explorer.netlify.app/)

![image](https://github.com/user-attachments/assets/9ac117c0-e189-4c4f-8ce3-bbebd995135a)
![image](https://github.com/user-attachments/assets/9c8df2f0-472f-491f-9757-b79c53866e57)


A React-based file explorer interface that mimics the functionality and appearance of a native desktop file system explorer.

## Features

- 🖱️ Context Menu System
  - Right-click on canvas to create new folders
  - Right-click on folders for additional options (rename, duplicate, delete)
- 📁 Folder Management
  - Create new folders with custom names
  - Rename existing folders
  - Duplicate folders
  - Delete folders
- 🎯 Drag and Drop
  - Drag folders to reposition them on the canvas
  - Smooth positioning with cursor feedback
- 🎨 Modern UI
  - macOS-inspired dark theme
  - Responsive layout with sidebar
  - Icon-based folder representation

## Tech Stack

- React
- TypeScript
- Redux (with Redux Toolkit)
- Styled Components
- Lucide React (for icons)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd file-explorer-clone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

## Project Structure

```
src/
├── lib/
│   └── store.ts           # Redux store configuration
|   └──features/
│      └── folders/
│          └── foldersSlice.ts # Folder management redux slice
├── components/
│   └── FileExplorer/
│       └── FileExplorer.tsx   # Main file explorer component
└── styles/
    └── styled.ts          # Styled components
```

## Component Architecture

### FileExplorer Component

The main component that handles:
- Folder rendering and positioning
- Context menu management
- Drag and drop functionality
- Modal dialogs for folder operations

### Redux State Management

```typescript
interface Folder {
  id: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
}

interface FoldersState {
  folders: Folder[];
}
```

### Available Actions

- `addFolder`: Creates a new folder
- `deleteFolder`: Removes an existing folder
- `moveFolder`: Updates folder position
- `renameFolder`: Updates folder name
- `duplicateFolder`: Creates a copy of an existing folder

## Usage

### Creating a New Folder

1. Right-click on the canvas
2. Select "New Folder" from the context menu
3. Enter the folder name in the modal
4. Click "Create" or press Enter

### Managing Folders

Right-click on any folder to:
- Rename: Change the folder's name
- Duplicate: Create a copy of the folder
- Delete: Remove the folder

### Moving Folders

- Click and drag any folder to reposition it
- Release to drop the folder at the new position

## Styling

The project uses Styled Components for styling with a dark theme inspired by macOS. Key style features include:

- Dark theme with appropriate contrast
- Consistent spacing and typography
- Smooth animations and transitions
- Responsive layout
- Icon-based interface

## Contact

Please feel free to reach out to Sachdev927@gmail.com
