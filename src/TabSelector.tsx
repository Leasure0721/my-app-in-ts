import React, { useState, useEffect, useRef } from 'react';

// 定义组件的 props 类型
interface TabSelectorProps {
  tabs: string[];
  onTabChange: (tab: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ tabs, onTabChange }) => {
  // 使用状态钩子来管理选中的标签，初始值为数组中的第一个标签
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  // 使用状态钩子来管理选中的标签索引，初始值为0
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  // 使用ref来存储每个按钮的引用
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // 使用ref来存储容器的引用
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 定义更新白色方框位置的函数
    const updateWhiteBoxPosition = () => {
      if (tabRefs.current[selectedIndex]) {
        const selectedTabElement = tabRefs.current[selectedIndex]!; // 获取选中的标签元素
        const tabWidth = selectedTabElement.offsetWidth; // 获取选中的标签宽度
        const tabLeft = selectedTabElement.offsetLeft; // 获取选中的标签左边距离

        const whiteBox = document.querySelector('.white-box') as HTMLElement; // 获取白色方框元素
        if (whiteBox) {
          // 更新白色方框的位置和宽度
          whiteBox.style.width = `${tabWidth}px`;
          whiteBox.style.transform = `translateX(${tabLeft}px)`;
        }
      }
    };

    // 初始化时更新白色方框位置
    updateWhiteBoxPosition();

    // 使用 ResizeObserver 监听窗口大小变化
    const resizeObserver = new ResizeObserver(updateWhiteBoxPosition);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current); // 监听容器的大小变化
    }

    // 组件卸载时取消监听
    return () => {
      resizeObserver.disconnect();
    };
  }, [selectedIndex]); 

  // 处理标签点击事件的函数
  const handleTabClick = (tab: string, index: number) => {
    setSelectedTab(tab); // 更新选中的标签
    setSelectedIndex(index); // 更新选中的标签索引
    onTabChange(tab); // 通知父组件当前选中的标签
  };

  return (
    <div ref={containerRef} style={{ display: 'flex', justifyContent: 'center', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px', position: 'relative'}}>
      {tabs.map((tab, index) => (
        <button
          key={index} // 为每个按钮提供唯一的键
          ref={el => tabRefs.current[index] = el} // 存储每个按钮的引用
          onClick={() => handleTabClick(tab, index)} // 点击按钮时调用处理函数
          style={{
            margin: '0 5px',
            padding: '10px 20px', 
            minWidth: '150px',
            border: 'none', 
            borderRadius: '5px', 
            backgroundColor: 'transparent', 
            fontWeight: tab === selectedTab ? 'bold' : 'normal', 
            cursor: 'pointer', 
            transition: 'color 0.4s ease', // 颜色变化的过渡效果
            color: tab === selectedTab ? '#000' : '#555', 
            position: 'relative', // 设置相对定位
            zIndex: 1 // 设置层级，确保按钮在白色方框之上
          }}
        >
          {tab}
        </button>
      ))}
      <div
        className="white-box" // 白色方框的类名
        style={{
          position: 'absolute', // 设置绝对定位
          bottom: '8px', // 白色方框的底部距离父元素底部的距离
          left: '0', // 白色方框的左边距离父元素左边的距离
          height: '70%', 
          backgroundColor: 'white', // 白色方框的背景颜色
          borderRadius: '5px', 
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // 白色方框的阴影效果
          transition: 'transform 0.5s ease, width 0.5s ease', // 白色方框位置和宽度变化的过渡效果
          zIndex: 0 // 设置层级，确保白色方框在按钮之下
        }}
      />
    </div>
  );
}

export default TabSelector;
