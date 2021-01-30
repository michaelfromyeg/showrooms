import React, { useEffect, useState } from 'react'
import { Viewer, MarkersPlugin } from 'photo-sphere-viewer'
import Skeleton from '@material-ui/lab/Skeleton'

const Editor = () => {
  const id = '601551a4f596023973ce09dd'
  const [setup, setSetup] = useState()

  useEffect(() => {
    if (id)
      fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/setup/' + id)
        .then((response) => response.json())
        .then((data) => setSetup(data))
  }, [id])

  const sphereElementRef = React.createRef()

  useEffect(() => {
    if (!setup) return
    const spherePlayerInstance = new Viewer({
      container: sphereElementRef.current,
      panorama: `${process.env.NEXT_PUBLIC_BACKEND_URL}/setup/${id}/image`,
    })

    let markersPlugin = spherePlayerInstance.getPlugin(MarkersPlugin)

    spherePlayerInstance.on('click', function (e, data) {
      if (!data.rightclick) {
        console.log(data)
        markersPlugin.addMarker({
          id: '#' + Math.random(),
          longitude: data.longitude,
          latitude: data.latitude,
          image: 'https://photo-sphere-viewer.js.org/assets/pin-red.png',
          width: 32,
          height: 32,
          anchor: 'bottom center',
          tooltip: 'Generated pin',
          data: {
            generated: true,
          },
        })
      }
    })

    // unmount component instructions
    return () => {
      spherePlayerInstance.destroy()
    }
  }, [setup])

  useEffect(() => {
    if (!setup) return
    const spherePlayerInstance = new Viewer({
      container: sphereElementRef.current,
      panorama: `${process.env.NEXT_PUBLIC_BACKEND_URL}/setup/${id}/image`,
    })

    // unmount component instructions
    return () => {
      spherePlayerInstance.destroy()
    }
  }, [setup])

  return (
    <div>
      {setup?.img ? (
        <div style={{ width: '100%', height: 400 }} ref={sphereElementRef} />
      ) : (
        <>
          <Skeleton variant="text" height={40} />
          <Skeleton variant="rect" height={400} />
        </>
      )}
    </div>
  )
}

export default Editor
