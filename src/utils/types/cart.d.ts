interface ICart {
    Id: string,
    UserId: string,
    Thumbnail: string,
    Items?: ICartItem[],
    Total?: number,
    CreatedAt: Date,
    UpdatedAt: Date
}

interface ICartItem {
    Id?: string,
    DishId: string,
    Dish: IDish,
    Thumbnail: string,
    Quantity: number,
    CardId?: string,
    CreatedAt: Date,
    UpdatedAt: Date
}

interface ICartItemCreate {
    DishId: string,
    Thumbnail: string,
    Quantity: number,
}