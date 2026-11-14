import keyImageUrl from './assets/items/golden-key.png';
import foldedNoteImageUrl from './assets/items/folded-note.png';
import pavementImageUrl from './assets/textures/pavement.png';
import outdoorBgUrl from './assets/backgrounds/sienna-base-with-shadows.png';
import carLeftUrl from './assets/backgrounds/sienna-car-left.png';
import carCenterUrl from './assets/backgrounds/sienna-car-center.png';
import carRightUrl from './assets/backgrounds/sienna-car-right.png';
import idleImageUrl from './assets/characters/tommie-idle.png';
import idleUpImageUrl from './assets/characters/tommie-idle-up.png';
import idleDownImageUrl from './assets/characters/tommie-idle-down.png';
import walkImageUrl from './assets/characters/tommie-walk-right.png';
import walkUpImageUrl from './assets/characters/tommie-walk-up.png';
import walkDownImageUrl from './assets/characters/tommie-walk-down.png';
import siennaRightBgUrl from './assets/backgrounds/sienna-right-base-with-shadows.png';
import siennaRightCarLeftUrl from './assets/backgrounds/sienna-right-car-left.png';
import siennaRightCarCenterUrl from './assets/backgrounds/sienna-right-car-center.png';
import siennaRightCarRightUrl from './assets/backgrounds/sienna-right-car-right.png';

export type AssetImages = {
  keyImage: HTMLImageElement;
  foldedNoteImage: HTMLImageElement;
  pavementImage: HTMLImageElement;
  outdoorBgImage: HTMLImageElement;
  siennaRightBgImage: HTMLImageElement;

  idleImage: HTMLImageElement;
  walkImage: HTMLImageElement;
  walkUpImage: HTMLImageElement;
  walkDownImage: HTMLImageElement;
  idleUpImage: HTMLImageElement;
  idleDownImage: HTMLImageElement;

  carImages: HTMLImageElement[];
  siennaRightCarImages: HTMLImageElement[];
};

export const loadAssets = (drawingFunction: () => void): AssetImages => {
  const keyImage = new Image();
  keyImage.onload = drawingFunction;
  keyImage.onerror = () => {
    console.error('Nie udało się załadować grafiki klucza: ', keyImageUrl);
  };
  keyImage.src = keyImageUrl;

  const foldedNoteImage = new Image();
  foldedNoteImage.onload = drawingFunction;
  foldedNoteImage.onerror = () => {
    console.error('Nie udało się załadować grafiki złożonej kartki: ', foldedNoteImageUrl);
  };
  foldedNoteImage.src = foldedNoteImageUrl;

  const pavementImage = new Image();
  pavementImage.onload = drawingFunction;
  pavementImage.onerror = () => {
    console.error('Nie udało się załadować tekstury chodnika: ', pavementImageUrl);
  };
  pavementImage.src = pavementImageUrl;

  const outdoorBgImage = new Image();
  outdoorBgImage.onload = drawingFunction;
  outdoorBgImage.onerror = () => {
    console.error('Nie udało się wczytać grafiki tła:', outdoorBgUrl);
  };
  outdoorBgImage.src = outdoorBgUrl;

  const siennaRightBgImage = new Image();
  siennaRightBgImage.onload = drawingFunction;
  siennaRightBgImage.onerror = () => {
    console.error('Nie udało się tła prawej części ulicy Siennej: ', siennaRightBgUrl);
  };
  siennaRightBgImage.src = siennaRightBgUrl;

  const idleImage = new Image();
  idleImage.onload = drawingFunction;
  idleImage.onerror = () => {
    console.error('Nie udało się wczytać animacji bezczynności:', idleImageUrl);
  };
  idleImage.src = idleImageUrl;

  const idleUpImage = new Image();
  idleUpImage.onload = drawingFunction;
  idleUpImage.onerror = () => {
    console.error('Nie udało się wczytać animacji bezczynności w górę:', idleUpImageUrl);
  };
  idleUpImage.src = idleUpImageUrl;

  const idleDownImage = new Image();
  idleDownImage.onload = drawingFunction;
  idleDownImage.onerror = () => {
    console.error('Nie udało się wczytać animacji bezczynności w dół:', idleDownImageUrl);
  };
  idleDownImage.src = idleDownImageUrl;

  const walkImage = new Image();
  walkImage.onload = drawingFunction;
  walkImage.onerror = () => {
    console.error('Nie udało się wczytać animacji chodu:', walkImageUrl);
  };
  walkImage.src = walkImageUrl;

  const walkUpImage = new Image();
  walkUpImage.onload = drawingFunction;
  walkUpImage.onerror = () => {
    console.error('Nie udało się wczytać animacji chodu w górę:', walkUpImageUrl);
  };
  walkUpImage.src = walkUpImageUrl;

  const walkDownImage = new Image();
  walkDownImage.onload = drawingFunction;
  walkDownImage.onerror = () => {
    console.error('Nie udało się wczytać animacji chodu w dół:', walkDownImageUrl);
  };
  walkDownImage.src = walkDownImageUrl;

  const carImages = [carLeftUrl, carCenterUrl, carRightUrl].map((url) => {
    const img = new Image();

    img.onload = drawingFunction;
    img.onerror = () => {
      console.error('Nie udało się wczytać grafiki samochodu:', url);
    };
    img.src = url;

    return img;
  });

  const siennaRightCarImages = [
    siennaRightCarLeftUrl,
    siennaRightCarCenterUrl,
    siennaRightCarRightUrl,
  ].map((url) => {
    const image = new Image();
    image.onload = drawingFunction;
    image.onerror = () => {
      console.error('Nie udało się wczytać samochodu prawej części ulicy Siennej: ', url);
    };
    image.src = url;

    return image;
  });

  return {
    keyImage,
    foldedNoteImage,
    pavementImage,
    outdoorBgImage,
    siennaRightBgImage,
    carImages,
    siennaRightCarImages,
    idleImage,
    walkImage,
    walkUpImage,
    walkDownImage,
    idleUpImage,
    idleDownImage,
  };
};
