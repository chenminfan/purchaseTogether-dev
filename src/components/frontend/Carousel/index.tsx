import React from 'react'

type Props = {
  children: string | JSX.Element | JSX.Element[],
  carouselName: string,
  carouselPre?: boolean,
  carouselNext?: boolean,
}

export default function Carousel(Props: Props) {
  const { children, carouselName, carouselPre = true, carouselNext = true } = Props
  return (
    <div id={carouselName} className="carousel rounded slide" data-bs-ride="carousel" data-bs-touch="true">
      {children}
      {carouselPre && <button className="carousel-control-prev" role="button" aria-label="carousel-button" type="button" data-bs-target={`#${carouselName}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>}
      {carouselNext && <button className="carousel-control-next" role="button" aria-label="carousel-button" type="button" data-bs-target={`#${carouselName}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>}
    </div>
  )
}