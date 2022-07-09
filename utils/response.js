export const makeResponse = async (res, statusCode, message, payload = null, meta = {}) =>
    new Promise(resolve => {
        res.status(statusCode)
            .send({
                httpCode: statusCode,
                message,
                data: payload,
                meta
            });
    resolve(statusCode);
});

export const status = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}

export const message = {
    PRODUCT_NOT_FOUND: "The Product you are searching for is out of Stock!",
    PRODUCT_ADDDED: "Congratulations! Your Product is Put For Sale...",
    PRODUCT_UPDATED: "Cool! Your Product Is Updated,,,",
    PRODUCT_FETCHED: "The products you are searching for are....",
    ERROR: "OOPS! Something went Wrong..."
}