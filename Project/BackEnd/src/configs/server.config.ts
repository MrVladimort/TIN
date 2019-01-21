export interface IServerConfig {
    serverUrl: string;
    port: number;
    dbURI: string;
    dbOptions: {
        useNewUrlParser: boolean,
        useCreateIndex: boolean,
    };
    jwt: {
        accessSecret: string,
        refreshSecret: string,
        accessOptions: {
            expiresIn: string,
        },
        refreshOptions: {
            expiresIn: string,
        },
    };
}

const config: IServerConfig = {
    serverUrl: "localhost:8080",
    port: 8080,
    dbURI: "mongodb://admin:admin123@ds127094.mlab.com:27094/tin_pro",
    dbOptions: {
        useNewUrlParser: true,
        useCreateIndex: true,
    },
    jwt: {
        accessSecret: "accessSecret",
        refreshSecret: "refreshSecret",
        accessOptions: {
            expiresIn: "1d",
        },
        refreshOptions: {
            expiresIn: "7d",
        },
    },
};

export default config;
