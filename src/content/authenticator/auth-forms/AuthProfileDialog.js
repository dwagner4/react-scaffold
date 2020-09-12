import React, { useState, useContext } from 'react';

import { GlobalContext } from '../../../contexts/GlobalContext';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


//  TODO load this from the server .
const dhsComponents = [
  { abbr: 'ICE', name: 'U.S. Customs and Immigration Enforcement' },
  { abbr: 'USCG', name: 'U.S. Coast Guard' },
  { abbr: 'TSA', name: 'Transportation Security Administration' },
  { abbr: 'PARM', name: ' Accountability and Risk Management' },
  { abbr: 'FEMA', name: 'Federal Emergency Management Agency' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 600,
    marginRight: 100,

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '95%',
    },
    backgroundColor: '#ffffff',
  },
  fields: {
    width: '100%',
  },
  login: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const AuthProfileDialog = (props) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [componentObj, setComponentObj] = useState('');
  const { state, dispatch } = useContext(GlobalContext);



  const handleInput = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    switch (name) {
      case 'firstNameInput':
        setFirstName(value);
        break;
      case 'lastNameInput':
        setLastName(value);
        break;
      case 'positionInput':
        setPosition(value);
        break;
      default:
        console.log('terrible problem is occuring in AuthProfileDialog!');
    }
  };
  const handleComponentSelector = (e, v) => {
    e.preventDefault();
    setComponentObj(v);
    console.log(componentObj);
  };

  const SaveProfile = async () => {
    const userinfoObj = {
      ...state.userinfo,
      firstName: firstName,
      lastName: lastName,
      position: position,
      dhsComponent: componentObj.name,
      abbr: componentObj.abbr,
    };
    console.log(userinfoObj);

  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Complete Your Profile
        </Typography>
        <div>
          <TextField
            required
            label="First Name"
            variant="filled"
            name="firstNameInput"
            onInput={handleInput}
          />
        </div>
        <div>
          <TextField
            required
            label="Last Name"
            variant="filled"
            name="lastNameInput"
            onInput={handleInput}
          />
        </div>
        <div className={classes.fields}>
          <TextField
            required
            label="Position Title"
            variant="filled"
            name="positionInput"
            onInput={handleInput}
          />
        </div>
        <div>
          <Autocomplete
            id="combo-box-demo"
            options={dhsComponents}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            onChange={handleComponentSelector}
            renderInput={(params) => (
              <TextField {...params} label="DHS Component" variant="outlined" />
            )}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.login}
          size="large"
          onClick={SaveProfile}>
          Save Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default AuthProfileDialog;
