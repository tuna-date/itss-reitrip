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
  TabContent,
  TabPane
} from 'reactstrap';
import $ from 'jquery';
import Spinner from "reactstrap/es/Spinner";
import assets from "../../Config/assets";
import {
  // company, listCities, listDistricts, listWards,
   upload} from "../Component/Request";

const company = {"message":"Get detail succesfully","data":{"website":"Mysterytree.com","ward_id":169,"user_admin_id":56,"type":"agency","tag":null,"number_phone":"0987654321","name":"Mystery Tree","id":39,"email":"support_mystery@gmail.com","district_id":17,"description":null,"city_id":1,"avatar":"http://159.65.136.144:4001/uploads/companies/photo/39/original-company-original-file_manager-flightlandscapenatureskyjpg.jpg.39.jpg","address":"255 Hoàng Văn Thái"}};
const listCities = {"data":[{"name":"Hà Nội","id":1},{"name":"Tỉnh Hà Giang","id":2},{"name":"Tỉnh Cao Bằng","id":4},{"name":"Tỉnh Bắc Kạn","id":6},{"name":"Tỉnh Tuyên Quang","id":8},{"name":"Tỉnh Lào Cai","id":10},{"name":"Tỉnh Điện Biên","id":11},{"name":"Tỉnh Lai Châu","id":12},{"name":"Tỉnh Sơn La","id":14},{"name":"Tỉnh Yên Bái","id":15},{"name":"Tỉnh Hoà Bình","id":17},{"name":"Tỉnh Thái Nguyên","id":19},{"name":"Tỉnh Lạng Sơn","id":20},{"name":"Tỉnh Quảng Ninh","id":22},{"name":"Tỉnh Bắc Giang","id":24},{"name":"Tỉnh Phú Thọ","id":25},{"name":"Tỉnh Vĩnh Phúc","id":26},{"name":"Tỉnh Bắc Ninh","id":27},{"name":"Tỉnh Hải Dương","id":30},{"name":"Thành phố Hải Phòng","id":31},{"name":"Tỉnh Hưng Yên","id":33},{"name":"Tỉnh Thái Bình","id":34},{"name":"Tỉnh Hà Nam","id":35},{"name":"Tỉnh Nam Định","id":36},{"name":"Tỉnh Ninh Bình","id":37},{"name":"Tỉnh Thanh Hóa","id":38},{"name":"Tỉnh Nghệ An","id":40},{"name":"Tỉnh Hà Tĩnh","id":42},{"name":"Tỉnh Quảng Bình","id":44},{"name":"Tỉnh Quảng Trị","id":45},{"name":"Tỉnh Thừa Thiên Huế","id":46},{"name":"Thành phố Đà Nẵng","id":48},{"name":"Tỉnh Quảng Nam","id":49},{"name":"Tỉnh Quảng Ngãi","id":51},{"name":"Tỉnh Bình Định","id":52},{"name":"Tỉnh Phú Yên","id":54},{"name":"Tỉnh Khánh Hòa","id":56},{"name":"Tỉnh Ninh Thuận","id":58},{"name":"Tỉnh Bình Thuận","id":60},{"name":"Tỉnh Kon Tum","id":62},{"name":"Tỉnh Gia Lai","id":64},{"name":"Tỉnh Đắk Lắk","id":66},{"name":"Tỉnh Đắk Nông","id":67},{"name":"Tỉnh Lâm Đồng","id":68},{"name":"Tỉnh Bình Phước","id":70},{"name":"Tỉnh Tây Ninh","id":72},{"name":"Tỉnh Bình Dương","id":74},{"name":"Tỉnh Đồng Nai","id":75},{"name":"Tỉnh Bà Rịa - Vũng Tàu","id":77},{"name":"Thành phố Hồ Chí Minh","id":79},{"name":"Tỉnh Long An","id":80},{"name":"Tỉnh Tiền Giang","id":82},{"name":"Tỉnh Bến Tre","id":83},{"name":"Tỉnh Trà Vinh","id":84},{"name":"Tỉnh Vĩnh Long","id":86},{"name":"Tỉnh Đồng Tháp","id":87},{"name":"Tỉnh An Giang","id":89},{"name":"Tỉnh Kiên Giang","id":91},{"name":"Thành phố Cần Thơ","id":92},{"name":"Tỉnh Hậu Giang","id":93},{"name":"Tỉnh Sóc Trăng","id":94},{"name":"Tỉnh Bạc Liêu","id":95},{"name":"Tỉnh Cà Mau","id":96}]};
const listDistricts = {"data":[{"name":"Huyện Ba Vì","id":271},{"name":"Huyện Chương Mỹ","id":277},{"name":"Huyện Đan Phượng","id":273},{"name":"Huyện Đông Anh","id":17},{"name":"Huyện Gia Lâm","id":18},{"name":"Huyện Hoài Đức","id":274},{"name":"Huyện Mê Linh","id":250},{"name":"Huyện Mỹ Đức","id":282},{"name":"Huyện Phúc Thọ","id":272},{"name":"Huyện Phú Xuyên","id":280},{"name":"Huyện Quốc Oai","id":275},{"name":"Huyện Sóc Sơn","id":16},{"name":"Huyện Thạch Thất","id":276},{"name":"Huyện Thanh Oai","id":278},{"name":"Huyện Thanh Trì","id":20},{"name":"Huyện Thường Tín","id":279},{"name":"Huyện Ứng Hòa","id":281},{"name":"Quận Bắc Từ Liêm","id":21},{"name":"Quận Ba Đình","id":1},{"name":"Quận Cầu Giấy","id":5},{"name":"Quận Đống Đa","id":6},{"name":"Quận Hà Đông","id":268},{"name":"Quận Hai Bà Trưng","id":7},{"name":"Quận Hoàng Mai","id":8},{"name":"Quận Hoàn Kiếm","id":2},{"name":"Quận Long Biên","id":4},{"name":"Quận Nam Từ Liêm","id":19},{"name":"Quận Tây Hồ","id":3},{"name":"Quận Thanh Xuân","id":9},{"name":"Thị xã Sơn Tây","id":269}]};
const listWards = {"data":[{"name":"Thị trấn Đông Anh","id":155},{"name":"Xã Bắc Hồng","id":158},{"name":"Xã Cổ Loa","id":172},{"name":"Xã Đại Mạch","id":170},{"name":"Xã Đông Hội","id":178},{"name":"Xã Dục Tú","id":169},{"name":"Xã Hải Bối","id":173},{"name":"Xã Kim Chung","id":168},{"name":"Xã Kim Nỗ","id":167},{"name":"Xã Liên Hà","id":165},{"name":"Xã Mai Lâm","id":177},{"name":"Xã Nam Hồng","id":160},{"name":"Xã Nguyên Khê","id":159},{"name":"Xã Tầm Xá","id":176},{"name":"Xã Thuỵ Lâm","id":157},{"name":"Xã Tiên Dương","id":161},{"name":"Xã Uy Nỗ","id":163},{"name":"Xã Vân Hà","id":162},{"name":"Xã Vân Nội","id":164},{"name":"Xã Việt Hùng","id":166},{"name":"Xã Vĩnh Ngọc","id":171},{"name":"Xã Võng La","id":175},{"name":"Xã Xuân Canh","id":174},{"name":"Xã Xuân Nộn","id":156}]};


