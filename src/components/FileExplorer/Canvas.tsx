import {
  Button,
  CanvasContainer,
  ContextMenu,
  FolderContainer,
  FolderName,
  Input,
  MenuItem,
  Modal,
  ModalButtons,
  ModalTitle,
  StyledFolder,
} from "./style";
import { FolderIcon } from "lucide-react";

interface Folder {
  position: {
    x: number;
    y: number;
  };
  id: string;
  name: string;
  children?: Folder[];
}

interface CanvasProps {
  folders: Folder[];
  canvasRef: React.RefObject<HTMLDivElement | null>;
  contextMenu: {
    x: number;
    y: number;
    folderId?: string | undefined;
  } | null;
  isNewFolderModalOpen: boolean;
  isRenameModalOpen: boolean;
  newFolderName: string;
  selectedFolderId: string | null;
  setNewFolderName: (name: string) => void;
  setIsRenameModalOpen: (isOpen: boolean) => void;
  setIsNewFolderModalOpen: (isOpen: boolean) => void;
  handleRightClick: (event: React.MouseEvent, folderId?: string) => void;
  handleCreateFolder: () => void;
  handleSubmitNewFolder: () => void;
  handleDeleteFolder: (id: string) => void;
  handleDuplicateFolder: (id: string) => void;
  handleRenameClick: (id: string) => void;
  handleRenameSubmit: () => void;
  handleDragStart: (event: React.DragEvent, id: string) => void;
  handleDragOver: (event: React.DragEvent) => void;
  handleDrop: (event: React.DragEvent) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  folders,
  contextMenu,
  isNewFolderModalOpen,
  isRenameModalOpen,
  newFolderName,
  setNewFolderName,
  setIsRenameModalOpen,
  setIsNewFolderModalOpen,
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
  canvasRef,
}) => {
  return (
    <CanvasContainer
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
              <MenuItem onClick={() => handleRenameClick(contextMenu.folderId)}>
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
            <Button onClick={() => setIsRenameModalOpen(false)}>Cancel</Button>
            <Button primary onClick={handleRenameSubmit}>
              Rename
            </Button>
          </ModalButtons>
        </Modal>
      )}
    </CanvasContainer>
  );
};

export default Canvas;
