import React from 'react';
import { Link } from 'react-router';
import { LoginLink, LogoutLink, Authenticated, NotAuthenticated } from 'react-stormpath';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/svg-icons/navigation/menu';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import {fullWhite} from 'material-ui/styles/colors';
import {browserHistory} from 'react-router';


injectTapEventPlugin();

const styles = {
  text_format: {
    color: fullWhite
  },
  button_margin: {
    margin: 12
  }
};


export default class Header extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      open: false,
      jobs: false,
      notebooks: false
    };
  
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }
   
  handleClose() {
    this.setState({open: false});
  }

  handleTouchTap() {
     browserHistory.push('/');
}

  render() {
    return (
    <MuiThemeProvider>
      <div>
       
      <AppBar 
        title="Dhingra Lab"
        onTitleTouchTap={ (e) => {this.handleTouchTap();} }
        style={{position: 'fixed'}}
        iconElementLeft={ <FlatButton 
                          style={styles.button_margin}
                          onClick={ (e) => {this.handleToggle();} }
                          icon={<Menu color={fullWhite}/>} /> }
        >
          <Authenticated>            
              <Drawer width={200} open={this.state.open}> 
                <AppBar 
                  iconElementLeft={<FlatButton 
                                    onClick={ (e) => {this.handleClose();} }
                                    icon={<ChevronLeft color={fullWhite}/>} 
                                  />}
                />
                <MenuItem 
                  linkButton
                  containerElement={<Link to="/jobsubmission" />}
                  onTouchTap={ (e) => {this.handleClose();} } 
                > Job submission</MenuItem>
                <MenuItem
                  linkButton
                  containerElement={<Link to="/notebook" />}
                  onTouchTap={ (e) => {this.handleClose();} }
                >Lab Notebooks</MenuItem>
                <MenuItem
                  linkButton
                  containerElement={<Link to="/" />}
                  onTouchTap={ (e) => {this.handleClose();} }
                >Add Job Forms</MenuItem>
              </Drawer>
          </Authenticated>
          <Authenticated>
            <Link to="/profile">
             <IconButton style={styles.button_margin}><AccountCircle color={fullWhite} /></IconButton>
            </Link>
          </Authenticated>
          <Authenticated>
            <IconMenu
              iconButtonElement={<IconButton style={styles.button_margin}><MoreVert color={fullWhite}/></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            >
            <MenuItem>
              <Link to="/profile">
                 <FlatButton primary={true}>Profile</FlatButton>               
              </Link>
            </MenuItem>
            <MenuItem>
                  <FlatButton>
                    <LogoutLink />
                  </FlatButton>
              </MenuItem>
            </IconMenu>
          </Authenticated>    
          <NotAuthenticated>
            <Link to="/login">
              <FlatButton label="Login" labelStyle={styles.text_format} style={styles.button_margin} />
            </Link>
          </NotAuthenticated>
       </AppBar>            
      </div>
    </MuiThemeProvider>     
    );
  }
}