import React from 'react'
import Image from 'next/image'

export default function SidebarImg({src, alt, width, height}) {
  return (
    <div>
          <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className='object-contain'
          />
    </div>
  )
}
