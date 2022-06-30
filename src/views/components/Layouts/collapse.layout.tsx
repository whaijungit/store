import './collapse.layout.less';

interface CollapseLayoutProps {
  collapse?: boolean;
  aside?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;
}

const CollapseLayout: React.FC<CollapseLayoutProps> = (props) => {
  const defaultClass = {
    header: 'header',
    children: 'content',
    container: 'site-container',
    aside: props.collapse ? 'aside collapse' : 'aside',
    wrapper: 'site-wrapper'
  };
  return (
    <div className={defaultClass.container}>
      <aside className={defaultClass.aside}>{props.aside}</aside>
      <section className={defaultClass.wrapper}>
        <header className={defaultClass.header}>{props.header}</header>
        <main className={defaultClass.children}>{props.children}</main>
      </section>
    </div>
  );
};

export default CollapseLayout;
