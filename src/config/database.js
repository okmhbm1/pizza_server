require('dotenv').config();

const common = {
  // charset: 'utf8mb4', // utf8 + 이모티콘
  // collate: 'utf8mb4_general_ci', // utf8 + 이모티콘 getneral 또는 unicode 적용
  // logging: true,
  // // query: {
  // //   raw: true, // ! 이 옵션 넣으면 result.get에러 발생! 넣지말기^^
  // // },
  // underscored: true,
  // dialectOptions: {
  //   useUTC: true, //for reading from database
  //   dateStrings: true, // ! 데이터 로드시 문자열로 가저옴
  //   typeCast: true, // ! 타임존을 역으로 계산하지 않음
  // },
  timezone: '+09:00', //for writing to database
};

module.exports = {
  // development: {
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_DATABASE,
  //   host: process.env.DB_HOST,
  //   dialect: 'mysql',
  //   logging: process.env.IS_DEBUG == 1 ? true : false,
  //   ...common,
  // },
  development: {
    username: 'root',
    password: null,
    database: process.env.DB_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: process.env.IS_DEBUG == 1 ? true : false,
    ...common,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: process.env.IS_DEBUG == 1 ? true : false,
    ...common,
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: process.env.IS_DEBUG == 1 ? true : false,
    ...common,
  },
};
