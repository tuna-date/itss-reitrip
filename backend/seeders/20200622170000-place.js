'use strict';
const faker=require('faker');

let seedPlaces = [];
const imageUrls = [
  'https://huesmiletravel.com.vn/wp-content/uploads/2019/11/vinh-ha-long-1.jpg',
  'https://znews-photo.zadn.vn/w660/Uploaded/jac_iik/2014_08_08/11_2.jpg',
  'https://dacotours.com/wp-content/uploads/2019/10/cac-dia-diem-du-lich-viet-nam.jpg',
  'https://static2.yan.vn/YanNews/2167221/201709/20170905-083003-h1_600x410.jpg',
  'https://dacotours.com/wp-content/uploads/2019/10/dia-diem-du-lich-viet-nam.jpg',
  'https://we25.vn/media2018/Img_News/2019/03/03/goc-tu-hao-viet-nam-duoc-tap-chi-forbes-binh-chon-vao-top-14-diem-den-cua-nam-2019_20190303111608.jpg',
  'https://2sao.vietnamnetjsc.vn/images/2018/09/05/17/25/nhung-dia-diem-dep-10.jpg',
  'https://wish.edu.vn/wp-content/uploads/2017/08/Th%C3%A1p_R%C3%B9a_6.jpg',
  'https://du-lich.chudu24.com/f/m/1302/20/10-dia-diem-du-lich-dep-nhat-viet-nam-10.jpg',
  'https://images.foody.vn/images/bana.jpg',
  'https://cdn.24h.com.vn/upload/3-2018/images/2018-09-05/1536115718-55-15-dia-diem-dep-nhat-viet-nam-ban-da-check-in-duoc-bao-nhieu-diem-roi-2-1536035094-width640height427.jpg',
  'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/Phong-Nha-Ke-Bang-1.png',
  'https://phongnhatourist.com/wp-content/uploads/2017/07/s%C3%B4ng.1.jpg',
]

for (let i = 0; i < 50; i++) {
  seedPlaces.push({
    name: `VietNam Next Top Place ${i}`,
    location: 'VietNam',
    image_url: imageUrls[Math.floor(Math.random() * imageUrls.length)],
    services: 'Học làm giàu cùng thầy Huấn',
    state: 'confirmed',
    user_id: Math.floor(Math.random()*100 + 1),
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('places', seedPlaces);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
