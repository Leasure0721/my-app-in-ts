import React from 'react'; // 导入React库

// 定义PageContent组件的Props接口
interface PageContentProps {
  content: string; // 定义content属性，类型为字符串
}

// 定义PageContent组件，使用React.FC泛型，并传入PageContentProps接口
const PageContent: React.FC<PageContentProps> = ({ content }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center',backgroundColor:'#f2f9'}}>
      {/* 渲染一个h1标签，内容为传入的content属性 */}
      <h1>这是{content}！</h1>
    </div>
  );
};

// 导出PageContent组件
export default PageContent;
