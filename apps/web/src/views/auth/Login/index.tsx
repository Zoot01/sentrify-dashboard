import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import ButtonScale from "components/animations/ButtonScale"
import ReactRouterLink from "components/shared/ReactRouterLink"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginThunk } from "store/auth/authReducer"
import { AppDispatch } from "store/store"
import Icon from "ui/components/Icon"
import * as yup from "yup"

interface FormInputs {
  email: string
  password: string
}

const defaultValues: FormInputs = {
  email: "",
  password: "",
}

const schema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password"),
})

const Login = () => {
  // Hooks
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues, mode: "onChange", resolver: yupResolver(schema) })
  // State
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // Functions
  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault()
    try {
      const res = await dispatch(loginThunk(data)).unwrap()
      if (res.meta) {
        navigate("/", { replace: true })
        toast.success(res.message)
      }
    } catch (err) {
      const message = err as string
      toast.error(message)
    }
  })

  return (
    <Stack alignItems="center" flexGrow="1" height="100%" justifyContent="center">
      <Stack
        sx={{
          [theme.breakpoints.up("sm")]: {
            width: "480px",
          },
          transition: "width 300ms ease-in-out",
          background: theme.palette.background.paper,
          borderRadius: 2,
          width: "350px",
          px: "24px",
          py: "40px",
          gap: 3,
          ...(theme.palette.mode === "light" && {
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.palette.divider,
          }),
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Login
        </Typography>

        <form id="login-form" onSubmit={onSubmit}>
          <Stack>
            <FormControl>
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

            <FormControl
              sx={{
                mt: "20px",
              }}
            >
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
                    autoComplete="on"
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    value={value}
                    onChange={onChange}
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    error={Boolean(errors.password)}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          <Icon icon={showPassword ? "Visibility" : "VisibilityOff"} />
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

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                mb: 3,
              }}
            >
              <Stack direction="row" alignItems="center">
                <FormControlLabel control={<Checkbox disableRipple />} label="Remember me" />
              </Stack>
              <ReactRouterLink
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
                href="/auth/forgotpassword"
              >
                Forgot password?
              </ReactRouterLink>
            </Stack>

            <ButtonScale>
              <Button
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
                Login
              </Button>
            </ButtonScale>
          </Stack>
        </form>

        <Stack direction="row" justifyContent="center" alignItems="center">
          <Divider
            sx={{
              flexGrow: 1,
            }}
          />
          <Typography
            sx={{
              mx: 2,
            }}
            fontWeight={600}
          >
            OR
          </Typography>
          <Divider
            sx={{
              flexGrow: 1,
            }}
          />
        </Stack>
        <Button
          aria-label="login-with-google"
          fullWidth
          variant="outlined"
          sx={{
            boxShadow: "none",
            fontWeight: 600,
            "&:hover": {
              boxShadow: "none",
            },
          }}
          disabled
          startIcon={<Icon icon="Google" />}
        >
          Login with Google
        </Button>

        <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
          <Typography fontSize={14}>Don&apos;t have an account?</Typography>

          <ReactRouterLink
            href={"/auth/register"}
            style={{ color: theme.palette.primary.main, textDecoration: "none", fontSize: "14px" }}
          >
            Register now
          </ReactRouterLink>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Login
