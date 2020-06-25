import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import {
  Button, Card,
  CardBody,
  Col, Modal, ModalBody,
  ModalHeader,
  Row,
  TabContent,
  Table,
  TabPane, Spinner, Container, Input,InputGroup,InputGroupAddon,InputGroupText
} from 'reactstrap';
import styles from "../../Config/styles";
import {deletePlace, getUserData, posts} from "../Component/Request";


class Posts extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      isLoaded: false,
      data: [],
      currentBrocker: {},
      listRequestBrockers: [],
      modalId: undefined,
      currentRequestBrocker: {},
      modalRequestId: 0,
      alert: null,
      filterField: {
        name: "",
        email: "",
        number_phone: "",
      }
    };
  }

  componentDidMount() {
    posts().then((responseJson) => {
      responseJson.forEach(resp => {resp.user = getUserData(resp.user_id)});
      this.setState({data: responseJson, isLoaded: true}, () => {console.log("kiem tra thong tin", responseJson)});
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
    console.log('Hiding alert...');
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
        onConfirm={()=>this.deleteAdminBrocker(id,index)}
        onCancel={() => this.hideAlert()}
      >
        Bạn không thể khôi phục được thông tin đã xóa!
      </SweetAlert>

    );
    this.setState({
      alert: getAlert()
    });
  }

  deleteAdminBrocker(id, index) {
    deletePlace(id).then((responseJson) => {
      if(responseJson) {
        const getAlert = () => (
          <SweetAlert
            success
            timeout={1500}
            onConfirm={() => {this.hideAlert();this.state.data.splice(index,1);this.setState({data:this.state.data},() => {console.log(this.state.data)})}}
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



  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  togglePrimary(index) {
    this.setState({
      showModal: !this.state.showModal,
      modalId: index,
    });
  }

  handleChange(event) {
    this.state.filterField[event.target.name] = event.target.value;
    this.setState(({filterField: this.state.filterField}));
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
      companies = this.state.data;
    } else {
      companies = this.state.data.filter(x => this.isSuitableCompany(x));
    }
    console.log(companies);
    return companies.map((data, index) =>
      <tr key={data.id}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td><img src={data.image_url} alt="" style={{height: 70}}/></td>
        <td>{data.location}</td>
        <td>{data.services}</td>
        <td>{data.state}</td>
        <td>
          {/*<Button onClick={() => this.togglePrimary(data.id)} className="mr-1 btn-info">*/}
          {/*  <i className="fa fa-eye"/>*/}
          {/*</Button>*/}
          <Button className="mr-1 btn-primary" color="primary" onClick={() => {
            this.props.history.push("/posts/edit/" + data.id);
          }}>
            <i className="cui-pencil icons font-lg "/>
          </Button>
          <Button className="mr-1 btn-danger" onClick={() => this.renderAlert(data.id, index)}>
            <i className="cui-trash icons font-lg "/>
          </Button>
        </td>
      </tr>);
  }

  tabPane() {

    return (
      <>
        <TabPane tabId="1">
          <Card>
            <CardBody>
              <Table responsive>
                <thead>
                <tr>
                  <th style={styles.topVertical}>ID</th>
                  <th>名
                    <Input bsSize="sm" type="text" id="name" name="name"
                           className="input-sm" placeholder="検索"
                           onChange={(event) => this.handleChange(event)}/>
                  </th>
                  <th style={styles.topVertical}>写真</th>
                  <th style={styles.topVertical}>ロケーション
                    {/*<Input bsSize="sm" type="text" id="email" name="email"*/}
                    {/*       className="input-sm" placeholder="検索"*/}
                    {/*       onChange={(event) => this.handleChange(event)}/>*/}
                  </th>
                  <th style={styles.topVertical}>サービス
                    {/*<Input bsSize="sm" type="text" id="number_phone" name="number_phone"*/}
                    {/*       className="input-sm" placeholder="検索"*/}
                    {/*       onChange={(event) => this.handleChange(event)}/>*/}
                  </th>
                  <th style={styles.topVertical}>状態</th>
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
    );
  }

  renderModal() {
    let data = this.state.data;
    if (this.state.modalId != null) {
      let currentBrocker = data.find(x => x.id === this.state.modalId);
      let index = this.state.modalId;
      let res;
      res = currentBrocker && currentBrocker.description || "";
      res = res.replace(/<img/g, '<img style="max-width: 700px !important"');
      return (
        <Modal isOpen={this.state.showModal} toggle={() => this.togglePrimary()}
               className={'modal-lg ' + this.props.className}>
          <ModalHeader toggle={() => this.togglePrimary(index)}　style={{textAlign:"center"}}>観光地の予報</ModalHeader>
          <ModalBody>
            <Container>

              <Row className="show-grid">
                <Col xs={6} md={4}>
                  <img src={currentBrocker.avatar} alt="" style={{width: 240}}/>
                </Col>
                <Col xs={6} md={8}>
                  <p><h3>{currentBrocker.name}</h3></p>
                  <p><i className="icon-map icons mt-4"/> {currentBrocker.location}</p>
                  <p><i className="icon-screen-desktop icons mt-4"/> {currentBrocker.services}</p>
                  <p><i className="icon-envelope icons mt-4"/> {currentBrocker.state}</p>
                  <p><i className="icon-location-pin icons  mt-4"/> {currentBrocker.number_phone}</p>
                </Col>
              </Row>
              <hr/>
              <div>
                <h4>デスクリプション</h4>
                <div dangerouslySetInnerHTML={{ __html: res }} />

              </div>
            </Container>
          </ModalBody>
        </Modal>

      );
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">新観光地の一覧</p>
            </Col>
            {/*<Col xs="12" md="6">*/}
            {/*  <InputGroup>*/}
            {/*    <Input type="email" id="input2-group1" name="input2-group1" placeholder=""/>*/}
            {/*    <InputGroupAddon addonType="append">*/}
            {/*      <InputGroupText>*/}
            {/*        <i className="fa fa-search"/>*/}
            {/*      </InputGroupText>*/}
            {/*    </InputGroupAddon>*/}
            {/*  </InputGroup>*/}
            {/*</Col>*/}
          </Row>
          <Row style={styles.lowMarginTop}>
            <Col xs="12" md="12" className="mb-4">
              <TabContent activeTab={this.state.activeTab[0]}>
                {this.tabPane()}
              </TabContent>
            </Col>
          </Row>


          {this.renderModal()}
          {this.state.alert}
        </div>
      );
    }
  }
}

export default Posts;
