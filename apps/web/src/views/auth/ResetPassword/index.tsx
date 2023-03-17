import { yupResolver } from "@hookform/resolvers/yup"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import ButtonScale from "components/animations/ButtonScale"
import instance from "config/axios"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useNavigate, useSearchParams } from "react-router-dom"
import isAxiosError from "services/api/axiosError"
import { ResetPasswordAPI } from "types"
import Icon from "ui/components/Icon"
import { strengthColor, strengthIndicator } from "utils/passwordStrength"
import * as yup from "yup"

interface FormInputs {
  password: string
  confirmPassword: string
}

const defaultValues: FormInputs = {
  password: "",
  confirmPassword: "",
}

const schema = yup.object().shape({
  password: yup.string().required().min(6).label("Password"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
})

const ResetPassword = () => {
  // Hooks
  const theme = useTheme()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues, mode: "onChange", resolver: yupResolver(schema) })
  // State
  const link = searchParams.get("link")
  const [strength, setStrength] = useState(0)
  const [level, setLevel] = useState<{ label: string; color: string } | null>(null)
  const [showPassword, setShowPassword] = useState<{ password: boolean; confrimPassword: boolean }>(
    {
      password: false,
      confrimPassword: false,
    },
  )

  // Functions

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value)
    setStrength(temp)
    setLevel(strengthColor(temp))
  }

  const onSubmit = handleSubmit(async (payload, e) => {
    e?.preventDefault()
    try {
      const { data } = await instance.patch<ResetPasswordAPI.ResetPasswordResponse>(
        "/auth/resetpassword",
        {
          link: link,
          password: payload.confirmPassword,
        },
      )
      navigate("/auth/login", { replace: true })
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
          <Typography variant="h6">Password Reset</Typography>
          <Typography variant="body1">Please enter your new password.</Typography>
        </Stack>
        <form id="reset-password" onSubmit={onSubmit}>
          <FormControl fullWidth>
            <Typography fontWeight={500} sx={{ mb: "6px" }}>
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  value={value}
                  onChange={(e) => {
                    changePassword(e.target.value)
                    onChange(e.target.value)
                  }}
                  autoComplete="on"
                  id="reset-password-field"
                  type={showPassword.password ? "text" : "password"}
                  error={Boolean(errors.password)}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setShowPassword({ ...showPassword, password: !showPassword.password })
                        }
                      >
                        <Icon icon={showPassword.password ? "Visibility" : "VisibilityOff"} />
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
            {errors.password && (
              <Typography color="#EB0014" variant="caption" sx={{ mt: 1 }}>
                {errors.password.message}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Typography fontWeight={500} sx={{ mb: "6px" }}>
              Confirm Password
            </Typography>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  value={value}
                  onChange={onChange}
                  autoComplete="on"
                  id="register-confirm-password-field"
                  type={showPassword.confrimPassword ? "text" : "password"}
                  error={Boolean(errors.confirmPassword)}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            confrimPassword: !showPassword.confrimPassword,
                          })
                        }
                      >
                        <Icon
                          icon={showPassword.confrimPassword ? "Visibility" : "VisibilityOff"}
                        />
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
            {errors.confirmPassword && (
              <Typography color="#EB0014" variant="caption" sx={{ mt: 1 }}>
                {errors.confirmPassword.message}
              </Typography>
            )}
          </FormControl>
          {strength !== 0 && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                mt: 1,
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box
                    style={{ backgroundColor: level?.color }}
                    sx={{ width: 100, height: 10, borderRadius: "2px" }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    fontWeight={600}
                    textTransform="uppercase"
                    variant="subtitle1"
                    fontSize="0.75rem"
                    letterSpacing={1.7}
                  >
                    {level?.label}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          )}
        </form>
        <ButtonScale>
          <Button
            form="reset-password"
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
            Reset Password
          </Button>
        </ButtonScale>
      </Stack>
    </Stack>
  )
}

export default ResetPassword
