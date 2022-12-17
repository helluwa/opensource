class ApplicationError extends Error {
    constructor(message: string) {
        super()
        this.name = 'ApplicationError'
        this.message = message || 'An application error occured'
    }
}

class DatabaseError extends ApplicationError {
    constructor(message: any,) {
        super(message)
        this.name = "Database Error"
    }
}

export {
    DatabaseError,
    ApplicationError
}
