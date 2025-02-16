import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 200px;
  background-color: #252526;
  padding: 20px 0;
  border-right: 1px solid #3c3c3c;
`;

export const SidebarSection = styled.div`
  margin-bottom: 20px;
`;

export const SidebarHeader = styled.div`
  padding: 8px 16px;
  color: #969696;
  font-size: 12px;
  text-transform: uppercase;
`;

export const SidebarItem = styled.div`
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
