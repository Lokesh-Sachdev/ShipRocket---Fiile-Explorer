import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  addFolder,
  deleteFolder,
  moveFolder,
  renameFolder,
} from "@/lib/features/folders/foldersSlice";
import { RootState } from "@/lib/store";
import { Folder as FolderIcon } from "lucide-react";

const ExplorerContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1e1e1e;
  color: #ffffff;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #252526;
  padding: 20px 0;
  border-right: 1px solid #3c3c3c;
`;

const SidebarSection = styled.div`
  margin-bottom: 20px;
`;

const SidebarHeader = styled.div`
  padding: 8px 16px;
  color: #969696;
  font-size: 12px;
  text-transform: uppercase;
`;

const SidebarItem = styled.div`
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cccccc;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: #2a2d2e;
  }
`;

const Canvas = styled.div`
  position: relative;
  flex-grow: 1;
  margin: 20px;
  background-color: #1e1e1e;
`;

const FolderContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const StyledFolder = styled.div`
  width: 70px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 8px;

  &:hover {
    background-color: #2a2d2e;
  }

  svg {
    color: #378cef;
    width: 40px;
    height: 40px;
  }
`;

const FolderName = styled.div`
  font-size: 12px;
  color: #cccccc;
  text-align: center;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContextMenu = styled.div<{ x: number; y: number }>`
  position: fixed;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  background-color: #2d2d2d;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 6px 12px;
  font-size: 13px;
  color: #cccccc;
  cursor: pointer;

  &:hover {
    background-color: #094771;
  }
`;

const Input = styled.input`
  background-color: #2d2d2d;
  border: 1px solid #3c3c3c;
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  width: 120px;

  &:focus {
    outline: none;
    border-color: #094771;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2d2d2d;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1100;
`;

const ModalTitle = styled.h3`
  color: #ffffff;
  margin: 0 0 16px 0;
  font-size: 14px;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const Button = styled.button<{ primary?: boolean }>`
  background-color: ${(props) => (props.primary ? "#094771" : "#3c3c3c")};
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: ${(props) => (props.primary ? "#0b5894" : "#4c4c4c")};
  }
`;

const FileExplorer: React.FC = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.folders.folders);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    folderId?: string | undefined;
  } | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
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

    const position = contextMenu
      ? { x: contextMenu.x, y: contextMenu.y }
      : { x: 0, y: 0 };

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

  return (
    <ExplorerContainer onClick={handleClick}>
      <Sidebar>
        <SidebarSection>
          <SidebarHeader>Favorites</SidebarHeader>
          <SidebarItem>
            <FolderIcon size={16} />
            AirDrop
          </SidebarItem>
          <SidebarItem>
            <FolderIcon size={16} />
            Recent
          </SidebarItem>
        </SidebarSection>
        <SidebarSection>
          <SidebarHeader>Tags</SidebarHeader>
          <SidebarItem>Red</SidebarItem>
          <SidebarItem>Orange</SidebarItem>
          <SidebarItem>Yellow</SidebarItem>
          <SidebarItem>Green</SidebarItem>
          <SidebarItem>Blue</SidebarItem>
          <SidebarItem>Purple</SidebarItem>
          <SidebarItem>Grey</SidebarItem>
        </SidebarSection>
      </Sidebar>
      <Canvas
        ref={canvasRef}
        onContextMenu={(e) => handleRightClick(e)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {folders.map((folder) => (
          <FolderContainer
            key={folder.id}
            x={folder.position.x}
            y={folder.position.y}
            draggable
            onDragStart={(e) => handleDragStart(e, folder.id)}
            onContextMenu={(e) => handleRightClick(e, folder.id)}
          >
            <StyledFolder>
              <FolderIcon />
            </StyledFolder>
            <FolderName>{folder.name}</FolderName>
          </FolderContainer>
        ))}
        {contextMenu && (
          <ContextMenu x={contextMenu.x} y={contextMenu.y}>
            {contextMenu.folderId ? (
              <>
                <MenuItem
                  onClick={() => handleRenameClick(contextMenu.folderId)}
                >
                  Rename
                </MenuItem>
                <MenuItem
                  onClick={() => handleDuplicateFolder(contextMenu.folderId)}
                >
                  Duplicate
                </MenuItem>
                <MenuItem
                  onClick={() => handleDeleteFolder(contextMenu.folderId)}
                >
                  Delete
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleCreateFolder}>New Folder</MenuItem>
            )}
          </ContextMenu>
        )}

        {isNewFolderModalOpen && (
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Create New Folder</ModalTitle>
            <Input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmitNewFolder();
                if (e.key === "Escape") setIsNewFolderModalOpen(false);
              }}
            />
            <ModalButtons>
              <Button onClick={() => setIsNewFolderModalOpen(false)}>
                Cancel
              </Button>
              <Button primary onClick={handleSubmitNewFolder}>
                Create
              </Button>
            </ModalButtons>
          </Modal>
        )}

        {isRenameModalOpen && (
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Rename Folder</ModalTitle>
            <Input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameSubmit();
                if (e.key === "Escape") setIsRenameModalOpen(false);
              }}
            />
            <ModalButtons>
              <Button onClick={() => setIsRenameModalOpen(false)}>
                Cancel
              </Button>
              <Button primary onClick={handleRenameSubmit}>
                Rename
              </Button>
            </ModalButtons>
          </Modal>
        )}
      </Canvas>
    </ExplorerContainer>
  );
};

export default FileExplorer;
