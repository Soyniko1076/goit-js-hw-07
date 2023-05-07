import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const itemsMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);
galleryContainer.addEventListener('click', onImgClick);

function createGalleryItemsMarkup(items) {
  return items.map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function onImgClick(event) {
 event.preventDefault();
  if (event.target.nodeName !== "IMG") return;

  const isItemImage = event.target.classList.contains('gallery__image');
  if (!isItemImage) return;

  const currentImgUrl = event.target.dataset.source;

  const instance = basicLightbox.create(`<img src="${currentImgUrl}" width="1280" height="auto"/>`,
    {
      onShow: (instance) => {
        window.addEventListener('keydown', onEscKeyPress);
      },
      onClose: (instance) => {
        window.removeEventListener('keydown', onEscKeyPress);
      },
    }
  );
  instance.show();

 function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = e.code === ESC_KEY_CODE;
    if (!isEscKey) return;
    instance.close();
  }
}

