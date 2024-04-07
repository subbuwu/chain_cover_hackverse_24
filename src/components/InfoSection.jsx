import React from 'react'
import {MeteorCard} from "./MeteorCard.jsx"
const InfoSection = () => {
  return (
    <section className='text-white px-10 sm:mt-40 mt-28 gap-4 items-center justify-center flex sm:flex-row flex-col'>
        <MeteorCard title="Future-Proof Insurance: Transparent & Secure" desc= "Explore our innovative insurance platform for peace of mind. Backed by blockchain, it's insurance reimagined."/>
        <MeteorCard title="Trust in Tomorrow: Insurance Reinvented" desc= "Step into the future of insurance with our revolutionary platform. It's insurance you can rely on."/>
    </section>
  )
}

export default InfoSection