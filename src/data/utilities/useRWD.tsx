import React, { useState, useEffect } from 'react'

export const useRWD = (userDevice = "mobile") => {
  const [device, setDevice] = useState(userDevice);

  const handleRWD = () => {
    if (window.innerWidth > 768)
      setDevice("desktop");
    else if (window.innerWidth > 576)
      setDevice("tablet");
    else
      setDevice("mobile");
  }
  useEffect(() => {
    window.addEventListener('resize', handleRWD);
    handleRWD();

    return (() => {
      window.removeEventListener('resize', handleRWD);
    })
  }, []);

  return device;
}