import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import styles from './styles.module.css';
import useGlobalData from '@docusaurus/useGlobalData';

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const globalData = useGlobalData();
  const pluginData = globalData['docusaurus-plugin-sidebar-tags'].default || {};

  const {href, label, className, autoAddBaseUrl, docId} = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  const sidebarTag = pluginData[docId]?.tag; // Get the sidebar tag for the current item

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
            'menu__link--hasTag': !!item.customProps?.sidebarTag || !!sidebarTag
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        <span>
          {label}
        </span>

        {(sidebarTag || item.customProps?.sidebarTag) && (
          <span className="menu__link-sidebar-tag">
            {item.customProps?.sidebarTag ? item.customProps.sidebarTag : sidebarTag}
          </span>
        )}
        
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
