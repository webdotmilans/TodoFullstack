import jwt from 'jsonwebtoken';
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn, // Token will expire in 7 days
    });
    return token;
};
//# sourceMappingURL=token-manager.js.map