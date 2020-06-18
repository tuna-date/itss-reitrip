import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {currentUser, register} from "../../Admin/Component/Request";
import SweetAlert from "react-bootstrap-sweetalert";
import Link from "react-router-dom/Link";


class Register extends Component {
constructor(props) {
  super(props);
  this.state = {
    alert: null,
  }
}

  register() {
  let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let body = JSON.stringify({
      // "session": {
      "username": username,
      "email": email,
      "password": password
      // }
    });
    register(body).then((data) => {
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

  handleChange(event){
  let input = event.target;
  this.setState({[input.name] :input.value });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1 style={{textAlign:"center"}}>登録</h1>
                    <p className="text-muted">新しいアカウントを作成する</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="ユーザー名" autoComplete="username" name="username" onChange={(event) => this.handleChange(event)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="メール" autoComplete="email" name="email" onChange={(event) => this.handleChange(event)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="パスワード" autoComplete="new-password" name="password" onChange={(event) => this.handleChange(event)} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="パスワード確認" autoComplete="new-password" name="password" onChange={(event) => this.handleChange(event)} />
                    </InputGroup>
                    <Button color="success" onClick={() => this.register()} style={{width:"100%"}}>アカウントを作成</Button>
                    <Link to="/login">
                            <Button color="primary" className="mt-3" active tabIndex={-1} style={{width:"100%"}}>ログイン</Button>
                          </Link>
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                  {this.state.alert}
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
