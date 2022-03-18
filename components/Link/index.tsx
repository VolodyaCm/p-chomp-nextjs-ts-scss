import Link from 'next/link';
import styles from './Link.module.scss';
import cn from 'classnames';

interface PrimaryLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  active?: boolean;
}

const PrimaryLink = ({
  href,
  children,
  active,
  ...props
}: PrimaryLinkProps) => {
  return (
    <Link href={href}>
      <a
        className={cn(styles.link, {
          [styles.active]: active,
        })}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

export default PrimaryLink;
