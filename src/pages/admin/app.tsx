import React from 'react';
import styles from './AdminDashboard.module.css';
import ImageUpload from '@/components/FileUpload/ImageUpload';

export default function AdminDashboard() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>Admin Dashboard</h1>
            </header>
            <div className={styles.layout}>
                <aside className={styles.sidebar}>
                    <nav>
                        <div className={styles.uploadText}>Image Upload</div>
                    </nav>
                </aside>
                <main className={styles.main}>
                    <ImageUpload
                        onImagesUpload={(files) => {
                            console.log(files);
                        }}
                        maxSizeMB={5}
                        maxImages={5}
                    />
                </main>
            </div>
        </div>
    );
}
