import { ComponentChildren, FunctionalComponent } from 'preact';
import { Link } from 'preact-router';

interface Props {
    href: string;
    children: ComponentChildren
}

export const LinkText: FunctionalComponent<Props> = ({ href, children }) => {
    return (
        <Link class="inline-block font-bold text-sm text-blue-600 hover:text-blue-800" href={href}>
            {children}
        </Link>
    );
}