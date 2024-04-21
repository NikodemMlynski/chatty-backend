import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean,
): Promise<UploadApiResponse | UploadApiErrorResponse> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
      },
      (error: UploadApiErrorResponse | any, result: UploadApiResponse | any) => {
        if (error) resolve(error);
        resolve(result);
      },
    );
  });
}
