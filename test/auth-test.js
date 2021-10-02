let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api/auth';

describe('AUTH',() => {
    it('Register', (done) => {
        chai.request(url)
        .post('/register')
        .send({name: "Yamil", password: 123456, email: 'yamilm61@gmail.com'})
        .end( function(err, res){            
            expect(res).to.have.status(200);            
            done();
        });
    });
    
    it('Login', (done) => {
        chai.request(url)
        .post('/login')
        .send({password: 123456, email: 'yamilm61@gmail.com'})
        .end( function(err, res){                       
            expect(res).to.have.status(200);            
            expect(res.body).to.have.property('token');         
            done();
        });
    });    
});