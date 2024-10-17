import React from 'react'

type Props = {
    params:{
        locality:string
    }
}

export default function page({params}: Props) {
  return (
    <div>{params.locality}</div>
  )
}