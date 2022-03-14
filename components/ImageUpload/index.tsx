import { SyntheticEvent, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './ImageUpload.module.scss';
import Button from '@components/Button';

export interface UploadFileHandlerEvent extends SyntheticEvent {
  target: HTMLInputElement;
}

interface ImageUploadProps {
  onChange: (e: UploadFileHandlerEvent) => void;
}

const ImageUpload = ({ onChange }: ImageUploadProps) => {
  const [image, setImage] = useState<string | undefined>();
  const refInput = useRef<HTMLInputElement>(null);

  const handleUpload = (e: UploadFileHandlerEvent) => {
    if (onChange) onChange(e);
    const reader = new FileReader();
    const files = e.target.files as FileList;

    reader.onload = function (e: ProgressEvent<FileReader>) {
      const target = e.target as FileReader;
      const result = target.result as string;
      setImage(result);
    };

    reader.readAsDataURL(files[0]);
  };

  const handleClick = () => {
    const current = refInput.current as HTMLInputElement;
    current.click();
  };

  return (
    <div className={styles.container}>
      <label htmlFor="file-input">
        <Button outline small onClick={handleClick}>
          Choose Image
        </Button>
        <input
          ref={refInput}
          id="file-input"
          className={styles.input}
          type="file"
          onChange={handleUpload}
        />
      </label>

      {image && <Image height={45} width={45} src={image} alt="img" />}
      {!image && (
        <Image height={45} width={45} src="/static/noimage.png" alt="img" />
      )}
    </div>
  );
};

export default ImageUpload;
