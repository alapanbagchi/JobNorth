// Serveractiontype can take <T> as a generic type and pass it to data

type ServerActionResponse<T = any> = {
    success: boolean;
    message: string;
    data?: T; // `data` is optional and will be of type T if `success` is true
} & (true extends (T extends undefined ? false : true) ? { data: T } : {});