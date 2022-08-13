import React, { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

import { InfinitySpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import MovingComponent from 'react-moving-text';
import { Button } from './Button/Button';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Button } from './Button/Button';

export class App extends Component {
  state = {
    value: '',
    page: 1,
    photo: null,
    status: 'idle',
    error: null,
    isOpen: false,
    largeImgURL: '',
  };

  componentDidMount() {
    window.addEventListener('click', this.handleClickList);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickList);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, value } = this.state;

    if (prevState.value !== value || prevState.page !== page) {
      this.setState({
        status: 'pending',
      });
      fetch(
        `https://pixabay.com/api/?q=${value}&page=${page}&key=28032528-2733f4db32465b2bae0fa9703&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(
              `The query with the name ${value} does not exist. Try another one.`
            )
          );
        })
        .then(data => {
          if (data.hits.length === 0) {
            return Promise.reject(new Error(`No results found.`));
          }
          return this.setState(prevState => ({
            photo:
              page === 1 ? [...data.hits] : [...prevState.photo, ...data.hits],
            status: 'resolved',
          }));
        })
        .catch(err => {
          this.setState({
            status: 'rejected',
            error: err,
          });
        });
    }
  }

  handleSubmitForm = value => {
    this.setState({ value, page: 1 });
  };

  handleClickList = e => {
    if (e.target.tagName === 'IMG') {
      this.openModal(e.target.dataset.largeImg);
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = largeImgURL => {
    this.setState({
      isOpen: true,
      largeImgURL,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
      largeImgURL: '',
    });
  };

  render() {
    const { status, photo, isOpen, error, largeImgURL } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {status === 'idle' && (
          <div className={css.ImageGalleryWrapper}>
            <MovingComponent
              type="pulse"
              duration="1000ms"
              delay="0s"
              direction="normal"
              timing="ease"
              iteration="infinite"
              fillMode="none"
            >
              <h2 className={css.IdleText}> Enter The Text</h2>
            </MovingComponent>
          </div>
        )}
        {status === 'pending' && (
          <div className={css.ImageGalleryContainer}>
            <InfinitySpin width="200" color="#3f51b5" />
          </div>
        )}
        {status === 'rejected' && toast.error(`${error}`)}

        {status === 'resolved' && (
          <>
            <ul id="ImageGallery" className={css.ImageGallery}>
              <ImageGalleryItem photo={photo} />
            </ul>
            <Button onClick={this.loadMore} />
            {isOpen && (
              <Modal onClose={this.closeModal} largeImgURL={largeImgURL} />
            )}
          </>
        )}
      </div>
    );
  }
}
