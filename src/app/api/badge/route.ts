import { NextApiRequest, NextApiResponse } from 'next';

// Define your API route handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Handle different HTTP methods
    if (req.method === 'GET') {
        // Handle GET request
        // Add your logic here
        res.status(200).json({ message: 'GET request handled' });
    } else if (req.method === 'POST') {
        // Handle POST request
        // Add your logic here
        res.status(200).json({ message: 'POST request handled' });
    } else {
        // Handle other HTTP methods
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}