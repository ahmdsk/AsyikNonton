import SiteConfig from "@/lib/SiteConfig";

export default function About() {
    const About = {
        siteName: SiteConfig.siteName,
    }

  return (
    <div className="md:w-[800px]">
      <h1 className="font-bold text-neutral text-2xl">About Page</h1>
      <div className="divider"></div>
      <p>
        {About.siteName} adalah sebuah platform open source yang dirancang untuk
        memberikan pengguna akses gratis untuk menonton film-film favorit
        mereka. Platform ini dikembangkan dengan menggunakan teknologi React dan
        Tailwind CSS, dua alat populer dalam pengembangan web modern.
      </p>
    </div>
  );
}
