const express = require('express');
const router = express.Router();

router.use(function (req, res, next) {
    next();
});

router.post('/', async(req, res) => {
    try {
        if(!req.files){
            res.send({
                status: 500,
                msg: 'No file uploaded'
            })
        } else {
            let avatar = req.files.file;
            avatar.mv('./upload/' + avatar.name);
            res.send({
                status: 200,
                msg: 'File is uploaded',
                data: {
                    name: avatar.name
                }
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;