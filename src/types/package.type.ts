
export interface IPackageOption {
    name: string;
    access: boolean;
}

export interface IPackage {
    _id: string;
    name: string;
    price: number;
    priority: number;
    postLimit: number;
    suggestion: boolean;
    status: boolean;
    isDelete: boolean;
    options:IPackageOption[]
}