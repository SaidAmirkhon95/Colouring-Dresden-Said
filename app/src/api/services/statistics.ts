import path from 'path';

import db from '../../db';

interface ByDay_Row {
    date: Date;
    label: string;
    value: number;
}
interface ByDay {
    date: Date;
    label: string;
    value: number;
}


interface ValueOnly_Row {
    value: number;
}
interface ValueOnly {
    value: number;
}

interface ValueCount_Row {
    value: string;
    count: number;
}
interface ValueCount {
    value: string;
    count: number;
}

async function service_TodayNumberNewAccounts(): Promise<ByDay[]> {
    try {
        const extractRecords = await db.manyOrNone<ByDay_Row>(
            `SELECT to_char(t.day::date, 'YYYY-MM-DD') AS "date",
                to_char(t.day::date, 'DD.MM.YYYY') AS "label",
                COALESCE(requested_data.count,0) AS "value" 
            FROM generate_series(CURRENT_DATE
                             , CURRENT_DATE
                             , interval  '1 day') AS t(day)
            LEFT JOIN
                (SELECT COUNT(*) AS "count", DATE_TRUNC ('day', registered)::date AS "date" 
                FROM public.users 
                WHERE registered::date = CURRENT_DATE::timestamp 
                GROUP BY DATE_TRUNC ('day', registered)) AS requested_data
            ON t.day::date=requested_data.date`
        );

        return extractRecords.map(getByDay);
    } catch (err) {
        console.error('Error:', err);
        return undefined;
    }
}


async function service_TodayNumberAccountsTotal(): Promise<ValueOnly[]> {
    try {
        const extractRecords = await db.manyOrNone<ValueOnly_Row>(
            `SELECT COUNT(*) AS "value" FROM public.users`
        );

        return extractRecords.map(getValueOnly);
    } catch (err) {
        console.error('Error:', err);
        return undefined;
    }
}


async function service_TodayNumberActiveAccounts(): Promise<ByDay[]> {
    try {
        const extractRecords = await db.manyOrNone<ByDay_Row>(
            `SELECT to_char(t.day::date, 'YYYY-MM-DD') AS "date",
                to_char(t.day::date, 'DD.MM.YYYY') AS "label",
                COALESCE(requested_data.count,0) AS "value" 
            FROM generate_series(CURRENT_DATE
                             , CURRENT_DATE
                             , interval  '1 day') AS t(day)
            LEFT JOIN
                (SELECT DATE_TRUNC ('day', log_timestamp) AS "date", COUNT (DISTINCT user_id) AS "count" FROM public.logs 
                WHERE log_timestamp::date = CURRENT_DATE::timestamp
                GROUP BY DATE_TRUNC ('day', log_timestamp)) AS requested_data
            ON t.day::date=requested_data.date`
        );

        return extractRecords.map(getByDay);
    } catch (err) {
        console.error('Error:', err);
        return undefined;
    }
}

async function service_TodayNumberEdits(): Promise<ByDay[]> {
    try {
        const extractRecords = await db.manyOrNone<ByDay_Row>(
            `SELECT to_char(t.day::date, 'YYYY-MM-DD') AS "date",
                to_char(t.day::date, 'DD.MM.YYYY') AS "label",
                COALESCE(requested_data.count,0) AS "value" 
            FROM generate_series(CURRENT_DATE
                             , CURRENT_DATE
                             , interval  '1 day') AS t(day)
            LEFT JOIN
                (SELECT COUNT(*) AS "count", DATE_TRUNC ('day', log_timestamp) AS "date" 
                FROM public.logs 
                WHERE log_timestamp::date = CURRENT_DATE::timestamp 
                AND user_id NOT IN (SELECT user_id FROM public.users WHERE username LIKE '%_robots')
                GROUP BY DATE_TRUNC ('day', log_timestamp)) AS requested_data
            ON t.day::date=requested_data.date`
        );

        return extractRecords.map(getByDay);
    } catch (err) {
        console.error('Error:', err);
        return undefined;
    }
}

async function service_TodayNumberMappedAttributes(): Promise<ByDay[]> {
    try {
        const extractRecords = await db.manyOrNone<ByDay_Row>(
            `SELECT to_char(t.day::date, 'YYYY-MM-DD') AS "date",
                to_char(t.day::date, 'DD.MM.YYYY') AS "label",
                COALESCE(requested_data.sum,0) AS "value" 
            FROM generate_series(CURRENT_DATE
                             , CURRENT_DATE
                             , interval  '1 day') AS t(day)
            LEFT JOIN
                (SELECT DATE_TRUNC ('day', src.log_timestamp) AS "date", SUM(src.anzahl_merkmale) AS "sum" FROM 
                (
                    SELECT *, 
                    (SELECT COUNT(*) FROM jsonb_object_keys(forward_patch)) AS anzahl_merkmale
                    FROM public.logs 
                    WHERE log_timestamp::date = CURRENT_DATE::timestamp 
                    AND user_id NOT IN (SELECT user_id FROM public.users WHERE username LIKE '%_robots')
                    ORDER BY log_timestamp DESC
                ) AS src
            GROUP BY DATE_TRUNC ('day', src.log_timestamp)) AS requested_data
            ON t.day::date=requested_data.date`
        );

        return extractRecords.map(getByDay);
    } catch (err) {
        console.error('Error:', err);
        return undefined;
    }
}

