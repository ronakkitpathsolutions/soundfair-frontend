'use client'
import { FC } from 'react'
import { cn } from '../../../utils/cn'

export const IconTrigger: FC<React.SVGProps<SVGSVGElement>> = ({
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
        d="M8.02494 12.9556C7.89059 13.1186 7.83301 13.2816 7.83301 13.4254C7.83301 13.7227 8.05374 13.9337 8.36084 13.9337H12.737L10.3954 20.234C10.0979 20.9916 10.9136 21.3943 11.4031 20.7902L18.476 11.9199C18.6008 11.7569 18.6679 11.5938 18.6679 11.45C18.6679 11.1527 18.4376 10.9417 18.1401 10.9417H13.7639L16.1055 4.64136C16.4031 3.88379 15.5873 3.48102 15.0978 4.08517L8.02494 12.9556Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4185 24.9999C20.2611 24.9999 25.9233 19.342 25.9233 12.5047C25.9233 5.67688 20.2516 0.019043 13.4089 0.019043C6.57592 0.019043 0.92334 5.67688 0.92334 12.5047C0.92334 19.342 6.58552 24.9999 13.4185 24.9999ZM24.9233 12.5047C24.9233 18.789 19.7095 23.9999 13.4185 23.9999C7.13758 23.9999 1.92334 18.7895 1.92334 12.5047C1.92334 6.22889 7.12848 1.01904 13.4089 1.01904C19.7015 1.01904 24.9233 6.23138 24.9233 12.5047Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.32135 12.9337H14.1756L12.2433 18.1324L17.1795 11.9417H12.3254L14.2576 6.74297L9.32135 12.9337ZM15.0978 4.08517C15.5873 3.48102 16.4031 3.88379 16.1055 4.64136L13.7639 10.9417H18.1401C18.4376 10.9417 18.6679 11.1527 18.6679 11.45C18.6679 11.5938 18.6008 11.7569 18.476 11.9199L11.4031 20.7902C10.9136 21.3943 10.0979 20.9916 10.3954 20.234L12.737 13.9337H8.36084C8.05374 13.9337 7.83301 13.7227 7.83301 13.4254C7.83301 13.2816 7.89059 13.1186 8.02494 12.9556L15.0978 4.08517ZM25.9233 12.5047C25.9233 19.342 20.2611 24.9999 13.4185 24.9999C6.58551 24.9999 0.92334 19.342 0.92334 12.5047C0.92334 5.67688 6.57593 0.019043 13.4089 0.019043C20.2516 0.019043 25.9233 5.67694 25.9233 12.5047ZM13.4185 23.9999C19.7095 23.9999 24.9233 18.789 24.9233 12.5047C24.9233 6.23138 19.7015 1.01904 13.4089 1.01904C7.12848 1.01904 1.92334 6.22889 1.92334 12.5047C1.92334 18.7895 7.13758 23.9999 13.4185 23.9999Z"
        fill="currentColor"
      />
    </svg>
  </i>
)