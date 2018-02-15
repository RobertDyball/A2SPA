import { Injectable } from '@angular/core';
import { ErrorResponse } from '../models/errorResponse';

@Injectable()
export class ErrorMessageService {

    constructor() { }

    formattedErrorResponse(error: ErrorResponse[]): string {
        var plural = (error.length > 0) ? 's' : '';
        var errorMessage = "Error" + plural + ": ";
        for (var i = 0; i < error.length; i++) {
            if (error.length > 0) errorMessage += "(" + (i + 1) + ") ";
            errorMessage += "field: " + error[0].memberNames + ", error: " + error[0].errorMessage;
            if (i < error.length) errorMessage += ", ";
        }
        return errorMessage;
    }

    showSuccess(title: string, message: string) {
    }

    showError(title: string, message: string) {
    }
}
