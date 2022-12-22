import React from "react";
import { TopNav } from "../../TopNav/TopNav";
import { SideNav } from "../../SideNav/SideNav";
import styles from './appLayout.module.scss';

type Props = {
    children?: React.ReactNode;
};

export const AppLayout = ({ children }: Props): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <TopNav />
            <SideNav />
            {children}
        </div>
    );
}