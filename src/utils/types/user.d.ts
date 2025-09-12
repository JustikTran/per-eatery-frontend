interface IUser {
    Id: string,
    Username: string,
    Password: string,
    Email: string,
    Phone: string,
    Role: string,
    IsBanned: boolean,
    Actived: boolean,
    CreatedAt: Date,
    UpdatedAt: Date
}

interface IReqUser {
    Username: string,
    Password: string,
    Email: string,
    Phone: string,
    Role: string,
}