export class TransferError extends Error {
    errors: {
        columnName: string;
        message: string;
    }[] = []
}