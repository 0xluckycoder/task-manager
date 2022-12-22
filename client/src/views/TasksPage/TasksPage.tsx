import React from "react";
import { AppLayout } from "../../components/layout/AppLayout/AppLayout";
import styles from './tasksPage.module.scss';

export const TaskPage = () => {
    return (
        <div className={styles.wrapper}>
            <AppLayout>
                <div className={styles.page}>
                    <h1>Tasks Page</h1>
                </div>
            </AppLayout>
        </div>
    );
}