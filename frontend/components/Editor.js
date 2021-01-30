import React, { useEffect, useState } from 'react'
import * as PhotoSphereViewer from 'photo-sphere-viewer'
import MarkersPlugin from 'photo-sphere-viewer/dist/plugins/markers';
import Skeleton from '@material-ui/lab/Skeleton'
import ReactDOMServer from 'react-dom/server';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import axios from 'axios'



function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Editor = () => {
  const classes = useStyles();
  const id = '6015bd33cb2ed4904122ed7f'
  const [setup, setSetup] = useState()
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [brand, setBrand] = useState("")
  const [productName, setProductName] = useState("")
  const [fail, setFail] = useState(false)

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [cloud, setCloud] = useState([])
  const { email } = useAuthUser()

  
  const handleOpen = () => {
    setOpen(true);
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const addProducts = () => {
    setOpen(false)
    fetch(`https://www.bestbuy.ca/api/v2/json/search?categoryid=&currentRegion=ON&include=facets%2C%20redirects&lang=en-CA&page=1&pageSize=8&path=&query=${productName}%20laptop&exp=&sortBy=relevance&sortDir=desc`)
      .then(res => res.json())
      .then((result) => {
        if (result.products.length < 1){
          setFail(true)
          return
        }
        console.log(x, y)
        // ...productName ...brand
        return axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/setup/${id}/products`, {
            products: {"description": result.products[0].name, "location":[x,y], "sku": result.products[0].sku},
        }, {headers:{
          'Content-Type': 'application/json' }
      }).then((result )=> {
        setSetup(result.data)
      })
        console.log(result.products)
        
      })
  }

  
  useEffect(() => {
    if (id)
      fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/setup/' + id)
        .then((response) => response.json())
        .then((data) => {
          setSetup(data)
          setCloud(data[0]) // FIX IF BREAKS
        })
      
  }, [id])

  console.log(setup)

  const sphereElementRef = React.createRef()
  useEffect(() => {
    if (!setup) return
    const spherePlayerInstance = new PhotoSphereViewer.Viewer({
      plugins: [
        [MarkersPlugin, {
          markers: [
            // {
            //   // circle marker
            //   id: 'circle',
            //   circle: 200,
            //   x: 0,
            //   y: 0,
            //   tooltip: 'Bestbuy Product'
            // }
          ]
        }]
      ],
      container: sphereElementRef.current,
      panorama: `${process.env.NEXT_PUBLIC_BACKEND_URL}/setup/${id}/image`,
    })

    let markersPlugin = spherePlayerInstance.getPlugin(MarkersPlugin)
    
    spherePlayerInstance.on('click', function (e, data) {
      console.log(e, data)
      if (!data.rightclick) {
        let markersPlugin = spherePlayerInstance.getPlugin(MarkersPlugin)

        markersPlugin.addMarker({
          id: '#' + Math.random(),
          longitude: data.longitude,
          latitude: data.latitude,
          width: 32,
          height: 32,
          anchor: 'bottom center',
          tooltip: 'Product',
          circle: 20,
          // image: 'https://photo-sphere-viewer.js.org/assets/pin-red.png',
          data: {
            generated: true,
          }
        })
        setOpen(true)
        setX(data.textureX)
        setY(data.textureY)
      }
    })

    markersPlugin.on('select-marker', function(e, marker, data) {
      if (marker.data && marker.data.generated) {
        if (data.dblclick) {
          // console.log(marker)
          // setOpen(true)
          // setX(marker.config.latitude)
          // setY(marker.config.longitude)
        } else if (data.rightclick) {
          markersPlugin.removeMarker(marker);
        } else {
          // left click
        }
      }
    });

    // unmount component instructions
    return () => {
      spherePlayerInstance.destroy()
    }
  }, [setup])

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Product To Showroom</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
           Please enter some shit
          </DialogContentText> */}
          <TextField
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="brand"
            label="Product Brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addProducts} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {setup?.img ? (
        <div style={{ width: '100%', height: 400 }} ref={sphereElementRef} />
      ) : (
        <>
          <Skeleton variant="text" height={40} />
          <Skeleton variant="rect" height={400} />
        </>
      )}
      <div>
        <h3>Our machine learning model detected the following items. Please double click on the image to add in your products</h3>
          {setup ? setup.products[0].map((setup) => 
          <li>{setup.description}</li> ) : "Detecting...." }
        </div>
      <div>
        <h3>The following items have been added</h3>
        {setup ? setup.products[1].map((setup) => 
          <li>{setup.description}</li> ) : "Waiting for products to be added" }
      </div>
    </div>
  )
}

export default withAuthUser()(Editor)
