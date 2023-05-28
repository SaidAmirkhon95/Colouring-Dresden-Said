import express from 'express';

import statisticsController from '../controllers/statisticsController';

const router = express.Router();

/* router.get('/', statisticsController.getAllDataExtracts); */
/* router.get('/:extract_id', statisticsController.getDataExtract); */
router.get('/today/number_new_accounts', statisticsController.getTodayNumberNewAccounts);
router.get('/today/number_accounts_total', statisticsController.getTodayNumberAccountsTotal);
router.get('/today/number_active_accounts', statisticsController.getTodayNumberActiveAccounts);
router.get('/today/number_edits', statisticsController.getTodayNumberEdits);
router.get('/today/number_mapped_attributes', statisticsController.getTodayNumberMappedAttributes);
router.get('/by_day/number_new_accounts', statisticsController.getByDayNumberNewAccounts);
router.get('/by_day/number_active_accounts', statisticsController.getByDayNumberActiveAccounts);
router.get('/by_day/number_edits', statisticsController.getByDayNumberEdits);
router.get('/by_day/number_mapped_attributes', statisticsController.getByDayNumberMappedAttributes);
router.get('/histogram/by_attribute/:field', statisticsController.getHistogramByAttribute);


export default router;
