import config from "../../Config/strings";
import {Component} from 'react';

class GetComponent extends Component {

  static async doRequest(method, urlContent, formData) {
    let token = localStorage.getItem('token');
    let url = config.api_url + urlContent;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      },
      body: formData,
      credentials: "same-origin"
    });
    return response.json();
  }

  static async getData(urlContent) {
    return this.doRequest('GET', urlContent, undefined)
  };

  static putData(urlContent, formData) {
    return this.doRequest('PUT', urlContent, formData);
  }

  static postData(urlContent, formData) {
    return this.doRequest('POST', urlContent, formData);
  }

  static patchData(urlContent, formData) {
    return this.doRequest('PATCH', urlContent, formData);
  }

  static deleteData(urlContent, formData) {
    return this.doRequest('DELETE', urlContent, formData);
  }

  /*
  *API lấy thông tin của một người dùng
   */
  static getUserData(id) {
    return this.getData("/users/" + id)
  }

  /*
  *API cập nhật thông tin người dùng
   */
  static updateAccount(id, formData) {
    return this.putData("/users/" + id, formData)
  }

  /*
  *API upload file
   */
  static upload(formData) {
    return this.putData('/files', formData)
  }
}

export default GetComponent;