async function service_ByDayNumberNewAccounts(): Promise<ByDay[]> {
    try {
        const extractRecords = await db.manyOrNone<ByDay_Row>(
            `SELECT to_char(t.day::date, 'YYYY-MM-DD') AS "date",
                to_char(t.day::date, 'DD.MM.YYYY') AS "label",
                COALESCE(requested_data.count,0) AS "value" 
            FROM generate_series(timestamp '2023-03-06'
                             , CURRENT_DATE
                             , interval  '1 day') AS t(day)
            LEFT JOIN
                (SELECT COUNT(*) AS "count", DATE_TRUNC ('day', registered)::date AS "date" 
                FROM public.users 
                WHERE registered > '2023-03-06 00:00:00'::timestamp 
                AND registered <= NOW()::timestamp 
                GROUP BY DATE_TRUNC ('day', registered)) AS requested_data
            ON t.day::date=requested_data.date`
        );

        return extractRecords.map(getByDay);
    } catch (err) {
        console.error('Error:', err);
        return undefined;
    }
}

async function service_ByDayNumberActiveAccounts(): Promise<ByDay[]> {
    try {
        const extractRecords = await db.manyOrNone<ByDay_Row>(
            `SELECT to_char(t.day::date, 'YYYY-MM-DD') AS "date",
                to_char(t.day::date, 'DD.MM.YYYY') AS "label",
                COALESCE(requested_data.count,0) AS "value" 
            FROM generate_series(timestamp '2023-03-06'
                             , CURRENT_DATE
                             , interval  '1 day') AS t(day)
            LEFT JOIN
                (SELECT DATE_TRUNC ('day', log_timestamp) AS "date", COUNT (DISTINCT user_id) AS "count" FROM public.logs 
                WHERE log_timestamp > '2023-03-06 00:00:00'::timestamp 
                AND log_timestamp <= NOW()::timestamp
                GROUP BY DATE_TRUNC ('day', log_timestamp)) AS requested_data
            ON t.day::date=requested_data.date`
        );

        return extractRecords.map(getByDay);
    } catch (err) {
        console.error('Error:', err);
        return undefined;
    }
}

async function service_ByDayNumberEdits(): Promise<ByDay[]> {
    try {
        const extractRecords = await db.manyOrNone<ByDay_Row>(
            `SELECT to_char(t.day::date, 'YYYY-MM-DD') AS "date",
                to_char(t.day::date, 'DD.MM.YYYY') AS "label",
                COALESCE(requested_data.count,0) AS "value" 
            FROM generate_series(timestamp '2023-03-06'
                             , CURRENT_DATE
                             , interval  '1 day') AS t(day)
            LEFT JOIN
                (SELECT COUNT(*) AS "count", DATE_TRUNC ('day', log_timestamp) AS "date" 
                FROM public.logs 
                WHERE log_timestamp > '2023-03-06 00:00:00'::timestamp 
                AND log_timestamp <= NOW()::timestamp 
                AND user_id NOT IN (SELECT user_id FROM public.users WHERE username LIKE '%_robots')
                GROUP BY DATE_TRUNC ('day', log_timestamp)) AS requested_data
            ON t.day::date=requested_data.date`
        );

        return extractRecords.map(getByDay);
    } catch (err) {
        console.error('Error:', err);
        return undefined;
    }
}

async function service_ByDayNumberMappedAttributes(): Promise<ByDay[]> {
    try {
        const extractRecords = await db.manyOrNone<ByDay_Row>(
            `SELECT to_char(t.day::date, 'YYYY-MM-DD') AS "date",
                to_char(t.day::date, 'DD.MM.YYYY') AS "label",
                COALESCE(requested_data.sum,0) AS "value" 
            FROM generate_series(timestamp '2023-03-06'
                             , CURRENT_DATE
                             , interval  '1 day') AS t(day)
            LEFT JOIN
                (SELECT DATE_TRUNC ('day', src.log_timestamp) AS "date", SUM(src.anzahl_merkmale) AS "sum" FROM 
                    (
                        SELECT *, 
                        (SELECT COUNT(*) FROM jsonb_object_keys(forward_patch)) AS anzahl_merkmale
                        FROM public.logs 
                        WHERE log_timestamp > '2023-03-06 00:00:00'::timestamp 
                        AND log_timestamp <= NOW()::timestamp 
                        AND user_id NOT IN (SELECT user_id FROM public.users WHERE username LIKE '%_robots')
                        ORDER BY log_timestamp DESC
                    ) AS src
                GROUP BY DATE_TRUNC ('day', src.log_timestamp)) AS requested_data
            ON t.day::date=requested_data.date`
        );

        return extractRecords.map(getByDay);
    } catch (err) {
        console.error('Error:', err);
        return undefined;
    }
}




async function service_HistogramByAttribute(field: string): Promise<ValueCount[]> {
    try {
        const extractRecord = await db.manyOrNone<ValueCount_Row>(
            `SELECT ${field} AS "value", 
                COUNT(*) AS "count"
            FROM public.buildings
            WHERE ${field} IS NOT NULL
            GROUP BY ${field}
            ORDER BY "count" DESC, "value" ASC
            `);

        return extractRecord.map(getValueCount);
    } catch (err) {
        console.error('Error:', err);
        return undefined;
    }
}


function getByDay(er: ByDay_Row): ByDay {
    return {
        date: er.date,
        label: er.label,
        value: er.value
    };
}
function getValueOnly(er: ValueOnly_Row): ValueOnly {
    return {
        value: er.value
    };
}
function getValueCount(er: ValueCount_Row): ValueCount {
    return {
        value: er.value,
        count: er.count
    };
}

export {
    service_TodayNumberNewAccounts,
    service_TodayNumberAccountsTotal,
    service_TodayNumberActiveAccounts,
    service_TodayNumberEdits,
    service_TodayNumberMappedAttributes,
    service_ByDayNumberNewAccounts,
    service_ByDayNumberActiveAccounts,
    service_ByDayNumberEdits,
    service_ByDayNumberMappedAttributes,
    service_HistogramByAttribute
};
