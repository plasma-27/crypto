import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Favorite } from '@material-ui/icons';
import { CryptoState } from '../CryptoContext';
import { IconButton } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  loginButton: {
    marginLeft: '60px', // Add margin to the left of the button
    color: 'white',
    textTransform: 'none',
    fontWeight: 'bold',
  },
  username: {
    marginLeft: '60px', // Add margin to the left of the username
    color: 'white',
    fontWeight: 'bold',
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
});

function Header() {
  const classes = useStyles();
  const { currency, setCurrency } = CryptoState();
  const history = useHistory();
  
  // Use Auth0 hook
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push(`/`)}
              variant="h6"
              className={classes.title}
            >
              Crypto Hunter
            </Typography>
            {isAuthenticated && (
          <IconButton color="inherit" onClick={() => history.push('/favorites')}>
            <Favorite />
          </IconButton>
             )}
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>

            {/* Conditional rendering based on authentication status */}
            {isAuthenticated ? (
              <>
                <Typography className={classes.username}>
                  {user.nickname || user.name || 'User'} {/* Display the username or fallback to name */}
                </Typography>
                <Button
                  className={classes.loginButton}
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  LOGOUT
                </Button>
              </>
            ) : (
              <Button
                className={classes.loginButton}
                onClick={() => loginWithRedirect()}
              >
                LOGIN
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
