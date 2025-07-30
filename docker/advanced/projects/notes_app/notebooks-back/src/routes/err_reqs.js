export const ErrRequest = (code, msg) => {
    const err = new Error(msg)
    err.status = code
    return err
}   