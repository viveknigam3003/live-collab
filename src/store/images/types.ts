export enum ImageActions {
  FETCH_IMAGES = "Images/FETCH_IMAGES",
  FETCH_IMAGES_SUCCESS = "Images/FETCH_IMAGES_SUCCESS",
  FETCH_IMAGES_ERROR = "Images/FETCH_IMAGES_ERROR",
}

export type Image = {
  id: string;
  width: number;
  height: number;
  download_url: string;
  author: string;
};
