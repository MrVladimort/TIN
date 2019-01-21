export interface IAccessConfig {
    mailer: {
        from: string,
        service: string,
        auth: {
            pass: string,
            user: string,
        },
    };
}

const config: IAccessConfig = {
    mailer: {
        from: "tin_pro@pjwstk.edu.pl",
        auth: {
            pass: "vhp1234567890",
            user: "vladyslav.hravchenko.tester@gmail.com",
        },
        service: "gmail",
    },
};

export default config;
