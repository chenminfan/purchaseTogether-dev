import React from 'react'

type Props = {
  children: string | JSX.Element | JSX.Element[],
  carouselName: string,
}

export default function Carousel(Props: Props) {
  const { children, carouselName } = Props
  return (
    <div id={carouselName} className="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
      {children}
      <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselName}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={`#${carouselName}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}