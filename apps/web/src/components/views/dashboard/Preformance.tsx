import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import { alpha, useTheme } from "@mui/material/styles"
import { ApexOptions } from "apexcharts"
import ReactApexcharts from "react-apexcharts"

const series = [
  {
    name: "Applications Sent",
    data: [150, 90, 130, 95, 75, 110],
  },
  {
    name: "Accepted Offers",
    data: [110, 72, 62, 65, 45, 75],
  },
]

const Preformance = () => {
  // Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    legend: {
      markers: { offsetX: -2 },
      itemMargin: { horizontal: 10 },
      labels: { colors: theme.palette.text.secondary },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: theme.palette.divider,
          connectorColors: theme.palette.divider,
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${Math.abs(val)}`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: [theme.palette.warning.main, theme.palette.primary.main],
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    colors: [alpha(theme.palette.warning.main, 0.9), alpha(theme.palette.primary.main, 0.9)],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    markers: { size: 0 },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "14px",
          colors: [
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
          ],
        },
      },
    },
    yaxis: { show: false },
    grid: { show: false },
  }

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
        <CardHeader
          title="Performance"
          sx={{ mt: "-16px" }}
          subheader="22% Improvement Since Last Month"
        />
        <ReactApexcharts type="radar" height={300} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default Preformance
