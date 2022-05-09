module.exports = (server, chai) => {

    describe('User Routes:', () => {

        // beforeEach((done) => {
        //     User.remove({}, (err) => {
        //         done();
        //     });
        // });

        describe('/api/users/getinfo', () => {
            it('it should GET all the User Info', (done) => {
                chai.request(server)
                    .get('/api/users/getinfo')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(2);
                        done();
                    });
            });
        });



    });
};