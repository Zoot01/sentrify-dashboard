import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { CardContent } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import Chip from "@mui/material/Chip"
import { useTheme } from "@mui/material/styles"
import Tab from "@mui/material/Tab"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { alpha, Stack } from "@mui/system"
import { SyntheticEvent, useState } from "react"

interface TabContentType {
  status: "active" | "completed" | "in-draft" | "expired"
  parameter: string
  conversion: string
  totalApplicants: string
  conversionDifference?: "positive" | "negative"
}

interface TabContentDataType {
  indeed: TabContentType[]
  enp: TabContentType[]
  monster: TabContentType[]
  constantContact: TabContentType[]
}

const tabContentData: TabContentDataType = {
  indeed: [
    {
      status: "active",
      conversion: "+24",
      totalApplicants: "10",
      parameter: "Email Marketing Campaign",
    },
    {
      conversion: "-12",
      status: "completed",
      totalApplicants: "22",
      parameter: "Google Workspace",
      conversionDifference: "negative",
    },
    {
      status: "active",
      conversion: "+24",
      totalApplicants: "15",
      parameter: "Affiliation Program",
    },
    {
      conversion: "0",
      status: "in-draft",
      totalApplicants: "0",
      parameter: "Google AdSense",
    },
  ],
  enp: [
    {
      status: "active",
      conversion: "-8",
      totalApplicants: "3",
      conversionDifference: "negative",
      parameter: "Create Audiences in Ads Manager",
    },
    {
      status: "active",
      conversion: "+19",
      totalApplicants: "45",
      parameter: "Facebook page advertising",
    },
    {
      status: "expired",
      conversion: "-23",
      totalApplicants: "2",
      conversionDifference: "negative",
      parameter: "Messenger advertising",
    },
    {
      conversion: "+21",
      status: "completed",
      totalApplicants: "23",
      parameter: "Video campaign",
    },
  ],
  monster: [
    {
      conversion: "-15",
      status: "in-draft",
      totalApplicants: "0",
      conversionDifference: "negative",
      parameter: "Create shopping advertising",
    },
    {
      conversion: "+37",
      status: "completed",
      totalApplicants: "19",
      parameter: "IGTV advertising",
    },
    {
      conversion: "0",
      status: "in-draft",
      totalApplicants: "0",
      parameter: "Collection advertising",
    },
    {
      status: "active",
      conversion: "+29",
      totalApplicants: "67",
      parameter: "Stories advertising",
    },
  ],
  constantContact: [
    {
      conversion: "+2",
      status: "expired",
      totalApplicants: "2",
      parameter: "Interests advertising",
    },
    {
      status: "active",
      conversion: "+25",
      totalApplicants: "17",
      parameter: "Community advertising",
    },
    {
      conversion: "+21",
      status: "completed",
      totalApplicants: "23",
      parameter: "Device advertising",
    },
    {
      status: "active",
      conversion: "-5",
      totalApplicants: "20",
      parameter: "Campaigning",
      conversionDifference: "negative",
    },
  ],
}

const RenderTabContent = ({ data }: { data: TabContentType[] }) => {
  // Hooks
  const theme = useTheme()
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow
            sx={{ "& .MuiTableCell-root": { py: (theme) => `${theme.spacing(1)} !important` } }}
          >
            <TableCell>Refferal Source</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Conversion</TableCell>
            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
              Total Applicants
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: TabContentType, index: number) => (
            <TableRow
              key={index}
              sx={{
                "& .MuiTableCell-root": {
                  border: 0,
                  py: (theme) => `${theme.spacing(3)} !important`,
                },
              }}
            >
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, whiteSpace: "nowrap", color: "text.primary" }}
                >
                  {row.parameter}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Chip
                  size="small"
                  label={row.status}
                  sx={{
                    fontWeight: 500,
                    ...(row.status === "active" && {
                      background: alpha(theme.palette.success.main, 0.25),
                      color: theme.palette.success.main,
                    }),
                    ...(row.status === "completed" && {
                      background: alpha(theme.palette.info.main, 0.25),
                      color: theme.palette.info.main,
                    }),
                    ...(row.status === "expired" && {
                      background: alpha(theme.palette.error.main, 0.25),
                      color: theme.palette.error.main,
                    }),
                    ...(row.status === "expired" && {
                      background: alpha(theme.palette.error.main, 0.25),
                      color: theme.palette.error.main,
                    }),
                    ...(row.status === "in-draft" && {
                      background: alpha(theme.palette.warning.main, 0.25),
                      color: theme.palette.warning.main,
                    }),
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    textAlign: "right",
                    color: row.conversionDifference === "negative" ? "error.main" : "success.main",
                  }}
                >{`${row.conversion}%`}</Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, textAlign: "right", color: "text.primary" }}
                >
                  {row.totalApplicants}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const ApplicantRefferal = () => {
  // Hooks
  const theme = useTheme()
  // State
  const [value, setValue] = useState<string>("indeed")

  // Functions
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const RenderTabAvatar = ({ category, image }: { category: string; image: string }) => (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100px",
        height: "110px",
        border: (theme) =>
          value === category
            ? `2px solid ${theme.palette.primary.main}`
            : `2px dashed ${theme.palette.divider}`,
        borderRadius: "8px",
      }}
    >
      <Avatar
        sx={{
          width: 40,
          height: 40,
        }}
        src={`./images/logos/${image}.png`}
      />
      <Typography
        variant="body2"
        sx={{ mt: 2, fontWeight: 600, color: "text.primary", textTransform: "capitalize" }}
      >
        {category}
      </Typography>
    </Stack>
  )

  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: "100%",
        }}
      >
        <CardHeader title="Top Applicant Referral Sources" subheader="82% Activity Growth" />
        <TabContext value={value}>
          <TabList
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange}
            aria-label="top referral sources tabs"
            sx={{
              mb: 2,
              px: 2,
              "& .MuiTab-root:not(:last-child)": { mr: 4 },
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTabs-root": {},
              "& .MuiButtonBase-root": {
                borderRadius: "8px",
                color: theme.palette.text.primary,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "rgba(0, 0, 0, 0.04)"
                      : "rgba(255, 255, 255, 0.04)",
                },
              },
            }}
          >
            <Tab
              value="indeed"
              sx={{ p: 0 }}
              label={<RenderTabAvatar category="Indeed" image="indeed" />}
            />
            <Tab
              value="monster"
              sx={{ p: 0 }}
              label={<RenderTabAvatar category="Monster" image="monster" />}
            />
            <Tab
              value="enp"
              sx={{ p: 0 }}
              label={<RenderTabAvatar category="ENP Network" image="enp" />}
            />
            <Tab
              value="constantContact"
              sx={{ p: 0 }}
              label={<RenderTabAvatar category="Constant" image="cc" />}
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value="indeed">
            <RenderTabContent data={tabContentData["indeed"]} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="monster">
            <RenderTabContent data={tabContentData["monster"]} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="enp">
            <RenderTabContent data={tabContentData["enp"]} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="constantContact">
            <RenderTabContent data={tabContentData["constantContact"]} />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default ApplicantRefferal
