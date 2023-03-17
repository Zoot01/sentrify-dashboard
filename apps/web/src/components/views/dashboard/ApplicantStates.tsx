import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import { useTheme } from "@mui/material/styles"
import { ApexOptions } from "apexcharts"
import ReactApexcharts from "react-apexcharts"
import { hexToRGBA } from "utils/hexToRGBA"

const series = [
  {
    name: "Applicants",
    data: [456, 356, 224, 200, 196],
  },
]

const ApplicantStates = () => {
  // Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: "60%",
        horizontal: true,
        distributed: true,
      },
    },
    dataLabels: {
      offsetY: 8,
      style: {
        fontWeight: 500,
        fontSize: "0.875rem",
      },
    },
    grid: {
      strokeDashArray: 8,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true },
      },
      yaxis: {
        lines: { show: false },
      },
      padding: {
        top: -18,
      },
    },
    colors: [
      hexToRGBA(theme.palette.primary.main, 0.9),
      hexToRGBA(theme.palette.success.main, 0.9),
      hexToRGBA(theme.palette.warning.main, 0.9),
      hexToRGBA(theme.palette.info.main, 0.9),
      hexToRGBA(theme.palette.error.main, 0.9),
    ],
    legend: { show: false },
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ["FL", "TX", "MD", "GA", "AZ"],
      labels: {
        formatter: (val) => `${Number(val)}`,
        style: {
          fontSize: "0.875rem",
          colors: theme.palette.text.disabled,
        },
      },
    },
    yaxis: {
      labels: {
        align: theme.direction === "rtl" ? "right" : "left",
        style: {
          fontWeight: 600,
          fontSize: "0.875rem",
          colors: theme.palette.text.primary,
        },
      },
    },
  }

  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <CardHeader title="Top Applicant States" subheader="Total Of 1,231 Applicants" />
        <ReactApexcharts type="bar" height={435} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default ApplicantStates
