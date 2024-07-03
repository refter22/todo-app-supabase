import React from 'react'

interface UnarchiveIconProps {
  className?: string
}

const UnarchiveIcon: React.FC<UnarchiveIconProps> = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <polyline points='21 8 21 21 3 21 3 8' />
      <rect x='1' y='3' width='22' height='5' />
      <line x1='10' y1='12' x2='14' y2='12' />
      <line x1='12' y1='10' x2='12' y2='14' />
    </svg>
  )
}

export default UnarchiveIcon
