import { useEffect, useState } from "react";

export function LocationDisplay() {
  // [position.coords.longitude, position.coords.latitude]
  const [location, setLocation] = useState('')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLocation([position.coords.longitude, position.coords.latitude]);
        },
        function (error) {
          console.log(error);
        }
      );
    } else {
      alert("Your browser does not support geolocation");
    }
  }, [])

  return (
    <>
      <h1>LocationDisplay</h1>
      <h2>{location}</h2>
    </>
  )
}
