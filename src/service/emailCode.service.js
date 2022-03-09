const Code = require('../model/emailCode.model');

class EmailCode {
    async saveCode(email, code) {
        const res = await Code.findOne({ where: { email } });
        if(res) {
            const stand = await Code.update({code}, {where:{ email : res.dataValues.email }});
            return stand[0]>0? true:false;
        }else {
            const data = await Code.create({email, code});
            return data.dataValues;
        }
    }

    async findCode(email) {
        const res = await Code.findOne( {where: {email}} );
        return res.dataValues;
    }
}

module.exports = new EmailCode();