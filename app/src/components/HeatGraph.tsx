import React from 'react'

interface GraphHeatColumnProps {
  strength: 'strong' | 'medium' | 'weak'
  rotation: number
}

const GraphHeatColumn = (props: GraphHeatColumnProps) => {
  const { strength = 'strong', rotation = 0 } = props
  const profiles = {
    strong: {
      height: '60%',
      width: '30%',
      color: '#02D496',
      left: '34%',
      top: '-10%',
      zIndex: 5,
      animation: 'animate-grow',
    },
    medium: {
      height: '45%',
      width: '30%',
      color: '#FFBA62',
      left: '34%',
      top: '5%',
      zIndex: 4,
      animation: 'animate-growFast',
    },
    weak: {
      height: '35%',
      width: '30%',
      color: '#EF3131',
      left: '34%',
      top: '15%',
      zIndex: 3,
      animation: 'animate-growFaster',
    },
  }

  const profile = profiles[strength]

  if (profile === undefined) {
    return 'Bad Profile'
  }
  return (
    <svg
      className={`absolute origin-bottom ${profile.animation}`}
      style={{
        left: profile.left,
        top: profile.top,
        transform: `rotate(${rotation}deg) translateY(10%)`,
        transformOrigin: 'bottom',
        zIndex: profile.zIndex,
        animationFillMode: 'both',
        // animationDelay: `${Math.random() * 0.5}s`,
      }}
      xmlns="http://www.w3.org/2000/svg"
      width={profile.width}
      height={profile.height}
      viewBox="0 0 132 224"
      fill="none"
      preserveAspectRatio="none"
    >
      <g filter="url(#filter0_f_429_2355)">
        <path
          d="M99 53.993C99 97.6235 96.9999 191 66.4999 191C35.9999 191 33 97.6235 33 53.993C33 33 37.4999 33 62 33C86.5001 33 99 33 99 53.993Z"
          fill={profile.color}
        />
      </g>
      <defs>
        <filter
          id="filter0_f_429_2355"
          x="0"
          y="0"
          width="132"
          height="224"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="16.5"
            result="effect1_foregroundBlur_429_2355"
          />
        </filter>
      </defs>
    </svg>
  )
}

interface HeatGraphProps {
  labels?: string[]
  data?: number[]
}

export default function HeatGraph(props: HeatGraphProps) {
  const { labels = [], data = [] } = props

  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  // Re-render the component when the window is resized and when the component is mounted
  React.useEffect(() => {
    window.addEventListener('resize', () => {
      const width = document.getElementById('heatmap-bounds')?.offsetWidth
      window.requestAnimationFrame(() => {
        if (width) {
          setDimensions({ width: width, height: width })
        }
      })
    })

    const width = document.getElementById('heatmap-bounds')?.offsetWidth
    if (width) {
      setDimensions({ width: width, height: width })
    }
  }, [dimensions.width, dimensions.height])

  const getLabelColour = (labelIndex: number) => {
    if (data[labelIndex] === 0) return 'transparent'
    return data[labelIndex] < 2
      ? '#02D496'
      : data[labelIndex] < 4
        ? '#FFBA62'
        : '#EF3131'
  }

  return (
    <>
      <div id="heatmap-bounds" className="relative my-5 w-full pb-[100%]">
        <div className="absolute h-full w-full">
          {data.map((value, index) => {
            const angle = (index * 360) / data.length
            const valueToStrength = (value: number) => {
              if (value < 2) {
                return 'strong'
              }
              if (value < 4) {
                return 'medium'
              }
              return 'weak'
            }
            if (value === 0) {
              return null
            }
            return (
              <GraphHeatColumn
                key={`data-${index}`}
                strength={valueToStrength(value)}
                rotation={angle}
              />
            )
          })}
          <div className="pointer-events-none absolute left-[2.5%] top-[2.5%] h-[95%] w-[95%] rounded-full border border-dashed border-neutral-dark" />
          <div className="pointer-events-none absolute left-[20%] top-[20%] h-[60%] w-[60%] rounded-full border border-dashed border-neutral-dark" />
          <div className="pointer-events-none absolute left-[35%] top-[35%] h-[30%] w-[30%] rounded-full border border-dashed border-neutral-dark" />
          {labels.map((label, index) => {
            // Get Width and Height of the Circle
            // Get the radius of the circle
            const radius =
              (document.getElementById('heatmap-bounds')?.offsetWidth || 100) /
              2
            // Get the angle of the label
            const angle = (index * 360) / labels.length
            // Get the x and y coordinates for the label
            // ensure the the first label is at the top of the circle
            const x = radius * Math.sin((angle * Math.PI) / 180)
            const y = radius * Math.cos((angle * Math.PI) / 180)

            return (
              <p
                key={index}
                className="pointer-events-none absolute flex h-full w-full items-center justify-center text-center"
                style={{
                  transform: `translate(${x}px,${-y}px)`,
                  zIndex: 6,
                }}
              >
                <span
                  className="rounded-full px-1.5 py-1 text-body-s"
                  style={{
                    backgroundColor: getLabelColour(index),
                    color: '#262644',
                  }}
                >
                  {label}
                </span>
              </p>
            )
          })}
        </div>
      </div>
    </>
  )
}
