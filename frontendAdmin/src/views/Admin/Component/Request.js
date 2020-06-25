export const doRequest = async (method, urlContent, formData) => {
  let token = localStorage.getItem('token');
  let url = "http://3.227.9.224:8888/api" + urlContent;
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "authorization":token,
    },
    body: formData,
    credentials: "same-origin"
  });
  return response.json();
};

export const upload = async (formData) => {
  let token = localStorage.getItem('token');
  let url = "http://3.227.9.224:8888/api" + '/files';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "authorization": "Bearer " + token,
    },
    body: formData,
  });
  return response.json();
};
export const uploadfile = async (formData) => {
  // let token = localStorage.getItem('token');
  let url = "http://127.0.0.1:5000/" + 'files';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // "authorization": "Bearer " + token,
    },
    body: formData,
  });
  return response.json();
};

const getData = (urlContent) => {
  return doRequest('GET', urlContent, undefined)
};

const postData = (urlContent, formData,header) => {
  return doRequest('POST', urlContent, formData, header)
};
const putData = (urlContent, formData) => {
  return doRequest('PUT', urlContent, formData)
};
const patchData = (urlContent, formData) => {
  return doRequest('PATCH', urlContent, formData)
};
const deleteData = (urlContent, formData) => {
  return doRequest('DELETE', urlContent, formData)
};

//API lấy thông tin của một người dùng theo id
export const getUserData = (id) => {
  return getData("/users/" + id)
};

//API lấy thông tin người dùng đang login
export const currentUser = () => {
  return getData("/auth/currentUser/")
};

//lấy danh sách user
export const user = () => {
  return getData("/users")
};

//login tài khoản
export const login = (formData) => {
  return postData('/admin/login', formData)
};

//tạo tài khoản mới
export const register = (formData) => {
  return postData('/auth/register',formData)
}

//lấy danh sách địa điểm mới đăng kí
export const registeredPosts = () => {
  return getData("/admin/places")
}

//lấy danh sách địa điểm hiện tại
export const posts = () => {
  return getData("/places")
}

//lấy thông tin của một địa điểm
export const place = (id) => {
  return getData("/places/" + id)
}

//lấy danh sách bài đăng theo địa điểm
export const listposts = (id) => {
  return getData("/places/"+id+"/posts")
}

//lấy thông tin một bài đăng
export const post = (placeId,id) => {
  return getData("/places/" + placeId + "/posts/" + id)
}

//lấy danh sách các comment trong một bài post
export const comments = (placeId,id) => {
  return getData("/places/" + placeId + "/posts/" + id + "/comments")
}

//xóa địa điểm
export const deletePlace = (id) => {
  return deleteData("/admin/places", JSON.stringify({"id":id}));
}

//xóa bình luận
export const deleteComment = (placeId, postId, commentId) => {
  return deleteData("/places/" + placeId + "/posts/" + postId + "/comments", JSON.stringify({"id": commentId}));
}

//xóa người dùng
export const deleteUser = (id) => {
  return deleteData("/admin/users", JSON.stringify({"user_id": id}));
}

//xóa bài đăng
export const deletePost = (placeId, postId) => {
  return deleteData("/places/" + placeId + "/posts", JSON.stringify({"id": postId}));
}


//xác thực địa điểm
export const confirmPlace = (id) => {
  return postData("/admin/places", JSON.stringify({"id":id, "state": "confirmed"}));
}

//hủy địa điểm
export const rejectPlace = (id) => {
  return postData("/admin/places", JSON.stringify({"id":id, "state": "rejected"}));
}
