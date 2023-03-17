// ** MUI Imports
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import Avatar from "@mui/material/Avatar"
import Chip from "@mui/material/Chip"
import Icon from "ui/components/Icon"
import { ReactElement } from "react"
import { useTheme } from "@mui/material/styles"

interface Props {
  title: string
  stats: string
  icon: ReactElement
  chipText: string
  color?: string
  bgColor?: string
  trendNumber: string
  trend?: "positive" | "negative"
}

const CardStatsVertical = ({
  bgColor,
  chipText,
  icon,
  stats,
  title,
  trendNumber,
  color,
  trend,
}: Props) => {
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
        <Box
          sx={{
            mb: 1,
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: bgColor,
              color: color,
            }}
          >
            {icon}
          </Avatar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: trend === "positive" ? "success.main" : "error.main",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: trend === "positive" ? "success.main" : "error.main" }}
            >
              {trendNumber}
            </Typography>
            <Icon
              icon={trend === "positive" ? "KeyboardArrowUpOutlined" : "KeyboardArrowDownOutlined"}
              style={{
                fontSize: "1.25rem",
              }}
            />
          </Box>
        </Box>
        <Typography variant="h6">{stats}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Chip
          size="small"
          label={chipText}
          sx={{
            height: 20,
            fontWeight: 500,
            fontSize: "0.75rem",
            alignSelf: "flex-start",
            color: "text.secondary",
          }}
        />
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
