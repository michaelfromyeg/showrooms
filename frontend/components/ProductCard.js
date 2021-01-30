import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify'

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});


const ProductCard = ({ productSku, isUser }) => {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`https://www.bestbuy.ca/api/v2/json/product/${productSku}?currentRegion=ON&include=all&lang=en-CA`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const trimDescription = (desc) => {
    if (!desc) return
    return desc.length > 100 ? desc.substring(0, 100) + '...' : desc
  }

  const handleCopy = (e, link) => {
    e.preventDefault();
    navigator.clipboard.writeText(link).then(function () {
      console.log('Async: Copying to clipboard was successful!');
      toast.success('🔗 Link copied!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Card className={classes.root}>
        <CardMedia
          component="img"
          alt={items.name}
          height={300}
          image={items.highResImage ? items.highResImage : items.thumbnailImage}
          title={items.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {items.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {trimDescription(items.shortDescription)}
          </Typography>
        </CardContent>
        <CardActions>
          {isUser &&
            <Button onClick={(e) => handleCopy(e, items.productUrl)} variant="contained" size="medium" color="primary">
              Copy link
            </Button>
          }
          <Button variant="contained" size="medium" color="secondary">
            <a style={{ color: 'inherit' }} rel="noopener noreferrer" href={items.productUrl} target="_blank">
              Go To Product
            </a>
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default ProductCard
