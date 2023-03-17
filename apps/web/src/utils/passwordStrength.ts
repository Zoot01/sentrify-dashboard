const hasNumber = (number: string) => new RegExp(/[0-9]/).test(number)

const hasMixed = (number: string) =>
  new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number)

const hasSpecial = (number: string) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number)

export const strengthColor = (count: number) => {
  if (count < 2) return { label: "Poor", color: "#f44336" }
  if (count < 3) return { label: "Weak", color: "#ff9800" }
  if (count < 4) return { label: "Normal", color: "#ffc107" }
  if (count < 5) return { label: "Good", color: "#2e7d32" }
  if (count < 6) return { label: "Strong", color: "#4caf50" }
  return { label: "Poor", color: "#f44336" }
}

export const strengthIndicator = (number: string) => {
  let strengths = 0
  if (number.length > 5) strengths += 1
  if (number.length > 7) strengths += 1
  if (hasNumber(number)) strengths += 1
  if (hasSpecial(number)) strengths += 1
  if (hasMixed(number)) strengths += 1
  return strengths
}
