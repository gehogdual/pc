import bcrypt from 'bcryptjs';

const data = {
    users: [
      {
          name: 'Boss',
          email: 'admin@sample.com',
          password: bcrypt.hashSync('12345', 8),
          isAdmin: true,

      },
      {
        name: 'user',
        email: 'user@sample.com',
        password: bcrypt.hashSync('12345', 8),
        isAdmin: false,

    },
    ],
    products: [
     {
         
         name:'NZXT build',
         category:'PC',
         image:'/images/p1.jpg',
         price:999,
         countInStock: 5,
         brand:'NZXT',
         rating:4.0,
         numReviews:10,
         description: 'CPU: i5 8700| \ 8g ram| \ gtx 1080ti| \ Good air flow 30-50 C',
                       
     },
     {
        
        name: 'Custom build',
        category: 'Custom build',
        image: '/images/p2.jpg',
        price: 1200,
        countInStock: 3,
        brand: 'Our brand',
        rating: 3.0,
        numReviews: 5,
        description: 'CPU: i7 9700k| \ 16gb ram| \rtx 2080 super| \ Bad air flow 90-105 C',
      },
      
    ],
};
export default data;