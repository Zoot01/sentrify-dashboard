import axios, { AxiosError } from "axios"

const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error)
}

export default isAxiosError
