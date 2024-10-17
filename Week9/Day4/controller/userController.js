const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // crypto 모듈 : 암호화를 담당
const dotenv = require('dotenv');

dotenv.config();

const join = (req, res) => {
    const { email, password } = req.body;
    let sql = 'INSERT INTO users (email, password, salt) VALUES(?, ?, ?)';

    //password 암호화
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    let values = [email, hashPassword, salt];
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.CREATED).json(results);
        }
    )
};

const login = (req, res) => {
    const { email, password } = req.body;
    let sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql, email,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            console.log(results, results[0]);
            const loginUser = results[0];
            
            //로그인시 , 이메일 과 비밀번호(날 것) ⇒ salt 값 꺼내서 비밀번호 암호화 해보고 ⇒ db에 저장된 값과 비교
            const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');
            
            if (loginUser && loginUser.password == hashPassword) {
                //토큰 발행
                const token = jwt.sign({
                    id : loginUser.id,
                    email: loginUser.email
                }, process.env.PRIVATE_KEY, {
                    expiresIn: '10m',
                    issuer: 'ssomae'
                });

                //토큰 쿠키에 담기
                res.cookie("token", token, {
                    httpOnly: true
                });
                console.log(token);

                return res.status(StatusCodes.OK).json(results);
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).end();
            }
            
        }
    )
};

const passwordResetRequest = (req, res) => {
    const { email } = req.body;

    let sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql, email,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            //이메일이 DB에 있는 정보인지 체크
            const user = results[0];
            if (user) {
                return res.status(StatusCodes.OK).json({
                    email : email
                });
            } else {
                return res.statuts(StatusCodes.UNAUTHORIZED).end();
            }
        }
    )
};

const passwordReset = (req, res) => {
    const { email, password } = req.body;

    let sql = 'UPDATE users SET password = ?, salt = ? WHERE email = ?';
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
    
    let values = [hashPassword,salt, email];
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            if (results.affectedRows === 0)
                return res.status(StatusCodes.BAD_REQUEST).end();
            else
                return res.status(StatusCodes.OK).json(results);
        }
    )
};

module.exports = {
    join,
    login,
    passwordResetRequest,
    passwordReset
};