window.jQuery = $;
require('bootstrap');

class EditPosts extends Component {
  constructor(props) {
    super(props);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggle = this.toggle.bind(this);
    const AGENCY_ID = this.props.match.params.id;
    this.state = {
      agencyId: AGENCY_ID,
      activeTab: new Array(4).fill('1'),
      description: "",
      avatarPath: "",
      agency: {
        email: "",
        numberPhone: "",
        address: "",
        name: "",
        tag: "",
        alert: null,
        website: "",
        city_id: "",
        ward_id: "",
        district_id: "",
      },
      isCitiesLoaded: false,
      isLoaded: false,
      isDistrictsLoaded: false,
      isWardsLoaded: false,
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  // updateAgency() {
  //   let requestData = JSON.stringify({company: this.state.agency});
  //   updateCompany(this.state.agencyId, requestData).then(() => {
  //     const getAlert = () => (
  //       <SweetAlert
  //         success
  //         timeout={1500}
  //         onConfirm={() => this.props.history.push('/admin/agencies')}
  //       >
  //         Bạn đã cập nhật thông tin công ty môi giới thành công !
  //       </SweetAlert>
  //     );
  //     this.setState({
  //       alert: getAlert()
  //     });
  //   })
  //     .catch((err) => console.log(err))
  // }

  componentDidMount() {
    // company(this.state.agencyId).then((responseJson) => {
    //   listDistricts(responseJson.data.city_id).then((responseJson) => {
    //     this.setState({all_districts: responseJson.data, isDistrictsLoaded: true});
    //   });
    //   listWards(responseJson.data.district_id).then((responseJson) => {
    //     this.setState({all_wards: responseJson.data, isWardsLoaded: true});
    //   });
    //   this.setState({agency: responseJson.data, isLoaded: true});
    // });
    // listCities().then((responseJson) => {
    //   this.setState({all_cities: responseJson.data, isCitiesLoaded: true});
    // });
    //
    this.setState({agency:company.data, all_cities: listCities.data, all_districts:listDistricts.data, all_wards:listWards.data, isLoaded: true, isDistrictsLoaded: true, isWardsLoaded: true, isCitiesLoaded: true});
  }

  triggerUploadImage() {
    document.getElementById("avatar-path").click();
  }

  uploadImage() {
    let preview = document.querySelector('#logo');
    let file = document.querySelector('#avatar-path').files[0]; //sames as here
    if (file.size < assets.maxSize) {
      let formData = new FormData();
      formData.append("file[new_image_path][]", file);
      upload(formData).then((responseJson) => {
        preview.src = responseJson.data.files[0].relativeUrl;
        this.setState({
          logo: responseJson.data.files[0].imageUrl,
          agency: {
            ...this.state.agency,
            avatar_path: responseJson.data.files[0].relativeUrl
          }
        });

      }, function (error) {
        console.log(error);
      });
    } else {
      const getAlert = () => (
        <SweetAlert
          timeout={1500}
          confirmBtnBsStyle="danger"
          onConfirm={() => this.hideAlert()}
        >
          Kích thước ảnh quá lớn ! Dung lượng tối đa cho ảnh là 10MB.
        </SweetAlert>
      );

      this.setState({
        alert: getAlert()
      });
    }
  }

  hideAlert() {
    this.setState({
      alert: null
    });
    console.log('Hiding alert...');
  }

  onChange(content) {
    this.setState({
      agency: {
        ...this.state.agency,
        description: content
      }
    });
  }

  onImageUpload = (fileList) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      ReactSummernote.insertImage(reader.result);
    };
    reader.readAsDataURL(fileList[0]);
  };

