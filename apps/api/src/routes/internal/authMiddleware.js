import { verifyFrontend } from "../../auth/handler";
import { prisma } from "../../lib/db";
const DEBUG = false; // NB! Change to false before committing.
export default async function internalAuthMiddleware(c, next) {
    // Skip all checks for the test endpoint
    if (c.req.path === '/api/test') {
        if (DEBUG) {
            console.debug("Middleware debug - inserting test variable into request context");
        }
        c.set("test", true);
        return next();
    }
    const FEKey = c.req.header("x-fe-key");
    if (DEBUG) {
        console.debug("Middleware debug - API key header:", FEKey);
    }
    if (!FEKey) {
        return c.json({ ok: false, message: "API key is required" }, 400);
    }
    const apiKeyVerified = await verifyFrontend(FEKey);
    if (!apiKeyVerified) {
        return c.json({ ok: false, message: "Invalid API key" }, 401);
    }
    const userId = c.req.header("x-user-id");
    if (userId) {
        const user = await prisma(c.env).user.findUnique({
            where: {
                id: userId,
            },
        });
        if (user) {
            c.set("user", user);
        }
    }
    return next();
}
