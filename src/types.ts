interface ValidationError {
    field: string;
    message: string;
}

export class HTTPError extends Error {
    errors: ValidationError[];
    status: number;

    constructor(status: number, message: string, errors: ValidationError[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.name = this.constructor.name;
    }
}
