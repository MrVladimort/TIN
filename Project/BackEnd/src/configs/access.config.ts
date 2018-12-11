export interface IAccessConfig {
    mailer: {
        service: string,
        auth: {
            pass: string,
            user: string,
        },
    };
}

const config: IAccessConfig = {
    mailer: {
        auth: {
            pass: "vhp1234567890",
            user: "vladyslav.hravchenko.tester@gmail.com",
        },
        service: "gmail",
    },
};

export default config;
