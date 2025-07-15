import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiBookmark, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

const SideBar = () => {
  return (
      <Sidebar aria-label="Sidebar with content separator example">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="/admin/dashboard" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="/admin/dashboard/upload" icon={HiOutlineCloudUpload}>
            Upload Book
          </SidebarItem>
          <SidebarItem href="/admin/dashboard/manage" icon={HiBookmark}>
            Manage Books
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Users
          </SidebarItem>
          <SidebarItem href="#" icon={HiShoppingBag}>
            Products
          </SidebarItem>
          <SidebarItem href="/login" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="/logout" icon={HiTable}>
            Log Out
          </SidebarItem>
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Upgrade to Pro
          </SidebarItem>
          <SidebarItem href="#" icon={HiViewBoards}>
            Documentation
          </SidebarItem>
          <SidebarItem href="#" icon={BiBuoy}>
            Help
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}

export default SideBar
