module.exports = (server, chai) => {

    describe('Alert Routes:', () => {

        describe('/api/alert/getall', () => {
            it('it should GET all Alerts', (done) => {
                chai.request(server)
                    .get('/api/alert/getall')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });
    });
};