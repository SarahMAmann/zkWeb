import Link from "next/link";
import { FaYoutube, FaGithub, FaTwitter } from "react-icons/fa";

const navigation = {
  main: [
    {
      name: "About",
      href: "https://sarah-m-benson.notion.site/sarah-m-benson/zkWeb-User-API-Documentation-8f183fe4d3a14fab845918bd8237b109#01ed3a7752f9488d9674b1c9509ba103",
    },
    {
      name: "Contribute",
      href: "https://sarah-m-benson.notion.site/sarah-m-benson/zkWeb-User-API-Documentation-8f183fe4d3a14fab845918bd8237b109#d74f5a34ff024944a4274ff8f93ab8ac",
    },
    {
      name: "Contact",
      href: "https://sarah-m-benson.notion.site/sarah-m-benson/zkWeb-User-API-Documentation-8f183fe4d3a14fab845918bd8237b109#d74f5a34ff024944a4274ff8f93ab8ac",
    },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com/zk_web",
      icon: <FaTwitter className="h-6 w-6"/>
    },
    {
      name: "GitHub",
      href: "https://github.com/SarahMAmann/zkWeb",
      icon: <FaGithub className="h-6 w-6"/>
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/channel/UCoftN-pj8_ixoDZ6r767RTQ",
      icon: <FaYoutube className="h-6 w-6"/>
    },
  ],
};

export default function Footer() {
  return (
    <footer className="py-10 w-full mt-10 border-t border-t-btn-background px-6 grid place-items-center gap-4">
      <ul className="flex items-center gap-4">
        {navigation.main.map((item) => (
          <Link className="text-sm transition hover:text-primary font-normal" href={item.href} key={item.name}>
            <li>{item.name}</li>
          </Link>
        ))}
      </ul>
      <ul className="flex items-center gap-4">
        {navigation.social.map((item) => (
          <Link className="text-sm transition hover:text-primary font-normal" href={item.href} key={item.name}>
            <li>{item.icon}</li>
          </Link>
        ))}
      </ul>
      <p className="text-sm font-normal">© {new Date().getFullYear()} zkWeb. All rights reserved.</p>
    </footer>
  );
}
