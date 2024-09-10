import { FC } from 'react'

interface LineProps {
  className?: string
}

export const Line: FC<LineProps> = ({ className }) => (
  <svg
    width="3"
    height="60"
    viewBox="0 0 3 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      opacity="0.5"
      d="M1.5 1L1.5 59"
      stroke="#826E96"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="8 8"
    />
  </svg>
)
