import React,{Component} from 'react';
import {
  Button, Card,
  CardBody,
  Col, Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
  TabPane
} from 'reactstrap';
import Spinner from "reactstrap/es/Spinner";
import SweetAlert from 'react-bootstrap-sweetalert';
import styles from "../../Config/styles";
import { user, deleteUser} from "../Component/Request";

class Users extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      isLoaded: false,
      data: [],
      alert: null,
      filterField: {
        username: "",
      }
    };
  }

  componentDidMount() {
    user().then((responseJson) => {
      this.setState({data: responseJson, isLoaded: true});
    })
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  deleteBrocker(id, index) {
    deleteUser(id).then((responseJson) => {
      if (responseJson.data) {
        const getAlert = () => (
          <SweetAlert
            success
            timeout={1500}
            onConfirm={() => {
              this.hideAlert();
              this.state.data.splice(index, 1)
            }}
          >
            {responseJson.message}
          </SweetAlert>
        );
        this.setState({
          alert: getAlert()
        });
      } else {
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

  handleChange(event) {
    console.log(event.target.value);
    this.state.filterField[event.target.name] = event.target.value;
    this.setState({filterField: this.state.filterField}, () => {console.log(this.state.filterField)});
  }

  renderAlert(investorId, index) {
    const getAlert = () => (
      <SweetAlert
        custom
        showCancel
        confirmBtnText="Xóa"
        cancelBtnText="Hủy"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="default"
        title="Bạn chắc chắn muốn xóa?"
        onConfirm={() => this.deleteBrocker(investorId, index)}
        onCancel={() => this.hideAlert()}
      >
        Bạn không thể khôi phục được thông tin đã xóa!
      </SweetAlert>);
    this.setState({
      alert: getAlert()
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
    console.log('Hiding alert...');

  }

  filteredUser(user) {
    let fields = this.state.filterField;
    return (user.username.toLowerCase().indexOf(fields.username.toLowerCase()) !== -1);
  }

  renderAccount() {
    let filtering = (this.state.filterField.username);
    let data;
    if (!filtering) {
      data = this.state.data;
    } else {
      data = this.state.data.filter(x => this.filteredUser(x));
    }
    console.log(data)
    return data.map((data, index) =>
      <tr key={data.id}>
        <td>{data.id}</td>
        <td>{data.username}</td>
        {/*<td>{data.given_name}</td>*/}
        <td>{data.avatar_url ? <img src={data.avatar_url} alt=""/> : <img className="img-avatar" height={100} width={100} src="https://w7.pngwing.com/pngs/304/305/png-transparent-man-with-formal-suit-illustration-web-development-computer-icons-avatar-business-user-profile-child-face-web-design.png" alt=""/>}</td>
        <td>{data.email}</td>
        {/*<td>{data.username}</td>*/}
        {/*<td>{data.address}</td>*/}
        <td>
          <Button className="mr-1 btn-info" onClick={() => this.props.history.push('/users/detail/' + data.id)}><i
            className="fa fa-eye "/></Button>
          <Button className="mr-1 btn-danger" onClick={() => this.renderAlert(data.id, index)}><i
            className="cui-trash icons font-lg "/></Button>
        </td>
      </tr>
    );
  }

  render() {
    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">ユーザー管理</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" className="mb-4">
              <Nav tabs>
                <NavItem>
                  <NavLink>
                    <TabPane tabId="2">
                      <Card  style={{display: "flex", justifyContent: "center"}}>
                        <CardBody>
                          <Table responsive>
                            <thead>
                            <tr>
                              <th style={styles.topVertical}>ID</th>
                              <th>名前<Input bsSize="sm" type="text" id="username" name="username"
                                                         className="input-sm" placeholder="検索"
                                                         onChange={(event) => this.handleChange(event)}/></th>
                              {/*<th>Họ tên môi giới<Input bsSize="sm" type="text" id="input-small" name="input-small"*/}
                              {/*                          className="input-sm" placeholder="Tìm kiếm"/></th>*/}
                              <th style={styles.topVertical}>アバター</th>
                              <th style={styles.topVertical}>メール</th>
                              {/*<th style={styles.topVertical}>Username</th>*/}
                              {/*<th style={styles.topVertical}>Address</th>*/}
                              {/*<th style={styles.topVertical}>ボタン</th>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderAccount()}
                            {this.state.alert}
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </TabPane>
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Users;
