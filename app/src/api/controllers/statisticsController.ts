import express from 'express';

import { parsePositiveIntParam, processParam, checkRegexParam, checkParamByAllowList } from '../parameters';
import asyncController from '../routes/asyncController';
import * as statisticsService from '../services/statistics';

const getTodayNumberNewAccounts = asyncController(async function(req: express.Request, res: express.Response) {
    try {
        const dataObj = await statisticsService.service_TodayNumberNewAccounts();
        res.send({ data : dataObj });
    } catch (err) {
        res.send({ error: 'Database error' });
    }
});

const getTodayNumberAccountsTotal = asyncController(async function(req: express.Request, res: express.Response) {
    try {
        const dataObj = await statisticsService.service_TodayNumberAccountsTotal();
        res.send({ data : dataObj });
    } catch (err) {
        res.send({ error: 'Database error' });
    }
});

const getTodayNumberActiveAccounts = asyncController(async function(req: express.Request, res: express.Response) {
    try {
        const dataObj = await statisticsService.service_TodayNumberActiveAccounts();
        res.send({ data : dataObj });
    } catch (err) {
        res.send({ error: 'Database error' });
    }
});

const getTodayNumberEdits = asyncController(async function(req: express.Request, res: express.Response) {
    try {
        const dataObj = await statisticsService.service_TodayNumberEdits();
        res.send({ data : dataObj });
    } catch (err) {
        res.send({ error: 'Database error' });
    }
});

const getTodayNumberMappedAttributes = asyncController(async function(req: express.Request, res: express.Response) {
    try {
        const dataObj = await statisticsService.service_TodayNumberMappedAttributes();
        res.send({ data : dataObj });
    } catch (err) {
        res.send({ error: 'Database error' });
    }
});

const getByDayNumberNewAccounts = asyncController(async function(req: express.Request, res: express.Response) {
    try {
        const dataObj = await statisticsService.service_ByDayNumberNewAccounts();
        res.send({ data : dataObj });
    } catch (err) {
        res.send({ error: 'Database error' });
    }
});

const getByDayNumberActiveAccounts = asyncController(async function(req: express.Request, res: express.Response) {
    try {
        const dataObj = await statisticsService.service_ByDayNumberActiveAccounts();
        res.send({ data : dataObj });
    } catch (err) {
        res.send({ error: 'Database error' });
    }
});

const getByDayNumberEdits = asyncController(async function(req: express.Request, res: express.Response) {
    try {
        const dataObj = await statisticsService.service_ByDayNumberEdits();
        res.send({ data : dataObj });
    } catch (err) {
        res.send({ error: 'Database error' });
    }
});

const getByDayNumberMappedAttributes = asyncController(async function(req: express.Request, res: express.Response) {
    try {
        const dataObj = await statisticsService.service_ByDayNumberMappedAttributes();
        res.send({ data : dataObj });
    } catch (err) {
        res.send({ error: 'Database error' });
    }
});






/* validating input param for :field */
const getHistogramByAttribute = asyncController(async function(req: express.Request, res: express.Response) {
    /* allowList for allowed fieldnames as parameter for this API endpoint */
    let allowed_fieldnames: string[] = ['date_year', 'facade_year', 'size_storeys_attic', 'size_storeys_core', 'size_storeys_basement', 'building_attachment_form', 'construction_core_material', 'construction_secondary_materials', 'construction_roof_covering', 'is_domestic', 'use_building_origin', 'use_building_current', 'basement_type', 'basement_percentage', 'basement_use', 'ground_storey_use', 'upper_storeys_use', 'use_number_residential_units', 'use_number_businesses', 'building_status', 'last_renovation', 'construction_system_type', 'size_roof_shape', 'building_owner', 'architectural_style'];

    /* first: check input param with regex */
    /* second: check input param if string is in allowlist for fieldnames */
    /* RegEx: only letters and underline are allowed */
    const fieldRegex = /[A-Za-z_]/;
    
    const field = checkParamByAllowList(processParam(req.params, 'field', x => checkRegexParam(x, fieldRegex)), allowed_fieldnames);

    try {
        const dataObj = await statisticsService.service_HistogramByAttribute(field);
        res.send({ data : dataObj });
    } catch (err) {
        res.send({ error: 'Database error' });
    }
});

export default {
    getTodayNumberNewAccounts,
    getTodayNumberAccountsTotal,
    getTodayNumberActiveAccounts,
    getTodayNumberEdits,
    getTodayNumberMappedAttributes,
    getByDayNumberNewAccounts,
    getByDayNumberActiveAccounts,
    getByDayNumberEdits,
    getByDayNumberMappedAttributes,
    getHistogramByAttribute
};
