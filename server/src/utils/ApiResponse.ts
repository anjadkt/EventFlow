export class ApiResponse {

    statusCode: number;
    response: any;
    message: string;
    success: boolean;
    ok: boolean;

    constructor(statusCode: number, response: any, message = "Success") {

        this.statusCode = statusCode;
        this.response = response;
        this.message = message;
        this.success = true;
        this.ok = true

    }
}
