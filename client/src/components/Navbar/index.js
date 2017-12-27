import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class Example extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
	return (
	  <div>
	    <Navbar color="dark" dark expand="md">
	      <NavbarBrand href="/">Garage.io</NavbarBrand>
	      <NavbarToggler onClick={this.toggle} />
	      <Collapse isOpen={this.state.isOpen} navbar>
	        <Nav className="ml-auto" navbar>
	          <NavItem>
	            <NavLink href="/auth/">GarageDoor</NavLink>
	          </NavItem>
	          <NavItem>
	            <NavLink href="/signup">SignUp</NavLink>
	          </NavItem>
	        </Nav>
	      </Collapse>
	    </Navbar>
	  </div>
	);
	}
}