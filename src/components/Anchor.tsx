
const Anchor = (props: {
  children: string,
  href: string,
}) => {
  const { href, children } = props;

  return <a href={href} rel="noreferrer noopener" target="_blank">
    {children}
  </a>;
}

export default Anchor