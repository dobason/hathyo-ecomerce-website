import includes from 'lodash/includes';

/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  const { authorities } = currentUser ?? {};

  return {
    viewer: authorities && includes(authorities, 'VIEWER'),
    not_viewer: !(authorities && includes(authorities, 'VIEWER')),
    admin: includes(authorities, 'ADMIN'),
    staff: includes(authorities, 'STAFF'),
    categories:
      authorities &&
      (includes(authorities, 'MERCHANT') ||
        includes(authorities, 'ADMIN') ||
        includes(authorities, 'STAFF')),
    topics_crud:
      authorities &&
      (includes(authorities, 'STAFF') ||
        includes(authorities, 'PARTNER') ||
        includes(authorities, 'ADMIN')),
    posts_crud:
      authorities &&
      (includes(authorities, 'STAFF') ||
        includes(authorities, 'PARTNER') ||
        includes(authorities, 'ADMIN')),
    series_crud:
      authorities &&
      (includes(authorities, 'STAFF') ||
        includes(authorities, 'PARTNER') ||
        includes(authorities, 'ADMIN')),
    merchants_crud: authorities && includes(authorities, 'ADMIN'),
    merchants_detail: authorities && includes(authorities, 'MERCHANT'),
  };
}

// edit