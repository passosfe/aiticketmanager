import { Request, Response } from 'express';

class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'ok' });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'ok' });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'ok' });
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'ok' });
  }
}

export default new UserController();
