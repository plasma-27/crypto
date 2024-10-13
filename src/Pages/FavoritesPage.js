import React from 'react';
import { useFavorites } from '../FavoritesContext';
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar,
  Avatar,
  Typography, 
  makeStyles,
  Container,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh',
    paddingTop: theme.spacing(7),
  },
  listItem: {
    borderBottom: '1px solid #2d2d2d',
    '&:hover': {
      backgroundColor: '#131111',
    },
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
  coinInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  coinName: {
    fontWeight: 'bold',
    color: 'gold',
  },
  coinSymbol: {
    color: 'darkgray',
  },
  marketData: {
    textAlign: 'right',
  },
  currentPrice: {
    color: '#00ff00',
    fontWeight: 'bold',
  },
}));

const FavoritesPage = () => {
  const classes = useStyles();
  const { favorites } = useFavorites();
  const history = useHistory();
  const { currency } = CryptoState();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom align="center" style={{ color: 'gold' }}>
        My Favorites
      </Typography>
      <List>
        {favorites.length === 0 ? (
          <Typography variant="h6" align="center" style={{ color: 'darkgray' }}>
            No favorites added yet.
          </Typography>
        ) : (
          favorites.map((coin) => (
            <ListItem
              button
              key={coin.id}
              onClick={() => history.push(`/coins/${coin.id}`)}
              className={classes.listItem}
            >
              <Grid container alignItems="center">
                <Grid item xs={12} sm={6} container alignItems="center">
                  <ListItemAvatar>
                    <Avatar src={coin.image} alt={coin.name} className={classes.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="h6" className={classes.coinName}>{coin.name}</Typography>}
                    secondary={<Typography variant="body2" className={classes.coinSymbol}>{coin.symbol.toUpperCase()}</Typography>}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.marketData}>
                  <Typography variant="body1" className={classes.currentPrice}>
                     {formatCurrency(coin.current_price)}
                  </Typography>
                  <Typography variant="body2" style={{ color: 'darkgray' }}>
                    Market Cap: {formatCurrency(coin.market_cap)}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default FavoritesPage;