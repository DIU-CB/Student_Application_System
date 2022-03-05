export interface IServiceController{
    controller: string;
    apiUrl:string;
}


export interface IWirteService extends IServiceController{
    Save(data:any)
    Put?(id:string, data:any)
    Delete?(id:string)
}

export interface IQueryService extends IServiceController{
    Get: SearchFunc
}

interface Save {
    (apiUrl: string, data: string);
}

interface Put {
    (id: string, data: string);
}

interface Delete extends Put {
    (id: string, data: string);
}

interface SearchFunc {
    (query?:any);
}