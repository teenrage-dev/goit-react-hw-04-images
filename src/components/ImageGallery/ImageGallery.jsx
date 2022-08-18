import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photo }) => {
  return (
    <ul id="ImageGallery" className={css.ImageGallery}>
      <ImageGalleryItem photo={photo} />
    </ul>
  );
};
