import React, {Component} from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input, InputGroup,
  InputGroupAddon,
  InputGroupText,
  Nav,
  NavItem
} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
// import logo from '../../assets/img/brand/logo.svg'
import logo from '../../assets/img/logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg'
import Spinner from "reactstrap/es/Spinner";
import {currentUser} from "../../views/Admin/Component/Request";
const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    // this.getCurrentUserInfo();
    // let data = JSON.parse(localStorage.getItem("data"));
    let name = "Nguyen Vu";
    let avatar = "";
    this.setState({name: name, avatar: avatar, isLoaded:true})
  }

  getCurrentUserInfo() {
      currentUser().then((responseJson) => {
        // console.log(responseJson);
        localStorage.setItem('data', responseJson);
      this.setState({data: responseJson, isLoaded: true});
    }, function (error) {
    })
  }


  render() {
    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {
      // eslint-disable-next-line
      const {children, ...attributes} = this.props;
      return (
        <React.Fragment>
          <AppSidebarToggler className="d-lg-none" display="md" mobile/>
          <AppNavbarBrand
            full={{src: logo, width: 300, height: 55, alt: 'CoreUI Logo'}}
            minimized={{src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo'}}
          />
          <AppSidebarToggler className="d-md-down-none" display="lg"/>

          <Nav className="d-md-down-none" navbar>
            <NavItem className="px-3">
              {/*<InputGroup>*/}
              {/*  <Input type="email" id="input2-group1" name="input2-group1" placeholder="Tìm kiếm thông tin"/>*/}
              {/*  <InputGroupAddon addonType="append">*/}
              {/*    <InputGroupText>*/}
              {/*      <i className="fa fa-search"/>*/}
              {/*    </InputGroupText>*/}
              {/*  </InputGroupAddon>*/}
              {/*</InputGroup>*/}
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar style={{marginRight: 20}}>
            <AppHeaderDropdown direction="down">
              <DropdownToggle nav>
                <img src={'../../assets/img/avatars/58.png'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                {this.state.name} <i className="fa fa-chevron-down"/>
              </DropdownToggle>
              <DropdownMenu right style={{right: 'auto'}}>
                <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"/> Logout</DropdownItem>
              </DropdownMenu>
            </AppHeaderDropdown>
          </Nav>
        </React.Fragment>
      );
    }
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
