import { alpha } from "@mui/material"
import Grid from "@mui/material/Grid"
import CardStatsVertical from "components/CardStatsVertical"
import ApplicantRefferal from "components/views/dashboard/ApplicantRefferal"
import ApplicantsSnapshot from "components/views/dashboard/ApplicantsSnapshot"
import ApplicantStates from "components/views/dashboard/ApplicantStates"
import ApplicationVisits from "components/views/dashboard/ApplicationVisits"
import Preformance from "components/views/dashboard/Preformance"
import Icon from "ui/components/Icon"
import ApexChartWrapper from "../../../styles/ApexChartWrapper"

const DashboardDefault = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={2} className="match-height">
        <Grid item xs={6} md={2} xl={2}>
          <CardStatsVertical
            stats="1,231"
            bgColor={alpha("#666CFF", 0.25)}
            color="#666CFF"
            trendNumber="-22%"
            trend="negative"
            title="Total Applicants"
            chipText="Last Month"
            icon={<Icon icon="ShareOutlined" />}
          />
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
          <CardStatsVertical
            stats="3,812"
            bgColor={alpha("#ffdb66", 0.25)}
            color="#ffdb66"
            trendNumber="+13%"
            trend="positive"
            title="Total Applications Sent"
            chipText="Last Month"
            icon={<Icon icon="ForwardToInboxOutlined" />}
          />
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
          <CardStatsVertical
            stats="563"
            bgColor={alpha("#66ffab", 0.25)}
            color="#66ffab"
            trendNumber="+12%"
            trend="positive"
            title="Total Accepted Offers"
            chipText="Last Month"
            icon={<Icon icon="InventoryOutlined" />}
          />
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
          <CardStatsVertical
            stats="3,249"
            bgColor={alpha("#fa66ff", 0.25)}
            color="#fa66ff"
            trendNumber="+17%"
            trend="positive"
            title="No Response Or Rejected"
            chipText="Last Month"
            icon={<Icon icon="SmsFailedOutlined" />}
          />
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <ApplicationVisits />
        </Grid>
        <Grid item xs={12} md={8} xl={8}>
          <ApplicantsSnapshot />
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <Preformance />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <ApplicantStates />
        </Grid>
        <Grid item xs={12} md={6} xl={8}>
          <ApplicantRefferal />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default DashboardDefault
