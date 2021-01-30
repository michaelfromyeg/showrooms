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
    fetch(`https://www.bestbuy.ca/api/v2/json/product/13494101`)
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
  
    
    return (
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Liang Liu"
          height="140"
          image="https://www.vmcdn.ca/f/files/glaciermedia/import/lmp-all/1400501-28scholarship-web2.jpg;w=960"
          title="Liang Liu"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {
        isUser ?          
        <Button size="small" color="primary">
          Add to Cart
      </Button>:
        <Button size="small" color="primary">
          Go To Product
        </Button>
        }
      </CardActions>
    </Card>
    )
      // if (error) {
      //     return <div>Error: {error.message}</div>;
      //   } else if (!isLoaded) {
      //     return <div>Loading...</div>;
      //   } else {
      //     return (
      //       <p> ur gay </p>
      //     )
      // }
      
}

export default ProductCard
