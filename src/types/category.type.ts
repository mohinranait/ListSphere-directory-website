

export interface ICategory {
    _id: string
    name: string
    slug: string
    icon: string
    type: "image" | "icon"
    status: boolean
    isDelete: boolean
    createdAt: Date
    updatedAt: Date
}