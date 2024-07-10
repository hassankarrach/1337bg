import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = req.headers.authorization || '';
  const { promoId } = req.query;

  try {
    const response = await fetch(
      `https://api.intra.42.fr/v2/cursus_users?&filter[campus_id]=21&filter[begin_at]=${Promos[promoId].start_date}&page[size]=100&page[number]=1&sort=-level`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();

    const usersWithRankAndGender = data.map((user: any, index: number) => ({
      ...user,
      originalRank: index + 1,
      Gender: getGender(user.user.first_name.trim()),
    }));

    res.status(200).json(usersWithRankAndGender);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
}
