// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type Product from '@prtypes/Product';

type Data = Product[];

const data: Data = [
  {
    id: 'f111111',
    title: 'Drink Fig & Lime',
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: 8,
    count: 10,
    category: 'drink',
    img: '/static/f20.png',
  },
  {
    id: 'f111112',
    title: 'Burger Waldo',
    price: 5,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'burger',
    img: '/static/f12.png',
  },
  {
    id: 'f111113',
    title: 'Salad Ceaser',
    price: 10,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'side',
    img: '/static/f18.png',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(data);
}
