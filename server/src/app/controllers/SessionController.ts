import { Request, Response } from 'express';

class SessionController {
  public async store(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'ok' });
  }
}

export default new SessionController();
