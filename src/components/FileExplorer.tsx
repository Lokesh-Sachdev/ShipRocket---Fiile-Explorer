import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  addFolder,
  deleteFolder,
  moveFolder,
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
  padding: 20px;
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
  cursor: move;
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

const FileExplorer: React.FC = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.folders.folders);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const handleCreateFolder = () => {
    if (contextMenu) {
      const newFolder = {
        id: `folder-${Date.now()}`,
        name: "New Folder",
        position: { x: contextMenu.x, y: contextMenu.y },
      };
      dispatch(addFolder(newFolder));
      setContextMenu(null);
    }
  };

  const handleDeleteFolder = (id: string) => {
    dispatch(deleteFolder(id));
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
        onContextMenu={handleRightClick}
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
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setContextMenu({ x: e.clientX, y: e.clientY });
            }}
          >
            <StyledFolder>
              <FolderIcon />
            </StyledFolder>
            <FolderName>{folder.name}</FolderName>
          </FolderContainer>
        ))}
        {contextMenu && (
          <ContextMenu x={contextMenu.x} y={contextMenu.y}>
            <MenuItem onClick={handleCreateFolder}>New Folder</MenuItem>
            {draggingId && (
              <MenuItem onClick={() => handleDeleteFolder(draggingId)}>
                Delete Folder
              </MenuItem>
            )}
          </ContextMenu>
        )}
      </Canvas>
    </ExplorerContainer>
  );
};

export default FileExplorer;
