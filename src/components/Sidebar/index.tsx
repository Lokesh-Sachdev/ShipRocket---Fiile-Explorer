import { Folder as FolderIcon } from "lucide-react";
import {
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  SidebarContainer,
} from "./style";

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
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
    </SidebarContainer>
  );
};

export default Sidebar;
