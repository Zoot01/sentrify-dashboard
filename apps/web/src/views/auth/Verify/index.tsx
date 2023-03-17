import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Fade from "@mui/material/Fade"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import { styled, useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { AxiosError } from "axios"
import Cleave from "cleave.js/react"
import ButtonScale from "components/animations/ButtonScale"
import ReactRouterLink from "components/shared/ReactRouterLink"
import instance from "config/axios"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"

// Styled
const CleaveInput = styled(Cleave)(({ theme }) => ({
  width: 50,
  height: 50,
  textAlign: "center",
  fontSize: 25,
  background: "transparent",
  borderRadius: "8px",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
  "&:focus, &:focus-visible": {
    outline: 0,
    borderWidth: 2,
    padding: theme.spacing(2),
    borderColor: `${theme.palette.primary.main} !important`,
  },
}))

const defaultValues: { [key: string]: string } = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
}

const Verify = () => {
  // Hooks
  const theme = useTheme()
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange" })
  const { user_id } = useParams()
  // State
  const [success, setSuccess] = useState<boolean>(false)
  // Functions
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (...event: unknown[]) => void,
  ) => {
    onChange(e)
    const form = e.target.parentElement as HTMLFormElement
    const index = [...form].indexOf(e.target) as number
    const element = form[index] as HTMLInputElement
    const children = form.elements as HTMLCollectionOf<HTMLInputElement>
    if (element.value && element.value.length && index < [...form].length) {
      children[index + 1].focus()
    }
    e.preventDefault()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const target = e.target as HTMLInputElement
      const form = target.parentElement as HTMLFormElement
      const index = [...form].indexOf(target) as number
      const element = form[index] as HTMLInputElement
      const children = form.elements as HTMLCollectionOf<HTMLInputElement>
      if (index >= 1) {
        if (!(element.value && element.value.length)) {
          setValue(children[index].id, "")
          children[index - 1].focus()
        }
      }
    }
  }

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault()
    try {
      const res = await instance.patch("auth/verify", {
        id: user_id,
        verification_code: Object.values(data).join(""),
      })
      if (res.status === 200) {
        setSuccess(true)
      } else throw Error
    } catch (_err) {
      const err = _err as AxiosError<{ message: string }>
      toast.error(err.response?.data.message as string)
    }
  })

  // Render inputs
  const RenderInputs = () => {
    return Object.keys(defaultValues).map((i, index) => (
      <Controller
        key={index}
        name={i}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, name } }) => (
          <Box
            id={name}
            maxLength={1}
            value={value}
            autoFocus={index === 0}
            onChange={(e) => handleChange(e, onChange)}
            onKeyDown={handleKeyDown}
            component={CleaveInput}
            options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
            sx={{
              borderColor: errors[name] ? theme.palette.error.main : "",
              borderWidth: errors[name] ? "2px" : "",
            }}
          />
        )}
      />
    ))
  }

  return (
    <Stack alignItems="center" flexGrow="1" height="100%" justifyContent="center">
      <Stack
        sx={{
          background: theme.palette.background.paper,
          borderRadius: 1,
          p: 3,
          gap: 2,
          maxWidth: "450px",
          ...(theme.palette.mode === "light" && {
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.palette.divider,
          }),
        }}
      >
        {success && (
          <Fade in={success} timeout={500}>
            <Alert severity="success">
              Account was successfully verified, please click the link to login.{" "}
              <ReactRouterLink
                href="/auth/login"
                style={{
                  color: theme.palette.primary.main,
                }}
              >
                Login
              </ReactRouterLink>
            </Alert>
          </Fade>
        )}

        <Stack>
          <Typography variant="body1" fontSize={20}>
            Please verify your account
          </Typography>
          <Typography fontSize={14} sx={{ color: "text.secondary" }}>
            We sent a verification code to your email. Enter the code from your email in the field
            below.
          </Typography>
        </Stack>

        <form
          onSubmit={onSubmit}
          id="verify"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {RenderInputs()}
        </form>
        <ButtonScale>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              boxShadow: "none",
              fontWeight: 600,
              "&:hover": {
                boxShadow: "none",
              },
            }}
            form="verify"
          >
            Verify My Account
          </Button>
        </ButtonScale>

        <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
          <Typography sx={{ color: "text.secondary" }}>Didn&apos;t get the code?</Typography>
          <Link>Resend code</Link>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Verify
