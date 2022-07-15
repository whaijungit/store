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
    container: props.collapse ? 'site-container collapse' : 'site-container',
    aside: 'aside',
    wrapper: 'site-wrapper'
  };
  return (
    <section className={defaultClass.container}>
      <aside className={defaultClass.aside}>{props.aside}</aside>
      <section className={defaultClass.wrapper}>
        <header className={defaultClass.header}>{props.header}</header>
        <main className={defaultClass.children}>{props.children}</main>
      </section>
    </section>
  );
};

export default CollapseLayout;
