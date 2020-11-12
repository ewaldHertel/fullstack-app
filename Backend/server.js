const express = require('express');
const app = express();
const cors = require('cors')
const db = require('./persistence/mysql');
const fileUpload = require('express-fileupload');
const customerRoutes = require('./routes/customerRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use(cors());
app.use(fileUpload({
    createParentPath: true
}));
app.use(require('body-parser').json());
app.use('/api', customerRoutes);
app.use('/upload', uploadRoutes);
app.use('/public', express.static('upload'));

app.listen(8000);