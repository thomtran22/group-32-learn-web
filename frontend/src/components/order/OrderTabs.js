import React from 'react';
import { ORDER_TABS } from '../../utils/orderHelpers';

const OrderTabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="tabs-wrapper">
            <ul className="tabs-list">
                {ORDER_TABS.map(tab => (
                    <li 
                        key={tab.id}
                        className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderTabs;