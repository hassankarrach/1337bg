import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    if (req.query.redirectTo === '/ranking') {
      res.writeHead(302, { Location: '/ranking' });
    } else {
      res.writeHead(302, { Location: '/' });
    }
    return res.end();
  }

  return res.status(404).end();
}
