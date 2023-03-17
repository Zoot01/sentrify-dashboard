import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import ButtonScale from "components/animations/ButtonScale"
import instance from "config/axios"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import isAxiosError from "services/api/axiosError"
import { ForgotPasswordAPI } from "types"
import * as yup from "yup"

interface FormInputs {
  email: string
}

const defaultValues: FormInputs = {
  email: "",
}

const schema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
})

const ForgotPassword = () => {
  // Hooks
  const theme = useTheme()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues, mode: "onChange", resolver: yupResolver(schema) })

  // Functions
  const onSubmit = handleSubmit(async (payload, e) => {
    e?.preventDefault()
    try {
      const { data } = await instance.patch<ForgotPasswordAPI.ForgotPasswordResponse>(
        "/auth/forgotpassword",
        payload,
      )
      return toast.success(data.message)
    } catch (err) {
      if (isAxiosError<string>(err) && err.response) {
        return toast.error(err.response.data)
      } else return
    }
  })

  return (
    <Stack alignItems="center" flexGrow="1" height="100%" justifyContent="center">
      <Stack
        sx={{
          [theme.breakpoints.up("sm")]: {
            width: "400px",
          },
          transition: "width 300ms ease-in-out",
          background: theme.palette.background.paper,
          borderRadius: 2,
          width: "300px",
          px: "24px",
          py: "20px",
          gap: 2,
          ...(theme.palette.mode === "light" && {
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.palette.divider,
          }),
        }}
      >
        <Stack>
          <Typography variant="h6">Forgot your password?</Typography>
          <Typography variant="body1" color="text.secondary">
            You&apos;ll get an email with a reset link.
          </Typography>
        </Stack>
        <form id="password-reset" onSubmit={onSubmit}>
          <FormControl fullWidth>
            <Typography sx={{ mb: "6px" }}>Email</Typography>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="email@email.com"
                  value={value}
                  onChange={onChange}
                  id="login-email"
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && (
              <Typography color="#EB0014" variant="caption" sx={{ mt: 1 }}>
                {errors.email.message}
              </Typography>
            )}
          </FormControl>
        </form>
        <ButtonScale>
          <Button
            form="password-reset"
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            sx={{
              boxShadow: "none",
              fontWeight: 600,
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            Request Password Reset
          </Button>
        </ButtonScale>
      </Stack>
    </Stack>
  )
}

export default ForgotPassword
