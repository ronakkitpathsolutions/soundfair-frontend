'use client'
import { FC } from 'react'
import { cn } from '../../../utils/cn'

export const IconFeeling: FC<React.SVGProps<SVGSVGElement>> = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4089 23.9809C19.6945 23.9809 24.9042 18.7701 24.9042 12.4952C24.9042 6.21112 19.6855 1 13.3994 1C7.12537 1 1.92334 6.20863 1.92334 12.4952C1.92334 18.7707 7.13348 23.9809 13.4089 23.9809ZM25.9042 12.4952C25.9042 19.3229 20.2463 24.9809 13.4089 24.9809C6.58118 24.9809 0.92334 19.3229 0.92334 12.4952C0.92334 5.65784 6.57159 0 13.3994 0C20.2368 0 25.9042 5.65784 25.9042 12.4952Z"
        fill="currentColor"
      />
      <path
        d="M10.3594 6.86618C11.7211 6.86618 12.7856 7.6621 13.4088 8.78408C14.0322 7.6621 15.1158 6.86618 16.4583 6.86618C18.5873 6.86618 20.1407 8.48681 20.1407 10.702C20.1407 14.1063 16.4392 17.1366 13.9938 18.7764C13.802 18.9106 13.5815 19.0545 13.4281 19.0545C13.2842 19.0545 13.0253 18.9106 12.8239 18.7764C10.3306 17.2037 6.677 14.1063 6.677 10.702C6.677 8.48681 8.23051 6.86618 10.3594 6.86618Z"
        fill="currentColor"
      />
    </svg>
  </i>
)
