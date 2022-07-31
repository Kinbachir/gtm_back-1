import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getStockSetting, upsertStockSetting } from './stockSettingController';
const router = express.Router();


router.get('/', checkToken, getStockSetting)

router.post('/', checkToken, upsertStockSetting)

module.exports = router;