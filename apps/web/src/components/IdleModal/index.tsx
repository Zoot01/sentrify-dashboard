import { Button, Divider, Modal, Stack, styled, Typography } from "@mui/material"
import { Box } from "@mui/system"

// Styled
const StackStyled = styled(Stack)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  paddingTop: "8px",
  paddingBottom: "8px",
  borderRadius: 8,
}))

interface Props {
  open: boolean
  refreshSession: () => void
  handleLogout: () => void
}

const IdleModal = ({ open, refreshSession, handleLogout }: Props) => {
  return (
    <Modal open={open} aria-labelledby="idle-modal-title" aria-describedby="idle-modal-description">
      <StackStyled>
        <Box
          sx={{
            px: "16px",
            mb: "8px",
          }}
        >
          <Typography variant="h6">Session Timeout Alert</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            px: "16px",
            my: "8px",
          }}
        >
          <Typography variant="body1">
            Your session is about to timeout due to inactivity. Select &quot;Keep Working&quot; to
            extend your session.
          </Typography>
        </Box>
        <Divider />
        <Stack
          direction="row"
          justifyContent="flex-end"
          gap={1}
          sx={{
            mt: "8px",
            px: "16px",
          }}
        >
          <Button color="error" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
          <Button color="primary" variant="outlined" onClick={refreshSession}>
            Keep Working
          </Button>
        </Stack>
      </StackStyled>
    </Modal>
  )
}

export default IdleModal
