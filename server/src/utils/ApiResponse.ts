export class ApiResponse {

    status: number;
    data: any;
    message: string;
    success: boolean;
    ok: boolean;

    constructor(statusCode: number, response: any, message = "Success") {

        this.status = statusCode;
        this.data = response;
        this.message = message;
        this.success = true;
        this.ok = true

    }
}
