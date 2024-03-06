import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: true,
  },
  {
    name: 'Metehan',
    email: 'metehanmuradoglu17@gmail.com',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: false,
  },
];

export default users;
