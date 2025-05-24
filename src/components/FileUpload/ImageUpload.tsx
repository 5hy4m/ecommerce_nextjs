import React, { useState, useCallback } from 'react';
import styles from './ImageUpload.module.css';
import type { Preview, ImageUploadProps } from './ImageUpload.types';

const defaultSupportedTypes = ['image/jpeg', 'image/png', 'image/webp'];

export default function ImageUpload({
    onImagesUpload,
    maxSizeMB = 5,
    acceptedTypes = defaultSupportedTypes,
    maxImages = 5,
}: ImageUploadProps) {
    const [dragActive, setDragActive] = useState(false);
    const [previews, setPreviews] = useState<Preview[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const validateFile = (file: File): boolean => {
        if (!acceptedTypes.includes(file.type)) {
            setError(
                `Please upload valid image files ${defaultSupportedTypes}`,
            );
            return false;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File size should be less than ${maxSizeMB}MB`);
            return false;
        }

        return true;
    };

    const processFiles = useCallback(
        (files: FileList) => {
            setError(null);

            const newFiles: Preview[] = [];
            const validFiles: File[] = [];

            Array.from(files).forEach((file) => {
                if (previews.length + newFiles.length >= maxImages) {
                    setError(`You can only upload up to ${maxImages} images`);
                    return;
                }

                if (validateFile(file)) {
                    const url = URL.createObjectURL(file);
                    newFiles.push({ url, file });
                    validFiles.push(file);
                }
            });

            if (newFiles.length > 0) {
                setPreviews((prev) => [...prev, ...newFiles]);
                onImagesUpload?.([
                    ...previews.map((p) => p.file),
                    ...validFiles,
                ]);
            }
        },
        [previews, maxImages, onImagesUpload, maxSizeMB, acceptedTypes],
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                processFiles(e.dataTransfer.files);
            }
        },
        [processFiles],
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();

            if (e.target.files && e.target.files.length > 0) {
                processFiles(e.target.files);
            }
        },
        [processFiles],
    );

    const removeImage = useCallback(
        (index: number) => {
            setPreviews((prev) => {
                const newPreviews = [...prev];
                URL.revokeObjectURL(newPreviews[index].url);
                newPreviews.splice(index, 1);
                onImagesUpload?.(newPreviews.map((p) => p.file));
                return newPreviews;
            });
            setError(null);
        },
        [onImagesUpload],
    );

    return (
        <div className={styles.container}>
            <div
                className={`${styles.dropzone} ${
                    dragActive ? styles.dropzoneDragActive : ''
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type='file'
                    accept={acceptedTypes.join(',')}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    multiple
                    id='image-upload-input'
                />
                <label
                    htmlFor='image-upload-input'
                    className={styles.dropzoneText}
                >
                    Drop images here or click to upload
                    <div className={styles.dropzoneSubText}>
                        {`Upload up to ${maxImages} images (${acceptedTypes
                            .map((type) => type.split('/')[1])
                            .join(', ')})`}
                    </div>
                </label>
                {error && <p className={styles.errorText}>{error}</p>}
            </div>

            {previews.length > 0 && (
                <div className={styles.previewGrid}>
                    {previews.map((preview, index) => (
                        <div key={preview.url} className={styles.previewItem}>
                            <img
                                src={preview.url}
                                alt={`Preview ${index + 1}`}
                                className={styles.previewImage}
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className={styles.removeButton}
                                aria-label='Remove image'
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
