import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import IconButton from "@mui/material/IconButton"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/system"
import { isAxiosError } from "axios"
import ButtonScale from "components/animations/ButtonScale"
import ReactRouterLink from "components/shared/ReactRouterLink"
import instance from "config/axios"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RegisterAPI } from "types"
import Icon from "ui/components/Icon"
import { strengthColor, strengthIndicator } from "utils/passwordStrength"
import * as yup from "yup"

interface FormInputs {
  first_name: string
  last_name: string
  email: string
  password: string
}

const defaultValues: FormInputs = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
}

const schema = yup.object().shape({
  first_name: yup.string().required().label("First name"),
  last_name: yup.string().required().label("Last name"),
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().min(6).label("Password"),
})

const Register = () => {
  // Hooks
  const theme = useTheme()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues, mode: "onChange", resolver: yupResolver(schema) })
  // State
  const [strength, setStrength] = useState(0)
  const [level, setLevel] = useState<{ label: string; color: string } | null>()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // Functions
  const changePassword = (value: string) => {
    const temp = strengthIndicator(value)
    setStrength(temp)
    setLevel(strengthColor(temp))
  }

  const onSubmit = handleSubmit(async (payload, e) => {
    e?.preventDefault()
    try {
      const { data } = await instance.post<RegisterAPI.RegisterResponse>("/auth/register", payload)
      return toast.success(data.message)
    } catch (err) {
      if (isAxiosError<string>(err) && err.response) {
        return toast.error(err.response.data)
      } else return
    }
  })

  useEffect(() => {
    changePassword("123456")
  }, [])

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
          Register
        </Typography>

        <form id="register-form" onSubmit={onSubmit}>
          <Stack gap={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Typography sx={{ mb: "6px" }}>First Name</Typography>
                  <Controller
                    name="first_name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="John"
                        value={value}
                        onChange={onChange}
                        id="register-first_name"
                        error={Boolean(errors.first_name)}
                      />
                    )}
                  />
                  {errors.first_name && (
                    <Typography color="#EB0014" variant="caption" sx={{ mt: 1 }}>
                      {errors.first_name.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Typography sx={{ mb: "6px" }}>Last Name</Typography>
                  <Controller
                    name="last_name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Smith"
                        value={value}
                        onChange={onChange}
                        id="register-last_name"
                        error={Boolean(errors.last_name)}
                      />
                    )}
                  />
                  {errors.last_name && (
                    <Typography color="#EB0014" variant="caption" sx={{ mt: 1 }}>
                      {errors.last_name.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
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
                    id="register-email"
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

            <FormControl>
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
                    id="register-password"
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

            {strength !== 0 && (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  mt: 2,
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
            <ButtonScale>
              <Button
                type="submit"
                aria-label="submit-form"
                fullWidth
                variant="contained"
                sx={{
                  boxShadow: "none",
                  fontWeight: 600,
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                Register
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
          aria-label="register-with-google"
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
          Register with Google
        </Button>

        <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
          <Typography fontSize={14}>Already have an account?</Typography>

          <ReactRouterLink
            href={"/auth/login"}
            style={{ color: theme.palette.primary.main, textDecoration: "none", fontSize: "14px" }}
          >
            Login now
          </ReactRouterLink>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Register