  toggleLarge() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  // onCitySelectorChange() {
  //   let selector = document.getElementById('city_id').value;
  //   this.setState({
  //     agency: {
  //       ...this.state.agency,
  //       city_id: selector,
  //     }
  //   });
  //   listDistricts(selector).then((responseJson) => {
  //     this.setState({all_districts: responseJson.data, isDistrictsLoaded: true});
  //   })
  // }

  // onDistrictSelectorChange() {
  //   let districtId = document.getElementById('district_id').value;
  //   this.setState({
  //     isEditing: true,
  //     agency: {
  //       ...this.state.agency,
  //       district_id: districtId,
  //     }
  //   });
  //   listWards(districtId).then((responseJson) => {
  //     this.setState({all_wards: responseJson.data, isWardsLoaded: true});
  //   });
  // }

  onWardSelectorChange() {
    let selector = document.getElementById('ward_id');
    this.setState({
      agency: {
        ...this.state.agency,
        ward_id: selector.value,
      }
    });

  }

  renderCitiesList() {
    const cities = this.state.all_cities.map((data) => {
        if (data.id === this.state.agency.city_id) {
          return <option selected value={data.id} key={data.id}>{data.name}</option>
        } else {
          return <option value={data.id} key={data.id}>{data.name}</option>
        }
      }
    );
    if (this.state.isCitiesLoaded) {
      return cities
    } else {
      return null
    }
  }

