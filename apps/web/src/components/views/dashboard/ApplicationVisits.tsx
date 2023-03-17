import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import IconButton from "@mui/material/IconButton"
import { useTheme } from "@mui/material/styles"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { Stack } from "@mui/system"
import { ApexOptions } from "apexcharts"
import { useEffect } from "react"
import ReactApexcharts from "react-apexcharts"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
import Icon from "ui/components/Icon"
import { hexToRGBA } from "utils/hexToRGBA"

const series = [{ data: [280, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 100, 150, 100, 50] }]

const ApplicationVisits = () => {
  // Hooks
  const { sidebarIsOpen } = useSelector((state: RootState) => state.settings)
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      type: "area",
      height: 160,
      zoom: { enabled: false },
      toolbar: { show: false },
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true },
      },
    },
    colors: [hexToRGBA(theme.palette.info.main, 0.9)],
    markers: {
      size: 6,
      offsetY: 2,
      offsetX: -1,
      strokeWidth: 3,
      colors: ["transparent"],
      strokeColors: "transparent",
      discrete: [
        {
          size: 6,
          seriesIndex: 0,
          strokeColor: theme.palette.info.main,
          fillColor: theme.palette.background.paper,
          dataPointIndex: series[0].data.length - 1,
        },
      ],
      hover: { size: 7 },
    },
    noData: {
      text: "Loading...",
    },
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const chartInstance = ApexCharts.getChartByID("visits-chart")
      if (chartInstance) chartInstance.updateSeries(series, true)
    }, 150)
    return () => clearTimeout(timeOut)
  }, [sidebarIsOpen])

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
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
            <Typography variant="h6" sx={{ mr: 1.5 }}>
              16,982
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "success.main" }}>
              +32%
            </Typography>
          </Box>
          <Tooltip title="Refresh Data">
            <IconButton size="small">
              <Icon icon="RefreshOutlined" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Typography variant="body2">Total Application Visits</Typography>

        <ReactApexcharts type="line" height={150} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApplicationVisits
