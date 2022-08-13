import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    photo: PropTypes.array,
  };

  render() {
    const { photo } = this.props;
    return (
      <>
        {photo?.map(item => {
          return (
            <li className={css.ImageGalleryItem} key={item.id}>
              <img
                src={item.webformatURL}
                alt={item.tags}
                className={css.ImageGalleryItemImage}
                data-large-img={item.largeImageURL}
                loading="lazy"
              />
            </li>
          );
        })}
      </>
    );
  }
}
