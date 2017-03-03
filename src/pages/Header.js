import React from 'react';
import { Link } from 'react-router';
import { LoginLink, LogoutLink, Authenticated, NotAuthenticated } from 'react-stormpath';
import AppBar from 'material-ui/AppBar';
import Tab from 'muicss/lib/react/tab';
import Tabs from 'muicss/lib/react/tabs';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Apps from 'material-ui/svg-icons/navigation/apps';
import Button from 'muicss/lib/react/button';

injectTapEventPlugin();


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
        iconClassNameRight="muidocs-icon-navigation-expand-more">
      
          <Authenticated>            
              <Drawer width={200} openSecondary={true} open={this.state.open}>
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
          <Link to="/">
            <FlatButton color="primary"
              >Home</FlatButton>
          </Link>    
          <Authenticated>
            <Link to="/profile">
             <FlatButton color="primary"
             >Profile</FlatButton>
            </Link>
          </Authenticated>
          <NotAuthenticated>
            <Link to="/login">
              <FlatButton color="primary"
              >Login</FlatButton>
            </Link>
          </NotAuthenticated>
          <NotAuthenticated>
            <Link to="/register">
              <FlatButton color="primary" style="color:#FAFAFA;"
              >Create Account</FlatButton>
            </Link>
          </NotAuthenticated>
          <Authenticated>
            <FlatButton color="primary"
            ><LogoutLink /></FlatButton>
          </Authenticated>
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