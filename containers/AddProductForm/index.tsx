import { useState, useRef, SyntheticEvent } from 'react';
import Input from '@components/Input';
import Textarea from '@components/Input/Textarea';
import Button from '@components/Button';
import styles from './AddProductForm.module.scss';
import ImageUpload from '@components/ImageUpload';
import { uploadFile } from '@fireb/storage';
import { addProduct } from '@fireb/db/product';
import {
  ProductCategoryOptions,
  ProductCategory as ProductCategoryType,
} from '@prtypes/Product';
import { UploadFileHandlerEvent } from '@components/ImageUpload';

interface AddProductFormContainerProps {
  onAddProduct?: () => void;
}

const AddProductFormContainer = ({
  onAddProduct,
}: AddProductFormContainerProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [count, setCount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState<ProductCategoryType>(
    ProductCategoryOptions.drink
  );

  const change =
    (propName: string) =>
    (
      e: SyntheticEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const target = e.target as HTMLInputElement;
      if (propName === 'name') setName(target.value);
      if (propName === 'price') setPrice(target.value);
      if (propName === 'count') setCount(target.value);
      if (propName === 'category') {
        const target = e.target as HTMLSelectElement;
        setCategory(target.value);
      }
      if (propName === 'description') {
        const target = e.target as HTMLTextAreaElement;
        setDescription(target.value as ProductCategoryType);
      }
    };

  const handleImageUpload = ({ target }: UploadFileHandlerEvent) => {
    const files = target.files as FileList;
    setFile(files[0]);
  };

  const handleAddProduct = () => {
    if (!file || !name || !description || !price || !count || !category) return;

    const product = {
      title: name,
      description,
      price: Number(price),
      count: Number(count),
      category: category as ProductCategoryType,
    };

    uploadFile(file).then(({ url }) => {
      addProduct({
        ...product,
        img: url,
      })
        .then(() => {
          if (onAddProduct) onAddProduct();
        })
        .catch((error) => console.error(error));
    });
  };

  return (
    <div className={`form-container ${styles.container}`}>
      <h1 className="title color-primary">Add Product</h1>
      <form
        action=""
        className={`form ${styles.form}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <Input
            value={name}
            onChange={change('name')}
            name="name"
            className="input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="price">Price</label>
          <Input
            value={price}
            onChange={change('price')}
            name="price"
            type="number"
            className="input"
            min={0}
          />
        </div>
        <div className="input-container">
          <label htmlFor="count">Count</label>
          <Input
            value={count}
            onChange={change('count')}
            name="count"
            type="number"
            className="input"
            min={0}
          />
        </div>
        <div className="input-container">
          <label htmlFor="category">Category</label>
          <select
            value={category}
            onChange={change('category')}
            name="category"
            className="input"
          >
            <option value={ProductCategoryOptions.drink}>Drink</option>
            <option value={ProductCategoryOptions.burger}>Burger</option>
            <option value={ProductCategoryOptions.side}>Side</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label>
          <Textarea
            value={description}
            onChange={change('description')}
            rows={3}
            name="description"
            className={`input ${styles.textarea}`}
          />
        </div>
        <div className="input-container">
          <ImageUpload onChange={handleImageUpload} />
        </div>
        <div className="input-container">
          <Button primary filled small onClick={handleAddProduct}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductFormContainer;
