import { Request, Response } from "express";

interface ControllerInterface {
  list?(req: Request, res: Response, next: any): Response | Promise<any>;
  save?(req: Request, res: Response, next: any): Response | Promise<any>;
  detail?(req: Request, res: Response, next: any): Response | Promise<any>;
  update?(req: Request, res: Response, next: any): Response | Promise<any>;
  delete?(req: Request, res: Response, next: any): Response | Promise<any>;
}
export default ControllerInterface;
