import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import {currentUser, login} from "../../Admin/Component/Request";
import Link from "react-router-dom/Link";
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: new Array(4).fill('1'),
      alert: null,
    };
  }

  componentDidMount() {
  }

  login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let body = JSON.stringify({
      // "session": {
        "email": email,
        "password": password
      // }
    });
      login(body).then((data) => {
        localStorage.setItem('token', data.token);
        // currentUser().then((responseJson) => {
        //   localStorage.setItem('role',responseJson.role);
        //   localStorage.setItem('data', JSON.stringify(responseJson));
        // });
        // localStorage.setItem('role',data.data.level);
        // let info = JSON.stringify(data.email);
        // localStorage.setItem('data', info);
        window.location.href = "/home";
      })
      .catch((err) => {
        console.log(err);
        const getAlert = () => (
          <SweetAlert
            success
            title={"Lỗi"}
            timeout={1500}
            onConfirm={() =>this.hideAlert()}
          >
            エラー!
          </SweetAlert>
        );
        this.setState({
          alert: getAlert()
        });
        // this.props.history.push('/buttons');
        //window.location.href = "/login";
      })
  }

  hideAlert() {
    this.setState({
      alert: null
    });
    console.log('Hiding alert...');

  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <div id="Login">
                      <h1 style={{textAlign:"center"}}>REITRIP</h1>
                      <p className="text-muted" style={{textAlign:"center"}}>ログイン</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="email" placeholder="Email" autoComplete="Email"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" placeholder="Password" autoComplete="current-password"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" value="SEND POST" color="primary" className="px-4"
                                  onClick={() => this.login()}>ログイン</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">パスワードをお忘れですか?</Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12" md="12" >
                          <Link to="/register">
                            <Button color="primary" className="mt-3" active tabIndex={-1} style={{width:"100%"}}>今すぐ登録!</Button>
                          </Link>
                        </Col>
                      </Row>
                    </div>
                    {this.state.alert}
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
