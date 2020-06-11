import React,{Component} from 'react';
import {
  Button,
  Card,
  CardBody, CardHeader, CardFooter,
  Col,
  Input,
  Row,
  FormGroup, Label
} from 'reactstrap';
import Spinner from "reactstrap/es/Spinner";
import {getUserData,upload } from "../Component/Request";

// const userInfo = {"message":"Get detail user succesfully","data":{"username":null,"number_reported":0,"number_own_condos":0,"name":"thang1234","mobile_phone":null,"level":"registered","is_admin":false,"is_active":false,"identify":null,"id":119,"given_name":null,"email":"thang3456@gmail.com","avatar":"","address":null}};


class UserDetail extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    const ACCOUNT_ID = this.props.match.params.id;
    this.state = {
      accountId: ACCOUNT_ID,
      activeTab: new Array(4).fill('1'),
      description: "",
      avatarPath: "",
      email: "",
      numberPhone: "",
      address: "",
      name: "",
      tag: "",
      isLoaded: false,
      isEditing: false,
    };
  }

  componentDidMount() {
    getUserData(this.state.accountId)
      .then((responseJson) => {
        this.setState(
          {
            data: responseJson,
            isLoaded: true,
            origin: JSON.parse(JSON.stringify(responseJson))
          });
      });
  }

  // updateAccountInfo(userId) {
  //   let requestData = JSON.stringify({user: this.state.data});
  //   updateAccount(userId, requestData)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => console.log(err)
  //     );
  // }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }


  closeEditingForm() {
    let data = this.state.data;
    data = this.state.origin;
    this.state.isEditing = false;
    this.setState(data);
  }

  static triggerUploadImage() {
    document.getElementById("avatar-path").click();
  }

  uploadImage() {
    let preview = document.querySelector('#logo');
    let file = document.querySelector('#avatar-path').files[0]; //sames as here
    if (file) {
      let formData = new FormData();
      formData.append("file[new_image_path][]", file);
      upload(formData)
        .then((responseJson) => {
          let imagePath = responseJson.data.files[0].relativeUrl;
          preview.src = imagePath;
          this.setState({logo: imagePath});
        }, function (error) {
          console.log(error);
        });
    }
  }

  handleBuildingsDataChange = (event) => {
    let input = event.target;
    this.setState({
      data:
        {
          ...this.state.data,
          [input.name]: input.value
        }
    });
  };

  handleInfoChange() {
    this.setState({
      data:
        {
          ...this.state.data,
          is_active: false
        }
    });
  }

  handleEditing() {
    this.setState(
      {isEditing: true}
    )
  }

  isEditing() {
    let data = this.state.data;
    // if (!this.state.isEditing) {
      return (
        <Row>
          <Col sm="12" xl="12">
            <Card>
              <CardHeader>
                <div>
                  <Row style={{marginTop: 10}}>
                    <Col sm="12" md="3">
                      <div style={{height: 120, width: 120, background: 'whitesmoke', float: 'left'}}
                           className="avatar avatar-online avatar-lg align-items-center">
                        <img src={data && data.avatar_url || "/assets/img/logo-placeholder.png"} alt=""
                             style={{height: 120, borderRadius: 100}}/>
                      </div>
                    </Col>
                    <Row>
                      <Col sm="12" md="12">
                        <div>
                          <h1>{data.username}</h1>
                        </div>
                      </Col>
                    </Row>
                  </Row>
                </div>
              </CardHeader>
              <CardBody>
                <div>
                  <Row>
                    <Col xs="12" md="4">
                      <p>Username: {data.username} </p>
                      <p>Email: {data.email} </p>
                      <p>Created at: {data.created_at}</p>
                      <p>Role: {data.role}</p>
                    </Col>
                  </Row>
                </div>
              </CardBody>
              {/*<CardFooter>*/}
              {/*  <div className="align-items-center">*/}
              {/*    <FormGroup check inline className="align-self-center">*/}
              {/*      <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1"*/}
              {/*             value="option1"/>*/}
              {/*      <Label className="form-check-label" check htmlFor="inline-checkbox1">Xóa</Label>*/}
              {/*    </FormGroup>*/}
              {/*    <FormGroup check inline className="align-content-center">*/}
              {/*      <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2"*/}
              {/*             value="option2" onChange={() => this.handleInfoChange()}/>*/}
              {/*      <Label className="form-check-label" check htmlFor="inline-checkbox2">Khóa</Label>*/}
              {/*    </FormGroup>*/}
              {/*  </div>*/}
              {/*</CardFooter>*/}
            </Card>
          </Col>
        </Row>
      )
    // } else {
    //   return (<Row>
    //     <Col sm="12" xl="12">
    //       <Card>
    //         <CardHeader>
    //           <div>
    //             <Row>
    //               <Col sm="4" xl="4">
    //                 <div style={{height: 120, width: 120, background: 'whitesmoke', float: 'left'}}>
    //                   <Input style={{display: 'none'}} type="file" id="avatar-path" name="avatar-path"
    //                          onChange={() => this.uploadImage()}/>
    //                   <img onClick={() => UserDetail.triggerUploadImage()} id="logo" height="120"
    //                        src={data && (data.avatar || "/assets/img/logo-placeholder.png")} alt="Logo preview..."/>
    //                 </div>
    //               </Col>
    //               <Col sm="4" xl="4">
    //                 <div>
    //                   <h3>{data.name}</h3>
    //
    //                   <p>Số CMTND: </p>
    //                 </div>
    //               </Col>
    //               <Col sm="4" xl="4">
    //                 <div>
    //                   <p>Số điện thoại :<Input id="mobilePhone" defaultValue={data.mobile_phone}
    //                                            onChange={(event) => this.handleBuildingsDataChange(event)}/></p>
    //                   <p>Name :<Input id="name" defaultValue={data.name}
    //                                   onChange={(event) => this.handleBuildingsDataChange(event)}/></p>
    //
    //                   <p>Email : {data.email}</p>
    //
    //                 </div>
    //               </Col>
    //             </Row>
    //           </div>
    //         </CardHeader>
    //         <CardBody>
    //           <div>
    //             <Row>
    //               <Col xs="12" md="4">
    //                 <p>Username: </p>
    //                 <p>Password: </p>
    //                 <p>Chủ quản: </p>
    //                 <p>Phân loại: {data.level}</p>
    //               </Col>
    //               <Col xs="12" md="4">
    //                 <p>Số căn hộ sở hữu: </p>
    //                 <p>Địa chỉ:
    //                   <Input id="address" defaultValue={data.address}
    //                          onChange={(event) => this.handleBuildingsDataChange(event)}/></p>
    //               </Col>
    //               <Col xs="12" md="4">
    //                 <p>Số lần bị report: </p>
    //               </Col>
    //             </Row>
    //           </div>
    //         </CardBody>
    //         <CardFooter>
    //           <FormGroup check inline className="align-self-center">
    //             <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1"
    //                    value="option1"/>
    //             <Label className="form-check-label" check htmlFor="inline-checkbox1">Xóa</Label>
    //           </FormGroup>
    //           <FormGroup check inline className="align-content-center">
    //             <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2"
    //                    value="option2"/>
    //             <Label className="form-check-label" check htmlFor="inline-checkbox2"
    //                    onClick={() => console.log("alo alo")}>Khóa</Label>
    //           </FormGroup>
    //           <Button className="btn btn-info mr-1"
    //                   onClick={() => this.updateAccountInfo(data.id)}>Lưu</Button>
    //           <Button className="btn btn-default mr-1"
    //                   onClick={() => this.closeEditingForm()}>Hủy</Button>
    //         </CardFooter>
    //       </Card>
    //     </Col>
    //   </Row>)
    // }
  }

  render() {

    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {
      // let data = this.state.data;
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">ユーザーの情報</p>
            </Col>
          </Row>
          {this.isEditing()}
          <div className="form-actions">
            {/*<Button type="submit" color="primary" className="mr-1">Hủy</Button>*/}
            {/*<Button type="submit" color="primary" className="mr-1" onClick={() => this.handleEditing()}>編集</Button>*/}
            {/*<Button type="submit" color="info" className="mr-1"*/}
            {/*        onClick={() => this.updateAccountInfo(this.state.accountId)}></Button>*/}

          </div>

        </div>
      );
    }
  }
}

export default UserDetail;
