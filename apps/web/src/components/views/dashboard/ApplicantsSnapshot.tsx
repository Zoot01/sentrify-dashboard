import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Grid from "@mui/material/Grid"
import { alpha, useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { ApexOptions } from "apexcharts"
import ButtonScale from "components/animations/ButtonScale"
import GhostButton from "components/mui/GhostButton"
import ReactApexcharts from "react-apexcharts"
import Icon from "ui/components/Icon"
import { hexToRGBA } from "utils/hexToRGBA"

const series = [
  {
    name: "Last Week",
    data: [10, 34, 24, 9, 4, 18, 22],
  },
  {
    name: "This Week",
    data: [-11, -40, -23, -14, -17, -35, -30],
  },
]

const ApplicantsSnapshot = () => {
  // Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      id: "snapshot-chart",
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        barHeight: "30%",
        horizontal: true,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${Math.abs(val)}`,
      },
    },
    xaxis: {
      position: "top",
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        formatter: (val) => `${Math.abs(Number(val))}`,
        style: { colors: theme.palette.text.disabled },
      },
    },
    yaxis: {
      labels: { show: false },
    },
    colors: [hexToRGBA(theme.palette.primary.main, 0.9), hexToRGBA(theme.palette.info.main, 0.9)],
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true },
      },
      yaxis: {
        lines: { show: false },
      },
      padding: {
        top: 5,
        bottom: -25,
      },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
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
        <Grid container>
          <Grid item xs={12} sm={7}>
            <CardHeader
              title="Applicants Snapshot"
              titleTypographyProps={{ sx: { letterSpacing: "0.15px" } }}
            />
            <CardContent>
              <ReactApexcharts type="bar" height={300} series={series} options={options} />
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={5}>
            <CardHeader
              title="Report"
              subheader="Last weeks applicants 89"
              subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
              titleTypographyProps={{ sx: { letterSpacing: "0.15px" } }}
            />
            <CardContent sx={{ pt: (theme) => `${theme.spacing(4)} !important` }}>
              <Grid container>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Avatar
                    sx={{ mb: 3, bgcolor: alpha("#66ffab", 0.25), color: "#66ffab" }}
                    variant="rounded"
                  >
                    <Icon icon="TrendingUpOutlined" />
                  </Avatar>
                  <Typography sx={{ mb: 0.5 }} variant="body2">
                    This Week
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>+13.45%</Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
                >
                  <Avatar
                    sx={{ mb: 3, bgcolor: alpha("#ff6b66", 0.25), color: "#ff6b66" }}
                    variant="rounded"
                  >
                    <Icon icon="TrendingDownOutlined" />
                  </Avatar>
                  <Typography sx={{ mb: 0.5 }} variant="body2">
                    Last Week
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>-8.86%</Typography>
                </Grid>
              </Grid>

              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    mb: 3,
                    mt: 5,
                  }}
                >
                  <Typography sx={{ mb: 0.5 }} variant="body2" textAlign="center">
                    Overall Performance
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>+27.85%</Typography>
                </Grid>
                <Grid item xs={12}>
                  <ButtonScale>
                    <GhostButton fullWidth endIcon={<Icon icon="SummarizeOutlined" />}>
                      View Report
                    </GhostButton>
                  </ButtonScale>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ApplicantsSnapshot
