import React from 'react';
import { Link } from 'react-router';
import { LoginLink, LogoutLink, Authenticated, NotAuthenticated } from 'react-stormpath';
import AppBar from 'material-ui/AppBar';
import Tab from 'muicss/lib/react/tab';
import Tabs from 'muicss/lib/react/tabs';
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
import Home from 'material-ui/svg-icons/action/home';
import RaisedButton from 'material-ui/RaisedButton';
import {fullWhite} from 'material-ui/styles/colors';

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

render() {
    return (
    <MuiThemeProvider>
      <div>
       
      <AppBar 
        title="Dhingra Lab"
        //onTitleTouchTap={<Link to="/" />}
        iconElementLeft={ <FlatButton 
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
                  containerElement={<Link to="/jobform" />}
                  onTouchTap={ (e) => {this.handleClose();} } 
                > Job submission</MenuItem>
                <MenuItem
                  linkButton
                  containerElement={<Link to="/notebook" />}
                  onTouchTap={ (e) => {this.handleClose();} }
                >Lab Notebooks</MenuItem>
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
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem>
                  <FlatButton color="primary">
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



// <nav className="navbar navbar-default navbar-static-top">
//         <div className="container">
//           <div id="navbar-collapse" className="collapse navbar-collapse">
//             <ul className="nav navbar-nav">
//               <Authenticated>              
//                 <li>  
//                   <MuiThemeProvider>
//                     <div>
//                       <FlatButton
//                         icon={<Apps />}
//                         onTouchTap={ (e) => {this.handleToggle();} }
//                       />
//                       <Drawer width={200} openSecondary={true} open={this.state.open}>
//                         <MenuItem 
//                           linkButton
//                           containerElement={<Link to="/jobform" />}
//                           onTouchTap={ (e) => {this.handleClose();} } 
//                         > Job submission</MenuItem>
//                         <MenuItem
//                           linkButton
//                           containerElement={<Link to="/notebook" />}
//                           onTouchTap={ (e) => {this.handleClose();} }
//                         >Lab Notebooks</MenuItem>
//                       </Drawer>
//                     </div>
//                   </MuiThemeProvider>
//               </li>
//               </Authenticated>   
//               <li><Link to="/">Home</Link></li>
//               <Authenticated>
//                 <li>
//                   <Link to="/profile">Profile</Link>
//                 </li>
//               </Authenticated>
//               </ul>
//             <ul className="nav navbar-nav navbar-right">
//               <NotAuthenticated>
//                 <li>
//                   <LoginLink />
//                 </li>
//               </NotAuthenticated>
//               <NotAuthenticated>
//                 <li>
//                   <Link to="/register">Create Account</Link>
//                 </li>
//               </NotAuthenticated>
//               <Authenticated>
//                 <li>
//                   <LogoutLink />
//                 </li>
//               </Authenticated>
//             </ul>
//           </div>
//         </div>
//       </nav>