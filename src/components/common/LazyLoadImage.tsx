import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

type LazyLoadImgType = {
  className: string,
  alt: string,
  src: string,
  width?: number,
  height?: number,
}
const LazyLoadImg = (props: LazyLoadImgType) => {
  const { alt, src, width = 800, height = 500, className, } = props
  return (
    <LazyLoadImage
      alt={alt}
      src={src} // use normal <img> attributes as props
      className={className}
      placeholdersrc="https://plus.unsplash.com/premium_photo-1707931342773-6eb567d4fd21?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JleXxlbnwwfHwwfHx8MA%3D%3D"
      effect="blur"
      visibleByDefault={src === 'https://plus.unsplash.com/premium_photo-1707931342773-6eb567d4fd21?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JleXxlbnwwfHwwfHx8MA%3D%3D'}
    />
  )
}

export default LazyLoadImg
