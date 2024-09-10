'use client'
import { FC } from 'react'
import { cn } from '../../../utils/cn'

export const IconThought: FC<React.SVGProps<SVGSVGElement>> = ({
  className,
}) => (
  <i className={cn('inline-block h-[1em] w-[1em] align-middle', className)}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      <path
        d="M9.31334 15.3622C7.64392 15.3375 6.56793 14.2782 6.56793 12.8135C6.56793 11.5855 7.39853 10.6285 8.55121 10.3067C8.74615 8.02851 10.6108 6.25 12.8653 6.25C14.6282 6.25 16.0266 7.20701 16.781 8.75684C18.849 8.73143 20.4 10.1373 20.4 12.0343C20.4 13.906 18.8999 15.3627 16.9759 15.3627H11.6957C11.6972 15.3872 11.6979 15.4119 11.6979 15.4368C11.6979 16.0959 11.1636 16.6302 10.5045 16.6302C9.84537 16.6302 9.31105 16.0959 9.31105 15.4368C9.31105 15.4117 9.31182 15.3869 9.31334 15.3622Z"
        fill="currentColor"
      />
      <path
        d="M10.5046 18.1219C10.5046 18.6162 10.1039 19.017 9.60952 19.017C9.11517 19.017 8.71443 18.6162 8.71443 18.1219C8.71443 17.6275 9.11517 17.2268 9.60952 17.2268C10.1039 17.2268 10.5046 17.6275 10.5046 18.1219Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4185 24.9999C20.2611 24.9999 25.9233 19.342 25.9233 12.5047C25.9233 5.67688 20.2516 0.019043 13.4089 0.019043C6.57592 0.019043 0.92334 5.67688 0.92334 12.5047C0.92334 19.342 6.58552 24.9999 13.4185 24.9999ZM24.9233 12.5047C24.9233 18.789 19.7095 23.9999 13.4185 23.9999C7.13758 23.9999 1.92334 18.7895 1.92334 12.5047C1.92334 6.22889 7.12848 1.01904 13.4089 1.01904C19.7015 1.01904 24.9233 6.23138 24.9233 12.5047Z"
        fill="currentColor"
      />
    </svg>
  </i>
)
