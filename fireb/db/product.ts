import db from '@fireb/db';
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  limit as addLimit,
  startAfter,
  orderBy,
  endBefore,
  limitToLast,
} from 'firebase/firestore';
import ProductType from '@prtypes/Product';

interface GetProductParams {
  limit?: number;
  nextPage?: ProductType;
  prevPage?: ProductType;
  category?: string;
  order?: string;
}

type GetProductsType = (
  p?: GetProductParams
) => Promise<ProductType[]> | unknown;

export const addProduct = async (product: Omit<ProductType, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      title: product.title,
      description: product.description,
      price: product.price,
      count: product.count,
      category: product.category,
      img: product.img,
    });
    return docRef;
  } catch (error) {
    console.error(error);
  }
};

export const getProduts: GetProductsType = async ({
  limit = 10,
  nextPage,
  prevPage,
  category,
  order = 'title',
} = {}) => {
  const productsRef = collection(db, 'products');

  const filter = [orderBy(order)];

  if (category) {
    filter.push(where('category', '==', category));
  }

  if (nextPage && order) {
    filter.push(startAfter(nextPage[order as keyof ProductType]));
  }

  if (prevPage && order) {
    filter.push(endBefore(prevPage[order as keyof ProductType]));
    filter.push(limitToLast(11));
  } else {
    filter.push(addLimit(limit));
  }

  const productsQuery = await query(productsRef, ...filter);
  const res = await getDocs(productsQuery);

  return res.docs.map((p) => {
    return { id: p.id, ...p.data() };
  });
};

export const deleteProduct = async (id: string) => {
  return deleteDoc(doc(db, 'products', id));
};
