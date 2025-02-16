import { useFileExplorer } from "@/hooks/useFileExplorer";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import Canvas from "./Canvas";
import { ExplorerContainer } from "./style";

const FileExplorer: React.FC = () => {
  const folders = useSelector((state: RootState) => state.folders.folders);

  const {
    canvasRef,
    contextMenu,
    isNewFolderModalOpen,
    isRenameModalOpen,
    newFolderName,
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
    setIsRenameModalOpen,
    selectedFolderId,
    setNewFolderName,
    setIsNewFolderModalOpen,
  } = useFileExplorer();

  return (
    <ExplorerContainer onClick={handleClick}>
      <Sidebar />
      <Canvas
        canvasRef={canvasRef}
        folders={folders}
        contextMenu={contextMenu}
        isNewFolderModalOpen={isNewFolderModalOpen}
        isRenameModalOpen={isRenameModalOpen}
        setIsNewFolderModalOpen={setIsNewFolderModalOpen}
        newFolderName={newFolderName}
        selectedFolderId={selectedFolderId}
        setNewFolderName={setNewFolderName}
        setIsRenameModalOpen={setIsRenameModalOpen}
        handleRightClick={handleRightClick}
        handleCreateFolder={handleCreateFolder}
        handleSubmitNewFolder={handleSubmitNewFolder}
        handleDeleteFolder={handleDeleteFolder}
        handleDuplicateFolder={handleDuplicateFolder}
        handleRenameClick={handleRenameClick}
        handleRenameSubmit={handleRenameSubmit}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
      />
    </ExplorerContainer>
  );
};

export default FileExplorer;
