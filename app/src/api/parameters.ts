import { strictParseInt } from '../parse';

import { ApiParamError, ApiParamInvalidFormatError, ApiParamRequiredError } from './errors/api';


export function processParam<T>(params: object, paramName: string, processingFn: (x: string) => T, required: boolean = false) {
    const stringValue = params[paramName];

    if(stringValue == undefined && required) {
        const err = new ApiParamRequiredError('Parameter required but not supplied');
        err.paramName = paramName;
        throw err;
    }

    try {
        return processingFn(stringValue);
    } catch(error) {
        if(error instanceof ApiParamError) {
            error.paramName = paramName;
        }
        
        throw error;
    }
}

export function parsePositiveIntParam(param: string) {
    if(param == undefined) return undefined;
    
    const result = strictParseInt(param);
    if (isNaN(result)) {
        throw new ApiParamInvalidFormatError('Invalid format: not a positive integer');
    }
    return result;
}

export function parseBooleanParam(param: string) {
    if(param == undefined) return undefined;

    if(param === 'true') return true;
    if(param === 'false') return false;

    throw new ApiParamInvalidFormatError('Invalid format: not a true/false value');
}

export function checkRegexParam(param: string, regex: RegExp): string {
    if(param == undefined) return undefined;

    if(param.match(regex) == undefined) {
        throw new ApiParamInvalidFormatError(`Invalid format: does not match regular expression ${regex}`);
    }
    
    return param;
}
/* checking input paramter by given allowlist (of fieldnames e.g.) */
export function checkParamByAllowList(param: string, allowlist:string[]): string {
    if(param == undefined) return undefined;
    
    if(allowlist.indexOf(param) == -1) {
        throw new ApiParamInvalidFormatError(`Invalid format: does not match given values in allowlist ${allowlist}`);
    }
    
    return param;
}