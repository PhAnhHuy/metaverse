const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://Shan:SPGShan58743@cluster73036.evdifvq.mongodb.net/metaverse?retryWrites=true&w=majority&appName=mongosh+2.2.12'
        )
        console.log('success');
    } catch (error) {
        console.log('error');
    }
};

module.exports = { connect };
