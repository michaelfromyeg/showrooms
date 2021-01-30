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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={items.name}
          height="200"
          image={items.thumbnailImage}
          title={items.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {items.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {items.shortDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {
        isUser ?          
        <Button size="medium" color="green">
          <a href="https://www.bestbuy.ca/en-ca" target="_blank">
          Add to Cart
          </a>
      </Button>:
        <Button size="medium" color="primary">
          <a href={items.productUrl} target="_blank">
          Go To Product
          </a>
        </Button>
        }
      </CardActions>
    </Card>
    )        
}
}

export default ProductCard
