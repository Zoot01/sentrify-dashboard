import { alpha, styled, Theme, useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import MuiAlert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import MuiDialog from "@mui/material/Dialog"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import OutlinedInput from "@mui/material/OutlinedInput"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import ReactRouterLink from "components/shared/ReactRouterLink"
import navigation from "config/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setOpenMenuItems } from "store/settings/settingsReducer"
import { AppDispatch } from "store/store"
import { NavItemType } from "types/navItems"
import Icon from "ui/components/Icon"

const Dialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backdropFilter: "blur(4px)",
  },
  "& .MuiDialog-paper": {
    overflow: "hidden",
    "&:not(.MuiDialog-paperFullScreen)": {
      width: "400px",
      maxHeight: "100%",
      borderRadius: "8px",
    },
  },
}))

const Alert = styled(MuiAlert)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.025)
      : alpha(theme.palette.common.black, 0.025),
  color: theme.palette.text.secondary,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  "& .MuiAlert-icon": {
    color: theme.palette.text.primary,
  },
}))

interface ResultsProps {
  results: NavItemType[]
  handleResultClick: (id: string) => void
}

const Results = ({ results, handleResultClick }: ResultsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <List sx={{ py: 0 }}>
        {results.map((i) => {
          if (i.children) {
            return (
              <Box key={i.id}>
                {i.children.map((item) => {
                  return (
                    <ListItem
                      key={item.id}
                      sx={{ py: 2 }}
                      disablePadding
                      onClick={() => handleResultClick(i.id === "dashboard" ? "" : i.id)}
                    >
                      <Box
                        component={ReactRouterLink}
                        href={item.url ?? "/"}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          textDecoration: "none",
                          "&:hover > *": { color: "primary.main" },
                        }}
                      >
                        <Box sx={{ mr: 2.5, display: "flex", color: "text.primary" }}>
                          <Icon icon={item.icon ?? "FiberManualRecord"} />
                        </Box>
                        <Typography variant="body2" sx={{ color: "text.primary" }}>
                          {item.title}
                        </Typography>
                      </Box>
                    </ListItem>
                  )
                })}
              </Box>
            )
          } else
            return (
              <ListItem
                key={i.id}
                sx={{ py: 2 }}
                disablePadding
                onClick={() => handleResultClick(i.id)}
              >
                <Box
                  component={ReactRouterLink}
                  href={i.url ?? "/"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    "&:hover > *": { color: "primary.main" },
                  }}
                >
                  <Box sx={{ mr: 2.5, display: "flex", color: "text.primary" }}>
                    <Icon icon={i.icon ?? "FiberManualRecord"} />
                  </Box>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {i.title}
                  </Typography>
                </Box>
              </ListItem>
            )
        })}
      </List>
    </Box>
  )
}

// No results
interface NoResultsProps {
  input: string
  theme: Theme
  handleResultClick: (id: string) => void
}

const NoResult = ({ input, theme, handleResultClick }: NoResultsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box sx={{ mb: 1, color: theme.palette.text.secondary }}>
        <Icon
          icon="FindInPageOutlined"
          style={{
            fontSize: "5rem",
          }}
        />
      </Box>
      <Typography variant="h6" textAlign="center" sx={{ mb: 0.5, wordWrap: "break-word" }}>
        No results for{" "}
        <Typography variant="h6" component="span" sx={{ wordWrap: "break-word" }}>
          {`"${input}"`}
        </Typography>
      </Typography>

      <Typography variant="body2" sx={{ mb: 1.5, color: "text.disabled" }}>
        Try searching for
      </Typography>
      <List sx={{ py: 0 }}>
        <ListItem sx={{ py: 2 }} disablePadding onClick={() => handleResultClick("")}>
          <Box
            component={ReactRouterLink}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              "&:hover > *": { color: "primary.main" },
            }}
          >
            <Box sx={{ mr: 2.5, display: "flex", color: "text.primary" }}>
              <Icon icon="DashboardOutlined" />
            </Box>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              Dashboard
            </Typography>
          </Box>
        </ListItem>
        <ListItem
          sx={{ py: 2 }}
          disablePadding
          onClick={() => handleResultClick("search-applicant")}
        >
          <Box
            component={ReactRouterLink}
            href="/applicants/search-applicant"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              "&:hover > *": { color: "primary.main" },
            }}
          >
            <Box sx={{ mr: 2.5, display: "flex", color: "text.primary" }}>
              <Icon icon="PersonSearchOutlined" />
            </Box>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              Applicants
            </Typography>
          </Box>
        </ListItem>
        <ListItem sx={{ py: 2 }} disablePadding onClick={() => handleResultClick("logs")}>
          <Box
            component={ReactRouterLink}
            href="/utilities/logs"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              "&:hover > *": { color: "primary.main" },
            }}
          >
            <Box sx={{ mr: 2.5, display: "flex", color: "text.primary" }}>
              <Icon icon="ReceiptLongOutlined" />
            </Box>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              Utilities
            </Typography>
          </Box>
        </ListItem>
      </List>
    </Box>
  )
}

interface Props {
  searchModalOpen: boolean
  closeSearchModal: () => void
}

const SearchModal = ({ searchModalOpen, closeSearchModal }: Props) => {
  const theme = useTheme()
  const fullScreenDialog = useMediaQuery(theme.breakpoints.down("sm"))
  const [input, setInput] = useState<string>("")
  const [results, setResults] = useState<NavItemType[] | []>([])
  const dispatch = useDispatch<AppDispatch>()

  const handleResultClick = (id: string) => {
    setInput("")
    setResults([])
    dispatch(setOpenMenuItems(id))
    closeSearchModal()
  }

  useEffect(() => {
    setInput("")
    setResults([])
  }, [searchModalOpen])

  const filterResults = (input: string) => {
    if (input === "") setResults([])
    else {
      const results = navigation.items.filter((i) => {
        if (i.id.includes(input)) {
          return i
        } else return null
      })
      setResults([...results])
    }
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    filterResults(e.target.value)
  }

  return (
    <Dialog open={searchModalOpen} fullScreen={fullScreenDialog}>
      <Stack sx={{ top: 0, width: "100%", position: "sticky", p: 2 }} gap={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Search</Typography>
          <IconButton size="small" onClick={closeSearchModal}>
            <Icon icon="CloseOutlined" />
          </IconButton>
        </Stack>
        <Alert>Try seaching for navigation items.</Alert>
        <Stack>
          <OutlinedInput
            inputRef={(input) => input && input.focus()}
            autoComplete="off"
            value={input}
            onChange={handleSearch}
            fullWidth
            placeholder="Search..."
            id="search"
            startAdornment={<Icon icon="SearchOutlined" style={{ marginRight: "8px" }} />}
          />
        </Stack>
        {input !== "" && !results.length ? (
          <NoResult input={input} theme={theme} handleResultClick={handleResultClick} />
        ) : (
          <Results results={results} handleResultClick={handleResultClick} />
        )}
      </Stack>
    </Dialog>
  )
}

export default SearchModal
