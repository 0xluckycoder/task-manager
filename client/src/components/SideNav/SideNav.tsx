import React, { useState, useRef, useEffect } from "react";
import styles from './sideNav.module.scss';
import { Input } from "antd";
import userProfile from '../../assets/user.svg';
import searchIcon from '../../assets/search-icon.svg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export const SideNav = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.accountCard}>
                <img src={userProfile} alt="user profile" />
                <div className={styles.text}>
                    <p>Johnathan Doe</p>
                    <p>jdoe.organization@gmail.com</p>
                </div>
            </div>
            <div className={styles.searchBar}>
                <Input 
                    size="small" 
                    placeholder="Search"
                    prefix={
                        <img src={searchIcon} alt="search icon" />
                    } 
                />
            </div>
            <div className={styles.menuItems}>
                <MenuItem />
                <MenuItem />
                {/* <MenuItem /> */}
            </div>
            {/* <div className={styles.menuItem}>
            </div> */}
        </div>
    );
}



const MenuItem = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMenu = (): void => {
        setIsExpanded(isExpanded => !isExpanded);
    }

    return (
        <div className={styles.menuItem}>
            <div 
                onClick={() => toggleMenu()} 
                className={`${styles.workflowItem} ${isExpanded && styles.activeWorkFlowItem}`}
            >
                <div className={styles.left}>
                    <FontAwesomeIcon icon={faCodeBranch} />
                    <p>App Project</p>
                </div>
                <div className={styles.downChevron}>
                    {
                        isExpanded ? 
                        <FontAwesomeIcon icon={faChevronUp} />
                        :
                        <FontAwesomeIcon icon={faChevronDown} />
                    }
                </div>
            </div>
            <div className={`${styles.taskItems} ${isExpanded || styles.expanded}`}>
                <div className={styles.taskItem}>
                    <p>Design</p>
                    <p>0%</p>
                </div>
                <div className={`${styles.taskItem} ${styles.taskItemsActive}`}>
                    <p>Development</p>
                    <p>0%</p>
                </div>
                <div className={styles.taskItem}>
                    <p>Deployment</p>
                    <p>0%</p>
                </div>
            </div>
        </div>
    )
}