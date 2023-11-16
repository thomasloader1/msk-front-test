export interface BannerImg {
  imagen_desktop: { link: string };
  imagen_mobile: { link: string };
  url_banner?: string | { title?: string; url: string; target?: string };
  url?: { href: string };
}
