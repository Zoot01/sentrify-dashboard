import { Drawer } from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import { styled, useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import IdleModal from "components/IdleModal"
import Logo from "components/Logo"
import useIdle from "hooks/useIdle"
import { usePopupState } from "material-ui-popup-state/hooks"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { logoutThunk } from "store/auth/authReducer"
import { setSidebar, toggleSidebar } from "store/settings/settingsReducer"
import { AppDispatch, RootState } from "store/store"
import { useEventListener } from "usehooks-ts"
import AppbarContent from "./AppBar"
import ProfileDropdown from "./AppBar/ProfileDropdown"
import SearchModal from "./AppBar/SearchModal"
import Navbar from "./Navbar"

interface AppBarProps extends MuiAppBarProps {
  open: boolean
  matchDownMd: boolean
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  background: theme.palette.background.default,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),

    marginLeft: "250px",
  }),
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
  },
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "matchDownMd",
})<AppBarProps>(({ theme, open, matchDownMd }) => ({
  borderBottom: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: theme.palette.divider,
  background: theme.palette.background.default,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    !matchDownMd && {
      width: "calc(100% - 250px)",
      marginLeft: "250px",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}))

const ContentSpacer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}))

const DashboardLayout = () => {
  // Hooks
  const theme = useTheme()
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"))
  const dispatch = useDispatch<AppDispatch>()
  const { sidebarIsOpen } = useSelector((state: RootState) => state.settings)
  const popupState = usePopupState({
    variant: "popover",
    popupId: "profile-dropdown",
  })
  // State
  const [isOverflow, setIsOverflow] = useState(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false)

  // Functions
  const closeSearchModal = () => {
    setSearchModalOpen(false)
  }

  const openSearchModal = () => {
    setSearchModalOpen(true)
  }

  const handleIdle = () => {
    setModalOpen(true)
  }

  const refreshSession = () => {
    setModalOpen(false)
    idleTimer.reset()
  }

  const handleLogout = () => {
    dispatch(logoutThunk())
  }
  const scrollEventListner = useCallback((e: Event) => {
    const window = e.currentTarget as Window
    const currentPostion = window.scrollY
    if (currentPostion > 0) {
      setIsOverflow(true)
    } else setIsOverflow(false)
  }, [])

  // More Hooks
  const { idleTimer } = useIdle({ onIdle: handleIdle, idleTime: 60 * 15 })
  useEventListener("scroll", scrollEventListner)

  useEffect(() => {
    dispatch(setSidebar(true))
  }, [matchDownMd])

  return (
    <Box sx={{ display: "flex", height: "100%", flexDirection: "column" }}>
      {/* Modals and Dropdowns */}
      <ProfileDropdown popupState={popupState} />
      <SearchModal searchModalOpen={searchModalOpen} closeSearchModal={closeSearchModal} />
      {/* Idle Modal */}
      {modalOpen && (
        <IdleModal open={modalOpen} refreshSession={refreshSession} handleLogout={handleLogout} />
      )}

      {/* Appbar */}
      <AppBar
        position="fixed"
        elevation={isOverflow ? 1 : 0}
        open={sidebarIsOpen}
        matchDownMd={matchDownMd}
      >
        <AppbarContent popupState={popupState} openSearchModal={openSearchModal} />
      </AppBar>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: "250px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "250px",
            boxSizing: "border-box",
            paddingLeft: "16px",
            paddingRight: "16px",
            background: "#1C2536",
          },
        }}
        variant={matchDownMd ? "temporary" : "persistent"}
        anchor="left"
        open={sidebarIsOpen}
        ModalProps={{ keepMounted: true }}
        onClose={() => dispatch(toggleSidebar())}
      >
        <ContentSpacer>
          <Logo />
        </ContentSpacer>
        <Box>
          <Navbar />
        </Box>
      </Drawer>

      {/* Dashboard wrapper */}
      <Main open={sidebarIsOpen}>
        <ContentSpacer />
        <Outlet />
      </Main>
    </Box>
  )
}

export default DashboardLayout
