export type Preview = {
    url: string;
    file: File;
};

export interface ImageUploadProps {
    onImagesUpload?: (files: File[]) => void;
    maxSizeMB?: number;
    acceptedTypes?: string[];
    maxImages?: number;
}
