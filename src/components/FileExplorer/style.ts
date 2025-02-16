import styled from "styled-components";

export const ExplorerContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1e1e1e;
  color: #ffffff;
`;

export const CanvasContainer = styled.div`
  position: relative;
  flex-grow: 1;
  margin: 20px;
  background-color: #1e1e1e;
`;

export const FolderContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

export const StyledFolder = styled.div`
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

export const FolderName = styled.div`
  font-size: 12px;
  color: #cccccc;
  text-align: center;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ContextMenu = styled.div<{ x: number; y: number }>`
  position: fixed;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  background-color: #2d2d2d;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;

export const MenuItem = styled.div`
  padding: 6px 12px;
  font-size: 13px;
  color: #cccccc;
  cursor: pointer;

  &:hover {
    background-color: #094771;
  }
`;

export const Input = styled.input`
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

export const Modal = styled.div`
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

export const ModalTitle = styled.h3`
  color: #ffffff;
  margin: 0 0 16px 0;
  font-size: 14px;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const Button = styled.button<{ primary?: boolean }>`
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