  renderDistrictsList() {
    const all_districts = this.state && (this.state.all_districts || []);
    const districts = all_districts.map((data) => {
        if (data.id === this.state.agency.district_id) {
          return <option selected value={data.id} key={data.id}>{data.name}</option>
        } else {
          return <option value={data.id} key={data.id}>{data.name}</option>
        }
      }
    );
    if (this.state.isDistrictsLoaded) {
      return districts
    } else {
      return null
    }
  }

  renderWardsList() {
    if (this.state.isWardsLoaded) {
      const all_wards = this.state && (this.state.all_wards || []);
      const wards = all_wards.map((data) => {
          if (data.id === this.state.agency.ward_id) {
            return <option selected value={data.id} key={data.id}>{data.name}</option>
          } else {
            return <option value={data.id} key={data.id}>{data.name}</option>
          }
        }
      );
      if (this.state.isWardsLoaded) {
        return wards
      } else {
        return null
      }
    } else {
      return null
    }
  }

  handleChangeData = (event) => {
    let input = event.target;
    this.setState({
      agency:
        {
          ...this.state.agency,
          [input.name]: input.value
        }
    });
  };

  handleInputDispatch = (event) => {
    const target = event.target;
    let name = target.name;
    let value = null;

    if (name.includes("[]")) {
      value = [target.value];
      name = name.replace('[]', '');
    } else {
      value = target.value;
    }


    this.setState({
      agency: {
        ...this.state.agency,
        [name]: value
      }
    }, () => {
    });
  };

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

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <Card>
            <CardBody>
              <div id="Addagency">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="file-input">Ảnh điểm du lịch</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input style={{display: 'none'}} type="file" id="avatar-path" name="avatar-path"
                           onChange={() => this.uploadImage()}/>
                    <img onClick={() => this.triggerUploadImage()} id="logo" height="200"
                         src={this.state.agency.avatar ? this.state.agency.avatar : "/assets/img/logo-placeholder.png"}
                         alt="Logo preview..."/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Tên địa điểm du lịch</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="name" name="name" defaultValue={this.state.agency.name}
                           onChange={(event) => this.handleChangeData(event)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Địa chỉ</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="address" id="address" name="address" autoComplete="address"
                           defaultValue={this.state.agency.address}
                           onChange={(event) => this.handleChangeData(event)}/>
                  </Col>
                </FormGroup>
                {/*<FormGroup row>*/}
                {/*  <Col md="3">*/}
                {/*    <Label htmlFor="text-input">Khu vực</Label>*/}
                {/*  </Col>*/}
                {/*  <Col md="3">*/}
                {/*    <Input type="select" name="city_id" id="city_id" onChange={() => this.onCitySelectorChange()}*/}
                {/*    >*/}
                {/*      <option value="0">Thành phố</option>*/}
                {/*      {this.renderCitiesList(this.state.agency && (this.state.agency.district_id || ""))}*/}
                {/*    </Input>*/}
                {/*  </Col>*/}
                {/*  <Col md="3">*/}
                {/*    <Input type="select" name="district_id" id="district_id"*/}
                {/*           onChange={() => this.onDistrictSelectorChange()} onBlur={this.handleInputDispatch}*/}
                {/*    >*/}
                {/*      <option value="0">Quận,Huyện</option>*/}
                {/*      {this.renderDistrictsList()}*/}
                {/*    </Input>*/}
                {/*  </Col>*/}
                {/*  <Col md="3">*/}
                {/*    <Input type="select" name="ward_id" id="ward_id"*/}
                {/*           onChange={() => this.onWardSelectorChange()}*/}
                {/*           onBlur={this.handleInputDispatch}*/}
                {/*    >*/}
                {/*      <option value="0">Phường</option>*/}
                {/*      {this.renderWardsList()}*/}
                {/*    </Input>*/}
                {/*  </Col>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup row>*/}
                {/*  <Col md="3">*/}
                {/*    <Label htmlFor="password-input">Số điện thoại</Label>*/}
                {/*  </Col>*/}
                {/*  <Col xs="12" md="9">*/}
                {/*    <Input type="numberPhone" id="numberPhone" name="numberPhone" autoComplete="numberPhone"*/}
                {/*           defaultValue={this.state.agency.number_phone}*/}
                {/*           onChange={(event) => this.handleChangeData(event)}/>*/}
                {/*  </Col>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup row>*/}
                {/*  <Col md="3">*/}
                {/*    <Label htmlFor="password-input">Website</Label>*/}
                {/*  </Col>*/}
                {/*  <Col xs="12" md="9">*/}
                {/*    <Input type="text" id="website" name="website" autoComplete="website"*/}
                {/*           defaultValue={this.state.agency.website}*/}
                {/*           onChange={(event) => this.handleChangeData(event)}/>*/}
                {/*  </Col>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup row>*/}
                {/*  <Col md="3">*/}
                {/*    <Label htmlFor="email-input">Email</Label>*/}
                {/*  </Col>*/}
                {/*  <Col xs="12" md="9">*/}
                {/*    <Input type="email" id="email" name="email" autoComplete="email"*/}
                {/*           defaultValue={this.state.agency.email} onChange={(event) => this.handleChangeData(event)}/>*/}
                {/*  </Col>*/}
                {/*</FormGroup>*/}
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="password-input">Tag</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="tag" id="tag" name="tag" autoComplete="tag" defaultValue={this.state.agency.tag}
                           onChange={(event) => this.handleChangeData(event)}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="textarea-input">Giới thiệu về địa điểm du lịch</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <ReactSummernote
                      name="description"
                      id="description"
                      defaultValue={this.state.agency.description}
                      options={{
                        lang: 'ru-RU',
                        height: 100,
                        dialogsInBody: true,
                        toolbar: [
                          ['style', ['style']],
                          ['font', ['bold', 'underline', 'clear']],
                          ['fontname', ['fontname']],
                          ['para', ['ul', 'ol', 'paragraph']],
                          ['table', ['table']],
                          ['insert', ['link', 'picture', 'video']],
                          ['view', ['fullscreen', 'codeview']]
                        ]
                      }}
                      onChange={(content) => this.onChange(content)}
                      onImageUpload={this.onImageUpload}
                    />
                  </Col>
                </FormGroup>
                <div className="form-actions">
                  <Button className="mr-1 btn-danger" type="submit"
                          onClick={() => this.props.history.goBack()}>Hủy</Button>
                  <Button onClick={() => this.toggleLarge()} className="mr-1" type="submit" color="info">Xem
                    trước</Button>
                  <Button className="mr-1 btn-primary" color="primary" type="submit" value="SEND POST"
                          >Cập nhật</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </TabPane>
      </>
    )
      ;
  }

  render() {
    if (!this.state.isLoaded || !this.state.isCitiesLoaded || !this.state.isDistrictsLoaded || !this.state.isWardsLoaded) {
      return <Spinner/>
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">DUYỆT BÀI VIẾT NGƯỜI DÙNG</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" className="mb-4">
              <TabContent activeTab={this.state.activeTab[0]}>
                {this.tabPane()}
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
