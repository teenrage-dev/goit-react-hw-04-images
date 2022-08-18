import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photo, openModal }) => {
  return (
    <ul id="ImageGallery" className={css.ImageGallery}>
      <ImageGalleryItem photo={photo} openModal={openModal} />
    </ul>
  );
};
