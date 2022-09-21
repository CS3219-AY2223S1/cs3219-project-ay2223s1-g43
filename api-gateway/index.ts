import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authorization } from "./auth";
import userRoutes from "./user-service-routes";

const ORIGIN_URL = process.env.ORIGIN_URL || "http://localhost:3000/";

const app = express();
app.use(
  cors({
    credentials: true,
    // TODO: fix this to rely on ORIGIN_URL
    origin: /http:\/\/localhost:3000\/*/,
  })
);

app.use(cookieParser());
app.use("/api/user", userRoutes, createProxyMiddleware({ target: `http://localhost:8000`, changeOrigin: true }));
app.use("/socket.io", authorization, createProxyMiddleware({ target: `http://localhost:8001`, changeOrigin: true, ws: true }));

app.use(function(_, res){
  return res.status(401).json({ message: "Data not found!"});
});

app.listen(3001, () => console.log("api gateway listening on port 3001"));
