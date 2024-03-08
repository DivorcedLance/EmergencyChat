import React from 'react'
import solubiIMG from '../../assets/solubiIMG.svg'
import "bootstrap/dist/css/bootstrap.min.css";

export default function Solubi() {
  return (
    <div className="w-75 position-absolute top-50 start-50 translate-middle">
        <img src={solubiIMG} className="img-fluid" alt="..."></img>
    </div>
  )
}
