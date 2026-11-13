/**
 * Reads src/data/profile.json and fills in anything missing. The CMS leaves
 * empty optional fields out of the file, so every field may be absent.
 */
import raw from "@/data/profile.json";
import type { Bi } from "@/i18n";

type MaybeBi = Partial<Bi> | undefined;

type RawProfile = Partial<{
  name: MaybeBi;
  avatar: string;
  bio: MaybeBi;
  location: MaybeBi;
  affiliation: MaybeBi;
  links: { icon?: string; label?: MaybeBi; url?: string }[];
  about: Partial<{ zh: string[]; en: string[] }>;
  interests: MaybeBi[];
  cv: Partial<{
    pdf: string;
    sections: {
      title?: MaybeBi;
      items?: { period?: string; title?: MaybeBi; detail?: MaybeBi }[];
    }[];
  }>;
}>;

const bi = (v: MaybeBi): Bi => ({ zh: v?.zh ?? "", en: v?.en ?? "" });

/** True when either language has text. */
export const hasText = (v: Bi) => Boolean(v.zh || v.en);

const p = raw as RawProfile;

export const profile = {
  name: bi(p.name),
  avatar: p.avatar ?? "",
  bio: bi(p.bio),
  location: bi(p.location),
  affiliation: bi(p.affiliation),
  links: (p.links ?? [])
    .filter(l => l.url)
    .map(l => ({
      icon: l.icon ?? "website",
      label: bi(l.label),
      url: l.url as string,
    })),
  about: { zh: p.about?.zh ?? [], en: p.about?.en ?? [] },
  interests: (p.interests ?? []).map(bi).filter(hasText),
  cv: {
    pdf: p.cv?.pdf ?? "",
    sections: (p.cv?.sections ?? []).map(s => ({
      title: bi(s.title),
      items: (s.items ?? []).map(i => ({
        period: i.period ?? "",
        title: bi(i.title),
        detail: bi(i.detail),
      })),
    })),
  },
};
