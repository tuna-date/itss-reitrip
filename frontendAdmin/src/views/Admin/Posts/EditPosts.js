import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import 'react-summernote/dist/react-summernote.css';
import {
  Button, Card,
  CardBody,
  Col, Container,
  Modal, ModalBody, ModalFooter, ModalHeader,
  Row,
  TabContent, Table,
  TabPane
} from 'reactstrap';
import $ from 'jquery';
import Spinner from "reactstrap/es/Spinner";
import {
  deletePost,
  listposts,
  place
} from "../Component/Request";
import styles from "../../Config/styles";

window.jQuery = $;
require('bootstrap');

class EditPosts extends Component {
  constructor(props) {
    super(props);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggle = this.toggle.bind(this);
    const AGENCY_ID = this.props.match.params.id;
    console.log(AGENCY_ID);
    this.state = {
      agencyId: AGENCY_ID,
      activeTab: new Array(4).fill('1'),
      agency: {
        alert: null,
      },
      alert:null,
      filterField: {
        place_id:"",
        name: "",
        email: "",
        number_phone: "",
      },
      isLoaded: false,
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }


 async componentDidMount() {
    const [placeResp, postResp] = await Promise.all([place(this.state.agencyId),
      listposts(this.state.agencyId)
        // .then(resp =>{resp.forEach(async (resp) => {await getUserData(resp.user_id).then(response => {resp.user = response});await place(resp.place_id).then(response => (resp.place = response))})})
    ]);
    this.setState({place:placeResp,posts:postResp,isLoaded:true}, ()=>{console.log(placeResp, postResp)});
  }

  renderAlert(id,index){
    const getAlert = () => (
      <SweetAlert
        custom
        showCancel
        confirmBtnText="Xóa"
        cancelBtnText="Hủy"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="default"
        title="Bạn chắc chắn muốn xóa?"
        onConfirm={()=>this.deletePost(id,index)}
        onCancel={() => this.hideAlert()}
      >
        Bạn không thể khôi phục được thông tin đã xóa!
      </SweetAlert>

    );
    this.setState({
      alert: getAlert()
    });
  }

  deletePost(id, index) {
    deletePost(this.state.agencyId, id).then((responseJson) => {
      if(responseJson) {
        const getAlert = () => (
          <SweetAlert
            success
            timeout={1500}
            onConfirm={() => {this.hideAlert();this.setState({posts:this.state.posts.splice(index,1)})}}
          >
            {responseJson.status}
          </SweetAlert>
        );
        this.setState({
          alert: getAlert()
        });
      }else{
        const getAlert = () => (
          <SweetAlert
            onConfirm={() => this.hideAlert()}
          >
            "エラー"
          </SweetAlert>
        );
        this.setState({
          alert: getAlert()
        });
      }
    })
      .catch((err) => console.log(err))
  }

  hideAlert() {
    this.setState({
      alert: null
    });
    console.log('Hiding alert...');
  }


  toggleLarge() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }


  isSuitableCompany(company) {
    let fields = this.state.filterField;
    return ((company.place_id && company.place_id.toLowerCase().indexOf(fields.place_id.toLowerCase())) !== -1) &&
      ((company.email && company.email.toLowerCase().indexOf(fields.email.toLowerCase())) !== -1) &&
      ((company.number_phone && company.number_phone.toLowerCase().indexOf(fields.number_phone.toLowerCase())) !== -1);
  }

  renderCompanyRow() {
    console.log(this.state.posts);
    let filtering = (this.state.filterField.place_id || this.state.filterField.email || this.state.filterField.number_phone);
    let companies;
    if (!filtering) {
      companies = this.state.posts;
    } else {
      companies = this.state.posts.filter(x => this.isSuitableCompany(x));
    }
    console.log(companies);
    return companies.map((data, index) =>
      <tr key={data.id}>
        <td>{index + 1}</td>
        <td>{data.user_id}</td>
        <td>{data.place_id}</td>
        <td>{(data.content.length > 100) ? (data.content.slice(0, 100) + "...") : data.content}</td>
        <td>{data.totalVotes}</td>
        <td>
          <Button onClick={() => this.props.history.push("/lists/" + data.id + "/place/" + data.place_id)} className="mr-1 btn-info">
            <i className="fa fa-eye"/>
          </Button>
          {/*<Button className="mr-1 btn-primary" color="primary" onClick={() => {*/}
          {/*  this.props.history.push("/posts/edit/" + data.id);*/}
          {/*}}>*/}
          {/*  <i className="cui-pencil icons font-lg "/>*/}
          {/*</Button>*/}
          <Button className="mr-1 btn-danger" onClick={() => this.renderAlert(data.id, index)}>
            <i className="cui-trash icons font-lg "/>
          </Button>
        </td>
      </tr>);
  }
  checkoutModal() {
    let res = this.state.agency.description ? this.state.agency.description : "";
    res = res.replace(/<img/g, '<img style="max-width: 700px !important"');
    return (
      <Modal isOpen={this.state.showModal} toggle={this.toggleLarge}
             className={'modal-lg ' + this.props.className}>
        <ModalHeader toggle={this.toggleLarge}>Xem trước giới thiệu về công ty</ModalHeader>
        <ModalBody>
          <Container>
            <Row className="show-grid">
              <Col xs={6} md={4}>
                <img id="logo" width="200"
                     src={this.state.agency.avatar ? this.state.agency.avatar : "/assets/img/logo-placeholder.png"}
                     alt="Logo preview..."/>
              </Col>
              <Col xs={6} md={8}>
                <p><h3>{document.getElementById('name') ? document.getElementById('name').value : null}</h3></p>
                <p><i
                  className="icon-map icons mt-4"/> {document.getElementById('address') ? document.getElementById('address').value : null}
                </p>
                <p><i
                  className="icon-phone icons mt-4"/> {document.getElementById('numberPhone') ? document.getElementById('numberPhone').value : null}
                </p>
                <p><i
                  className="icon-envelope icons mt-4"/> {document.getElementById('email') ? document.getElementById('email').value : null}
                </p>
                <p><i
                  className="icon-screen-desktop icons mt-4"/> {document.getElementById('website') ? document.getElementById('website').value : null}
                </p>
              </Col>
            </Row>
            <hr/>
            <div>
              <p>GIỚI THIỆU</p>
              <div
                dangerouslySetInnerHTML={{__html: res}}/>
            </div>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleLarge}>Ok</Button>
        </ModalFooter>
      </Modal>
    )
  }

  tabPane(place) {
    return (
      <>
        <TabPane tabId="1">
          <Card>
            <CardBody>
              <div id="Addagency">
                <Row className="show-grid">
                  <Col xs={6} md={4}>
                    <img src={place.image_url} alt="" style={{width: 240}}/>
                  </Col>
                  <Col xs={6} md={8}>
                    <p><h3>{place.name}</h3></p>
                    <p><i className="icon-map icons mt-4"/> {place.location}</p>
                    <p><i className="icon-screen-desktop icons mt-4"/> {place.services}</p>
                    <p><i className="icon-envelope icons mt-4"/> {place.state}</p>
                    <p><i className="icon-location-pin icons  mt-4"/> {place.number_phone}</p>
                  </Col>
                </Row>
                {/*<FormGroup row>*/}
                {/*  <Col md="3">*/}
                {/*    <Label htmlFor="file-input">Ảnh điểm du lịch</Label>*/}
                {/*  </Col>*/}
                {/*  <Col xs="12" md="9">*/}
                {/*    <Input style={{display: 'none'}} type="file" id="avatar-path" name="avatar-path"*/}
                {/*           onChange={() => this.uploadImage()}/>*/}
                {/*    <img onClick={() => this.triggerUploadImage()} id="logo" height="200"*/}
                {/*         src={this.state.agency.avatar ? this.state.agency.avatar : "/assets/img/logo-placeholder.png"}*/}
                {/*         alt="Logo preview..."/>*/}
                {/*  </Col>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup row>*/}
                {/*  <Col md="3">*/}
                {/*    <Label htmlFor="text-input">Tên địa điểm du lịch</Label>*/}
                {/*  </Col>*/}
                {/*  <Col xs="12" md="9">*/}
                {/*    <Input type="text" id="name" name="name" defaultValue={this.state.agency.name}*/}
                {/*           onChange={(event) => this.handleChangeData(event)}/>*/}
                {/*  </Col>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup row>*/}
                {/*  <Col md="3">*/}
                {/*    <Label htmlFor="email-input">Địa chỉ</Label>*/}
                {/*  </Col>*/}
                {/*  <Col xs="12" md="9">*/}
                {/*    <Input type="address" id="address" name="address" autoComplete="address"*/}
                {/*           defaultValue={this.state.agency.address}*/}
                {/*           onChange={(event) => this.handleChangeData(event)}/>*/}
                {/*  </Col>*/}
                {/*</FormGroup>*/}

                {/*<FormGroup row>*/}
                {/*  <Col md="3">*/}
                {/*    <Label htmlFor="password-input">Tag</Label>*/}
                {/*  </Col>*/}
                {/*  <Col xs="12" md="9">*/}
                {/*    <Input type="tag" id="tag" name="tag" autoComplete="tag" defaultValue={this.state.agency.tag}*/}
                {/*           onChange={(event) => this.handleChangeData(event)}/>*/}
                {/*  </Col>*/}
                {/*</FormGroup>*/}

                {/*<FormGroup row>*/}
                {/*  <Col md="3">*/}
                {/*    <Label htmlFor="textarea-input">Giới thiệu về địa điểm du lịch</Label>*/}
                {/*  </Col>*/}
                {/*  <Col xs="12" md="9">*/}
                {/*    <ReactSummernote*/}
                {/*      name="description"*/}
                {/*      id="description"*/}
                {/*      defaultValue={this.state.agency.description}*/}
                {/*      options={{*/}
                {/*        lang: 'ru-RU',*/}
                {/*        height: 100,*/}
                {/*        dialogsInBody: true,*/}
                {/*        toolbar: [*/}
                {/*          ['style', ['style']],*/}
                {/*          ['font', ['bold', 'underline', 'clear']],*/}
                {/*          ['fontname', ['fontname']],*/}
                {/*          ['para', ['ul', 'ol', 'paragraph']],*/}
                {/*          ['table', ['table']],*/}
                {/*          ['insert', ['link', 'picture', 'video']],*/}
                {/*          ['view', ['fullscreen', 'codeview']]*/}
                {/*        ]*/}
                {/*      }}*/}
                {/*      onChange={(content) => this.onChange(content)}*/}
                {/*      onImageUpload={this.onImageUpload}*/}
                {/*    />*/}
                {/*  </Col>*/}
                {/*</FormGroup>*/}
                {/*<div className="form-actions">*/}
                {/*  <Button className="mr-1 btn-danger" type="submit"*/}
                {/*          onClick={() => this.props.history.goBack()}>Hủy</Button>*/}
                {/*  <Button onClick={() => this.toggleLarge()} className="mr-1" type="submit" color="info">Xem*/}
                {/*    trước</Button>*/}
                {/*  <Button className="mr-1 btn-primary" color="primary" type="submit" value="SEND POST"*/}
                {/*          >Cập nhật</Button>*/}
                {/*</div>*/}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Table responsive>
                <thead>
                <tr>
                  <th style={styles.topVertical}>ID</th>
                  <th>ユーザーID
                    {/*<Input bsSize="sm" type="text" id="name" name="name"*/}
                    {/*       className="input-sm" placeholder="検索"*/}
                    {/*       onChange={(event) => this.handleChange(event)}/>*/}
                  </th>
                  <th style={styles.topVertical}>観光地ID
                    {/*<Input bsSize="sm" type="text" id="place_id" name="place_id"*/}
                    {/*       className="input-sm" placeholder="検索"*/}
                    {/*       onChange={(event) => this.handleChange(event)}/>*/}
                  </th>
                  <th>内容
                    {/*<Input bsSize="sm" type="text" id="email" name="email"*/}
                    {/*       className="input-sm" placeholder="検索"*/}
                    {/*       onChange={(event) => this.handleChange(event)}/>*/}
                  </th>
                  <th>投票
                    {/*<Input bsSize="sm" type="text" id="number_phone" name="number_phone"*/}
                    {/*       className="input-sm" placeholder="検索"*/}
                    {/*       onChange={(event) => this.handleChange(event)}/>*/}
                  </th>
                  <th style={styles.topVertical}></th>
                </tr>
                </thead>
                <tbody>
                {this.renderCompanyRow()}
                </tbody>
              </Table>

            </CardBody>
          </Card>
        </TabPane>
      </>
    )
      ;
  }

  render() {
    if (!this.state.isLoaded ) {
      return <Spinner/>
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">観光地情報</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" className="mb-4">
              <TabContent activeTab={this.state.activeTab[0]}>
                {this.tabPane(this.state.place, this.state.posts)}
                {this.state.alert}
                {this.checkoutModal()}
              </TabContent>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default EditPosts;
