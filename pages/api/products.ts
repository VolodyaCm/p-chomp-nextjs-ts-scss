// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type Product from '@prtypes/Product';

type Data = {
  next: string;
  data: Product[];
};

const products: Product[] = [
  {
    id: 'f111111',
    title: 'Drink Fig & Lime',
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: 4,
    count: 10,
    category: 'drink',
    img: '/static/f20.png',
  },
  {
    id: 'f111112',
    title: 'Drink Liquor',
    price: 7,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'drink',
    img: '/static/f21.png',
  },
  {
    id: 'f111113',
    title: 'Drink Lime',
    price: 4,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'drink',
    img: '/static/f22.png',
  },
  {
    id: 'f111114',
    title: 'Drink Cola',
    price: 3,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'drink',
    img: '/static/f23.png',
  },
  {
    id: 'f111115',
    title: 'Salad Ceaser',
    price: 6,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'side',
    img: '/static/f16.png',
  },
  {
    id: 'f111116',
    title: 'Beans Slow Cooked',
    price: 4,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'side',
    img: '/static/f17.png',
  },
  {
    id: 'f111117',
    title: 'Fries Cheese',
    price: 5,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'side',
    img: '/static/f18.png',
  },
  {
    id: 'f111118',
    title: 'Fries Rustic',
    price: 4,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'side',
    img: '/static/f19.png',
  },
  {
    id: 'f111119',
    title: 'Burger Dreams',
    price: 9.2,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'burger',
    img: '/static/f10.png',
  },
  {
    id: 'f111120',
    title: 'Burger Waldo',
    price: 10,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'burger',
    img: '/static/f11.png',
  },
  {
    id: 'f111121',
    title: 'Burger Cali',
    price: 8,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'burger',
    img: '/static/f12.png',
  },
  {
    id: 'f111122',
    title: 'Burger Bacon Buddy',
    price: 9.99,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'burger',
    img: '/static/f13.png',
  },
  {
    id: 'f111123',
    title: 'Burger Spicy',
    price: 9.2,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'burger',
    img: '/static/f14.png',
  },
  {
    id: 'f111124',
    title: 'Burger Classic',
    price: 8,
    count: 10,
    description:
      // eslint-disable-next-line max-len
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'burger',
    img: '/static/f15.png',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { category, size = 10, offset = 0 } = req.query;
  let data = products;

  if (category) {
    data = data.filter((p) => p.category === category);
  }

  if (offset && !isNaN(Number(offset))) {
    data = data.slice(Number(offset));
  }

  if (size && !isNaN(Number(size))) {
    data = data.slice(0, Number(size));
  }

  res.status(200).json({
    next: `http://localhost:3000/api/products?offset=${
      Number(size) + Number(offset)
    }&size=${size}`,
    data,
  });
}
