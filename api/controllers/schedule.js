const logger = require(`../../config/winston`);

function getList(req, res, next) {
    try {
        res.json({ status: 'OK', message: 'TEST OK!' });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

function addItem(req, res, next) {
    try {
        let params = req.swagger.params.body.value;
        res.status(200).json({ status: 'OK', message: 'TEST OK!', params });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

function deleteItem(req, res, next) {
    try {
        let params = req.swagger.params;
        res.status(200).json({ status: 'OK', message: 'TEST OK!', params });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

function operateItem(req, res, next) {
    try {
        let params = req.swagger.params.body.value;
        res.status(200).json({ status: 'OK', message: 'TEST OK!', params });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

function updateItem(req, res, next) {
    try {
        let params = req.swagger.params.body.value;
        res.status(200).json({ status: 'OK', message: 'TEST OK!', params });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

function saveConfig(req, res, next) {
    try {
        res.json({ status: 'OK', message: 'TEST OK!' });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

module.exports = {
    getList,
    addItem,
    deleteItem,
    operateItem,
    updateItem,
    saveConfig
};
