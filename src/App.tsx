import React, { useState } from 'react';
import TabSelector from './TabSelector';
import PageContent from './PageContent';

const App: React.FC = () => {
  const tabsArray: string[] = ["概览", "教学反思记录", "课堂回放", "课程AI分析报告", "评课建议"];
  const [selectedTab, setSelectedTab] = useState<string>(tabsArray[0]);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <TabSelector tabs={tabsArray} onTabChange={handleTabChange} />
      <div style={{ marginTop: '20px' }}>
        {selectedTab === '概览' && <PageContent content="概览" />}
        {selectedTab === '教学反思记录' && <PageContent content="教学反思记录" />}
        {selectedTab === '课堂回放' && <PageContent content="课堂回放" />}
        {selectedTab === '课程AI分析报告' && <PageContent content="课程AI分析报告" />}
        {selectedTab === '评课建议' && <PageContent content="评课建议" />}
      </div>
    </div>
  );
}

export default App;
