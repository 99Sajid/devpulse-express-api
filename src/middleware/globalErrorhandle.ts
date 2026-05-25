import type { NextFunction, Request, Response } from "express";


const globalErrorhandler=(error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error.message
  });
}
export default globalErrorhandler;