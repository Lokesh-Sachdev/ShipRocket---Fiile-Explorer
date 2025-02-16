import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFolder,
  deleteFolder,
  moveFolder,
  renameFolder,
} from "@/lib/features/folders/foldersSlice";
import { RootState } from "@/lib/store";

export const useFileExplorer = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.folders.folders);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    folderId?: string | undefined;
  } | null>(null);
  const [, setDraggingId] = useState<string | null>(null);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleRightClick = (event: React.MouseEvent, folderId?: string) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      folderId,
    });
  };

  const handleCreateFolder = () => {
    setNewFolderName("");
    setIsNewFolderModalOpen(true);
    setContextMenu(null);
  };

  const handleSubmitNewFolder = () => {
    const folderName = newFolderName.trim() || `New Folder ${Date.now()}`;

    let position;

    if (folders.length > 0) {
      // Stack vertically below the last created folder
      const lastFolder = folders[folders.length - 1];
      position = {
        x: lastFolder.position.x + 80,
        y: lastFolder.position.y,
      };
    } else {
      position = { x: 0, y: 0 };
    }

    const newFolder = {
      id: `folder-${Date.now()}`,
      name: folderName,
      position,
    };

    dispatch(addFolder(newFolder));
    setIsNewFolderModalOpen(false);
    setNewFolderName("");
  };

  const handleDeleteFolder = (id: string) => {
    dispatch(deleteFolder(id));
    setContextMenu(null);
  };

  const handleDuplicateFolder = (id: string) => {
    const folder = folders.find((f) => f.id === id);
    if (folder) {
      const newFolder = {
        ...folder,
        id: `folder-${Date.now()}`,
        name: `${folder.name} Copy`,
        position: {
          x: folder.position.x + 20,
          y: folder.position.y + 20,
        },
      };
      dispatch(addFolder(newFolder));
    }
    setContextMenu(null);
  };

  const handleRenameClick = (id: string) => {
    setSelectedFolderId(id);
    const folder = folders.find((f) => f.id === id);
    if (folder) {
      setNewFolderName(folder.name);
      setIsRenameModalOpen(true);
    }
    setContextMenu(null);
  };

  const handleRenameSubmit = () => {
    if (!selectedFolderId) return;

    const currentFolder = folders.find(
      (folder) => folder.id === selectedFolderId
    );
    const folderName =
      newFolderName.trim() || currentFolder?.name || "Untitled Folder";

    dispatch(renameFolder({ id: selectedFolderId, name: folderName }));

    setIsRenameModalOpen(false);
    setNewFolderName("");
    setSelectedFolderId(null);
  };

  const handleDragStart = (event: React.DragEvent, id: string) => {
    event.dataTransfer.setData("text/plain", id);
    setDraggingId(id);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    if (id && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      dispatch(moveFolder({ id, x, y }));
    }
    setDraggingId(null);
  };

  const handleClick = () => {
    setContextMenu(null);
  };

  return {
    contextMenu,
    isNewFolderModalOpen,
    setIsNewFolderModalOpen,
    isRenameModalOpen,
    setIsRenameModalOpen,
    newFolderName,
    setNewFolderName,
    selectedFolderId,
    canvasRef,
    handleRightClick,
    handleCreateFolder,
    handleSubmitNewFolder,
    handleDeleteFolder,
    handleDuplicateFolder,
    handleRenameClick,
    handleRenameSubmit,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleClick,
  };
};
