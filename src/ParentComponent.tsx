import React, { useState } from 'react';
import TabSelector from './TabSelector'; 
import PageContent from './PageContent'; 

// 定义选项卡的名称数组
const tabs = ['Tab 1'];

// 定义父组件
const ParentComponent: React.FC = () => {
  // 使用useState钩子初始化selectedTab状态，默认值为第一个选项卡
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  // 定义处理选项卡切换的函数
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab); // 更新selectedTab状态
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* 渲染TabSelector组件，传递选项卡数组和切换处理函数 */}
      <TabSelector tabs={tabs} onTabChange={handleTabChange} />
      <div style={{ width: '100%', marginTop: '20px' }}>
        {/* 根据selectedTab的值渲染不同的PageContent组件 */}
        {selectedTab === 'Tab 1' && <PageContent content="Content for Tab 1" />}
      </div>
    </div>
  );
};

export default ParentComponent;
