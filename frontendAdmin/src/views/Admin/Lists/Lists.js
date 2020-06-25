import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import {
  Button, Card,
  CardBody,
  Col, Container,
  FormGroup,
  Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,
  Row,
  TabContent, Table,
  TabPane
} from 'reactstrap';
import $ from 'jquery';
import Spinner from "reactstrap/es/Spinner";
import assets from "../../Config/assets";
import {
  comments, deleteComment, deletePost,
  getUserData,
  listposts,
  // company, listCities, listDistricts, listWards,
  place, post, upload
} from "../Component/Request";
import styles from "../../Config/styles";

window.jQuery = $;
require('bootstrap');

class EditPosts extends Component {
  constructor(props) {
    super(props);
    console.log(props.match.params);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggle = this.toggle.bind(this);
    const AGENCY_ID = this.props.match.params.id;
    const PLACE_ID = this.props.match.params.place_id;
    console.log(AGENCY_ID, PLACE_ID);
    this.state = {
      agencyId: AGENCY_ID,
      placeId: PLACE_ID,
      activeTab: new Array(4).fill('1'),
      agency: {
        alert: null,
      },
      filterField: {
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

   componentDidMount() {
      post(this.state.agencyId, this.state.placeId).then(resp => {this.setState({post:resp,isLoaded:true}, () => {console.log(resp)})});
      comments(this.state.agencyId, this.state.placeId).then(resp => (this.setState({comments:resp, isCommentLoaded:true})));
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
    return ((company.name && company.name.toLowerCase().indexOf(fields.name.toLowerCase())) !== -1) &&
      ((company.email && company.email.toLowerCase().indexOf(fields.email.toLowerCase())) !== -1) &&
      ((company.number_phone && company.number_phone.toLowerCase().indexOf(fields.number_phone.toLowerCase())) !== -1);
  }

  renderCompanyRow() {
    let filtering = (this.state.filterField.name || this.state.filterField.email || this.state.filterField.number_phone);
    let companies;
    if (!filtering) {
      companies = this.state.comments;
    } else {
      companies = this.state.comments.filter(x => this.isSuitableCompany(x));
    }
    console.log("xem comment", companies);
    return companies.map((data, index) =>
      (
        <tr key={data.id}>
        <td>{data.id}</td>
        <td>{data.user_id}</td>
        <td>{data.place_id}</td>
        <td>{(data.content && data.content.length > 100) ? (data.content.slice(0, 100) + "...") : data.content}</td>
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
          {/*<Button className="mr-1 btn-danger" onClick={() => this.renderAlertComment(data.id, index)}>*/}
          {/*  <i className="cui-trash icons font-lg "/>*/}
          {/*</Button>*/}
        </td>
      </tr>));
  }


  renderAlertComment(id,index){
    console.log(id, index);
    const getAlert = () => (
      <SweetAlert
        custom
        showCancel
        confirmBtnText="Xóa"
        cancelBtnText="Hủy"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="default"
        title="Bạn chắc chắn muốn xóa?"
        onConfirm={()=>this.deleteComment(id,index)}
        onCancel={() => this.hideAlert()}
      >
        Bạn không thể khôi phục được thông tin đã xóa!
      </SweetAlert>

    );
    this.setState({
      alert: getAlert()
    });
  }

  deleteComment(id, index) {
    console.log("dmmmmmmm");
    deleteComment(this.state.agencyId, this.state.placeId, id).then((responseJson) => {
      if(responseJson) {
        const getAlert = () => (
          <SweetAlert
            success
            timeout={1500}
            onConfirm={() => {this.hideAlert();this.setState({data:this.state.data.splice(index,1)})}}
          >
            {responseJson.message}
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
            {responseJson.errors.message}
          </SweetAlert>
        );
        this.setState({
          alert: getAlert()
        });
      }
    })
      .catch((err) => console.log(err))
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
                    <p><h3>{place.user_id}</h3></p>
                    <p><i className="icon-map icons mt-4"/> {place.content}</p>
                    <p><i className="icon-screen-desktop icons mt-4"/> {place.place_id}</p>
                    <p><i className="icon-envelope icons mt-4"/> {place.place_id}</p>
                    <p><i className="icon-location-pin icons  mt-4"/> {place.totalUpvotes}</p>
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
                  <th style={styles.topVertical}>観光地ID</th>
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
    if (!(this.state.isLoaded && this.state.isCommentLoaded) ) {
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
                {this.tabPane(this.state.post, this.state.comments)}
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
