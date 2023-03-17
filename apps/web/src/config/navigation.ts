import { NavItemType } from "types/navItems"

const navigation: { items: NavItemType[] } = {
  items: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "group",
      children: [
        {
          id: "",
          title: "Dashboard",
          type: "item",
          url: "/",
          icon: "DashboardOutlined",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "applicants",
      title: "Applicants",
      caption: "Applicant Actions",
      type: "group",
      children: [
        {
          id: "create-applicant",
          title: "Create Applicant",
          type: "item",
          url: "/applicants/create-applicant",
          icon: "PersonAddAlt1Outlined",
          breadcrumbs: false,
        },
        {
          id: "search-applicant",
          title: "Search Applicants",
          type: "item",
          url: "/applicants/search-applicant",
          icon: "PersonSearchOutlined",
          breadcrumbs: false,
        },
        {
          id: "files",
          title: "Files",
          type: "collapse",
          icon: "FolderOutlined",
          children: [
            {
              id: "upload-files",
              title: "Upload Files",
              type: "item",
              icon: "UploadFileOutlined",
              url: "/files/upload-files",
              breadcrumbs: false,
            },
            {
              id: "search-files",
              title: "Search Files",
              icon: "FindInPageOutlined",
              type: "item",
              url: "/files/search-files",
              breadcrumbs: false,
            },
          ],
        },
      ],
    },
    {
      id: "utilities",
      title: "Utilities",
      type: "group",
      children: [
        {
          id: "logs",
          title: "Logs",
          type: "item",
          url: "/utilities/logs",
          icon: "ReceiptLongOutlined",
          breadcrumbs: false,
        },
        {
          id: "status",
          title: "Status",
          type: "item",
          url: "/utilities/status",
          icon: "MonitorHeartOutlined",
          breadcrumbs: false,
        },
        {
          id: "blank",
          title: "Blank Layout",
          type: "item",
          url: "/utilities/blank-layout",
          icon: "WebAssetOutlined",
          breadcrumbs: false,
        },
      ],
    },
  ],
}

export default navigation
