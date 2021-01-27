import jwt from "express-jwt";
import jwtAuthz from "express-jwt-authz";
import jwksRsa from "jwks-rsa";
import config from "../util/config";

// Pass the checkJwt and checkScopes middlewares to the route you want to protect.

/** If the token is not valid, the user gets a 401 Authorization error when they try to access the endpoints.
 *  The middleware doesn't check if the token has the sufficient scope to access the requested resources. */
export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.auth.auth0.domain}/.well-known/jwks.json`,
  }),
  audience: `${config.auth.auth0.audience}`,
  issuer: `${config.auth.auth0.issuer}`,
  algorithms: ["RS256"],
});

/** Only the Access Tokens with the read:messages scope can access the endpoint. */
export const checkScopes = jwtAuthz(["read:messages"]);

/* Example ususage

Check only JWT
router.get("/api/private", checkJwt, (req, res) => {
  res.status(200).json({
    message: "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

Check only JWT and Scope
router.get("/api/private", checkJwt, checkScopes, (req, res) => {
  res.status(200).json({
    message: "Hello from a private endpoint! You need to be authenticated to see this.",
  });
}); 

*/
