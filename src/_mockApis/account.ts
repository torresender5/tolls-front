import services from 'utils/mockAdapter';

// third-party
import jwt from 'jsonwebtoken';

// project imports
import config from 'config';
import { JWTData } from 'types';

// constant
const JWT_SECRET = config.jwt.secret;
const JWT_EXPIRES_TIME = config.jwt.timeout;

const delay = (timeout: number) => new Promise((res) => setTimeout(res, timeout));

const users = [
    {
        id: '5e86809283e28b96d2d38537',
        email: 'info@codedthemes.com',
        password: '123456'
    },
];

// ==============================|| MOCK SERVICES ||============================== //

services.onPost('/api/account/login').reply(async (request) => {
    try {
        await delay(500);
        const { email, password } = JSON.parse(request.data);
        console.log(email)
        const user = users.find((_user) => _user.email === email);

        if (!user) {
            return [400, { message: 'Verify Your Email & Password' }];
        }

        if (user.password !== password) {
            return [400, { message: 'Invalid Password' }];
        }

        const serviceToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_TIME });

        return [
            200,
            {
                serviceToken,
                user: {
                    id: user.id,
                    email: user.email
                }
            }
        ];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Server Error' }];
    }
});

services.onGet('/api/account/me').reply((request) => {
    try {
        const { Authorization } = request.headers;

        if (!Authorization) {
            return [401, { message: 'Token Missing' }];
        }

        const serviceToken = Authorization.split(' ')[1];
        const jwData = jwt.verify(serviceToken, JWT_SECRET);
        const { userId } = jwData as JWTData;
        const user = users.find((_user) => _user.id === userId);

        if (!user) {
            return [401, { message: 'Invalid Token' }];
        }

        return [
            200,
            {
                user: {
                    id: user.id,
                    email: user.email
                }
            }
        ];
    } catch (err) {
        return [500, { message: 'Server Error' }];
    }
});
