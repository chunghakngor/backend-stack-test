import express from "express";
import config from "../util/config";
import { requiresAuth } from "express-openid-connect";
const router = express.Router();

export const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: config.auth.auth0.secret,
  baseURL: `http://${config.server.SERVER_HOSTNAME}:${config.server.SERVER_PORT}`,
  clientID: config.auth.auth0.clientID,
  issuerBaseURL: "https://chungh.au.auth0.com",
  // returnTo: `http://${config.server.SERVER_HOSTNAME}:${config.server.SERVER_PORT}/auth`,
};

router.get("/auth", (req: any, res) => {
  res.status(200).json({
    status: req.oidc.isAuthenticated(),
  });
});

router.get("/auth/profile", requiresAuth(), (req: any, res) => {
  res.status(200).json(req.oidc.user);
});

export default router;
