const MainLayout = ({ style, className, children, ref }) => {
  return (
    <section ref={ref} style={style} className={className}>
      {children}
    </section>
  );
};

export default MainLayout;
