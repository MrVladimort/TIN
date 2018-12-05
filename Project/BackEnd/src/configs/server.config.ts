export interface IServerConfig {
    port: number
    dbURI: string,
    dbOptions: {
        useNewUrlParser: boolean,
    }
}

const config: IServerConfig = {
    port: 3000,
    dbURI: "mongodb://admin:admin123@ds127094.mlab.com:27094/tin_pro",
    dbOptions: {
        useNewUrlParser: true,
    }
};

export default config;