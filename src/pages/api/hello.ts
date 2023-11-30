// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getCookies, setCookie, deleteCookie } from 'cookies-next';

type Data = {
  msg: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("REQUEST", req.method, req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    // Allow all OPTIONS requests for all origins

    return res.status(200).json({msg: "Hello"});
  }
  setCookie("test-same-site-none", "test-none", { 
    req,res,
    sameSite: "none",
    httpOnly: true,
  });
  
  if (req.method === "POST") {
    console.log("POST REQUEST, setHeaderTING COOKIE");
    setCookie("test-same-site-lax", "test-lax", {
      req,res,
      sameSite: "lax",
      httpOnly: true,
    });
    setCookie("test-same-site-none", "test-none", {
      req,res,
      sameSite: "none",
      httpOnly: true,
    });
  } else {
   // console.log("COOKIES FOR NON POSt REQUEST", req.cookies);
  }
  res.json({ msg: "Hello World!" });
}
